---
{"dg-publish":true,"permalink":"/04//06//idea-vim/","title":"IdeaVim","tags":["jetbrains","plugins","visual studio","visual studio code"]}
---


所属知识库：[[04-知识仓库/归纳目录/06-其他归纳/开发工具插件\|开发工具插件]]

## 插件说明

IdeaVim 是一个为 Jetbrains 提供 vim 操作的插件，可以让你在 Jetbrains 的 IDE 中使用 vim 的操作方式。

## 使用说明

在插件市场中搜索 IdeaVim，安装后重启 IDE 即可使用。

### Vim 基础操作

** 光标移动 **

|   操作   | 说明           |
|:--------:|:-------------- |
|   {n}h   | 光标左移       |
|   {n}j   | 光标下移       |
|   {n}k   | 光标上移       |
|   {n}l   | 光标右移       |
| {n}space | 向右移动       |
|    0     | 移动到行首     |
|    $     | 移动到行尾     |
|    H     | 移动到屏幕顶部 |
|    M     | 移动到屏幕中部 |
|    L     | 移动到屏幕底部 |
|    gg    | 移动到文件头   |
|    G     | 移动到文件尾   |
|   {n}G   | 移动到第 n 行  |
| {n}enter | 向下移动 n 行  |

** 查找/替换 **

|         操作          | 说明                              |
|:---------------------:|:--------------------------------- |
|           /           | 查找                              |
|?           | 反向查找                          |
|           n           | 查找下一个                        |
|:n1,n2s/word1/word2/g | 替换 n1 行到 n2 行中的 word1 为 word2 |
|:%s/word1/word2/g   | 替换全部 word1 为 word2           |
|:%s/word1/word2/gc   | 替换全部 word1 为 word2，需要确认 |

** 文档操作 **

|  操作  | 说明                                       |
|:------:|:------------------------------------------ |
| {n}x,X | 删除光标处字符，x 为向后删除，X 为向前删除 |
| {n}dd  | 删除行                                     |
|  d1G   | 删除到文件头                               |
|   dG   | 删除到文件尾                               |
|   d$   | 删除到行尾                                 |
|   d0   | 删除到行首                                 |
| {n}yy  | 复制行                                     |
|  y1G   | 复制到文件头                               |
|   yG   | 复制到文件尾                               |
|   y0   | 复制到行首                                 |
|   y$   | 复制到行尾                                 |
|  p,P   | 粘贴, p 为向后粘贴，P 为向前粘贴           |
|   J    | 合并行                                     |
|   u    | 撤销                                       |
|.    | 重复上一个操作                             |

** 编辑模式 **

|  操作  | 说明             |
|:------:|:---------------- |
|   i    | 在光标处插入     |
|   I    | 在行首插入       |
|   a    | 在光标后插入     |
|   A    | 在行尾插入       |
|   o    | 在下一行插入     |
|   O    | 在上一行插入     |
|   r    | 替换光标处字符   |
|   R    | 替换光标处字符   |
|   v    | 选中字符         |
|   V    | 选中行           |
|   ctrl+v | 选中块         |

** 退出 **

|    操作    | 说明               |
|:----------:|:------------------ |
|    esc     | 退出编辑模式       |
|:q     | 退出               |
|:w     | 保存               |
|:wq     | 保存并退出         |
|:q!     | 强制退出           |
|:wq!    | 强制保存并退出     |
|:e!     | 放弃修改           |
|:qa!    | 强制退出所有文件   |
|:qa     | 退出所有文件       |
|:wqa    | 保存并退出所有文件 |
|:w file   | 另存为 file        |
|:! command | 执行 shell 命令    |

这里只是列举了一些常用的操作，更多操作可以查看 vim 的文档，后续会总结更多的操作到 [[04-知识仓库/归纳目录/03-通用技术/neovim 使用说明\|neovim 使用说明]]

### 个性化配置

创建 `~/.ideavimrc` 文件，以下是我的配置文件：

