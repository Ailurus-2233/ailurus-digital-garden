---
{"dg-publish":true,"permalink":"/04//02/prism-sample/23-region-member-lifetime/","title":"23-RegionMemberLifetime","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

需要实现接口 `IRegionMemberLifetime`，其中有 `KeepAlive` 属性，默认是 true，是会保持这个 View 在 Region 的 Views 列表中保存，如果为 false，则在跳转后就删除。
