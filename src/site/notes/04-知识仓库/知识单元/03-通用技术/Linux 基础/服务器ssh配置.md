---
{"dg-publish":true,"permalink":"/04//03/linux/ssh/","title":"服务器ssh配置","tags":["Linux","ssh"]}
---


所属父节点：[[04-知识仓库/归纳目录/03-通用技术/Linux 基础\|Linux 基础]]

**1. 启用 sshd**

```bash
# 需要通过包管理器安装 openssh，然后启动 sshd 服务
package-manager install openssh  # package-manager 不是真实指令，需要替换为相应的包管理器指令
systemctl start sshd
```

**2. 配置 sshd**

文件目录：`/etc/ssh/sshd_config`

常用参数说明：

1. `Port`：指定 sshd 监听的端口，默认为 22
2. `PermitRootLogin`：是否允许 root 用户登录，可选值为 `yes`、`no`、`prohibit-password`
3. `PasswordAuthentication`：是否允许密码登录，可选值为 `yes`、`no`
4. `PubkeyAuthentication`：是否允许公钥登录，可选值为 `yes`、`no`
5. `AllowUsers`：允许登录的用户列表，多个用户用空格隔开
6. `DenyUsers`：禁止登录的用户列表，多个用户用空格隔开
7. `AllowGroups`：允许登录的用户组列表，多个用户组用空格隔开
8. `DenyGroups`：禁止登录的用户组列表，多个用户组用空格隔开
9. `MaxAuthTries`：最大尝试登录次数
10. `Banner`：登录提示信息文件路径
11. `X11Forwarding`：是否允许 X11 转发
12. `LogLevel`：指定日志级别
13. `PrintMotd`：是否显示登录提示信息
14. `PrintLastLog`：是否显示上次登录信息

这些配置主要用于提高 sshd 服务的安全性，可以根据实际需求进行配置。
