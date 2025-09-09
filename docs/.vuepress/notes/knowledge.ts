import {ThemeSidebarItem} from "vuepress-theme-plume";
import {documentSidebar} from "./knowledge/document";
import {expertiseSidebar} from "./knowledge/expertise";
import {studySidebar} from "./knowledge/study";
import {problemSidebar} from "./knowledge/problem";
import {otherSidebar} from "./knowledge/other";

// 定义知识库入门文档的侧边栏

export const knowledgeSideBar = [
    {
        text: "个人知识库", prefix: "/notes/knowledge/", link: "/notes/knowledge/", items: [
            {
                text: "入门文档",
                link: "document/",
                prefix: "document/",
                collapsed: true,
                items: documentSidebar
            },
            {
                text: "专业知识",
                link: "expertise/",
                prefix: "expertise/",
                collapsed: true,
                items: expertiseSidebar
            },
            {
                text: "学习笔记",
                link: "study/",
                prefix: "study/",
                collapsed: true,
                items: studySidebar},
            {
                text: "问题记录",
                link: "problem/",
                prefix: "problem/",
                collapsed: true,
                items: problemSidebar
            },
            {
                text: "其他归纳",
                link: "/other/",
                prefix: "other/",
                collapsed: true,
                items: otherSidebar
            },]
    },

] as ThemeSidebarItem[];
