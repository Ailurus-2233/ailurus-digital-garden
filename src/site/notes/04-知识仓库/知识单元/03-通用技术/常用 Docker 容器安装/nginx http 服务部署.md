---
{"title":"nginx http 服务部署","note_type":"knowledge_base","description":"使用 docker-compose 部署 nginx 服务","tags":["docker","docker compose"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"常用 Docker 容器安装","permalink":"/04-知识仓库/知识单元/03-通用技术/常用 Docker 容器安装/nginx http 服务部署/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/常用 Docker 容器安装\|常用 Docker 容器安装]]

- **创建持久化文件**

```bash
mkdir -p ./nginx/conf
mkdir -p ./nginx/logs

docker run --name nginx -d nginx

docker cp nginx:/etc/nginx/nginx.conf ./nginx/conf/nginx.conf
docker cp nginx:/etc/nginx/conf.d/ ./nginx/
docker cp nginx:/usr/share/nginx/html/ ./nginx/

docker stop nginx
docker rm nginx
```

- **编辑 DOCKER-COMPOSE 文件**

```yaml
services:
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    stdin_open: true
    tty: true
    volumes:
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/logs:/var/log/nginx
```

- **启动容器**

```bash
docker-compose up -d
```
