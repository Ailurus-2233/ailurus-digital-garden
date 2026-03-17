/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume'
import collections from './collections'
import navbar from './navbar'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'images/user_icon.jpg',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'github', link: 'https://github.com/Ailurus-2233' },
  ],
  navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
  aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: {
    license: {
      name: 'CC-BY-4.0', // 许可证名称
      url: 'https://creativecommons.org/licenses/by/4.0/' // 许可证地址
    },
    author: {
      name: 'Ailurus-2233', // 版权所有者名称
      url: 'https://github.com/Ailurus-2233' // 版权所有者地址
    },
    creation: 'original' // 创作方式
  },

  prevPage: true,   // 是否启用上一页链接
  nextPage: true,   // 是否启用下一页链接
  createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  footer: {
    message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
    copyright: '<span style="display:inline-flex;align-items:center;gap:12px;flex-wrap:wrap;"><a href="https://beian.mps.gov.cn/#/query/webSearch?code=41900102411084" rel="noreferrer" target="_blank" style="display:inline-flex;align-items:center;white-space:nowrap;gap:0;line-height:1;vertical-align:middle;"><img src="/images/beian_icon.png" style="width:16px;height:16px;display:inline-block;flex:0 0 auto;margin:0;margin-right:1px;vertical-align:middle;"/><span style="margin-left:0;line-height:1;">豫公网安备41900102411084号</span></a><a target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn" style="display:inline-flex;align-items:center;white-space:nowrap;line-height:1;vertical-align:middle;">豫ICP备2022006334号-2</a></span>',
  },

  /**
   * @see https://theme-plume.vuejs.press/config/basic/#profile
   */
  profile: {
    avatar: './images/user_icon.jpg',
    name: 'Ailurus Digital Graden',
    description: '欢迎来到小熊的数字花园<br/> 可以在这里看到我分享的学习笔记、技术总结和一些有趣的知识',
    circle: true,
    location: '江苏-苏州',
    // organization: '',
  },

  navbar,
  collections,

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  // transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
  //   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  // },

})
