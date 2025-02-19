---
{"title":"01 cpp  简介","note_type":"knowledge_base","description":"学习C++ Primer 的学习笔记","tags":["cpp"],"create_time":"2024-03-05","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"cpp Primer","permalink":"/04-知识仓库/知识单元/05-学习笔记/cpp Primer/01 cpp  简介/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-03-05","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/05-学习笔记/cpp Primer\|cpp Primer]]

### 01 编译器

**g++**：

- 编译：`g++ --std=c++11 code_name.cpp -o main`
- 运行：`./prog1`
- 查看运行结果：`echo $?`
- 编译多个文件: `g++ code_name1.cpp code_name2.cpp -o main`

输入 `g++ --help` 获得编译器选项

```
Usage: g++ [options] file…
Options:
  -pass-exit-codes         Exit with highest error code from a phase
  --help                   Display this information
  --target-help            Display target specific command line options
  --help={common|optimizers|params|target|warnings|[^]{joined|separate|undocumented}}[,…]
                           Display specific types of command line options
  (Use '-v --help' to display command line options of sub-processes)
  --version                Display compiler version information
  -dumpspecs               Display all of the built in spec strings
  -dumpversion             Display the version of the compiler
  -dumpmachine             Display the compiler's target processor
  -print-search-dirs       Display the directories in the compiler's search path
  -print-libgcc-file-name  Display the name of the compiler's companion library
  -print-file-name=<lib>   Display the full path to library <lib>
  -print-prog-name=<prog>  Display the full path to compiler component <prog>
  -print-multiarch         Display the target's normalized GNU triplet, used as
                           a component in the library path
  -print-multi-directory   Display the root directory for versions of libgcc
  -print-multi-lib         Display the mapping between command line options and
                           multiple library search directories
  -print-multi-os-directory Display the relative path to OS libraries
  -print-sysroot           Display the target libraries directory
  -print-sysroot-headers-suffix Display the sysroot suffix used to find headers
  -Wa,<options>            Pass comma-separated <options> on to the assembler
  -Wp,<options>            Pass comma-separated <options> on to the preprocessor
  -Wl,<options>            Pass comma-separated <options> on to the linker
  -Xassembler <arg>        Pass <arg> on to the assembler
  -Xpreprocessor <arg>     Pass <arg> on to the preprocessor
  -Xlinker <arg>           Pass <arg> on to the linker
  -save-temps              Do not delete intermediate files
  -save-temps=<arg>        Do not delete intermediate files
  -no-canonical-prefixes   Do not canonicalize paths when building relative
                           prefixes to other gcc components
  -pipe                    Use pipes rather than intermediate files
  -time                    Time the execution of each subprocess
  -specs=<file>            Override built-in specs with the contents of <file>
  -std=<standard>          Assume that the input sources are for <standard>
  --sysroot=<directory>    Use <directory> as the root directory for headers
                           and libraries
  -B <directory>           Add <directory> to the compiler's search paths
  -v                       Display the programs invoked by the compiler
  -####                     Like -v but options quoted and commands not executed
  -E                       Preprocess only; do not compile, assemble or link
  -S                       Compile only; do not assemble or link
  -c                       Compile and assemble, but do not link
  -o <file>                Place the output into <file>
  -pie                     Create a position independent executable
  -shared                  Create a shared library
  -x <language>            Specify the language of the following input files
                           Permissible languages include: c c++ assembler none
                           'none' means revert to the default behavior of
                           guessing the language based on the file's extension
```

可以通过 `g++ {option} --help` 查看具体选项的帮助信息

```
-h FILENAME, -soname FILENAME: Set internal name of shared library
-I PROGRAM, --dynamic-linker PROGRAM: Set PROGRAM as the dynamic linker to use
-l LIBNAME, --library LIBNAME: Search for library LIBNAME
-L DIRECTORY, --library-path DIRECTORY: Add DIRECTORY to library search path
```

> [!info] 注
> 1. 值得注意的是，在 main 函数中返回非 0 的数，在终端中认为有返回码，非正常执行，而返回 0，则表示正常执行。在部分 shell 程序中能够体现出程序的执行情况。具体的返回码可以通过 `echo $?` 查看。
> 2. 可以通过 `./main < input.txt > output.txt` 来实现输入输出重定向

### 02 简单的 C++ 程序

每个 C++ 程序都要有一个或者多个函数 (function)，其中必须有一个**main**函数。

```cpp
int main() {
    return 0;
}
```

一个函数包含 4 个部分

1. 返回类型，可以是任意的数据类型，但是 main 的返回类型必须是 int
2. 函数名，满足 c++ 函数命名规范的任意字符构成，原则上需要表示该函数的功能
3. 形参列表，由 type_name arg_name,这样的数据对置于函数名后的圆括号内构成
4. 函数体，由花括号包裹的一段指令语句

