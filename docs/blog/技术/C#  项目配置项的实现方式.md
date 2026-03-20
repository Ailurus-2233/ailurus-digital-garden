---
title: C# 项目配置项的实现方式
createTime: 2025/09/02 09:57:51
permalink: /blog/1tha8hfh/
tags: [C#, 配置项管理]
---

在开发过程中，项目的配置项管理是一个重要的环节。合理的配置项管理可以提高项目的灵活性和可维护性。本文将探讨在 C# 项目中实现配置项的几种常见方式。

目前 C# 项目常用的配置项管理方式包括：

1. `App.config` （`.net framework` 项目推荐）
   - 在 `.net framework` 项目中会自动创建 `Properties/Settings.settings` 文件可以方便地管理应用程序的设置
   - 在 `.net core` 项目中可以在项目设置中创建资源文件和设置文件
   - 手动创建 `App.config` 在项目目录中，在编译时会自动将其重命名为程序集名称 + config 后缀的格式并复制到输出目录
   - `System.Configuration.ConfigurationManager` 类可以用于读取和写入配置文件中的设置
2. `appsetting.json`（`.net core` 项目推荐）
   - 相较于 `App.config`，`appsetting.json` 提供了更灵活和易于管理的配置方式，尤其适用于复杂的应用程序。
   - `Microsoft.Extensions.Configuration` 命名空间下提供了一系列 API，可以方便地读取和写入 `appsetting.json` 文件中的配置项。
   - `IConfiguration` 接口可以用于访问应用程序的配置数据，支持从多个配置源（如 JSON 文件、环境变量等）读取配置项。
3. `config.ini` (不推荐)
   - 使用 `kernel32.dll` 中的 `GetPrivateProfileString` 和 `WritePrivateProfileString` 函数可以读取和写入 INI 文件中的配置项，但是每次需要执行系统调用，且只能读写一个配置项。
   - 使用例如 `ini-parser` 这样的第三方库，可以更方便地管理 INI 文件中的配置项，支持批量读写和更复杂的操作。
4. 自己造轮子（乐~）

## 1. App.config

### 快速使用

现在展示一个 `App.config`  样例

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <connectionStrings>
        <add name="Local" connectionString="test.db"/>
    </connectionStrings>
    <appSettings>
        <add key="Flag" value="true"/>
    </appSettings>
</configuration>
```


在 `.net framework` 项目中，`App.config` 文件用于存储应用程序的配置设置。可以通过 `System.Configuration.ConfigurationManager` 类来读取和写入这些设置。

```csharp
// 引入命名空间
using System.Configuration;

// 读取设置
string connectionString = ConfigurationManager.ConnectionStrings["Local"].ConnectionString;
string settingValue = ConfigurationManager.AppSettings["Flag"]; // 注意这里拿到的是字符串

// 写入设置
var cfg = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None); // 打开运行的程序集对应的配置文件
cfg.AppSettings.Settings["Flag"].Value = "false"; // 修改配置项
cfg.Save(ConfigurationSaveMode.Modified); // 保存修改, ConfigurationSaveMode 默认是 Full 
```

写入设置相关类型说明：

**ConfigurationUserLevel**：
1. `None`：表示不使用特定的用户级别，通常用于应用程序级别的设置。
2. `PerUserRoaming`：将配置文件保存与用户目录下的 `AppData\Roaming` 文件夹中。
3. `PerUserRoamingAndLocal`：将配置文件同时保存与用户目录下的 `AppData\Roaming` 和 `AppData\Local` 文件夹中。

**ConfigurationSaveMode**：
1. `Minimal`：表示只保存最小的配置项，通常用于快速保存。
2. `Modified`：表示只保存已修改的配置项。
3. `Full`：表示保存所有的配置项，无论是否修改。

### 自定义配置项

在 `App.config` 中，可以通过自定义配置节（Section）来实现更复杂的配置项管理。自定义配置节允许开发者定义自己的配置结构，以满足特定的需求。

1. 创建自定义配置节类，继承自 `ConfigurationSection`。
2. 在 `App.config` 中定义自定义配置节，或者通过代码动态添加。
3. 使用 `ConfigurationManager` 读取和写入自定义配置节。

**自定义配置节类**

```csharp
public class MyCustomSection : ConfigurationSection
{
    [ConfigurationProperty("mySetting", DefaultValue = "Default Value")]
    public string MySetting
    {
        get { return (string)this["mySetting"]; }
        set { this["mySetting"] = value; }
    }

