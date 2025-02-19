---
{"title":"terminals database is inaccessible","note_type":"knowledge_base","description":"终端报错 terminals database is inaccessible 的解决方案","tags":["conda","Linux"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Linux 问题整理","permalink":"/04-知识仓库/知识单元/01-问题记录/Linux 问题整理/terminals database is inaccessible/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/Linux 问题整理\|Linux 问题整理]]

可能是由 `conda` 环境引起的，增加环境变量即可

```
TERMINFO=/usr/share/terminfo
```
