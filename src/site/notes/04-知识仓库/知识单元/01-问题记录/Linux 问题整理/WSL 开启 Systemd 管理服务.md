---
{"dg-publish":true,"permalink":"/04//01/linux/wsl-systemd/","title":"WSL 开启 Systemd 管理服务","tags":["Linux","wsl"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/Linux 问题整理\|Linux 问题整理]]

1. 执行 `wsl --update` 更新 wsl 到最新版本、
2. 修改需要开启的实例改为 wsl2 `wsl --set-version 2 {name}` name 是 wsl 实例的名字
3. 进入实例修改 `/etc/wsl.conf` 内容

	```conf
	[boot]
	systemd=true
	```

4. 执行 `wsl --shutdown` 重启 wsl 即可使用 systemd

> [!info] 注  
> 更推荐先更新 wsl 版本后，再安装发行版
