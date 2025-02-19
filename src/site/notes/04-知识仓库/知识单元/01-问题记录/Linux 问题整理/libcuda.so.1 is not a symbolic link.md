---
{"title":"libcuda.so.1 is not a symbolic link","note_type":"knowledge_base","description":"wsl 出现 libcuda.so.1 is not a symbolic link 的解决方案","tags":["Linux","wsl"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Linux 问题整理","permalink":"/04-知识仓库/知识单元/01-问题记录/Linux 问题整理/libcuda.so.1 is not a symbolic link/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
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
