---
{"title":"28-UsingCustomWindow","note_type":"knowledge_base","description":"使用其他窗口作为弹出窗口","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/28-UsingCustomWindow/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**使用自定义窗口显示 Dialog：**

```csharp
containerRegistry.RegisterDialogWindow<MyCustomWindow>();
containerRegistry.RegisterDialog<NotificationDialog, NotificationDialogViewModel>();
```

这段代码应该写在 Bootstrapper 类的 ConfigureContainer 方法中。且 MyCustomWindow 必须继承自 IDialogWindow 接口。
