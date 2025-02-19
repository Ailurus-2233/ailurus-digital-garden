---
{"title":"07-Modules加载方法","note_type":"knowledge_base","description":"应用程序中如何配置其他模块","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-25","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/07-Modules加载方法/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-25","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

### 通过 App.config 加载

**App.config：**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <configSections>
    <section name="modules" type="Prism.Modularity.ModulesConfigurationSection, Prism.Wpf" />
  </configSections>
  <startup>
  </startup>
  <modules>
    <module assemblyFile="ModuleA.dll" moduleType="ModuleA.ModuleAModule, ModuleA, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" moduleName="ModuleAModule" startupLoaded="True" />
  </modules>
</configuration>
```

其中 AssemblyFile 为模块的 dll 文件，ModuleType 为模块的类型，ModuleName 为模块的名称，StartupLoaded 为是否启动加载，AssemblyFile 需要指定 dll 的路径。

**Bootstrapper.cs：**

```csharp
protected override IModuleCatalog CreateModuleCatalog()
{
    return new ConfigurationModuleCatalog();
}
```

这里需要重写 Bootstrapper 的 CreateModuleCatalog 方法，返回 ConfigurationModuleCatalog，来加载 App.config 中的配置的模块。

### 通过代码加载

**Bootstrapper.cs：**

```csharp
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    moduleCatalog.AddModule<ModuleA.ModuleAModule>();
}
```

这里需要重写 Bootstrapper 的 ConfigureModuleCatalog 方法，通过 AddModule 方法添加模块。

### 通过目录加载

**Bootstrapper.cs：**

```csharp
protected override IModuleCatalog CreateModuleCatalog()
{
    return new DirectoryModuleCatalog() { ModulePath = @".\Modules" };
}
```

这里需要重写 Bootstrapper 的 CreateModuleCatalog 方法，返回 DirectoryModuleCatalog，指定模块的目录。

### 通过 XAML 加载

**Bootstrapper.cs：**

```csharp
protected override IModuleCatalog CreateModuleCatalog()
{
    return ModuleCatalog.CreateFromXaml(new Uri("/Modules;component/ModulesCatalog.xaml", UriKind.Relative));
}
```

这里需要重写 Bootstrapper 的 CreateModuleCatalog 方法，通过 ModuleCatalog.CreateFromXaml 方法加载 XAML 文件。

**ModulesCatalog.xaml：**

```xml
<m:ModuleCatalog xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                    xmlns:m="clr-namespace:Prism.Modularity;assembly=Prism.Wpf">
    <m:ModuleInfo ModuleName="ModuleAModule" 
                  ModuleType="ModuleA.ModuleAModule, ModuleA, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
</m:ModuleCatalog>
  ```

这里需要创建一个 ModulesCatalog.xaml 文件，通过 ModuleInfo 标签添加模块。

### 一般加载方法

**Bootstrapper.cs：**

```csharp
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    var moduleAType = typeof(ModuleAModule);
    moduleCatalog.AddModule(new ModuleInfo()
    {
        ModuleName = moduleAType.Name,
        ModuleType = moduleAType.AssemblyQualifiedName,
        InitializationMode = InitializationMode.OnDemand
    });
}
```

这里需要重写 Bootstrapper 的 ConfigureModuleCatalog 方法，通过 ModuleInfo 添加模块。
