---
{"title":"23-RegionMemberLifetime","note_type":"knowledge_base","description":"区域成员的持续保存的方法","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/23-RegionMemberLifetime/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

需要实现接口 `IRegionMemberLifetime`，其中有 `KeepAlive` 属性，默认是 true，是会保持这个 View 在 Region 的 Views 列表中保存，如果为 false，则在跳转后就删除。
