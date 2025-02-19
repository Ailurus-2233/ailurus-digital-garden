---
{"dg-publish":true,"permalink":"/04//02/prism-sample/15-filtering-events/","title":"15-FilteringEvents","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

基于 [[04-知识仓库/知识单元/02-入门文档/Prism.Sample/14-UsingEventAggregator\|14-UsingEventAggregator]] 中代码，在订阅事件时，增加一些参数可以对事件进行过滤，来决定是否执行事件处理函数。

```csharp
_ea.GetEvent<MessageSentEvent>().Subscribe(MessageReceived, ThreadOption.PublisherThread, false, (filter) => filter.Contains("Brian"));
```

在这个例子中，我们只有在事件携带的参数包含 "Brian" 时才会执行事件处理函数。
