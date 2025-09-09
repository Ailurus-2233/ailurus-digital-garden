import {documentItems} from "./knowledge/document";
import {expertiseItems} from "./knowledge/expertise";
import {studyItems} from "./knowledge/study";
import {problemItems} from "./knowledge/problem";
import {otherItems} from "./knowledge/other";
import {GenerateSidebar, SideBarNode} from "./sideBarGenerator";

const root = new SideBarNode("个人知识库", "/notes/knowledge/", "/notes/knowledge/");
const documentNode = new SideBarNode("入门文档", "document/", "document/", true);
documentNode.items = documentItems;
const expertiseNode = new SideBarNode("专业知识", "expertise/", "expertise/", true);
expertiseNode.items = expertiseItems;
const studyNode = new SideBarNode("学习笔记", "study/", "study/", true);
studyNode.items = studyItems;
const problemNode = new SideBarNode("问题记录", "problem/", "problem/", true);
problemNode.items = problemItems
const otherNode = new SideBarNode("其他归纳", "other/", "other/", true);
problemNode.items = otherItems;
root.items = [documentNode, expertiseNode, studyNode, problemNode, otherNode];

// 定义知识库入门文档的侧边栏
export const knowledgeSideBar = GenerateSidebar([root]);