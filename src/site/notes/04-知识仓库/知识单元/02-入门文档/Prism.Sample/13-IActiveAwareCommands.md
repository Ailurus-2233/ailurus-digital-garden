---
{"title":"13-IActiveAwareCommands","note_type":"knowledge_base","description":"子命令都处于活动状态时才被执行","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/13-IActiveAwareCommands/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```csharp
var compositeCommand = new CompositeCommand(true);
```

`CompositeCommand` 的构造函数可以传入一个 `bool` 类型的参数，表示是否需要所有子命令都处于活动状态时才被执行。默认值为 `false`，表示只要有一个子命令处于活动状态，就会被执行。

```csharp
compositeCommand.RegisterCommand(subCommand1);
compositeCommand.RegisterCommand(subCommand2);

subCommand1.IsActive = true;
subCommand2.IsActive = false;

compositeCommand.Execute(); // subCommand1 will be executed
```
