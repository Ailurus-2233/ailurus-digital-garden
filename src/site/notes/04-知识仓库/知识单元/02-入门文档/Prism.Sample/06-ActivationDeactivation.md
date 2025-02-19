---
{"title":"06-ActivationDeactivation","note_type":"knowledge_base","description":"对在 Region 中的 View 进行激活","tags":[],"create_time":"2024-07-24","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/06-ActivationDeactivation/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-24","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

在 [[04-知识仓库/知识单元/02-入门文档/Prism.Sample/05-ViewInjection\|05-ViewInjection]] 会注意到，Rigion 是可以通过 Add 添加 View 的，那么一个 Region 如果有多个 View 那么应该具体显示哪一个呢，就需要对区域中的 View 进行激活

**添加 View 到 Region：**

```csharp
_viewA = _container.Resolve<ViewA>();
_viewB = _container.Resolve<ViewB>();

_region = _regionManager.Regions["ContentRegion"];

_region.Add(_viewA);
_region.Add(_viewB);
```

**激活 View 与反激活 View：**

```csharp
_region.Activate(_viewA);
_region.Deactivate(_viewA);
```
