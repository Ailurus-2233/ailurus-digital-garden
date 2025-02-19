---
{"dg-publish":true,"permalink":"/04//03/docker/svn/","title":"SVN 仓库服务部署","tags":["docker","docker compose"]}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/常用 Docker 容器安装\|常用 Docker 容器安装]]

### elleflorio/svn-server:latest

#### 部署流程

- **创建持久化文件**

``` bash
mkdir ./conf
mkdir ./conf/svn_config
mkdir ./conf/svn_repo

touch ./conf/svn_config/subversion-access-control
touch ./conf/svn_config/passwd

chmod 777 -R ./conf
```

- **DOCKER-COMPOSE 配置文件**

``` yaml
services:
  svn:
    image: 'elleflorio/svn-server:latest'
    container_name: svn-server
    restart: always
    volumes:
      - './conf/svn_config:/etc/subversion/'
      - './conf/svn_repo:/home/svn'
    ports:
      - '80:80'
      - '3690:3690'
```

- **启动容器**

``` bash
docker-compose up -d
```

#### 配置 SVN SERVER

##### 初始化配置

- 创建管理员账户

``` bash
docker exec -t svn-server htpasswd -cb /etc/subversion/passwd <username> <password>
```

- 初始化配置

访问 `http://host:port/svnadmin` 进行初始化配置

| 配置名称                                             | 配置内容                                    |
| ---------------------------------------------------- | ------------------------------------------- |
| **Subversion authorization**                         |                                             |
| Subversion authorization file                        | `/etc/subversion/subversion-access-control` |
| **Data providers**                                   |                                             |
| User view provider type:                             | passwd                                      |
| User edit provider type:                             | passwd                                      |
| Group view provider type:                            | svnauthfile                                 |
| Group edit provider type:                            | svnauthfile                                 |
| Repository view provider type:                       | svnclient                                   |
| Repository edit provider type:                       | svnclient                                   |
| **User authentication**                              |                                             |
| User authentication file (SVNUserFile)               | `/etc/subversion/passwd`                    |
| **Subversion settings**                              |                                             |
| Parent directory of the repositories (SVNParentPath) | `/home/svn`                                 |
| Subversion client executable                         | `/usr/bin/svn`                              |
| Subversion admin executable                          | `/usr/bin/svnadmin`                         |

##### 其他配置

- 添加仓库

1. 选择 `Repositories > Add` 开始创建仓库
2. `Repository name` 这一项填入项目名称
3. 单项目仓库可以在 `Pre-defined repository structure` 选择 `Single project structure`，它可以自动创建 `trunk`，`branches`，`tags` 三个文件夹
4. 多项目仓库可以在 `Pre-defined repository structure` 选择 `Multi project structure`，需要额外输入子项目名称，每个子项目文件夹中可以自动创建 `trunk`，`branches`，`tags` 三个文件夹
5. 其他默认即可，选择 `create` 创建用户

- 仓库权限管理

1. 选择 `Access-Paths > List` 进入路径权限管理页面
2. 勾选仓库名称前的复选框，右下用户列表选择用户名称，点击 `Assign`，添加用户有访问该仓库的权限
3. 选择仓库名称，进入特定路径的管理页面
4. `Assigned users` 负责管理当前仓库用户权限，`Assigned groups` 负责管理当前仓库组权限

- 添加用户

1. 选择 `Users > Add` 开始创建用户
2. 填入相应的信息 `Username`、`Password`、`Re-type password`
3. 选择 `create` 创建用户

- 添加组

1. 选择 `Groups > Add` 开始创建组
2. 填入 `Group name` 组名称
3. 选择 `create` 创建组

- 组内添加/删除用户

1. 选择 `Groups > list` 进入组管理页面
2. 选择需要管理的组的名称
3. 在 `Users of group` 分组中
	1. 右下有一个下拉框，选择用户后选择 `assign` 添加用户到当前组
	2. 在对应用户前选择复选框打勾，选择 `unassign` 从当前组移除用户

### SVNAdmin2

#### 部署流程

- **创建持久化文件**

启动一个临时的容器用于复制配置文件出来

```bash
docker run -d --name svnadmintemp --privileged witersencom/svnadmin:2.5.7 /usr/sbin/init
```

- 把配置文件复制到本机的目录

```bash
docker cp svnadmintemp:/home/svnadmin ./
docker cp svnadmintemp:/etc/httpd/conf.d ./svnadmin/
docker cp svnadmintemp:/etc/sasl2 ./svnadmin/
```

- 删除掉临时容器

```bash
docker stop svnadmintemp && docker rm svnadmintemp
```

- **docker-compose 配置文件**

```yaml
services:
  svn:
    image: 'witersencom/svnadmin:latest'
    container_name: svn_admin
    restart: always
    volumes:
      - './svnadmin:/home/svnadmin'
      - './svnadmin/conf.d:/etc/httpd/conf.d/'
      - './svnadmin/sas12:/etc/sas12'
```

- **启动容器**

```
docker-compose up -d
```

- **进入容器内进行文件授权**

```bash
docker exec -it svnadmin bash
chown -R apache:apache /home/svnadmin
```

#### 配置 SVNAdmin2

访问 `http://host:port/` 进行初始化配置，默认账号密码是 `管理用户/admin/admin`
