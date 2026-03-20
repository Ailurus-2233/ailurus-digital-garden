// 定义知识库专业技术的侧边栏
import {GenerateNode, SideBarNode} from "../sideBarGenerator";

const docker = GenerateNode("Docker 使用说明与部署", "docker/", "docker/", true);

const dockerBasics = GenerateNode("基础认知", "", "", true);
dockerBasics.addItem(GenerateNode("Docker 介绍", "introduction/"));
dockerBasics.addItem(GenerateNode("安装 Docker", "install/"));
dockerBasics.addItem(GenerateNode("容器网络与端口映射", "network/"));
dockerBasics.addItem(GenerateNode("Compose 服务编排基础", "compose/"));

const dockerDeployment = GenerateNode("服务部署", "", "", true);
dockerDeployment.addItem(GenerateNode("Caddy HTTP 服务部署", "caddy/"));
dockerDeployment.addItem(GenerateNode("Nginx HTTP 服务部署", "nginx/"));
dockerDeployment.addItem(GenerateNode("Gitea 仓库服务部署", "gitea/"));
dockerDeployment.addItem(GenerateNode("SVN 仓库服务部署", "svn/"));
dockerDeployment.addItem(GenerateNode("PicList 自动图床服务部署", "piclist/"));

const dockerOps = GenerateNode("运维与排查", "", "", true);
dockerOps.addItem(GenerateNode("持久化文件权限问题", "permissions/"));
dockerOps.addItem(GenerateNode("备份与恢复策略", "backup/"));
dockerOps.addItem(GenerateNode("镜像升级与发布流程", "upgrade/"));
dockerOps.addItem(GenerateNode("日志采集与监控建议", "observability/"));

docker.addItem(dockerBasics);
docker.addItem(dockerDeployment);
docker.addItem(dockerOps);

export const expertiseItems = [docker] as SideBarNode[];