---
{"dg-publish":true,"permalink":"/04//02/prism-sample/09-change-convention/","title":"09-ChangeConvention","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

### 配置自动绑定

**Bootstrapper.cs：**

```csharp
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();
    ViewModelLocationProvider.SetDefaultViewTypeToViewModelTypeResolver((viewType) =>
    {
        var viewName = viewType.FullName;
        var viewAssemblyName = viewType.GetTypeInfo().Assembly.FullName;
        var viewModelName = $"{viewName}Model, {viewAssemblyName}";
        return Type.GetType(viewModelName);
    });
}
```

在 `Bootstrapper` 类中重写 `ConfigureViewModelLocator` 方法，配置默认的 ViewModel 与 View 的绑定关系。这段代码里需要 View 和 ViewModel 在同一个命名控件中，且 ViewModel 的命名规范为 `ViewNameViewModel`。
