---
{"dg-publish":true,"permalink":"/04//01/linux/terminals-database-is-inaccessible/","title":"terminals database is inaccessible","tags":["conda","Linux"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/Linux 问题整理\|Linux 问题整理]]

可能是由 `conda` 环境引起的，增加环境变量即可

```
TERMINFO=/usr/share/terminfo
```
