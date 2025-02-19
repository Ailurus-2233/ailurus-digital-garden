---
{"dg-publish":true,"permalink":"/04//02/prism-sample/10-custom-registrations/","title":"10-CustomRegistrations","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**Bootstrapper.cs：**

```csharp
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();
    // type / type
    ViewModelLocationProvider.Register(typeof(MainWindow).ToString(), typeof(CustomViewModel));
    // type / factory
    ViewModelLocationProvider.Register(typeof(MainWindow).ToString(), () => Container.Resolve<CustomViewModel>());
    // generic factory
    ViewModelLocationProvider.Register<MainWindow>(() => Container.Resolve<CustomViewModel>());
    // generic type
    ViewModelLocationProvider.Register<MainWindow, CustomViewModel>();
}
```

在 `Bootstrapper` 类中重写 `ConfigureViewModelLocator` 方法，配置 View 和 ViewModel 的绑定关系。这里提供了四种方式：

1. 通过类型注册，直接指定 View 和 ViewModel 的类型。
2. 通过工厂注册，指定 View 和 ViewModel 的类型，通过工厂方法创建 ViewModel，这里使用了 IoC 容器，来保证使用的 ViewModel 是同一个实例。
3. 通过泛型工厂注册，直接指定 View 的类型，通过工厂方法创建 ViewModel。
4. 通过泛型类型注册，直接指定 View 和 ViewModel 的类型。
