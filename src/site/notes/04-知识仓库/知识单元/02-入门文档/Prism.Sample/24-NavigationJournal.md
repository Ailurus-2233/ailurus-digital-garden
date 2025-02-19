---
{"title":"24-NavigationJournal","note_type":"knowledge_base","description":"跳转日志的记录","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/24-NavigationJournal/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

可以通过 `IRegionNavigationJournal` 记录跳转的日志，这个实例可以通过 `NavigationContext.NavigationService` 获取。

```csharp
IRegionNavigationJournal _journal = navigationContext.NavigationService.Journal;
```

```csharp
_journal.GoBack();         // 后退
_journal.GoForward();      // 前进
_journal.CanGoBack();      // 是否可以后退，返回 bool 值
_journal.CanGoForward();   // 是否可以前进，返回 bool 值
```
