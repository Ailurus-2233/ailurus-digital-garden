---
{"dg-publish":true,"permalink":"/04//02/prism-sample/04-view-discovery/","title":"04-ViewDiscovery","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
regionManager.RegisterViewWithRegion("ContentRegion", typeof(ViewA));
```

`regionManager` 是从 `IoC` 容器取得的实现了 `IRegionManager` 接口的类型对象，`ViewA` 是一个任意自定义控件。