    [ConfigurationProperty("useCustomSetting", DefaultValue = true)]
    public bool UseCustomSetting
    {
        get { return (bool)this["useCustomSetting"]; }
        set { this["useCustomSetting"] = value; }
    }

    [ConfigurationProperty("factor", DefaultValue = 1)]
    public int Factor
    {
        get { return (int)this["factor"]; }
        set { this["factor"] = value; }
    }
}
```

**在 App.config 中定义自定义配置节**

```xml
<configuration>
    <configSections>
        <section name="myCustomSection" type="Namespace.MyCustomSection, AssemblyName"/>
    </configSections>
</configuration>
```

代码动态添加

```csharp
// 动态添加自定义配置节
var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
var section = new MyCustomSection();
section.MySetting = "Hello, World!";
config.Sections.Add("myCustomSection", section);
config.Save(ConfigurationSaveMode.Modified);
```

**配置项的读写**

```csharp
// 读取自定义配置节
var mySection = (MyCustomSection)ConfigurationManager.GetSection("myCustomSection");
string mySettingValue = mySection.MySetting;

// 写入自定义配置节
var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
var section = (MyCustomSection)config.GetSection("myCustomSection");
section.MySetting = "New Value";
config.Save(ConfigurationSaveMode.Modified); 
```

**修改 App.config 中的值**

```xml
<configuration>
    <configSections>
        <section name="myCustomSection" type="Namespace.MyCustomSection, AssemblyName"/>
    </configSections>
    <myCustomSection mySetting="Hello, World!" useCustomSetting="true" factor="2"/>
</configuration>
```

以上便可以使用自定义的配置节了。通过这种方式，可以将复杂的配置项结构化，便于管理和维护。

> [!info]
> 这些配置项全部都是属性，所以在做 WPF 的项目时，可以在界面上做相关的控件，然后绑定到这些属性上（可以使用单例）。然后在代码中就可以直接操作这些属性，达到动态修改配置的目的。

### 多项目配置文件

在一个解决方案中有多个项目时，可以为每个项目分别使用自己的配置文件。这样可以避免不同项目之间的配置冲突，并且可以根据项目的需要灵活配置。然而在使用 `OpenExeConfiguration` 方法时，它默认为加载当前可执行文件的配置文件，例如一个解决方案中有两个项目，每一个项目都有自己的配置文件，但是在代码中使用 `OpenExeConfiguration` 时，仍然需要指定具体的配置文件路径。

```csharp
var dllPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "YourProject.dll");
var config = ConfigurationManager.OpenExeConfiguration(dllPath);
```

这样可以确保每个项目都能独立管理自己的配置项，但是在单文件发布的情况下，`OpenExeConfiguration` 无法找到dll，从而无法找到对应的配置文件。

为解决这个问题，有以下几个方案：
1. 将所有项目的配置文件合并到主项目中，通过 `OpenExeConfiguration(exePath)` 来加载主项目的配置文件来实现多项目之间的配置共享。
2. 使用 `OpenMappedExeConfiguration` 方法，指定映射路径来加载特定项目的配置文件，代码如下

```csharp
var configFileMap = new ExeConfigurationFileMap
{
    ExeConfigFilename = @"C:\Path\To\YourProject.dll.config"
};
var config = ConfigurationManager.OpenMappedExeConfiguration(configFileMap, ConfigurationUserLevel.None);
```

## 2. appsettings.json

### 基本用法

在 `.NET Core` 和 `.NET 5+` 项目中，推荐使用 `appsettings.json` 作为配置文件。它支持层级结构，灵活且便于维护。默认情况下，新建的 `ASP.NET Core` 项目就会自带一个 `appsettings.json` 文件。

示例 `appsettings.json` 文件内容：

```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=TestDb;User Id=sa;Password=your_password;"
  },
  "AppSettings": {
    "EnableFeatureX": true,
    "MaxRetryCount": 5,
    "ApiEndpoint": "https://api.example.com"
  }
}
```

在 Program.cs 或 Startup.cs 中加载配置：

```csharp
using Microsoft.Extensions.Configuration;

// 创建配置构建器
var builder = new ConfigurationBuilder()
    .SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true) // reloadOnChange 开启自动刷新
    .AddEnvironmentVariables(); // 还可以叠加环境变量

IConfiguration configuration = builder.Build();

