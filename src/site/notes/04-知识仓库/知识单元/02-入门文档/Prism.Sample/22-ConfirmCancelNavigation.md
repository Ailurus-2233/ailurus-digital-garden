---
{"title":"22-ConfirmCancelNavigation","note_type":"knowledge_base","description":"确认是否跳转","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/22-ConfirmCancelNavigation/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
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
