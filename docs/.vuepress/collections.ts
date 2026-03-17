import { defineCollection, defineCollections } from 'vuepress-theme-plume'
import { aboutSideBar } from './notes/about'
import { knowledgeSideBar } from './notes/knowledge'

const blogCollection = defineCollection({
  type: 'post',
  dir: 'blog',
  title: '博客',
  link: '/blog/',
  linkPrefix: '/blog/',
  postList: true,
  tags: true,
  archives: true,
  categories: true,
  postCover: 'right',
  pagination: 15,
  tagsLink: '/blog/tags/',
  archivesLink: '/blog/archives/',
  categoriesLink: '/blog/categories/',
})

const knowledgeCollection = defineCollection({
  type: 'doc',
  dir: 'knowledge',
  title: '知识库',
  linkPrefix: '/notes/knowledge/',
  sidebar: knowledgeSideBar,
})

const aboutCollection = defineCollection({
  type: 'doc',
  dir: 'about',
  title: '关于我',
  linkPrefix: '/notes/about/',
  sidebar: aboutSideBar,
})

export default defineCollections([
  blogCollection,
  knowledgeCollection,
  aboutCollection,
])