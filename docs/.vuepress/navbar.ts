/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'icon-park-outline:home' },
  { text: '博客', link: '/articles/', icon: 'icon-park-outline:document-folder' },
  { text: '标签', link: '/tags/', icon: 'icon-park-outline:tag-one' },
  { text: '归档', link: '/archives/', icon: 'icon-park-outline:box' },
  { text: '分类', link: '/categories/', icon: 'icon-park-outline:category-management' },
  // {
  //   text: '文档',
  //   icon: 'icon-park-outline:list-view',
  //   items: [
  //     { text: '知识库', link: '/knowledge/', icon: 'icon-park-outline:receive' },
  //     { text: '项目', link: '/project/', icon: 'icon-park-outline:folder-code' },
  //   ]
  // },
  { text: '知识库', link: '/knowledge/', icon: 'icon-park-outline:receive' },
  { text: '关于我', link: '/about/', icon: 'icon-park-outline:hands' },
])
