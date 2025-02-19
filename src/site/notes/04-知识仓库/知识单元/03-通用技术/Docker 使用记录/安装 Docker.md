---
{"title":"安装 Docker","note_type":"knowledge_base","description":"在 Linux 系统中安装 Docker 的方法","tags":["Docker"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Docker 使用记录","permalink":"/04-知识仓库/知识单元/03-通用技术/Docker 使用记录/安装 Docker/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/Docker 使用记录\|Docker 使用记录]]

### Arch Linux

1. 安装 docker `sudo pacman -S docker`
2. 启动 docker `sudo systemctl start docker.service`
3. 开机自动启动 `sudo systemctl enable docker.service`
4. 将用户添加到 docker 组 `sudo gpasswd -a $USER docker`
5. 修改镜像位置 `/etc/docker/daemon.json`

```
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```

1. 重新启动 `reboot`
2. 测试安装完成 `docker info`
