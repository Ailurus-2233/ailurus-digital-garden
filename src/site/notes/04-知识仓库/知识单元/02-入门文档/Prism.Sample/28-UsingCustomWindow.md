---
{"dg-publish":true,"permalink":"/04//02/prism-sample/28-using-custom-window/","title":"28-UsingCustomWindow","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**使用自定义窗口显示 Dialog：**

```csharp
containerRegistry.RegisterDialogWindow<MyCustomWindow>();
containerRegistry.RegisterDialog<NotificationDialog, NotificationDialogViewModel>();
```

这段代码应该写在 Bootstrapper 类的 ConfigureContainer 方法中。且 MyCustomWindow 必须继承自 IDialogWindow 接口。
