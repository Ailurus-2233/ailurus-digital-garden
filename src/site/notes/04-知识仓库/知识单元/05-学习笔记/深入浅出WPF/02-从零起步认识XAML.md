---
{"title":"02-从零起步认识XAML","note_type":"knowledge_base","description":"深入浅出WPF第二章的学习笔记","tags":["WPF"],"create_time":"2024-03-05","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"深入浅出WPF","permalink":"/04-知识仓库/知识单元/05-学习笔记/深入浅出WPF/02-从零起步认识XAML/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-03-05","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/05-学习笔记/深入浅出WPF\|深入浅出WPF]]

### WPF 项目构成

1. Properties 分支：里面的主要内容是程序要用到的一些资源（如图标、图片、静态的字符串）和配置信息。
2. References 分支：标记了当前这个项目需要引用哪些其他的项目，[里面列出来的条目.NET](http://xn--79qpcz12gpa964qhsam81m4lj.NET) Framework 类库或其他程序员编写的项目及类库。
3. App.xaml 分支：程序的主体。大家知道，在 Windows 系统里，一个程序就是一个进程。Windows 还规定，一个 GUI 进程需要有一个窗体作为主窗体。App.xaml 文件的作用就是声明了程序的进程会是谁，同时指定了程序的主窗体是谁。在这个分支里还有一个文件 App.xaml.cs,它是 App.xaml 的后台代码。
4. MainWindow.xaml 分支：程序的主窗体，它也具有自己的后台代码 MainWindow.xaml.cs。

### XAML 概述

XAML 是一种由 XML 派生而来的语言，所以很多 XML 中的概念在 XAML 是通用的。比如，使用标签声明一个元素（每个元素对应内存中的一个对象）时，需要使用起始标签<Tag>和终止标签</Tag>,夹在起始标签和终止标签中的 XAML 代码表示是隶属于这个标签的内容。如果没有什么内容隶属于某个标签，则这个标签称为空标签，可以写为<Tag/>。

#### Property 与 Attribute

Property 属于面向对象理论范畴。在使用面向对象思想编程的时候，常常需要对客观事物进行抽象，再把抽象出来的结果封装成类，类中用来表示事物状态的成员就是 Property。

Attribute 则是编程语言文法层面的东西。比如有两个同类的语法元素 A 和 B,为了表示 A 与 B 不完全相同或者 A 与 B 在用法上有些区别，这时候就要针对 A 和 B 加一些 Attribute。

因为 XAML 是用来在 UI 上绘制控件的，而控件本身就是面向对象抽象的产物，所以 XAML 标签的 Attribute 里就有一大部分是与控件对象的 Property 互相对应的.当然，这还意味着 XAML 标签还有一些 Attribute 并不对应控件对象的 Property。

### XAML 初步标签详解

```xml
<Window>
	<Grid>
	</Grid>
</Window>
```

XAML 是一种 " 声明 " 式语言，当你见到一个标签，就意味着声明了一个对象，对象之间的层级关系要么是并列、要么是包含，全都体现在标签的关系上.对于任何一个**WPF 窗口**，**总体结构是一个<Window>标签内部包含着一个<Grid>标签**（或者说＜Grid＞标签是＜Window＞标签的内容），代表的含义是一个窗体对象内嵌套着一个 Grid 对象。

```xml
x:Class="MyFirstWpfApplication.MainWindow"
xmlns="<http://schemas.microsoft.com/winfx/2006/xaml/presentation>"
xmlns:x="<http://schemas.microsoft.com/winfx/2006/xamr>
Title="Window!" Heighr"300" Width=”300"
```

这些代码就都是<Window>标签的 Attribute，其中，Title、Height 和 Width 一看就知道是与 Window 对象的 Property 相对应的。中间两行（即两个 `xmlns`）是在声明名称空间，这两个地址定义了一个或一组的类库。最上面一行是在使用名为 Class 的 Attribute，这个 Attribute 来自于 `x:` 前缀所对应的名称空间。

```xml
xmlns[:可选的映射前缀]="名称空间"
```

XML 语言有一个功能就是可以在 XML 文档的标签上使用 xmlns 特征来定义名称空间（Namespace）, xmlns 也就是 XML-Namespace 的缩写了。定义名称空间的好处就是，当来源不同的类重名时，可以使用名称空间加以区分。xmlns 后可以跟一个可选的映射前缀，之间用冒号分隔。如果没有写可选映射前缀，那就意味着所有来自于这个名称空间的标签前都不用加前缀，这个没有映射前缀的名称空间称为 " 默认名称空间 "。默认名称空间只能有一个，而且应该选择其中元素被最频繁使用的名称空间来充当默认名称空间。

### XAML 本质

x:Class 这个 Attribute 的作用是当 XAML 解析器将包含它的标签解析成 C#类后，这个类的类名是什么。这里，已经触及到的 XAML 的本质。前面我们已经看到，示例代码的结构就是使用 XAML 语言直观地告诉我们，当前被设计的窗体是在一个<Window>里面嵌套了一个<Grid>。xaml 文件中声明的类和其对应的 cs 文件共同编译生成一个类，其中 cs 文件中的 class 声明为

```csharp
public partial class MainWindow : Window
```

通过 partial 关键字，就可以将一个类分为两个部分一起编译，在 xaml 中，主要定义了类的样式，动画等，而在 cs 文件中，主要定义了类的逻辑代码等。
