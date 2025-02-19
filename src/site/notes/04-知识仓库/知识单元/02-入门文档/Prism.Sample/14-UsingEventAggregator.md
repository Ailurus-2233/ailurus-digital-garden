---
{"dg-publish":true,"permalink":"/04//02/prism-sample/14-using-event-aggregator/","title":"14-UsingEventAggregator","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

**MessageSentEvent.cs**

```csharp
public class MessageSentEvent : PubSubEvent<string> { }
```

**发布事件：**

```csharp
_eventAggregator.GetEvent<MessageSentEvent>().Publish("Hello from MainViewModel");
```

**订阅事件：**

```csharp
_eventAggregator.GetEvent<MessageSentEvent>().Subscribe(MessageReceived);
```

**事件处理方法：**

```csharp
private void MessageReceived(string message)
{
    Message = message;
}
```

注意事件的参数是一个 String 类型，所以发布事件时需要传入一个 String 类型的参数，订阅事件时也需要定义一个 String 类型参数的方法来处理事件。

如果事件参数是一个自定义的类，那么发布事件时需要传入一个自定义类的实例，订阅事件时也需要定义一个处理自定义类实例的方法来处理事件，这样子可以用来处理多参数的情况。
