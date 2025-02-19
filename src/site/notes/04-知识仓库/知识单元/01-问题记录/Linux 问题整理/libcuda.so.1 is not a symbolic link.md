---
{"dg-publish":true,"permalink":"/04//01/linux/libcuda-so-1-is-not-a-symbolic-link/","title":"libcuda.so.1 is not a symbolic link","tags":["Linux","wsl"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/Linux 问题整理\|Linux 问题整理]]

** WSL 端解决 **

- 编辑 `/etc/wsl.conf`

```shell
[automount]
ldconfig = false
```

- 创建链接并使用它

```shell
sudo mkdir /usr/lib/wsl/lib2
sudo ln -s /usr/lib/wsl/lib/* /usr/lib/wsl/lib2
echo /usr/lib/wsl/lib2 | sudo tee /etc/ld.so.conf.d/ld.wsl.conf
