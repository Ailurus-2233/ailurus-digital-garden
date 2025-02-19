---
{"dg-publish":true,"permalink":"/04//03/docker/piclist/","title":"piclist 自动图床服务部署","tags":["docker","docker compose"]}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/常用 Docker 容器安装\|常用 Docker 容器安装]]

### 部署流程

#### 新建 NODE 容器

- **编辑文件 DOCKER-COMPOSE.YML**

``` yml
services:
  piclist:
    image: node:16.20.1
    container_name: piclist
    restart: always
    stdin_open: true
    tty: true
```

- **启动 NODE 容器**

``` bash
docker compose up -d
```

#### 安装 PICLIST

- **进入 NODE 容器**

```bash
docker exec -it piclist bash
```

- **修改国内安装源**

```bash
npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
npm config set registry http://registry.npm.taobao.org/
yarn config set registry http://registry.npm.taobao.org/
```

- **执行安装**

```bash
npm install sharp
yarn global add piclist
```

- **修改 PICGO 的换行格式**

```bash
sed -i 's#http://deb.debian.org#https://mirrors.163.com#g' /etc/apt/sources.list # 换源
apt update
apt install dos2unix
dos2unix /usr/local/share/.config/yarn/global/node_modules/piclist/bin/picgo
dos2unix /usr/local/share/.config/yarn/global/node_modules/piclist/bin/picgo-server
```

- **配置上传信息**

```bash
picgo set uploader
```

- **启动 PICGO-SERVER**

```bash
picgo-server
```

如果正常启动则可以进行后续操作

#### 打包当前镜像

``` bash
docker commit piclist piclist:v1
```

#### 停止 PICLIST 容器

``` bash
docker compose down
```

#### 修改 DOCKER-COMPOSE.YML

``` yaml
services:
  piclist:
    image: piclist:v1
    container_name: piclist
    restart: always
    command: picgo-server
    stdin_open: true
    tty: true
```

其中修改了 image 的内容，增加了启动时执行的命令

#### 启动新的镜像

``` bash
dokcer compose up -d
```
