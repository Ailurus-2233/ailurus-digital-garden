# README

欢迎光临小熊的数字花园，在这里记录了我学习的笔记、思考、感悟、想法等。您可以访问 [小熊の数字花园](https://blog.ailurus.site) 来查看仓库中的内容，当然也可以通过本地部署访问。

## 文件结构

本仓库是基于 [vuepress-theme-plume](https://plume.pengzhanbo.cn/) 搭建的个人博客，主要文档存放于 docs 文件夹下，以下是文件结构

```
├── docs
│   ├── .vuepress // 存放项目的配置文件
│   ├── articles // 存放个人博客的 markdown 文件
│   │   ├── 随笔
│   │   ├── 技术
│   │   ├── ...  // 个人博客的分类目录
│   ├── notes //  vuepress-theme-plume 特色的笔记文档
│   │   ├── knowledge // 个人知识库文件夹
│   │   │   ├── 1. document   // 知识库分类：入门文档
│   │   │   ├── 2. expertise  // 知识库分类：专业知识
│   │   │   ├── 3. study      // 知识库分类：学习笔记
│   │   │   ├── 4. problem    // 知识库分类：问题记录
│   │   │   ├── 5. other      // 知识库分类：其他
│   │   ├── project // 个人项目文件夹
│   │   │   ├── xxxx // 具体项目文档
│   ├── index.md // 首页
│   ├── about.md // 关于我
```

## 本地部署

您需要安装以下软件：

- Node.js
- pnpm
- Git

安装完成后，在终端中执行以下命令：

``` bash
git clone https://github.com/ailurus-2233/ailurus-digital-garden.git
cd ailurus-digital-garden
pnpm install
pnpm docs:dev
```

执行完毕后，您可以在浏览器中访问 ` http://localhost:8080/` 来查看本地部署的数字花园。

## 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by/4.0/) 协议进行授权。您可以自由复制、分享、修改本项目的内容，但必须保留原作者信息，并在 derivative works 中署名、非商业性使用和相同方式共享。