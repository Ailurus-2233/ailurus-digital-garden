---
{"dg-publish":true,"permalink":"/04//06/sunshine/sunshine/","title":"Sunshine 串流前自动调整分辨率","tags":["串流","Sunshine"]}
---


所属知识库：[[04-知识仓库/归纳目录/06-其他归纳/Sunshine 串流\|Sunshine 串流]]

使用工具 SetResolution: [GitHub - RickStrahl/SetResolution: Quickly set Windows Display Resolution via Command Line](https://github.com/RickStrahl/SetResolution)

ps: 这个仓库很奇怪没有做 Release，而是直接把二进制文件提交的仓库中，下载路径是 [SetResolution/Binaries/SetResolution.exe at master · RickStrahl/SetResolution · GitHub](https://github.com/RickStrahl/SetResolution/blob/master/Binaries/SetResolution.exe)

**切换指令：**

```powershell
.\SetResolution.exe CREATEPROFILE -p "My Profile" -w 1920 -h 1080 -f 60 // 创建一个名为"My Profile"的配置文件
.\SetResolution.exe "My Profile" -noprompt // 切换显示设置为MyProfile的配置中描述的，并且不需要确定
```

**SunShine 配置：**

首先创建两个分辨率配置，一个是串流时的分辨率，一个是原来显示器的分辨率，以下是配置文件里的信息。

```xml
<DisplayProfile>
   <Name>SunShine</Name>
   <Width>1280</Width>
   <Height>720</Height>
   <Frequency>60</Frequency>
   <BitSize>32</BitSize>
   <Orientation>Default</Orientation>
</DisplayProfile>
<DisplayProfile>
   <Name>Origin</Name>
   <Width>2560</Width>
   <Height>1440</Height>
   <Frequency>144</Frequency>
   <BitSize>32</BitSize>
   <Orientation>Default</Orientation>
</DisplayProfile>
```

在应用设置页面，添加命令

- 打开应用时执行命令: `Path\To\SetResolution.exe SunShine -noprompt`
- 退出应用时执行命令: `Path\To\SetResolution.exe Origin -noprompt`

这样便可以串流时使用 720 的分辨率，终止串流又可以使用原有的分辨率了。
