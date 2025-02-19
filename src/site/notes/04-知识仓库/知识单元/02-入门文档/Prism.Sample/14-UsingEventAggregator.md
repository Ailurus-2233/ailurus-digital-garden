---
{"title":"14-UsingEventAggregator","note_type":"knowledge_base","description":"事件聚合器的使用方法","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/14-UsingEventAggregator/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
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
