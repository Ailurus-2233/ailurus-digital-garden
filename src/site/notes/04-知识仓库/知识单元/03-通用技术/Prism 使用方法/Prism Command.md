---
{"dg-publish":true,"permalink":"/04//03/prism/prism-command/","title":"Prism Command","tags":["Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/Prism 使用方法\|Prism 使用方法]]

Command 用于将 ViewModel 中的方法与 UI 控件绑定，从而实现功能分离。原生 WPF 通过实现 `ICommand` 接口，可以在 ViewModel 中定义命令，并通过数据绑定连接到 UI 元素。这使得在不直接操作 UI 的情况下执行特定动作成为可能，并且可以在命令中处理异步方法和状态变化。

而在 Prism 中，`DelegateCommand` 是一个常用的实现 `ICommand` 接口的类，它可以接受一个 `Action` 或 `Func` 作为参数，从而实现命令的绑定。[[04-知识仓库/知识单元/01-问题记录/WPF 开发问题总结/使用 ICommand 绑定函数\|使用 ICommand 绑定函数]] 中介绍了在原生 WPF 中使用 `ICommand` 的方法，而本文将详细介绍在 Prism 中使用 `DelegateCommand` 的方法。

### DelegateCommand

`DelegateCommand` 在 Prism 中用于实现 `ICommand` 接口，使得在 ViewModel 中定义和管理命令变得简便。它允许将命令逻辑和执行状态从视图中分离出来，并在 ViewModel 中处理。

- **定义命令逻辑**：在 ViewModel 中定义具体的执行方法。
- **管理命令状态**：通过 `CanExecute` 方法控制命令是否可执行。
- **简化绑定**：将命令直接绑定到 UI 元素。

#### 使用方法

1. **创建命令**：在 ViewModel 中实例化 `DelegateCommand`。
2. **绑定到 UI**：在 XAML 中将命令绑定到按钮或其他可执行控件。

```csharp
public class MyViewModel
{
    public DelegateCommand MyCommand { get; private set; }
    public MyViewModel()
    {
        MyCommand = new DelegateCommand(Execute, CanExecute);
    }
    private void Execute()
    {
        // 执行逻辑
    }
    private bool CanExecute()
    {
        // 判断是否可执行
        return true;
    }
}
```

```xml
<Button Command="{Binding MyCommand}" Content="Click Me" />
```

其他使用方法与 [[04-知识仓库/知识单元/01-问题记录/WPF 开发问题总结/使用 ICommand 绑定函数\|使用 ICommand 绑定函数]] 中介绍的一致。
