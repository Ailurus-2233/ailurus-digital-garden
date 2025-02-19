---
{"title":"04-ViewDiscovery","note_type":"knowledge_base","description":"注册 View 到指定名称的 Region","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-24","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/04-ViewDiscovery/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-24","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
regionManager.RegisterViewWithRegion("ContentRegion", typeof(ViewA));
```

`regionManager` 是从 `IoC` 容器取得的实现了 `IRegionManager` 接口的类型对象，`ViewA` 是一个任意自定义控件。
