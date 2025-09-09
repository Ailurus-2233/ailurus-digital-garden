import { ThemeSidebarItem } from "vuepress-theme-plume";
import { documentSidebar } from "./knowledge/document";
import { expertiseSidebar } from "./knowledge/expertise";
import { studySidebar } from "./knowledge/study";
import { problemSidebar } from "./knowledge/problem";
import { otherSidebar } from "./knowledge/other";

// 定义知识库入门文档的侧边栏

export const knowledgeSideBar = [
  { text: "知识库主页", link: "/notes/knowledge/" },
  { text: "入门文档", link: "/notes/knowledge/document/", prefix: "/notes/knowledge/document/", items: documentSidebar },
  { text: "专业知识", link: "/notes/knowledge/expertise/", prefix: "/notes/knowledge/expertise/", items: expertiseSidebar },
  { text: "学习笔记", link: "/notes/knowledge/study/", prefix: "/notes/knowledge/study/", items: studySidebar },
  { text: "问题记录", link: "/notes/knowledge/problem/", prefix: "/notes/knowledge/problem/", items: problemSidebar },
  { text: "其他归纳", link: "/notes/knowledge/other/", prefix: "/notes/knowledge/other/", items: otherSidebar },
] as ThemeSidebarItem[];
