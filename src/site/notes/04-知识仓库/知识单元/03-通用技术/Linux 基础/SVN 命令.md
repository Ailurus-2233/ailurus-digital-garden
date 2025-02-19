---
{"dg-publish":true,"permalink":"/04//03/linux/svn/","title":"SVN 命令","tags":["linux","SVN"]}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/Linux 基础\|Linux 基础]]

### 安装 SVN

安装 arch 的 aur 源中 `subversion` 包 [Arch Linux - Package Search](https://archlinux.org/packages/?name=subversion)

```
paru -S subversion
yum install subversion
apt-get install subversion
```

### 帮助指令

`svn help`

```
usage: svn <subcommand> [options] [args]
Subversion command-line client.
Type 'svn help <subcommand>' for help on a specific subcommand.
Type 'svn --version' to see the program version and RA modules,
     'svn --version --verbose' to see dependency versions as well,
     'svn --version --quiet' to see just the version number.

Most subcommands take file and/or directory arguments, recursing
on the directories.  If no arguments are supplied to such a
command, it recurses on the current directory (inclusive) by default.

Available subcommands:
   add
   auth
   blame (praise, annotate, ann)
   cat
   changelist (cl)
   checkout (co)
   cleanup
   commit (ci)
   copy (cp)
   delete (del, remove, rm)
   diff (di)
   export
   help (?, h)
   import
   info
   list (ls)
   lock
   log
   merge
   mergeinfo
   mkdir
   move (mv, rename, ren)
   patch
   propdel (pdel, pd)
   propedit (pedit, pe)
   propget (pget, pg)
   proplist (plist, pl)
   propset (pset, ps)
   relocate
   resolve
   resolved
   revert
   status (stat, st)
   switch (sw)
   unlock
   update (up)
   upgrade

Subversion is a tool for version control.
For additional information, see http://subversion.apache.org/
```

### 检出操作

```bash
svn checkout/co https://url:port/path/to/repo --username=user_name
```

### 提交代码

- **添加代码到版本控制库**

```bash
svn add ./*[指定文件路径]
```

- **提交代码到远程仓库**

```bash
svn commit -m "commit message" ./*[指定文件路径]
```

### 更新代码

```
svn update [-r 版本号] [指定文件路径]
```

### 参考文档

1. [Subversion - ArchWiki (archlinux.org)](https://wiki.archlinux.org/title/Subversion#Create_a_repository)
2. [ArchLinux 上安装 SVN 及检出项目-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/288076)
