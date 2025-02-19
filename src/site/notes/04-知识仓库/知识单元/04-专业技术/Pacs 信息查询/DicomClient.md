---
{"dg-publish":true,"permalink":"/04//04/pacs/dicom-client/","title":"DicomClient","tags":["医学软件开发","dicom","fo-dicom","pacs"]}
---


## DicomClient 说明

在 fo-dicom 中，`DicomClient` 类是用来与 DICOM 服务器进行通信的客户端组件。它提供了一组功能来实现 DICOM 协议中与服务相关的操作，例如查询、检索和存储。

以下是 `DicomClient` 在 fo-dicom 中的一些主要作用：

### 发送 DICOM 请求

`DicomClient` 主要用于发送各种类型的 DICOM 请求，包括 [[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-ECHO\|C-ECHO]]（验证通信）、[[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-FIND\|C-FIND]]（查询）、[[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-MOVE\|C-MOVE]]（检索）、[[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-STORE\|C-STORE]]（存储）等。

### 管理连接

`DicomClient` 负责与 DICOM 服务器建立连接并保持连接的状态。它处理连接的建立、维护和终止。

### 请求队列和批处理

`DicomClient` 可以将多个 DICOM 请求添加到队列中，并以批处理的方式依次发送这些请求。它会按照添加的顺序逐个处理请求，并等待服务器的响应。

### 处理响应

`DicomClient` 负责接收和处理来自 DICOM 服务器的响应。它可以解析响应数据并提供回调机制，使应用程序能够根据响应的结果采取相应的动作。

### 异步操作支持

`DicomClient` 支持异步操作，这使得在进行长时间的 DICOM 操作（例如大批量数据传输）时，客户端应用程序可以保持响应性而不会被阻塞。

## 构建方法

```csharp
var client = new DicomClient(
	host,                              // Pacs 服务地址
	port,                              // Pacs 服务端口
	useTls,                            // 是否使用 TLS 协议
	callingAeTitle,                    // 请求通信的实体名称
	calledAeTitle,                     // 被请求通信的实体名称
	requestTimeout = 5000,             // 建立关联的超时(毫秒)
	releaseTimeout = 10000,            // 中断关联的超时(毫秒) 
	lingerTimeout = 50,                // 在处理完所有请求后保持开放关联的超时（毫秒）
	maximumNumberOfRequests = null     // 可以通过单个 DICOM 关联发送的最大 DICOM 请求数
);
```

## 发送请求

```csharp
client.AddRequestSync(request);
client.SendSync();
```

其中 request 是个一个具体的操作请求，可以是 [[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-ECHO\|C-ECHO]]、[[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-FIND\|C-FIND]] 等

因为是网络操作，所以 fo-dicom 提供了异步的请求方法，我们可以通过 `await` 关键字，或者 `Wait()` 方法等待请求完成。
