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

const neovim = GenerateNode("Neovim 使用说明", "neovim/", "neovim/", true);

const neovimBasics = GenerateNode("基础入门", "", "", true);
neovimBasics.addItem(GenerateNode("Neovim 说明", "introduction/"));
neovimBasics.addItem(GenerateNode("关于手册", "help-manual/"));
neovimBasics.addItem(GenerateNode("Vim 的第一步", "first-steps/"));

const neovimEditing = GenerateNode("编辑操作", "", "", true);
neovimEditing.addItem(GenerateNode("光标移动", "movement/"));
neovimEditing.addItem(GenerateNode("修改文本", "editing/"));

const neovimConfig = GenerateNode("配置与界面", "", "", true);
neovimConfig.addItem(GenerateNode("配置设置", "configuration/"));
neovimConfig.addItem(GenerateNode("语法高亮", "syntax-highlighting/"));
neovimConfig.addItem(GenerateNode("GUI相关", "gui/"));

const neovimWorkspace = GenerateNode("文件与窗口", "", "", true);
neovimWorkspace.addItem(GenerateNode("多文件编辑", "multi-file/"));
neovimWorkspace.addItem(GenerateNode("多窗口", "windows/"));

const neovimIndex = GenerateNode("速查索引", "", "", true);
neovimIndex.addItem(GenerateNode("快捷键索引-光标移动", "index-movement/"));
neovimIndex.addItem(GenerateNode("快捷键索引-文本对象", "index-text-objects/"));
neovimIndex.addItem(GenerateNode("快捷键索引-正则搜索", "index-search/"));

neovim.addItem(neovimBasics);
neovim.addItem(neovimEditing);
neovim.addItem(neovimConfig);
neovim.addItem(neovimWorkspace);
neovim.addItem(neovimIndex);

export const expertiseItems = [docker, neovim] as SideBarNode[];