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

const linux = GenerateNode("Linux 基础", "linux/", "linux/", true);

const linuxRemote = GenerateNode("远程与网络", "", "", true);
linuxRemote.addItem(GenerateNode("服务器 SSH 配置", "ssh/"));
linuxRemote.addItem(GenerateNode("网络管理", "network/"));

const linuxSystem = GenerateNode("系统基础", "", "", true);
linuxSystem.addItem(GenerateNode("文件权限管理", "permissions/"));
linuxSystem.addItem(GenerateNode("用户指令", "users/"));
linuxSystem.addItem(GenerateNode("systemctl 使用实例", "systemctl/"));

const linuxTools = GenerateNode("归档与版本控制", "", "", true);
linuxTools.addItem(GenerateNode("tar 压缩命令", "tar/"));
linuxTools.addItem(GenerateNode("SVN 命令", "svn/"));

linux.addItem(linuxRemote);
linux.addItem(linuxSystem);
linux.addItem(linuxTools);

const pacs = GenerateNode("Pacs 信息查询", "pacs/", "pacs/", true);

const pacsCommunication = GenerateNode("通讯基础", "", "", true);
pacsCommunication.addItem(GenerateNode("DICOM 通讯基础", "dicom-communication-basics/"));
pacsCommunication.addItem(GenerateNode("AE Title 与节点配置", "ae-title-and-node/"));
pacsCommunication.addItem(GenerateNode("SCU 与 SCP 角色说明", "scu-and-scp/"));
pacsCommunication.addItem(GenerateNode("Association 与 Presentation Context", "association-and-presentation-context/"));

const pacsBasics = GenerateNode("基础组件", "", "", true);
pacsBasics.addItem(GenerateNode("DicomClient", "dicom-client/"));

const pacsOperations = GenerateNode("查询与传输", "", "", true);
pacsOperations.addItem(GenerateNode("C-ECHO", "c-echo/"));
pacsOperations.addItem(GenerateNode("C-FIND", "c-find/"));
pacsOperations.addItem(GenerateNode("C-MOVE", "c-move/"));
pacsOperations.addItem(GenerateNode("C-STORE", "c-store/"));

const pacsAdvanced = GenerateNode("扩展 DIMSE 命令", "", "", true);
pacsAdvanced.addItem(GenerateNode("C-GET", "c-get/"));
pacsAdvanced.addItem(GenerateNode("基础通信实战", "basic-c-star-workflow/"));
pacsAdvanced.addItem(GenerateNode("N-ACTION", "n-action/"));
pacsAdvanced.addItem(GenerateNode("N-EVENT-REPORT", "n-event-report/"));

const pacsCommitment = GenerateNode("Storage Commitment 实战", "", "", true);
pacsCommitment.addItem(GenerateNode("Storage Commitment 流程总览", "storage-commitment-overview/"));
pacsCommitment.addItem(GenerateNode("发送影像并发起存储承诺", "storage-commitment-send/"));
pacsCommitment.addItem(GenerateNode("接收承诺结果与状态回写", "storage-commitment-receive/"));

const pacsEndToEnd = GenerateNode("完整 PACS 通信实战", "", "", true);
pacsEndToEnd.addItem(GenerateNode("完整通信实战", "end-to-end-workflow/"));

pacs.addItem(pacsCommunication);
pacs.addItem(pacsBasics);
pacs.addItem(pacsOperations);
pacs.addItem(pacsAdvanced);
pacs.addItem(pacsCommitment);
pacs.addItem(pacsEndToEnd);

export const expertiseItems = [docker, neovim, linux, pacs] as SideBarNode[];