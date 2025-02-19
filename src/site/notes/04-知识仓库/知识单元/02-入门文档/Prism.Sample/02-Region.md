---
{"title":"02-Region","note_type":"knowledge_base","description":"Region 的声明与使用","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-24","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/02-Region/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-24","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**定义一个 Region：**

```xml
xmlns:prism="http://prismlibrary.com/"
<ContentControl prism:RegionManager.RegionName="ContentRegion" />
```

在任意控件中通过附加属性 `RegionManager.RegionName` 给指定 `ContentControl` 添加一个 RegionName，用于后端绑定特定的控件。
