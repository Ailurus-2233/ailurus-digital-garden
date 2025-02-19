---
{"title":"C-FIND","note_type":"knowledge_base","description":"使用 fo-dicom 进行 C-FIND 请求查询数据","tags":["医学软件开发","dicom","fo-dicom","pacs"],"create_time":"2024-07-15","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Pacs 信息查询","permalink":"/04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-FIND/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-15","updated":"2025-02-19"}
---


## 创建请求

fo-dicom 有快速创建查询的方式，也有完全自定义查询的方式

- Patient Root Query/Retrieve Information Model - FIND，这种查询模式用于根据病人信息进行查询，适用于查找与特定病人相关的所有影像和信息。

```csharp
var request = DicomCFindRequest.CreatePatientQuery(patientId, patientName);
```

可以不传递参数查找所有的病人信息，他返回的 Dataset 包含的 Tag 有 `PatientID`、`PatientName`、`IssuerOfPatientID`、`PatientSex`、`PatientBirthDate`

 - Study Root Query/Retrieve Information Model - FIND，这种查询模式用于根据检查信息进行查询，适用于查找特定检查相关的所有影像和信息。

```csharp
var request = DicomCFindRequest.CreateStudyQuery(patientId, patientName, studyDateTime, accession, studyId, modalitiesInStudy, studyInstanceUid);
```

- Series Root Query/Retrieve Information Model - FIND 这种查询模式用于根据序列信息进行查询，适用于查找特定序列相关的所有影像和信息。

```csharp
var request = DicomCFindRequest.CreateSeriesQuery(); 
```

- 自定义查询，上述的查询方法会自动生成查询 Tag，但是一般情况下需要自定义查询哪些数据，所以需要自定义查询

```csharp
var request = new DicomCFindRequest(DicomQueryRetrieveLevel.Study);
```

上面这行代码创建了一个 Study 的查询，可以的类型有 Patient，Study，Series，Image，Worklist，其中 Worklist 已经被弃用。

```csharp
request.Dataset.Add(DicomTag.StudyInstanceUID, query.StudyInstanceUID);  
request.Dataset.Add(DicomTag.StudyID, query.StudyID);  
request.Dataset.Add(DicomTag.StudyDate, query.StudyDate);  
request.Dataset.Add(DicomTag.StudyTime, query.StudyTime);  
request.Dataset.Add(DicomTag.AccessionNumber, query.AccessionNumber);  
request.Dataset.Add(DicomTag.StudyDescription, query.StudyDescription);  
request.Dataset.Add(DicomTag.PatientID, query.PatientID);  
request.Dataset.Add(DicomTag.PatientName, query.PatientName);  
request.Dataset.Add(DicomTag.PatientSex, string.Empty);
```

可以看到，fo-dicom 把特定的 tag 给包装到了 DicomTag 这个对象中，我们可以更直接的获取我们想要获取的具体数据，这里不再细说加了那些 Tag。

## 处理请求

与 Pasc 的通信过程中，会不断接受到 Pacs 服务的相应，fo-dicom 增加了处理这些相应的事件

```csharp
request.OnResponseReceived += (req, response) => {  
    if (response.Dataset == null) return;  
    result.Add(new PacsStudyInfo(response.Dataset) {  
        Node = node  
    });
};
```

这是我实际开发的一段代码，当接收到 Pacs 的响应时，检测相应中是否有数据，如果有则将其存储到 `result` 列表中。

## 发送请求

```csharp
var client = new DicomClient(pacs_ip, pacs_port, false, local_AET, remote_AET);
client.AddRequestSync(request).Wait();
client.SendSync().Wait();
```

需要使用 [[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/DicomClient\|DicomClient]] 来指定一次请求的本地名称（CallingAET）,以及远端的 Pasc 服务器的配置。
