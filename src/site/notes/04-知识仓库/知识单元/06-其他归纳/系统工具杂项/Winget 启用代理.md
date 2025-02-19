---
{"title":"Winget 启用代理","note_type":"knowledge_base","description":"启用 Winget 配置代理以及使用代理","tags":["代理","windows","winget"],"create_time":"2025-02-06","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"knowledge_type":"其他归纳","root":"系统工具杂项","permalink":"/04-知识仓库/知识单元/06-其他归纳/系统工具杂项/Winget 启用代理/","dgPassFrontmatter":true,"noteIcon":"","created":"2025-02-06","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/06-其他归纳/系统工具杂项\|系统工具杂项]]

**Winget** 是 Windows 包管理器客户端，用于安装、升级和配置软件包。从 1.8 版本开始，Winget 支持通过代理服务器下载软件包，这对于网络受限的环境非常有用。

**启用代理支持**

首先，需要在 Winget 设置中启用代理命令行选项。以管理员身份运行以下命令：

```
winget settings --enable ProxyCommandLineOptions
```

**使用代理安装软件**

在安装软件时，可以通过 **--proxy** 参数指定代理服务器地址。例如，要通过代理服务器安装 Git，可以使用以下命令：

```
winget install Git.Git --proxy="http://proxy_url:port"
```