// 读取配置
string conn = configuration.GetConnectionString("Default");
bool flag = configuration.GetValue<bool>("AppSettings:EnableFeatureX");
int retry = configuration.GetValue<int>("AppSettings:MaxRetryCount");
```

### 绑定到强类型配置类

通过强类型类绑定，可以让配置项更直观，避免字符串 key 带来的硬编码问题。

定义配置类：

```csharp
public class AppSettings
{
    public bool EnableFeatureX { get; set; }
    public int MaxRetryCount { get; set; }
    public string ApiEndpoint { get; set; }
}
```


在 Program.cs 中绑定：

```csharp
var appSettings = new AppSettings();
configuration.GetSection("AppSettings").Bind(appSettings);

// 使用
Console.WriteLine(appSettings.ApiEndpoint);
```

在 ASP.NET Core 项目中，可以直接注册到 DI 容器：

```csharp
builder.Services.Configure<AppSettings>(
    builder.Configuration.GetSection("AppSettings"));
```

在代码中通过 `IOptions<AppSettings>` 或 `IOptionsSnapshot<AppSettings>` 注入使用。

### 多环境配置

在实际开发中，常常需要根据环境（开发、测试、生产）使用不同的配置。appsettings.json 支持分环境配置，例如：

```csharp
appsettings.Development.json
appsettings.Production.json
```

加载时会自动根据 `ASPNETCORE_ENVIRONMENT` 选择合适的文件进行叠加。

```csharp
var builder = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json",
                 optional: true)
    .AddEnvironmentVariables();
```

这样可以做到环境隔离，提升部署灵活性。

## 3. config.ini

虽然现在较少使用 .ini 配置文件，但在一些老项目或需要与其他语言（如 C/C++）交互的场景下，.ini 仍然有一定的应用场景。

### 使用 Windows API 读写 INI 文件

C# 可以通过调用 kernel32.dll 中的函数来读写 ini 文件：

``` csharp
using System.Runtime.InteropServices;
using System.Text;

public class IniFile
{
    [DllImport("kernel32", CharSet = CharSet.Unicode)]
    static extern int GetPrivateProfileString(string section, string key, string defaultValue,
        StringBuilder retVal, int size, string filePath);

    [DllImport("kernel32", CharSet = CharSet.Unicode)]
    static extern long WritePrivateProfileString(string section, string key, string value, string filePath);

    private readonly string _path;

    public IniFile(string path)
    {
        _path = path;
    }

    public string Read(string section, string key, string defaultValue = "")
    {
        var retVal = new StringBuilder(255);
        GetPrivateProfileString(section, key, defaultValue, retVal, 255, _path);
        return retVal.ToString();
    }

    public void Write(string section, string key, string value)
    {
        WritePrivateProfileString(section, key, value, _path);
    }
}
```

示例 `config.ini`：

```ini
[Database]
Server=localhost
Port=3306
User=root
Password=123456
```

读取配置：
```csharp
var ini = new IniFile("config.ini");
string server = ini.Read("Database", "Server");
string port = ini.Read("Database", "Port");
```

写入配置：
```csharp
ini.Write("Database", "Server", "127.0.0.1");
```

### 使用第三方库

直接调用 Windows API 的方式有点原始，而且会产生更加频繁的 IO 操作，更现代的方式是使用第三方库，例如 `ini-parser`。

示例：

```csharp
using IniParser;
using IniParser.Model;

var parser = new FileIniDataParser();
IniData data = parser.ReadFile("config.ini");

// 读取
string server = data["Database"]["Server"];

// 修改
data["Database"]["Server"] = "127.0.0.1";
parser.WriteFile("config.ini", data);
```

相较于系统 API，第三方库提供了更直观、灵活的 API，适合结构化的配置管理。

## 4. 其他

除了使用官方提供的 App.config / appsettings.json，或者传统的 ini 文件，有时也可以根据业务需要造轮子，比如：
- 使用 **自定义的 XML 文件** 作为配置存储
- 使用 **YAML** 文件（配合 YamlDotNet 库）
- 使用 **SQLite** 数据库 存储配置项，适合配置量大、查询复杂的场景
- 使用 **环境变量** / **命令行参数** 作为配置源
- 使用 **远程配置中心**（如 Consul、Apollo、etcd）在分布式系统中集中管理配置

这些方式各有优劣，需要根据具体项目的复杂度和部署环境来选择。

