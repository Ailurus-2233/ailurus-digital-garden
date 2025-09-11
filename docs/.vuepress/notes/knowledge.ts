import { documentItems } from "./knowledge/document";
import { expertiseItems } from "./knowledge/expertise";
import { studyItems } from "./knowledge/study";
import { problemItems } from "./knowledge/problem";
import { otherItems } from "./knowledge/other";
import { GenerateNode, GenerateSidebar } from "./sideBarGenerator";

const documentNode = GenerateNode(
  "入门文档",
  "document/",
  "document/",
  true,
  documentItems
);
const expertiseNode = GenerateNode(
  "专业知识",
  "expertise/",
  "expertise/",
  true,
  expertiseItems
);
const studyNode = GenerateNode(
  "学习笔记",
  "study/",
  "study/",
  true,
  studyItems
);
const problemNode = GenerateNode(
  "问题记录",
  "problem/",
  "problem/",
  true,
  problemItems
);
const otherNode = GenerateNode(
  "其他归纳",
  "other/",
  "other/",
  true,
  otherItems
);

const rootNode = GenerateNode(
  "个人知识库",
  "/notes/knowledge/",
  "/notes/knowledge/",
  undefined,
  [documentNode, expertiseNode, studyNode, problemNode, otherNode]
);

// 定义知识库入门文档的侧边栏
export const knowledgeSideBar = GenerateSidebar([rootNode]);