```vimrc
" extension 添加vim插件  
Plug 'preservim/nerdtree'  
" Plug 'easymotion/vim-easymotion'  
  
" settings 基本设置  
set easymotion  
set which-key  
set notimeout  
  
" 光标距离顶部和底部的距离  
set scrolloff=10  
" 搜索时实时匹配  
set incsearch           
" 搜索时忽略大小写  
set ignorecase     
" 高亮显示搜索结果  
set hlsearch        
" 显示行号  
set number   " normal模式下保持英文输入法  
set keep-english-in-normal    " 系统剪贴板共享  
set clipboard=unnamedplus               
  
" keymap 快捷键映射              
" 回车键换行  
nmap <CR> o<Esc>      " shift+回车键换行  
nmap <S-Enter> O<Esc>                        
" 下一个tab  
nmap L <action>(NextTab)     
" 上一个tab  
nmap H <action>(PreviousTab)  
  
" 退出插入模式  
imap qq <Esc>  
  
" leader 映射  
" 设置leader键为 ;let mapleader = " "  
let g:WhichKeyDesc_LeaderKeymap= "<leader> 显示快捷键帮助"  
  
" b  
" bb 构建当前项目  
nmap <leader>bb <action>(BuildCurrentProject)        
" 构建整个解决方案  
nmap <leader>ba <action>(BuildSolutionAction)   
" 重建项目  
nmap <leader>brb <action>(RebuildCurrentProject)  
" 重建整个解决方案  
nmap <leader>bra <action>(RebuildSolutionAction)   
  
" b which-key 描述  
let g:WhichKeyDesc_B = "<leader>b 构建"  
let g:WhichKeyDesc_BuildCurrentProject = "<leader>bb 构建当前项目"  
let g:WhichKeyDesc_BuildSolutionAction = "<leader>ba 构建整个解决方案"  
let g:WhichKeyDesc_BR = "<leader>br 重建"  
let g:WhichKeyDesc_RebuildCurrentProject = "<leader>brb 重建当前项目"  
let g:WhichKeyDesc_RebuildSolutionAction = "<leader>bra 重建整个解决方案"  
  
" c  
" 代码补全  
nmap <leader>cc <action>(CodeCompletion)      
" 代码提示  
nmap <leader>ci <action>(CodeInspection.OnEditor)          
" 代码格式化  
nmap <leader>cf gq \| <action>(ReformatCode) \| <action>(OptimizeImports)   
  
" c which-key 描述  
let g:WhichKeyDesc_C = "<leader>c 代码"  
let g:WhichKeyDesc_CodeCompletion = "<leader>cc 代码补全"  
let g:WhichKeyDesc_CodeInspection = "<leader>ci 代码提示"  
let g:WhichKeyDesc_ReformatCode = "<leader>cf 代码格式化"  
  
" d  
" 调试  
nmap <leader>db <action>(Debug)    
" 切换断点  
nmap <leader>dp <action>(ToggleLineBreakpoint)           
  
" d which-key 描述  
let g:WhichKeyDesc_D = "<leader>d 调试"  
let g:WhichKeyDesc_Debug = "<leader>db 调试"  
let g:WhichKeyDesc_ToggleLineBreakpoint = "<leader>dp 切换断点"  
  
" e  
" 打开文件  
nmap <leader>ef <action>(OpenFile)  
" 打开项目工具窗口  
nmap <leader>ee <action>(ActivateProjectToolWindow)  
  
" e which-key 描述  
let g:WhichKeyDesc_E = "<leader>e 编辑"  
let g:WhichKeyDesc_OpenFile = "<leader>ef 打开文件"  
let g:WhichKeyDesc_ActivateProjectToolWindow = "<leader>ee 打开项目工具窗口"  
  
" f  
" 查找文件  
nmap <leader>ff <action>(GotoFile)   
" 全局查找动作  
nmap <leader>fa <action>(FindSelectionInPath)   
" 取消搜索高亮  
nmap <leader>fs :nohlsearch<CR>  
  
" f which-key 描述  
let g:WhichKeyDesc_F = "<leader>f 查找"  
let g:WhichKeyDesc_GotoFile = "<leader>ff 查找文件"  
let g:WhichKeyDesc_GotoAction = "<leader>fa 全局查找"  
let g:WhichKeyDesc_ClearSearchHighlight = "<leader>fs 取消搜索高亮"  
  
" g  
" 跳转到下一个错误  
nmap <leader>ge <action>(GotoNextError)       
" 跳转到上一个错误  
nmap <leader>gE <action>(GotoPreviousError)  
" 跳转到定义  
nmap <leader>gd <action>(GotoDeclaration)     
" 跳转到文档中上一个方法声明处  
nmap <leader>gm <action>(MethodUp)  
" git 回滚  
nmap <leader>gr <action>(Vcs.RollbackChangedLines)  
" git 显示历史不同  
nmap <leader>gh <action>(Vcs.ShowTabbedFileHistory)  
" git 提交  
nmap <leader>gc <action>(Vcs.QuickListPopupAction)  
  
" g  which-key 描述  
let g:WhichKeyDesc_G = "<leader>g 跳转&Git"  
let g:WhichKeyDesc_GotoNextError = "<leader>ge 跳转到下一个错误"  
let g:WhichKeyDesc_GotoPreviousError = "<leader>gE 跳转到上一个错误"  
let g:WhichKeyDesc_GotoDeclaration = "<leader>gd 跳转到定义"  
let g:WhichKeyDesc_MethodUp = "<leader>gm 跳转到文档中上一个方法声明处"  
let g:WhichKeyDesc_RollbackChangedLines = "<leader>gr git 回滚"  
let g:WhichKeyDesc_ShowTabbedFileHistory = "<leader>gh git 显示历史不同"  
let g:WhichKeyDesc_QuickListPopupAction = "<leader>gc git 提交"  
  
" w  
" 向右复制标签页  
nmap <leader>wsv <action>(SplitVertically)  
“ 向下复制标签页  
nmap <leader>wsh <action>(SplitHorizontally)  
" 取消当前分割窗口  
nmap <leader>wsc <action>(Unsplit)  
" 取消所有分割窗口  
nmap <leader>wsa <action>(UnsplitAll)  
  
" 隐藏/显示所有窗口  
nmap <leader>wha <action>(HideAllWindows)  
" 隐藏/显示窗口  
nmap <leader>whc <action>(HideActiveWindow)  
  
" 关闭当前窗口  
nmap <leader>wcc <action>(CloseActiveTab)  
" 关闭所有窗口  
nmap <leader>wca <action>(CloseAllEditors)  
" 关闭其他窗口  
nmap <leader>wco <action>(CloseAllEditorsButActive)  
  
" 切换左边窗口  
nmap <leader>wth <c-w>h  
" 切换右边窗口  
nmap <leader>wtl <c-w>l  
" 切换上边窗口  
nmap <leader>wtk <c-w>k  
" 切换下边窗口  
nmap <leader>wtj <c-w>j  
  
" 向右移动标签页  
nmap <leader>wmh <action>(MoveTabRight)  
" 向左移动标签页  
nmap <leader>wml <action>(MoveTabLeft)  
" 向下移动标签页  
nmap <leader>wmj <action>(MoveTabDown)  
" 向上移动标签页  
nmap <leader>wmk <action>(MoveTabUp)  
" 在另一边打开  
nmap <leader>wmo <action>(MoveEditorToOppositeTabGroup)  
  
  
" w which-key 描述  
let g:WhichKeyDesc_W = "<leader>w 窗口"  
let g:WhichKeyDesc_WS = "<leader>ws 分割窗口"  
let g:WhichKeyDesc_SplitVertically = "<leader>wsv 向右复制标签页"  
let g:WhichKeyDesc_SplitHorizontally = "<leader>wsh 向下复制标签页"  
let g:WhichKeyDesc_Unsplit = "<leader>wsc 取消当前分割窗口"  
let g:WhichKeyDesc_UnsplitAll = "<leader>wsa 取消所有分割窗口"  
let g:WhichKeyDesc_WH = "<leader>wh 隐藏/显示"  
let g:WhichKeyDesc_HideAllWindows = "<leader>wha 隐藏/显示所有窗口"  
let g:WhichKeyDesc_HideActiveWindow = "<leader>whc 隐藏/显示窗口"  
let g:WhichKeyDesc_WC = "<leader>wc 关闭"  
let g:WhichKeyDesc_CloseActiveTab = "<leader>wcc 关闭当前窗口"  
let g:WhichKeyDesc_CloseAllEditors = "<leader>wca 关闭所有窗口"  
let g:WhichKeyDesc_CloseAllEditorsButActive = "<leader>wco 关闭其他窗口"  
let g:WhichKeyDesc_WT = "<leader>wt 切换"  
let g:WhichKeyDesc_GOTOLeft = "<leader>wth 切换左边窗口"  
let g:WhichKeyDesc_GOTORight = "<leader>wtl 切换右边窗口"  
let g:WhichKeyDesc_GOTOTop = "<leader>wtk 切换上边窗口"  
let g:WhichKeyDesc_GOTOBot = "<leader>wtj 切换下边窗口"  
let g:WhichKeyDesc_WM = "<leader>wm 移动标签页"  
let g:WhichKeyDesc_MoveTabRight = "<leader>wmh 向右移动标签页"  
let g:WhichKeyDesc_MoveTabLeft = "<leader>wml 向左移动标签页"  
let g:WhichKeyDesc_MoveTabDown = "<leader>wmj 向下移动标签页"  
let g:WhichKeyDesc_MoveTabUp = "<leader>wmk 向上移动标签页"  
let g:WhichKeyDesc_MoveEditorToOppositeTabGroup = "<leader>wmo 在另一边打开"  
  
" n  
" 打开/关闭文件管理  
nmap <leader>nn <action>(ActivateProjectToolWindow)   
" 新建文件夹  
nmap <leader>nd <action>(NewDir)  
" 新建文件  
nmap <leader>nf <action>(NewFile)  
" 定位到当前文件  
nmap <leader>np :NERDTreeFind<CR>  
  
" n which-key 描述  
let g:WhichKeyDesc_N = "<leader>n NERDTree"  
let g:WhichKeyDesc_NERDTreeToggle = "<leader>nn 打开/关闭文件管理"  
let g:WhichKeyDesc_NewDir = "<leader>nd 新建文件夹"  
let g:WhichKeyDesc_NewFile = "<leader>nf 新建文件"  
let g:WhichKeyDesc_NewClass = "<leader>nc 新建类"  
let g:WhichKeyDesc_NERDTreeFind = "<leader>np 定位到当前文件"  
  
" r  
" 运行  
nmap <leader>ru <action>(Run)  
" 重新运行  
nmap <leader>ra <action>(Rerun)  
" 重命名  
nmap <leader>rn <action>(RenameElement)  
  
" r which-key 描述  
let g:WhichKeyDesc_R = "<leader>r 运行 & 重构"  
let g:WhichKeyDesc_Run = "<leader>ru 运行"  
let g:WhichKeyDesc_Rerun = "<leader>ra 重新运行"  
let g:WhichKeyDesc_RenameElement = "<leader>rn 重命名"  
  
" s  
" 显示文件结构  
nmap <leader>ss <action>(FileStructurePopup)  
" 显示书签  
nmap <leader>sb <action>(ShowBookmarks)  
" 显示参数信息  
nmap <leader>sp <action>(ParameterInfo)  
" 停止  
nmap <leader>st <action>(Stop)  
  
" s which-key 描述  
let g:WhichKeyDesc_S = "<leader>s 显示"  
let g:WhichKeyDesc_FileStructurePopup = "<leader>ss 显示文件结构"  
let g:WhichKeyDesc_ShowBookmarks = "<leader>sb 显示书签"  
let g:WhichKeyDesc_ParameterInfo = "<leader>sp 显示参数信息"  
let g:WhichKeyDesc_Stop = "<leader>st 停止"  
  
" z  
" 展开/折叠当前代码  
nmap <leader>zz <action>(ExpandCollapseToggleAction)  
  
" 全部折叠  
nmap <leader>zaz <action>(CollapseAll)  
" 叠全部区域  
nmap <leader>zar <action>(CollapseAllRegin)  
  
" 展开全部代码  
nmap <leader>zea <action>(ExpandAll)  
" 展开全部区域  
nmap <leader>zer <action>(ExpandAllRegion)  
  
" z which-key 描述  
let g:WhichKeyDesc_Z = "<leader>z 展开/折叠"  
let g:WhichKeyDesc_ExpandCollapseToggleAction = "<leader>zz 展开/折叠当前代码"  
let g:WhichKeyDesc_ZA  = "<leader>za 折叠"  
let g:WhichKeyDesc_CollapseAll = "<leader>zaz 全部折叠"  
let g:WhichKeyDesc_CollapseAllRegion = "<leader>zar 折叠全部区域"  
let g:WhichKeyDesc_ZE = "<leader>ze 展开"  
let g:WhichKeyDesc_ExpandAll = "<leader>zea 展开全部代码"  
let g:WhichKeyDesc_ExpandAllRegion = "<leader>zer 展开全部区域"

```
