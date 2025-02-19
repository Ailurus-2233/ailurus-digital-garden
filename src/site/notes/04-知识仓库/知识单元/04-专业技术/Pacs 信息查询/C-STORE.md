---
{"title":"C-STORE","note_type":"knowledge_base","description":"使用 fo-dicom 进行 C-Store SCU/SCP 操作","tags":["医学软件开发","dicom","fo-dicom","pacs"],"create_time":"2024-07-15","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Pacs 信息查询","permalink":"/04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/C-STORE/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-15","updated":"2025-02-19"}
---


## scu 与 scp

### Service Class User（SCU）

是发起图像存储请求的实体，通常在成像设备（例如 CT 扫描仪或 MRI 机器）或图像发送应用中充当 SCU。它们生成或处理图像，并将图像数据发送到 PACS（Picture Archiving and Communication System）或其他存储系统。

### Service Class Provider（SCP）

是接收和存储图像数据的实体，通常在 PACS 系统或其他存储服务器中充当 SCP。它们接收来自成像设备或图像发送应用的图像数据，并进行存档或管理。

> 在下载的过程中，SCU 是 Pacs 服务，SCP 的我们需要通过 fo-dicom 构建的本地接收器  
> 在上传的过程中，SCU 是 我们通过 fo-dicom 构建的服务，SCP 则是 Pacs 服务

## 上传请求 SCU

### 构建请求

```csharp
var request = new DicomCStoreRequest(dicomFilePath);
```

构建一个 CStore 请求，其中 dicomFilePath 是上传文件的路径。

### 设置响应

```csharp
request.OnCStoreRequestResponseReceived += (req, resp) => {
	Console.WriteLine($"C-STORE response received, Status: {response.Status}");
}
```

这里简单输出了响应的状态。

### 发送请求

```csharp
var client = new DicomClient(pacs_ip, pacs_port, false, local_AET, remote_AET);
client.AddRequestSync(request).Wait();
client.SendSync().Wait();
```

需要使用 [[04-知识仓库/知识单元/04-专业技术/Pacs 信息查询/DicomClient\|DicomClient]] 来指定一次请求的本地名称（CallingAET）,以及远端的 Pasc 服务器的配置。

## 下载请求 SCP

### 启动服务

```csharp
var server = DicomServer.Create<PacsCStoreSCP>(port: 104) // 启动服务，在104端口上
server.Dispose(); // 关闭服务
```

我们可以通过以上代码类创建一个 SCP 服务，但实际上 PacsCStoreSCP fo-dicom 是没有实现的，它实际上是一个实现了 `DicomService`, `IDicomServiceProvider` 这两个接口的一个具体类，但只实现这两个接口还不够，因为他只是构建了一个 DicomService，并没有 SCP 相关的功能，所以还需要实现 `IDicomCStoreProvider` 这个接口

### PacsCStoreSCP 实现

```csharp
public class PacsCStoreSCP : DicomService, IDicomServiceProvider, IDicomCStoreProvider {

        private static readonly string StoragePath = @".\Dicom";


        public PacsCStoreSCP(INetworkStream stream, Encoding fallbackEncoding, Logger log)
            : base(stream, fallbackEncoding, log) {
        }

        public void OnReceiveAssociationRequest(DicomAssociation association) {
            foreach (var context in association.PresentationContexts) {
                if (context.AbstractSyntax == DicomUID.Verification || context.AbstractSyntax.StorageCategory != DicomStorageCategory.None) {
                    context.AcceptTransferSyntaxes(AcceptedTransferSyntaxes);
                }
                else {
					context.SetResult(DicomPresentationContextResult.RejectAbstractSyntaxNotSupported);
                }
            }
        }

        public void OnReceiveAssociationReleaseRequest() {
        }

        public void OnReceiveAbort(DicomAbortSource source, DicomAbortReason reason) {
            Console.WriteLine($@"Received abort from {source}, reason {reason}");
        }

        public void OnConnectionClosed(Exception exception) {
            Console.WriteLine(@"Connection closed");
        }

        public DicomCStoreResponse OnCStoreRequest(DicomCStoreRequest request) {
            // Save the DICOM file
            var dicomFile = request.File;
            var savePath = $"{StoragePath}/{dicomFile.FileMetaInfo.MediaStorageSOPInstanceUID.UID}.dcm";

            // Create Path
            Directory.CreateDirectory(Path.GetDirectoryName(savePath) ?? string.Empty);
            dicomFile.Save(savePath);

            return new DicomCStoreResponse(request, DicomStatus.Success);
        }

        public Task<DicomCStoreResponse> OnCStoreRequestAsync(DicomCStoreRequest request) {
            return Task.FromResult(OnCStoreRequest(request));
        }
        public Task OnCStoreRequestExceptionAsync(string tempFileName, Exception e) {
            throw new NotImplementedException();
        }

        public void OnCStoreRequestException(string tempFileName, Exception e) {
            Console.WriteLine($@"Error saving DICOM file: {e.Message}");
        }

        private static readonly DicomTransferSyntax[] AcceptedTransferSyntaxes = {
            DicomTransferSyntax.ExplicitVRLittleEndian,
            DicomTransferSyntax.ExplicitVRBigEndian,
            DicomTransferSyntax.ImplicitVRLittleEndian
        };

        private static readonly DicomTransferSyntax[] AcceptedImageTransferSyntaxes = {
            // Lossless
            DicomTransferSyntax.JPEGLSLossless,
            DicomTransferSyntax.JPEG2000Lossless,
            DicomTransferSyntax.JPEGProcess14SV1,
            DicomTransferSyntax.JPEGProcess14,
            DicomTransferSyntax.RLELossless,
            // Lossy
            DicomTransferSyntax.JPEGLSNearLossless,
            DicomTransferSyntax.JPEG2000Lossy,
            DicomTransferSyntax.JPEGProcess1,
            DicomTransferSyntax.JPEGProcess2_4,
            // Uncompressed
            DicomTransferSyntax.ExplicitVRLittleEndian,
            DicomTransferSyntax.ExplicitVRBigEndian,
            DicomTransferSyntax.ImplicitVRLittleEndian
        };

        public Task OnReceiveAssociationRequestAsync(DicomAssociation association) {
            foreach (var pc in association.PresentationContexts) {
                if (pc.AbstractSyntax == DicomUID.Verification) {
                    pc.AcceptTransferSyntaxes(AcceptedTransferSyntaxes);
                }
                else if (pc.AbstractSyntax.StorageCategory != DicomStorageCategory.None) {
                    pc.AcceptTransferSyntaxes(AcceptedImageTransferSyntaxes);
                }
            }
            return SendAssociationAcceptAsync(association);
        }
        
        public Task OnReceiveAssociationReleaseRequestAsync() {
            return SendAssociationReleaseResponseAsync();
        }
    }
```

这里参考了官方样例的 SCP 服务实现，重点关注实现一些 OnXXXX 的方法，这些都是在处理一些请求的相关方法

- `OnReceiveAbort`：
