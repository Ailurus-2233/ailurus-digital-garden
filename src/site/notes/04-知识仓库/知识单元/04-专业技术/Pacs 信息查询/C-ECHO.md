---
{"title":"C-ECHO","note_type":"knowledge_base","description":"使用 fo-dicom 尝试与 Pacs 数据库通信","tags":["医学软件开发","dicom","fo-dicom","pacs"],"create_time":"2024-07-15","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":["连接 Pacs"],"root":"Pacs 信息查询","permalink":"/04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-ECHO/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-15","updated":"2025-02-19"}
---


## 示例代码

```csharp
var client = new DicomClient(ip, port, false, aet, aec);
var result = false;
try {
	var request = new DicomCEchoRequest();
	request.OnResponseReceived += (req, response) => {  
	    result = response.Status == DicomStatus.Success;  
	};
	await client.AddRequestAsync(request);
	await client.SendAsync();
	return result;
} catch {
	return false;
}
```

## 代码说明

创建了一个 [[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/DicomClient\|DicomClient]] 指定 Pacs 服务期的地址，然后使用 `DicomCEchoRequest` 来发送 C-ECHO 通信，通过追加 `OnResponseReceived` 事件，在接受到相应后进行对应的处理。但是增加请求和发送请求都是异步函数，如果想要等待异步任务的完成可以使用 `await` 关键字，或者使用 `Wait()` 方法
