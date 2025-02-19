---
{"dg-publish":true,"permalink":"/04//06/sunshine/sun-shine/","title":"SunShine 黑屏串流","tags":["串流","Sunshine"]}
---


所属知识库：[[04-知识仓库/归纳目录/06-其他归纳/Sunshine 串流\|Sunshine 串流]]

前提条件：需要虚拟显示器，目前没有好用的软件方案，所以最好使用一个显示器欺骗器，淘宝也就十几二十块钱。

黑屏串流原理：串流时切换屏幕到虚拟显示器上即可，需要配合指令操作

**Windows 切换屏幕指令：**

```powershell
DisplaySwitch.exe /internal // 仅在主屏幕显示 
                  /external // 仅在扩展屏幕显示
                  /extend   // 扩展屏幕
                  /clone    // 复制屏幕
```

**SunShine 配置：**

在插入显示欺骗器后，在应用设置页面，添加命令

- 打开应用时执行命令: `DisplaySwitch.exe /external`
- 退出应用时执行命令: `DisplaySwitch.exe /internal`
