---
{"title":"09-ChangeConvention","note_type":"knowledge_base","description":"配置自动绑定 View 和 ViewModel","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-25","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/09-ChangeConvention/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-25","updated":"2025-02-19"}
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
