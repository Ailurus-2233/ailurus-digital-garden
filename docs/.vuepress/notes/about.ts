import {GenerateNode, GenerateSidebar, SideBarNode} from "./sideBarGenerator";
import {educationItems} from "./about/education";
import {workItems} from "./about/work";

const rootNode = GenerateNode("个人简介");
rootNode.prefix = "/notes/about/";

const aboutMeNode: SideBarNode = GenerateNode("关于我", "/notes/about/");
const educationNode: SideBarNode = GenerateNode("教育经历", "education/", "education/");
educationNode.items = educationItems;
const workNode: SideBarNode = GenerateNode("工作经历", "work/", "work/");
workNode.items = workItems;
const projectNode: SideBarNode = GenerateNode("项目经历", "project/", "project/", false);
const awardNode: SideBarNode = GenerateNode("证书&成果", "award/");

rootNode.items = [aboutMeNode, educationNode, workNode, projectNode, awardNode];

export const aboutSideBar = GenerateSidebar([rootNode]);