---
{"title":"08-ViewModelLocator","note_type":"knowledge_base","description":"为 View 快速绑定对应的 ViewModel","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-25","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/08-ViewModelLocator/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-25","updated":"2025-02-19"}
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
