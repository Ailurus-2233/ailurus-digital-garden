---
title: WPF开发常用的框架
createTime: 2026/03/17 09:25:03
permalink: /blog/njln150k/
---
title: WPF开发常用的框架
createTime: 2025/06/19 09:55:33
permalink: /blog/wzu324rw/
tags: [WPF, C#, MVVM框架]
---

| 框架名称                  | 集成功能                                                                         | 开源协议 | 最后更新时间                  | 特点                                         |
| ------------------------- | -------------------------------------------------------------------------------- | -------- | ----------------------------- | -------------------------------------------- |
| **Prism**                 | MVVM、导航、模块化、依赖注入(Unity/Autofac/DryIoc)、事件聚合器、命令绑定等       | MIT 协议 | 2025 年持续维护中             | 企业级首选，模块化、可扩展性强，适合大型项目 |
| **CommunityToolkit.Mvvm** | MVVM 模板、命令、属性绑定、RelayCommand、ObservableObject、Source Generator 支持 | MIT 协议 | 2025 年活跃维护中             | 微软官方出品，性能优、轻量                   |
| **ReactiveUI**            | MVVM + 响应式编程(Rx.NET)，双向绑定、命令、异步支持、ViewModel 生命周期管理等    | MIT 协议 | 2025 年更新中                 | 高交互应用首选，适合高复杂度界面             |
| **Caliburn.Micro**        | MVVM、自动绑定(命名约定)、导航、协程支持                                         | MIT 协议 | 2024 年维护中（近年相对稳定） | 小巧高效，适合中型项目，绑定逻辑简洁         |
| **MVVM Light（已归档）**  | 基本 MVVM 支持：命令、Messenger、ViewModelLocator 等                             |          | 2021 年停止维护               | 曾广泛使用，适合学习，不建议新项目使用       |

如果要快速开发推荐使用

1. CommunityToolkit.Mvvm
	- 优点：
		1. 微软官方出品，长期维护
		2. 整个库无第三方依赖，不会污染项目结构
		3. 使用 C# Source Generator 自动生成大量样板代码（如属性通知、命令绑定等）
		4. 不依赖反射，生成的是编译时代码，运行速度快，对比传统 MVVM 框架，如 Prism、MVVM Light，有更少的运行时开销
	- 缺点：
		1. 功能仅限于 MVVM，命令和属性的绑定，常用开发功能例如事件聚合器，依赖注入，模块化等功能需要其他开源工具或自己开发
		2. 因为大量逻辑由 Source Generator 生成，调试时代码不显式存在，有时不如手写清晰。
		3. 缺少 UI 级别绑定扩展，如 Prism 的 ViewModelLocator 自动关联 View 和 ViewModel
		4. 不提供 UI 控件或样式包，UI 需另选配套
2. Caliburn.Micro
	- 优点：
		1. 通过命名规则自动完成 View 和 ViewModel 的绑定，例如 `MainView.xaml` 会自动关联 `MainViewModel.cs`，`Button x:Name="Save"` 可自动调用 `Save()` 方法。
		2. 通过 `ActionMessage` 实现行为绑定，例如：`<Button cal:Message.Attach="Save" />` 可自动绑定到 `Save()` 方法，无需写 `ICommand`，适合中等复杂度的交互。
		3. 导航与生命周期支持完善，支持 `INavigationService`、ViewModel 生命周期方法（如 `OnActivate`, `OnDeactivate`）。
		4. 可使用 `IEnumerator<IResult>` 编写异步流程逻辑（如动画、导航等）
		5. 框架本体非常轻量，无额外依赖库，适合对项目体积敏感的场景。
		6. 在 WPF 历史上拥有长期使用基础，有大量博客、例子、商业产品应用记录。
	- 缺点：
		1. 约定优于配置虽然能节省代码，但隐式绑定行为难以调试
		2. 官方文档有限，部分内容过时
		3. 更复杂的命令机制和 `INotifyPropertyChanged` 仍需大量手写
		4. 协程逻辑在现代异步/await 场景下显得有些奇怪
		5. 不提供 UI 控件或样式包，UI 需另选配套
3. Prism
	- 优点：
		1. 开发功能完备，集成了MVVM，导航，模块系统，事件聚合器，依赖注入等功能
		2. 拥有完整的官方文档、视频教程（如 Brian Lagunas 的频道）和示例项目
		3. 可通过扩展服务（如导航、日志、对话服务）插入项目自定义的逻辑代码
		4. 与 WPF 的资源系统、命令绑定、数据模板等功能高度兼容
	- 缺点：
		1. 初始化需要手动配置 IOC 容器、模块注册、服务注册等；
		2. 虽然支持 ViewModel 自动绑定，但没有像 Caliburn.Micro 那样依赖命名约定全自动，不支持 C# Source Generator（如 CommunityToolkit.Mvvm 的 `[ObservableProperty]`），仍需手写通知代码
		3. 相比 CommunityToolkit.Mvvm 或 Caliburn.Micro，Prism 的依赖较多
		4. 不提供 UI 控件或样式包，仅关注架构，UI 需另选配套


