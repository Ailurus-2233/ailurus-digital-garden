---
{"dg-publish":true,"permalink":"/04//02/prism-sample/26-using-dialog-service/","title":"26-UsingDialogService","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

构造一个 Dialog 服务，用于显示对话框，需要实现 `IDialogAware` 接口，他同样是一个 ViewModel

### 使用方法

**创建一个 UserControl，用于显示对话框内容**

```xml
<UserControl x:Class="YourNamespace.MyDialog"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:prism="http://prismlibrary.com/"
             prism:ViewModelLocator.AutoWireViewModel="True">
    <Grid>
        <TextBlock Text="This is a dialog"/>
        <Button Content="OK" Command="{Binding CloseDialogCommand}" />
    </Grid>
</UserControl>
```

**创建 ViewModel**

```csharp
public class MyDialogViewModel : BindableBase, IDialogAware
{
    public string Title => "My Dialog";
	public event Action<IDialogResult> RequestClose;
    public DelegateCommand CloseDialogCommand { get; private set; }
    public MyDialogViewModel()
    {
        CloseDialogCommand = new DelegateCommand(CloseDialog);
    }

    private void CloseDialog()
    {
        RaiseRequestClose(new DialogResult(ButtonResult.OK));
    }

    public bool CanCloseDialog() => true;
    public void OnDialogClosed() {  }
	public void OnDialogOpened(IDialogParameters parameters) { }
    protected virtual void RaiseRequestClose(IDialogResult dialogResult)
    {
        RequestClose?.Invoke(dialogResult);
    }
}
```

**注册 Dialog 服务**

```csharp
containerRegistry.RegisterDialog<MyDialog, MyDialogViewModel>();
```

**显示 Dialog**

```csharp
_dialogService.ShowDialog("MyDialog", new DialogParameters(), r =>
{
	if (r.Result == ButtonResult.OK)
	{ }// 处理 OK 按钮点击的逻辑
});
```

### 总结

1. 创建对话框视图和视图模型，并实现 `IDialogAware` 接口。
2. 在应用程序启动时注册对话框。
3. 在需要显示对话框的地方使用 `IDialogService` 来显示对话框。
