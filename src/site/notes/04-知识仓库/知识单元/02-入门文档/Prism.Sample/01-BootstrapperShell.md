---
{"dg-publish":true,"permalink":"/04//02/prism-sample/01-bootstrapper-shell/","title":"01-BootstrapperShell","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

在通过 nuget 安装 Prism 后需要对程序进行修改：

1. 添加 Bootstrapper 类
2. 修改 App.xaml / App.xaml.cs

**Bootstrapper.cs 代码：**

```csharp
public class Bootstrapper : PrismBootstrapper  
{  
    protected override DependencyObject CreateShell()  
    {  
        return Container.Resolve<MainWindow>();  
    }  
  
    protected override void RegisterTypes(IContainerRegistry containerRegistry)  
    {  
    }  
}
```

这里重写了两个方法，`CreateShell` 用来返回启动的页面，`RegisterTypes` 用来进行 `IoC` 容器内容的注册

**App.xaml** 需要删除 `StartupUri="MainWindow.xaml"` 这部分，用来阻止原 WPF 启动流程

**App.xaml.cs 增加代码：** 在启动时调用 Bootstrapper

```csharp
protected override void OnStartup(StartupEventArgs e)  
{  
    base.OnStartup(e);  
  
    var bootstrapper = new Bootstrapper();  
    bootstrapper.Run();  
}
```
