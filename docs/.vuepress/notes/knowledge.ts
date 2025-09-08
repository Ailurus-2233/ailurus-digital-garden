import { ThemeSidebarItem } from "vuepress-theme-plume";
import { documentSidebar } from "./knowledge/document";
import { expertiseSidebar } from "./knowledge/expertise";
import { studySidebar } from "./knowledge/study";
import { problemSidebar } from "./knowledge/problem";
import { otherSidebar } from "./knowledge/other";

// 定义知识库入门文档的侧边栏

export const knowledgeSideBar = [
  {
    text: "知识库主页",
    link: "/knowledge/",
    prefix: "/knowledge/",
    collapsed: false,
    items: [
      { text: "入门文档", link: "document/", items: documentSidebar },
      { text: "专业知识", link: "expertise/", items: expertiseSidebar },
      { text: "学习笔记", link: "study/", items: studySidebar },
      { text: "问题记录", link: "problem/", items: problemSidebar },
      { text: "其他归纳", link: "other/", items: otherSidebar },
    ],
  },
] as ThemeSidebarItem[];