### IO 输入输出

C++ 需要通过 `#include<iostream>` 来引入 IO 流相关的**标准库**，`iostream` 是一个**头文件**(header)。这个库中包含了两个基础类型 `istream` 和 `ostream`，分别表示输入流和输出流。

> [!info] 注  
> 一个流就是一个字符序列，是从设备读出或写入设备的。
>
> **流** 所表达的是，随着时间的推移，字符是顺序生成或消耗的。

#### 标准输入输出对象

- `cin`: istream 类型的对象，用于处理输入，也称 **标准输入**
- `cout`：ostream 类型的对象，用于输出信息，也称 **标准输出**
- `cerr`: ostream 类型的对象，用于输出警告以及错误，也称 **标准错误**
- `clog`: ostream 类型的对象，用于输出程序运行时的一般性信息

> [!info] 注
>
> 1. 系统通常将程序所运行的窗口与这些对象关联起来。如果我们使用 `cin`，数据将从程序正在运行的窗口读入，用 `cout`、`cerr`、`clog` 时候就写到这个窗口中。
> 2. 使用 shell 执行程序时，也可以使用 `<` 指令来指定文件/设备输入，使用 `>` 指令来指定输出到特定文件/设备

#### 一个使用 IO 库的程序

在书店程序中，我们需要将多条记录合并成单一的汇总记录。

```cpp
#include<iostream>
int main() {
    std::cout << "输入2个值" << std::endl;
    int v1 = 0, v2 = 0, v3 = 0;
    std::cin >> v1 >> v2;
    std::cout << v1 << "+" << v2 << "=" << v1 + v2 << std::endl;
    return 0;
}
```

##### 代码说明

1. **输出运算符** `<<`: 左右有两个运算对象，左侧的运输对象必须是一个 `ostream` 对象，右侧的运算符对象是要输出的值，这个运算符的返回值是左侧 `ostream` 对象
2. **输入运算符** `>>`：输入运算符与输出运算符类似。接受一个 `istream` 对象作为左侧运算对象，接受一个对象作为右侧对象。
3. **作用域运算符** `::`: 在示例中指出我们用的是 std 中的 cout
4. `std::`: 指出名字 `cout` 和 `endl` 是定义在名为**std**的**命名空间**(namespace) 中的，这可以避免我们的变量与命名空间内的相冲突，但是也使得我们使用时造成麻烦。
5. `endl` 是一个**操纵符**(manipulator) 的特殊值。表示结束当前行，并将与设备关联的缓冲区 (buffer) 中的内容刷到设备中。该操作 (缓冲刷新) 可以保证目前为止所有程序所产生的输出都真正写入到输出流中，而不是在内存中等待写入。

### 注释简介

- 单行注释 `//`
- 多行注释继承 C 语言的两个界定符 `/*` 和 `*/`

> 注释界定符不能嵌套，即 `/**/` 里面不能再包含 `/**/`，如 `/*/* … */*/` 是错误写法

### 控制流

#### WHILE 语句

```cpp
while (循环条件) {
	循环体
}
```

##### 读取不定量的输入数据

```cpp
#include <iostream>
int main()
{
    int sum = 0, value = 0;
    while(std::cin >> value)    // 使用istream对象作为条件
        sum += value;
    std::cout << sum << std::endl;
    return 0；
}
```

当我们使用 istream 对象作为条件时候，就是检测流的状态。如果流是有效的，就是成功。当遇到**文件结束符**(end-of-file)，或者遇到一个无效输入时 (例如读入的值不是一个整数)，那么 `istream` 对象的状态就会变得无效。

###### 文件结束符

Windows 是 `Ctrl+Z`，然后按 `Enter` 或者 `Return`

Linux 和 Unix 是 `Ctrl+D`

#### FOR 语句

```cpp
for (初始化语句; 循环条件; 循环表达式) {
    循环体
}
```

#### IF 语句

语法

```cpp
if (条件语句) {
	条件为真执行的语句
}
```

### 类简介

C++ 中，我们通过定义一个**类**(class) 来定义自己的数据结构。

> C++ 最初的一个设计焦点就是能定义使用上像内置类型一样自然的**类类型**(class type)

类类型的声明：

```cpp
class_name obj_name;
```

#### 成员函数

在使用类类型的过程中往往会调用类中的成员，例如 `obj_name.func();` 这样的语句，其中调用名为 `func` 的**成员函数**(member function)。成员函数是定义为类的一部分的函数，有时也被称为**方法**(method)。使用**点运算符** `.` 来表达我们需要调用名为 `obj_name` 对象的 `func` 成员函数 `.` 只能用于类类型的对象。
