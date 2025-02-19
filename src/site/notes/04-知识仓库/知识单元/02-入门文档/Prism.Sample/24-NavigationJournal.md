---
{"dg-publish":true,"permalink":"/04//02/prism-sample/24-navigation-journal/","title":"24-NavigationJournal","tags":["样例代码","Prism","WPF"]}
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
