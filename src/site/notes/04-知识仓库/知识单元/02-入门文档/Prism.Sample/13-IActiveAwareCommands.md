---
{"dg-publish":true,"permalink":"/04//02/prism-sample/13-i-active-aware-commands/","title":"13-IActiveAwareCommands","tags":["样例代码","Prism","WPF"]}
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
