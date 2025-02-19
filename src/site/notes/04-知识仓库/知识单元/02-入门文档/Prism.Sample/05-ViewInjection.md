---
{"title":"05-ViewInjection","note_type":"knowledge_base","description":"动态的调整Region中注册的View","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-24","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/05-ViewInjection/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-24","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
private readonly IRegionManager _regionManager;  
private readonly IContainerExtension _container;  
  
public MainWindow(IRegionManager regionManager, IContainerExtension container)  
{  
    InitializeComponent();  
    _regionManager = regionManager;  
    _container = container; 
}  
  
private void Button_Click(object sender, RoutedEventArgs e)  
{  
    var view = _container.Resolve<View1>();  
    var region = _regionManager.Regions["ContentRegion"];  
    region.Add(view);  
}
```

这里通过 IoC 容器获取了 View1 并且添加到了一个名为 ContentRegion 的区域中。

区别于 [[04-知识仓库/知识单元/02-入门文档/Prism.Sample/04-ViewDiscovery\|04-ViewDiscovery]] 中的写法，这个更注重于在程序执行时对 Region 中的 View 进行修改。
