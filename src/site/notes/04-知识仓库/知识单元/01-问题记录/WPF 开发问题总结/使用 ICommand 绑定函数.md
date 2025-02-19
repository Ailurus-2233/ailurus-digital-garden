---
{"dg-publish":true,"permalink":"/04//01/wpf/i-command/","title":"使用 ICommand 绑定函数","tags":["WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/WPF 开发问题总结\|WPF 开发问题总结]]

在 WPF（Windows Presentation Foundation）中，`ICommand` 接口用于处理用户交互中的命令逻辑。它通常与按钮和其他控件的命令绑定一起使用，以响应用户的操作。`ICommand` 接口有三个成员：

1. `Execute`：执行命令的方法。
2. `CanExecute`：指示命令是否可以执行的方法。
3. `CanExecuteChanged`：当命令的可执行状态改变时发生的事件。

为了使用 `ICommand` 接口，你通常需要创建一个实现了这个接口的类，并将其与你的视图模型（ViewModel）一起使用。最常见的实现是通过 `RelayCommand` 或 `DelegateCommand` 类。以下是一个简单的示例：

**创建 RelayCommand 类**

```csharp
using System;
using System.Windows.Input;

public class RelayCommand : ICommand
{
    private readonly Action<object> _execute;
    private readonly Func<object, bool> _canExecute;

    public event EventHandler CanExecuteChanged
    {
        add { CommandManager.RequerySuggested += value; }
        remove { CommandManager.RequerySuggested -= value; }
    }

    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        _execute = execute ?? throw new ArgumentNullException(nameof(execute));
        _canExecute = canExecute;
    }

    public bool CanExecute(object parameter)
    {
        return _canExecute == null || _canExecute(parameter);
    }

    public void Execute(object parameter)
    {
        _execute(parameter);
    }
}
```

**在 ViewModel 中使用 RelayCommand**

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

public class MyViewModel : INotifyPropertyChanged
{
    private string _text;
    public string Text
    {
        get { return _text; }
        set
        {
            _text = value;
            OnPropertyChanged();
        }
    }

    public ICommand MyCommand { get; }

    public MyViewModel()
    {
        MyCommand = new RelayCommand(ExecuteCommand, CanExecuteCommand);
    }

    private void ExecuteCommand(object parameter)
    {
        Text = "Button Clicked";
    }

    private bool CanExecuteCommand(object parameter)
    {
        return true; // 可以根据实际情况决定命令是否可以执行
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

**在 XAML 中绑定命令**

```xml
<StackPanel>
    <Button Content="Click Me" Command="{Binding MyCommand}" />
    <TextBlock Text="{Binding Text}" />
</StackPanel>
```

在这个示例中：

1. `RelayCommand` 类实现了 `ICommand` 接口，封装了命令逻辑。
2. `MyViewModel` 类包含一个 `RelayCommand` 实例，并将其绑定到按钮的 `Command` 属性。
3. 在 XAML 中，按钮的 `Command` 属性绑定到视图模型中的 `MyCommand`，当按钮被点击时，会调用 `ExecuteCommand` 方法。

**Command 和事件绑定**

```xml
xmlns:i="http://schemas.microsoft.com/expression/2010/interactivity" xmlns:ei="http://schemas.microsoft.com/expression/2010/interactions"
<Grid>
    <DataGrid x:Name="dataGrid" AutoGenerateColumns="False" ItemsSource="{Binding Items}">
        <i:Interaction.Triggers>
            <i:EventTrigger EventName="SelectionChanged">
                <ei:InvokeCommandAction Command="{Binding SelectionChangedCommand}" CommandParameter="{Binding SelectedItem, ElementName=dataGrid}" />
            </i:EventTrigger>
        </i:Interaction.Triggers>
        <DataGrid.Columns>
            <DataGridTextColumn Header="Item" Binding="{Binding}" />
        </DataGrid.Columns>
    </DataGrid>
    <TextBlock Text="{Binding SelectedItem}" VerticalAlignment="Bottom" HorizontalAlignment="Center"/>
</Grid>
```

- 在 XAML 中，`DataGrid` 的 `SelectionChanged` 事件绑定到了 `SelectionChangedCommand` 命令。
- `InvokeCommandAction` 的 `CommandParameter` 绑定到 `DataGrid` 的 `SelectedItem` 属性，传递选中的项。
