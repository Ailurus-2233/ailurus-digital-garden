---
{"title":"Arch linux 认证失败处理方式","note_type":"knowledge_base","description":"Arch Linux pacman 安装软件时认证失败处理方式","tags":["Arch Linux","Linux"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Linux 问题整理","permalink":"/04-知识仓库/知识单元/01-问题记录/Linux 问题整理/Arch linux 认证失败处理方式/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/Linux 问题整理\|Linux 问题整理]]

**1. 重新生成签名：**

```bash
sudo pacman-key --init
sudo pacman-key --populate archlinux
sudo pacman-key --populate archlinuxcn
sudo pacman-key --refresh-keys
```

刷新的过程可能会很慢

**2. archlinuxcn-keyring 安装失败**

```bash
pacman -Syu haveged
systemctl start haveged
systemctl enable haveged

rm 
-rf /etc/pacman.d/gnupg
pacman-key --init
pacman-key --populate archlinux
pacman-key --populate archlinuxcn
```
