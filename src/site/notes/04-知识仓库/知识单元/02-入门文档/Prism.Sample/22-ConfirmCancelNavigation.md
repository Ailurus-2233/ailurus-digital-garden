---
{"dg-publish":true,"permalink":"/04//02/prism-sample/22-confirm-cancel-navigation/","title":"22-ConfirmCancelNavigation","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

修改 ViewModel 实现 `IConfirmNavigationRequest` 接口，其中包含 `ConfirmNavigationRequest` 的方法，用来提示用户是否跳转。

```csharp
public void ConfirmNavigationRequest(NavigationContext navigationContext, Action<bool> continuationCallback)  
{  
    var result = MessageBox.Show("Do you to navigate?", "Navigate?", MessageBoxButton.YesNo) != MessageBoxResult.No;  
    continuationCallback(result);  
}
```
