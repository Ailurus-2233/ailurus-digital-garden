import { ThemeSidebarItem } from 'vuepress-theme-plume';
import { documentSidebar } from './knowledge/document';

export const knowledgeSideBar = [
    { text: "知识库主页", link: '/knowledge/'},
    { text: "入门文档", link: '/knowledge/', items: documentSidebar },
] as ThemeSidebarItem[];