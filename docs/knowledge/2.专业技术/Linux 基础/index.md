---
title: Linux 基础
tags: [Linux, SSH, 网络, systemd, 权限]
createTime: 2026/03/20 13:00:00
permalink: /notes/knowledge/expertise/linux/
---

这一组文档整理 Linux 环境里最常见的基础操作：远程连接、网络配置、权限与用户管理、服务注册，以及归档和版本控制工具的常用命令。

## 远程与网络

1. [服务器 SSH 配置](./1.服务器%20SSH%20配置.md)：启用并收紧 SSH 服务，适合作为远程登录的最小配置参考。
2. [网络管理](./2.网络管理.md)：记录 systemd-networkd、networking 和 netplan 这几类常见网络配置方式。

## 系统基础

3. [文件权限管理](./3.文件权限管理.md)：整理 chmod、chown、chgrp 和 umask 的常见写法。
4. [用户指令](./4.用户指令.md)：整理用户、用户组和密码相关的高频管理命令。
5. [systemctl 使用实例](./5.systemctl%20使用实例.md)：用一个简单服务示例说明如何注册和启用 systemd 服务。

## 归档与版本控制

6. [tar 压缩命令](./6.tar%20压缩命令.md)：整理常用压缩和解压写法。
7. [SVN 命令](./7.SVN%20命令.md)：整理最常用的安装、检出、提交和更新命令。