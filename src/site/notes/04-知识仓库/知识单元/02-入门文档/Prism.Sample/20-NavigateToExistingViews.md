---
{"dg-publish":true,"permalink":"/04//02/prism-sample/20-navigate-to-existing-views/","title":"20-NavigateToExistingViews","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

在 [[04-知识仓库/知识单元/02-入门文档/Prism.Sample/19-NavigationParticipation\|19-NavigationParticipation]] 实现了 `INavigationAware` 接口后，可以通过实现 `IsNavigationTarget(NavigationContext)` 方法来控制是否可以跳转到已有的 View 实例。

- `IsNavigationTarget(NavigationContext)` 方法：当导航到此视图时调用，返回 `true` 表示可以导航到此视图，返回 `false` 表示不可以导航到此视图，会创建一个新的实例。

```csharp
public bool IsNavigationTarget(NavigationContext navigationContext)
{
    return true; // allow navigation to this view
    return false; // prevent navigation to this view, will create a new instance
}
```
