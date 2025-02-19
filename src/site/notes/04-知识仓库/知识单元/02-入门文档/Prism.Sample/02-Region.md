---
{"dg-publish":true,"permalink":"/04//02/prism-sample/02-region/","title":"02-Region","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**定义一个 Region：**

```xml
xmlns:prism="http://prismlibrary.com/"
<ContentControl prism:RegionManager.RegionName="ContentRegion" />
```

在任意控件中通过附加属性 `RegionManager.RegionName` 给指定 `ContentControl` 添加一个 RegionName，用于后端绑定特定的控件。
