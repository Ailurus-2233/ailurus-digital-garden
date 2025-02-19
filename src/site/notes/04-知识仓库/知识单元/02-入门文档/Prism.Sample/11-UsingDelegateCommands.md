---
{"dg-publish":true,"permalink":"/04//02/prism-sample/11-using-delegate-commands/","title":"11-UsingDelegateCommands","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]  

**XXXView.xaml:**

```xml
<Button Command="{Binding MyCommand}" />
```

**XXXViewModel.cs:**

```csharp
public class XXXViewModel : BindableBase
{
    public DelegateCommand MyCommand { get; private set; }
    public XXXViewModel()
    {
        MyCommand = new DelegateCommand(Execute, CanExecute);
    }

    private void Execute()
    {
        // Do something
    }

    private bool CanExecute()
    {
        return true;
    }
}
```

在 ViewModel 中定义一个 `DelegateCommand` 类型的属性，通过构造函数传入 `Execute` 和 `CanExecute` 函数，然后在 View 中绑定这个属性到 `Button` 的 `Command` 属性上，这样就可以快速绑定函数到 `Button` 上。

**带参数的 DelegateCommand：**

```xml
<Button Command="{Binding MyCommand}" CommandParameter="Hello" />
```

```csharp
public class XXXViewModel : BindableBase
{
    public DelegateCommand<string> MyCommand { get; private set; }
    public XXXViewModel()
    {
        MyCommand = new DelegateCommand<string>(Execute, CanExecute);
    }

    private void Execute(string parameter)
    {
        // Do something
    }

    private bool CanExecute(string parameter)
    {
        return true;
    }
}
```

在 `DelegateCommand` 的泛型参数中指定参数类型，然后在 `Execute` 和 `CanExecute` 函数中添加参数即可。
