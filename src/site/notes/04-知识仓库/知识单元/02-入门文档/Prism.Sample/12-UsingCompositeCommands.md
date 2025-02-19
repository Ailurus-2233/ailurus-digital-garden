---
{"title":"12-UsingCompositeCommands","note_type":"knowledge_base","description":"符合命令的使用方式","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/12-UsingCompositeCommands/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**实现 IApplicationCommands：**

```csharp
public interface IApplicationCommands
{
    CompositeCommand SaveAllCommand { get; }
}

public class ApplicationCommands : IApplicationCommands
{
    public CompositeCommand SaveAllCommand { get; } = new CompositeCommand();
}
```

**在 ViewModel 中使用：**

```csharp
private IApplicationCommands _applicationCommands;
public IApplicationCommands ApplicationCommands
{
    get { return _applicationCommands; }
    set { SetProperty(ref _applicationCommands, value); }
}
```

`IApplicationCommands` 需要通过 IoC 获取实例，可以在构造函数中注入。

**在 View 中使用：**

```xml
<Button Command="{Binding ApplicationCommands.SaveAllCommand}" Content="Save All"/>
```

**在 ViewModel 中注册命令：**

```csharp
ApplicationCommands.SaveAllCommand.RegisterCommand(SaveCommand);
```

这个 `SaveCommand` 可以是一个 `DelegateCommand`，也可以是一个 `CompositeCommand`，这样可以实现多个命令的组合。当 `SaveAllCommand` 被执行时，所有注册的命令都会被执行。

**Bootstrapper.cs：**

```csharp
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterSingleton<IApplicationCommands, ApplicationCommands>();
}
```

在 `Bootstrapper.cs` 中注册 `IApplicationCommands`。
