---
{"title":"19-NavigationParticipation","note_type":"knowledge_base","description":"使 ViewModel 响应跳转事件","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/19-NavigationParticipation/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
public class XXXViewModel : BindableBase, INavigationAware {}
```

首先需要实现接口 `INavigationAware`, 其中包含方法 `OnNavigatedTo(NavigationContext)`，`OnNavigatedFrom(NavigationContext)`。通过实现方法来在跳转时执行一些逻辑。

1. `OnNavigatedTo(NavigationContext)`：当导航到此视图时调用。
2. `OnNavigatedFrom(NavigationContext)`：当从此视图导航时调用。

```csharp
public void OnNavigatedTo(NavigationContext navigationContext)
{
    // Do something
}

public void OnNavigatedFrom(NavigationContext navigationContext)
{
    // Do something
}
```
