---
{"title":"18-NavigationCallback","note_type":"knowledge_base","description":"导航回调方法","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/18-NavigationCallback/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
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
