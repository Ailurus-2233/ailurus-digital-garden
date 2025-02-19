---
{"title":"Caddy http 服务部署","note_type":"knowledge_base","description":"使用 docker-compose 部署 Caddy2 http服务","tags":["docker","docker compose"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"常用 Docker 容器安装","permalink":"/04-知识仓库/知识单元/03-通用技术/常用 Docker 容器安装/Caddy http 服务部署/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/常用 Docker 容器安装\|常用 Docker 容器安装]]

### 部署流程

- **创建持久化文件**

```bash
mkdir data
mkdir config
```

- **DOCKER 创建 NETWORK**

```bash
docker network create caddy
```

- **编辑 `DOCKERS-COMPOSE` 文件**

``` yaml
services:
  caddy:
    image: caddy:latest
    container_name: caddy
    restart: always
    networks:
      - caddy
    stdin_open: true
    tty: true
    volumes:
      - ./data:/data
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    ports:
      - 80:80
      - 443:443
    entrypoint: /usr/bin/caddy run --adapter caddyfile --config /config/Caddyfile

networks:
  caddy:
    external: true
```

- 执行容器

``` bash
docker-compose up -d
```

### 配置文件

官方网站：[欢迎 — Caddy v2中文文档 (dengxiaolong.com)](https://caddy2.dengxiaolong.com/docs/)

**转发样例：**

- 其他容器添加到 `caddy` 网络下

```bash
docker network connect caddy container_name
```

或者编辑 docker-compose.yaml

```yaml
services:
  name:
    networks:
      caddy:

networks:
  caddy:
    external: true
```

- 编辑 `./config/Caddyfile`

```
https://domain {
    reverse_proxy * http://container_name:port
}
```
