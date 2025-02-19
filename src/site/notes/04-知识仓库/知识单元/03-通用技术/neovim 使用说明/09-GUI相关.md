---
{"title":"09-GUI相关","note_type":"knowledge_base","description":null,"tags":["开发工具","neovim"],"create_time":"2024-08-13","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"neovim 使用说明","permalink":"/04-知识仓库/知识单元/03-通用技术/neovim 使用说明/09-GUI相关/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-13","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/03-通用技术/neovim 使用说明\|neovim 使用说明]]

### 使用鼠标

- `mouse` neovim 使用鼠标的模式
- `mousemodel` 鼠标点击有什么效果
- `mousetime` 双击的鼠标间隔
- `mousehide` 再输入时隐藏鼠标
- `selectmode` 是否鼠标能够启动 Visual 或者 Select 模式

### 使用剪切板

在 Windows 中不能使用剪贴板相关的快捷键，在 Linux/macos 中可以使用，在 Linux 中一些终端 当鼠标选中相关文本后，直接会将文本添加到剪贴板中，不需要额外任何操作。

**相关快捷键：**

- `"*P` 将剪贴板的内容粘贴到指定位置
- `"+<move>` 使用 `"+` 来复制选中的内容到 `+` 寄存器中
- `"+P` 将 `+` 寄存器中的内容粘贴到指定位置

### Select 模式

Select 模式与 Visual 模式类似，因为它也用于选择文本。但是有一个明显的区别: 当键入文本时，选定的文本将被删除，而键入的文本将替换它。

在 Windows 中需要通过 `set selectedmode+=mouse` 来启动 Select 模式。通过鼠标便能进入 Selected 模式，然后随便输入内容便会替换选中内容，如果我想扩展选中区域 `hjkl` 已经无法使用了，只能使用位移函数键例如 `<S-Left>`、`<S-End>` 等。

> 注：不好使
