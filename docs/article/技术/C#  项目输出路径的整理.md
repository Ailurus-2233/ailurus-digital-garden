---
title: C#  项目输出路径的整理
createTime: 2025/08/20 16:58:24
permalink: /article/zx8327p7/
tags: [C#, MSBuild]
---

## 整理路径的目的

在实际开发中，.NET 项目的输出目录会包含大量的依赖文件。这些文件包括：

- 项目本身生成的 `DLL` / `EXE`
- `NuGet` 引用的库文件
- `runtimes` 文件夹下的各平台支持文件
- 配置文件（.json, .config 等）

如果不加整理，随着项目数量的增加，依赖项目增加，目录会变得非常混乱，既不利于手动调试，也不利于后续的打包和发布。

例如在我自己的项目中

![image.png](https://s2.loli.net/2025/08/20/1roTJPLWMa9uN2U.png)

可以看到输出目录下有很多文件和子目录，这些都是项目运行所需的。

在这里我先对输出目录进行一次整理：
- 所有项目启动所必须的 `DLL` 放在 `./core/`
- 插件式的 `DLL` 放在 `./modules/`
- 第三方依赖放在 `./libraries/`
- 平台相关文件保留必要的子目录，例如数据库 `./database/`，配置文件 `./config/`

如下图所示

![image.png](https://s2.loli.net/2025/08/20/zpbBfdWRacSxZI6.png)

根目录下只有启动项目的 `exe` 和 `dll` 文件，其他的文件分别放在特定的文件夹中，这样文件结构清晰明了。

> [!info]
> 除了整理输出目录的方案外，还可以使用[单文件发布（Single File Publish）](https://learn.microsoft.com/zh-cn/dotnet/core/deploying/single-file/overview?tabs=cli)来简化部署，需要注意的是，单文件发布会将所有依赖项打包到一个文件中，甚至可以将 dotnet 运行环境打包进这个文件中。这样有点可以在任何地方运行所打包的程序，但是这会导致：
> 1. 安装包体积变大；
> 2. 运行前需要先将这些环境加载到内存中，会增加启动时间；
> 3. 无法增量更新。
>
> **单文件发布是一个值得考虑的方案，但本文暂不考虑，主要记录整理输出路径的思路**。

## 相关问题处理

整理输出路径虽然带来结构上的整洁，但同时也会引入一些运行时的问题。主要包括 **程序集无法正常加载**、**手动整理文件夹** 等，需要在工程配置或代码层面处理。

### AssemblyResolve 处理加载

在 .NET 中，程序集的加载是通过 `Assembly.Load` 或 `Assembly.LoadFrom` 等方法进行的。当程序运行到特定的类或方法时，会尝试加载所需的程序集。如果程序集不在默认的搜索路径中，就会导致加载失败。为了解决这个问题，可以使用 `AppDomain.CurrentDomain.AssemblyResolve` 事件来手动指定程序集的加载路径。

例如如下代码：

```csharp
AppDomain.CurrentDomain.AssemblyResolve += (sender, args) =>
{
    var assemblyName = new AssemblyName(args.Name);
    var assemblyPath = Path.Combine(AppContext.BaseDirectory, "core", assemblyName.Name + ".dll");
    return Assembly.LoadFrom(assemblyPath);
};

```

这段代码会接管原有程序加载机制，从 `./core/` 目录加载程序集，但是这是明显存在问题的方式：
1. 路径限定在 `./core/`，无法处理其他目录的程序集。
2. 没有做文件可加载检查，如果文件不存在或者版本不对都会导致无法加载或程序其他异常。
3. 每次都从文件加载程序集，性能开销较大。

在这个基础上，考虑使用一个 `AssemblyLoader` 来封装加载逻辑:
1. 通过配置文件或约定来指定各个目录的程序集位置，增强灵活性。
2. 提供文件可加载检查，确保在加载前文件存在且版本匹配。
3. 提供缓存机制，避免重复加载相同的程序集。
4. 环境变量支持，允许从系统环境变量中获取程序集路径。

于是便有了以下代码

#### 1. 在指定路径加载程序集

这段代码是加载程序集的基础方法，后续都会使用这个方法来加载指定程序集

```csharp
private static readonly string[] sourceArray = [".dll", ".exe"];

/// <summary>
///     尝试加载指定路径下的程序集。
/// </summary>
private Assembly? LoadAssembly(string path, string assemblyName)
{
    var fullPath = Path.GetFullPath(path);
    if (!Directory.Exists(fullPath)) return null;

    return (from ext in sourceArray
        select Path.Combine(fullPath, $"{assemblyName}{ext}")
        into assemblyPath
        where File.Exists(assemblyPath)
        select Assembly.LoadFrom(assemblyPath)).FirstOrDefault();
}
```

#### 2. 构建搜索程序集路径

手动指定加载的父路径，以及子目录的搜索深度，便于后续的动态解析，至于为什么还要考虑子文件夹，可以看到如下截图，第三方库被我按照公司或者项目名称进行了一个分类，而且 `runtimes` 文件夹中会根据不同架构导入不同的二进制文件，也需要考虑子文件夹的问题。

![image.png](https://s2.loli.net/2025/08/20/sJi8nHBq7avcTlj.png)

```csharp
/// <summary>
///     基础搜索路径（动态解析时使用），<根路径，搜索深度>
/// </summary>
private static readonly Dictionary<string, int> _baseFolderPath = new()
{
    { Path.GetFullPath("./"), 0 },
    { Path.GetFullPath("./core/"), 0 },
    { Path.GetFullPath("./libraries/"), 1 },
    { Path.GetFullPath("./modules/"), 0 },
    { Path.GetFullPath("./runtimes/"), 2 }
};

/// <summary>
///     搜索路径。
/// </summary>
private readonly List<string> _searchPaths = [];

/// <summary>
///     初始化搜索路径。
/// </summary>
private void InitializeSearchPath()
{
    lock (_searchPathsLock)
    {
        _searchPaths.Clear();
        _searchPaths.AddRange(_baseFolderPath.Keys);
        // 附带子目录（递归深度 2）
        var subList = new List<string>();
        foreach (var subPaths in 
                from keyValuePair in _baseFolderPath
                    let path = keyValuePair.Key
                    where Path.Exists(path)
                    select GetAllSubDirectories(path, keyValuePair.Value))
            subList.AddRange(subPaths);
        _searchPaths.AddRange(subList);
    }
}

/// <summary>
///     递归获取子目录。
/// </summary>
private static List<string> GetAllSubDirectories(string path, int limit = 4)
{
    var subDirectories = new List<string>();
    if (limit == 0) return subDirectories;
    var directories = Directory.GetDirectories(path);
    subDirectories.AddRange(directories);
    foreach (var directory in directories)
    {
        var subDirs = GetAllSubDirectories(directory, limit - 1);
        subDirectories.AddRange(subDirs);
    }
    return subDirectories;
}
```

#### 3. 使用 AssemblyResolve 处理加载

这个方法通过 `AppDomain.CurrentDomain.AssemblyResolve += ResolveAssembly;` 来处理程序集的加载。

```csharp
/// <summary>
///     已解析缓存。
/// </summary>
private readonly ConcurrentDictionary<string, Assembly> _resolvedCache = new();

/// <summary>
///     动态程序集解析。
/// </summary>
private Assembly? ResolveAssembly(object? sender, ResolveEventArgs args)
{
    var assemblyName = new AssemblyName(args.Name).Name;
    if (string.IsNullOrWhiteSpace(assemblyName)) return null;
    if (assemblyName.EndsWith(".resources", StringComparison.OrdinalIgnoreCase)) return null;
    // step 1. 缓存
    if (_resolvedCache.TryGetValue(assemblyName, out var cached))
        return cached;
    // step 2. 已加载程序集
    foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
    {
        var name = asm.GetName().Name;
        if (name != null && name.Equals(assemblyName, StringComparison.OrdinalIgnoreCase))
        {
            _resolvedCache[assemblyName] = asm;
            return asm;
        }
    }
    // step 3. 按名称猜测目录
    var folder = assemblyName.Split('.')[0];
    var targetFolder = _searchPaths.FirstOrDefault(x => x.Contains(folder, StringComparison.OrdinalIgnoreCase));
    if (targetFolder != null)
    {
        var asm = LoadAssembly(targetFolder, assemblyName);
        if (asm != null)
        {
            _resolvedCache[assemblyName] = asm;
            return asm;
        }
    }
    // step 4. 遍历所有目录
    foreach (var asm in _searchPaths.Select(path => LoadAssembly(path, assemblyName)).OfType<Assembly>())
    {
        _resolvedCache[assemblyName] = asm;
        return asm;
    }
    return null;
}
```

方法中分为了以下几个步骤：
1. 从缓存程序集中获取
2. 从已加载程序集中获取
3. 根据名称从搜索路径集合中获取
4. 遍历所有搜索路径集合获取
5. 未加载到程序集将会返回空，并引起加载失败

#### 4. 软件环境变量的设置

在某些情况下(例如使用 DLLImport 加载 C++ 编译的动态链接库)，需要设置特定的环境变量，以便于程序集的加载和解析。这可以通过以下方式实现：

```csharp
/// <summary>
///     刷新 PATH 环境变量，支持本地依赖的 native 库。
/// </summary>
private void RefreshRuntimeEnvironmentPath()
{
    var currentPath = Environment.GetEnvironmentVariable("PATH") ?? "";
    var paths = currentPath.Split(';').ToList();
    foreach (var path in _searchPaths.Where(p => !paths.Contains(p)))
        paths.Add(path);
    Environment.SetEnvironmentVariable("PATH", string.Join(";", paths));
}
```

> [!warning]
> 通过这些方法，可以有效地管理和优化 .NET 项目的输出路径，基本保证了程序集的正确加载和运行，但是还缺少版本认证过程，需要后续调整。

### targets 和 props 文件整理输出

在处理完成程序集加载后，还有一个问题需要考虑，就是如何在项目构建时自动整理输出路径。在过往的工作经历中，有很多方法可以解决这个问题：
1. 通过执行编译后事件，通过脚本整理输出路径，但是不同操作系统的脚本支持可能存在差异，所以一般只在 windows 上使用 `bat` 或 `ps1` 脚本
2. 通过使用 `targets` 和 `props` 文件来实现，配置输出路径和文件名等，以及执行特定的构建操作，也是本文主要介绍的方案


#### 1. 什么是 `targets` 和 `props` 文件

- `targets` 文件用于定义项目构建过程中的特定操作，例如编译、打包等。它们通常位于项目文件夹中的 `build` 子文件夹内。
- `props` 文件用于定义项目的共享属性，例如输出路径、目标框架等。它们通常位于项目文件夹中的 `props` 子文件夹内。


#### 2. 使用 `props` 文件定义总的输出路径

在 `props` 文件中，可以定义一个全局的输出路径，例如：

```xml
<Project>
    <PropertyGroup>
        <BaseOutputPath>$(SolutionDir)Output\$(Configuration)\</BaseOutputPath>
    </PropertyGroup>

    <PropertyGroup Condition="'$(Configuration)'=='Release' and '$(OutputPath)' == '' and $(MSBuildProjectDirectory.Contains('\Core\'))">
        <OutputPath>$(BaseOutputPath)core\</OutputPath>
    </PropertyGroup>

    <PropertyGroup Condition="'$(Configuration)'=='Release' and '$(OutputPath)' == '' and $(MSBuildProjectDirectory.Contains('\Modules\'))">
        <OutputPath>$(BaseOutputPath)modules\</OutputPath>
    </PropertyGroup>

    <PropertyGroup Condition="'$(OutputPath)' == ''">
        <OutputPath>$(BaseOutputPath)</OutputPath>
    </PropertyGroup>

    <PropertyGroup>
        <LibrariesBaseDir>$(BaseOutputPath)libraries\</LibrariesBaseDir>
    </PropertyGroup>
</Project>
```

我定义了基本输出路径，并根据项目结构为不同模块指定了输出路径，这样可以确保在构建时，输出文件能够正确地放置在预期的位置。如果特定项目需要指定特定输出目录，也可以在项目`csproj` 文件中单独设置 `<OutputPath>`。

#### 3. 使用 `targets` 文件调整依赖文件结构

在 `targets` 文件中，可以定义编译后操作，例如将生成的文件复制到特定目录。以下是一个示例：

```xml
<Project>
    <Target Name="CopyDependenciesByPackageCategory"
            AfterTargets="ResolvePackageAssets"
            BeforeTargets="CopyFilesToOutputDirectory"
            Condition="'$(Configuration)'=='Release'">

        <MakeDir Directories="$(LibrariesBaseDir)"/>

        <!-- 收集所有包依赖 -->
        <ItemGroup>
            <AllPackageDependencies Include="@(RuntimeCopyLocalItems);@(NativeCopyLocalItems)"/>
            <AllPackageDependencies>
                <PackageId>%(NuGetPackageId)</PackageId>
                <Category>$([System.String]::Copy('%(NuGetPackageId)').Split('.')[0])</Category>
            </AllPackageDependencies>
        </ItemGroup>

        <!-- 按分类创建目录 -->
        <MakeDir Directories="@(AllPackageDependencies-> 
                   '$(LibrariesBaseDir)%(Category)'->Distinct())"/>

        <!-- 复制文件到分类目录 -->
        <Copy SourceFiles="@(AllPackageDependencies)"
              DestinationFiles="@(AllPackageDependencies->'$(LibrariesBaseDir)%(Category)\%(Filename)%(Extension)')"
              SkipUnchangedFiles="true"/>

        <!-- 处理无包信息的文件 -->
        <ItemGroup>
            <UnknownPackageFiles Include="@(ReferenceCopyLocalPaths)"
                                 Exclude="@(AllPackageDependencies)"/>
        </ItemGroup>

        <MakeDir Directories="$(LibrariesBaseDir)Others\"/>
        <Copy SourceFiles="@(UnknownPackageFiles)"
              DestinationFolder="$(LibrariesBaseDir)Others\"
              SkipUnchangedFiles="true"/>
    </Target>
</Project>
```

> [!info]
> 这个文件定义了在构建后如何处理和复制项目的依赖项，确保它们被正确地放置在输出目录中，如果没有找到对应的包信息，则会将其放置在 `Others` 目录中。其中都只使用了 MSBuild 的内置任务和属性，避免了使用脚本的复杂性，也能保证在不同操作系统上的一致性。
> 具体 MSBuild 语法可以参考这个网站 [MSBuild 教程](https://learn.microsoft.com/zh-cn/visualstudio/msbuild/walkthrough-using-msbuild?view=vs-2022

#### 4. 清理输出目录中非当前项目的 DLL

值得注意的是，上面一节的 `Target` 是将本地存储的依赖文件拷贝到指定路径，而不是在输出目录进行移动，所以我们还需要清理输出目录的 DLL。

我们可以在 `props` 文件中使用以下代码来避免拷贝引用的nuget项目和本地项目到输出目录：

```xml
<ItemDefinitionGroup Condition="'$(Configuration)'=='Release'">
    <Reference>
        <Private>false</Private> <!-- 对静态引用DLL关闭复制 -->
    </Reference>
    <ProjectReference>
        <Private>false</Private> <!-- 对项目引用关闭复制 -->
    </ProjectReference>
    <!-- 禁用自动复制 NuGet 依赖文件到输出目录 -->
    <CopyLocalLockFileAssemblies>false</CopyLocalLockFileAssemblies>
    <CopyNuGetImplementations>false</CopyNuGetImplementations>
</ItemDefinitionGroup>
```

但是这又存在一个问题，一些 nuget 项目在构建时会执行包中的 `targets` 和 `props` 文件，这个行为依赖 `CopyNuGetImplementations` 和 `CopyLocalLockFileAssemblies` 这两个配置项，比如拷贝一些 `runtimes` 文件夹等等，所以不能直接禁用这两个选项。

我的选择的方案是在编译完成后清理输出目录中多余的文件，于是向 `targets` 文件中添加了一个清理的 `Target`：

```xml
<Target Name="ClearDllFiles" AfterTargets="Build" Condition="'$(Configuration)'=='Release'">
    <ItemGroup>
        <OutputNugetDllFiles Include="@(ReferenceCopyLocalPaths->'$(OutputPath)%(Filename)%(Extension)')"/>
    </ItemGroup>
    <!-- 删除 DLL -->
    <Delete Files="@(OutputNugetDllFiles)"/>
</Target>
```

使用 `->` 语法将 `@(ReferenceCopyLocalPaths)` 中的每个文件映射到输出路径中，然后直接删除即可。

#### 5. 清理不必要的 runtimes 环境

由于 .net 跨平台的性质，在 runtimes 文件夹中会有很多诸如 `linux-arm64` 等非目标平台的代码，我们需要处理这些文件，以减小最终发布包的体积。

在 `targets` 文件中添加一个清理的 `Target`，只保留 `linux-x64` / `osx` / `win-x64` 这几个文件夹。

```xml
<Target Name="ClearRuntimes" AfterTargets="Build" Condition="'$(Configuration)'=='Release'">
    <PropertyGroup>
        <!-- 匹配 runtimes 下的所有子文件夹 -->
        <TargetDir>$(OutputPath)/runtimes</TargetDir>
    </PropertyGroup>
    <ItemGroup Condition="Exists('$(TargetDir)')">
        <AllRuntimeDirs Include="$([System.IO.Directory]::GetDirectories('$(TargetDir)', '*', System.IO.SearchOption.TopDirectoryOnly))"/>
    </ItemGroup>
    <ItemGroup>
        <!-- 只保留 linux-x64 / osx / win-x64，其他的标记为要删除 -->
        <RuntimeDirsToDelete Include="@(AllRuntimeDirs)"
                             Condition=" '%(Filename)' != 'linux-x64' AND '%(Filename)' != 'osx' AND '%(Filename)' != 'win-x64' "/>
    </ItemGroup>
    <RemoveDir Directories="@(RuntimeDirsToDelete)"/>
</Target>
```

## 总结

通过以上步骤，我们成功地整理了 .NET 项目的输出路径，确保了项目的依赖项被正确地放置在输出目录中，并且清理了不必要的文件。这不仅减小了最终发布包的体积，也提高了项目的构建效率。在实际应用中，可以根据项目的具体需求，灵活调整 MSBuild 的配置和任务，以达到最佳的构建效果。