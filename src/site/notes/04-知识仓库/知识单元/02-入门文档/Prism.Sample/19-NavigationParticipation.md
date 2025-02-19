---
{"dg-publish":true,"permalink":"/04//02/prism-sample/19-navigation-participation/","title":"19-NavigationParticipation","tags":["样例代码","Prism","WPF"]}
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
