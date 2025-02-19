---
{"dg-publish":true,"permalink":"/04//03/docker/gitea/","title":"Gitea 仓库服务部署","tags":["docker","docker compose"]}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/常用 Docker 容器安装\|常用 Docker 容器安装]]

- **创建持久化文件**

```bash
mkdir -p ~/docker/gitea
```

- **创建 DOCKER COMPOSE 文件**

```yml
services:
  gitea:
    image: gitea/gitea:1.20.5
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always
    volumes:
      - ~/docker/gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "22:22"
```

- **启动容器**

```bash
docker-compose up -d
```
