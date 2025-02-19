---
{"dg-publish":true,"permalink":"/04//02/prism-sample/08-view-model-locator/","title":"08-ViewModelLocator","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

### 自动加载 ViewModel

**XXXView.xaml：**

```xml
prism:ViewModelLocator.AutoWireViewModel="True"
```

在 View 的 xaml 中添加上面的属性，可以自动加载 ViewModel, 无需手动指定。

**XXXViewMode.cs：**

```csharp
public class XXXViewModel : BindableBase
{
    public XXXViewModel()
    {
    }
}
```

继承 `BindableBase` 类，实现 ViewModel，其中 `BindableBase` 是 Prism 提供的一个实现了 `INotifyPropertyChanged` 接口的基类。

### 手动加载 ViewModel

**XXXView.xaml.cs：**

```csharp
public XXXView()
{
    InitializeComponent();
    this.DataContext = new XXXViewModel();
}
```
