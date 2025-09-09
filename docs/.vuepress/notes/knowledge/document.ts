// 定义知识库入门文档的侧边栏
import {SideBarNode} from "../sideBarGenerator";

const prism_sample = new SideBarNode("Prism 样例代码", "Prism-Sample/", "Prism-Sample/", true);
prism_sample.addItem(new SideBarNode("应用启动引导", "tvyvd6f6/"));
prism_sample.addItem(new SideBarNode("区域", "pmxa23wj/"));
prism_sample.addItem(new SideBarNode("自定义区域支持", "scd19l9y/"));
prism_sample.addItem(new SideBarNode("区域注册View", "gg64zvv6/"));
prism_sample.addItem(new SideBarNode("View 注入", "qnyey45i/"));
prism_sample.addItem(new SideBarNode("激活与反激活 View", "wm5kfpnu/"));
prism_sample.addItem(new SideBarNode("Modules加载方法", "wkpq9c6u/"));
prism_sample.addItem(new SideBarNode("ViewModel 自动绑定", "32213pho/"));
prism_sample.addItem(new SideBarNode("配置自动绑定", "u8sxwsqu/"));
prism_sample.addItem(new SideBarNode("自定义注册", "aifrayfd/"));
prism_sample.addItem(new SideBarNode("委托命令", "6z8eukdk/"));
prism_sample.addItem(new SideBarNode("复合命令", "28jciiz4/"));
prism_sample.addItem(new SideBarNode("复合命令执行条件", "s6bafpdn/"));
prism_sample.addItem(new SideBarNode("事件聚合器", "2c8zk17q/"));
prism_sample.addItem(new SideBarNode("事件聚合器过滤", "raionkiz/"));
prism_sample.addItem(new SideBarNode("区域上下文", "1pvqahtx/"));
prism_sample.addItem(new SideBarNode("基本区域导航", "q5zdsest/"));
prism_sample.addItem(new SideBarNode("区域导航回调方法", "cxylj196/"));
prism_sample.addItem(new SideBarNode("导航相关事件", "6w6mqrjt/"));
prism_sample.addItem(new SideBarNode("是否可以导航", "8f89hfzs/"));
prism_sample.addItem(new SideBarNode("导航参数", "4jfdd70j/"));
prism_sample.addItem(new SideBarNode("导航取消", "03c5dhql/"));
prism_sample.addItem(new SideBarNode("区域成员的生命周期", "io4pbk7c/"));
prism_sample.addItem(new SideBarNode("导航日志", "pno693m0/"));
prism_sample.addItem(new SideBarNode("对话框服务", "equmvdc1/"));
prism_sample.addItem(new SideBarNode("对话框样式", "27vje3ua/"));
prism_sample.addItem(new SideBarNode("自定义窗口代替对话框", "x1zc0ywl/"));
prism_sample.addItem(new SideBarNode("InvokeCommandAction", "2wui4kqt/"));

const caliburn_micro = new SideBarNode("Caliburn.Micro", "Caliburn.Micro/", "Caliburn.Micro/", true);
caliburn_micro.addItem(new SideBarNode("说明", "6f281rz2/"));
caliburn_micro.addItem(new SideBarNode("快速开始", "fcbckcpl/"));
caliburn_micro.addItem(new SideBarNode("基本配置、操作和约定", "rukpdvfg/"));
caliburn_micro.addItem(new SideBarNode("自定义引导程序", "9g6cm461/"));
caliburn_micro.addItem(new SideBarNode("关于Actions", "zplu53kb/"));
caliburn_micro.addItem(new SideBarNode("命名约定", "ww8jitpc/"));
caliburn_micro.addItem(new SideBarNode("事件聚合器", "hf2h6rsm/"));
caliburn_micro.addItem(new SideBarNode("Simple IoC容器", "vvknjjp1/"));

export const documentItems = [prism_sample, caliburn_micro] as SideBarNode[];
