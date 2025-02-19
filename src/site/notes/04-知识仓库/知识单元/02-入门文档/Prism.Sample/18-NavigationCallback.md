---
{"dg-publish":true,"permalink":"/04//02/prism-sample/18-navigation-callback/","title":"18-NavigationCallback","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
_regionManager.RequestNavigate("ContentRegion", navigatePath, NavigationComplete);
```

其中增加了一个参数 `NavigationComplete`，这是一个回调方法，用于在导航完成后执行一些操作。

```csharp
private void NavigationComplete(NavigationResult result)
{
    System.Windows.MessageBox.Show(String.Format("Navigation to {0} complete. ", result.Context.Uri));
}
```
