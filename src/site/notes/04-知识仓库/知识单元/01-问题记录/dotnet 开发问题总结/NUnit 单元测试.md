---
{"dg-publish":true,"permalink":"/04//01/dotnet/n-unit/","title":"NUnit 单元测试","tags":["csharp","dotnet"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/dotnet 开发问题总结\|dotnet 开发问题总结]]

### 什么单元测试

单元测试（Unit Testing）是针对程序弄块（软件设计的最小单位）来进行正确性检验的测试工作。单元测试通常由软件开发人员编写，用于确保他们了所写的代码匹配软件需求和遵循开发目标。

单元测试的优点：

1. **适应变更:**  允许程序员在未来重构代码，并确保模块依然工作正确。
2. **简化集成:**  采用自底向上的测试路径，消除程序单元的不可靠，使集成测试变得更简单。
3. **文档记录:**  借助于查看单元测试提供的功能和单元测试中如何使用程序单元，开发人员可以直观的理解程序单元的基础 API。
4. **表达设计:**  在测试驱动开发的软件实践中，单元测试可以取代正式的设计。

发人员编写单元测是用于展示软件需求或者软件缺陷，开发人员遵循测试要求编写最简单的代码去满足它，直到测试得以通过。

> C#的主要的测试框 架有 XUnit.Net, NUnit, MsTest, 这些都是开发社区常用的单元测试框架，具体的区别可以参考这篇文章 [C#单元测试工具对比-知乎](https://zhuanlan.zhihu.com/p/338782250)

### 如何使用

目前最新版的 Nunit 的版本是 4.0.1，可能与网上的许多 NUnit3 的教程有所冲突，检索的时候注意区分。[这里](https://docs.nunit.org/articles/nunit/release-notes/Nunit4.0-MigrationGuide.html)  是 NUnit 的官方文档地址，有记录 3.x 和 4.x 版本的区别，相关内容也可在这里检索到。

### NUnit3

目前 [官方介绍文档](https://docs.nunit.org/articles/nunit/getting-started/installation.html)  还是使用 3.x 的版本，所以先记录 NUnit3 的使用方式，NUnit4 目前还在开发中，使用可能会存在一些问题，估计能稳定使用也要一段时间了，后文会记录一些官网介绍的新功能计划。

之所以会记录这个笔记发现官方提供文档以及示例都是基于.Net Core 的，而在工作中使用的是.Net Framework，所以需要重新整理一下。

#### 创建单元测试项目

> [!info] **注意:**
>
> 一般来讲单元测试代码和被测代码是两个不同的项目，这样可以避免生成的代码和测试代码混在一起，当然也可以在同一个项目中通过引入指定包，创建单元测试代码。

![创建测试项目](https://cdn.jsdelivr.net/gh/Ailurus-2233/PicGo-ImageRepo@main/da-pc2024-01-29/202401291344748-e1442af5db1ac131.png)

在使用 vs2022 创建项目时，使用如图所示的方式创建单元测试项目，这样会自动创建一个单元测试项目，包含了 NUnit 的引用。

但是这个模板时使用.Net Core 创建的，一般来讲.Net Core 是可以引用.Net Framework 的项目的，所以通常使用这个项目模板创建的单元测试项目是可以直接使用的，但是如果想要使用.Net Framework 创建单元测试项目，需要通过 MSTest 项目模板创建。

![项目框架](https://cdn.jsdelivr.net/gh/Ailurus-2233/PicGo-ImageRepo@main/da-pc2024-01-29/202401291346614-68e4f555fd91fca3.png)

我们可以注意到，新建的项目中有以下几个依赖包：

1. Microsoft.NET.Test.Sdk
2. NUnit
3. NUnit3TestAdapter
4. NUnit.Analyzers  
5. coverlet.collector

其中前三个是必须的，后两个是可选的，其中 `coverlet.collector` 是用于生成测试覆盖率报告的，`N Unit.An a lyzers` 是用于分析 NUnit 代码的，可以在编译 时检查代码是否符合 NUnit 的 规范。

如果使用.Net Framework 创建单元测试项目，首先创建一个 MSTest 单元测试项目，然后手动 添加依赖包 `NUnit` 和 `NUnit3TestAdapter` 即可。当然推荐安装 `NUnit.Analyzers` 这样可以在编译时检查代码是否符合 NUnit 的规范，这样可以避免一些错误。`coverlet.collector` 在.Net Framework 中不支持，所以不需要安装。

#### 编辑单元测试代码

**常用特性说明：**

1. `TestFixture`：标 记一个类为测 试类，测试类 中的方法可以使用 `Test` 特 性 标记为测试方法。
2. `Test`：标记一个方法为测试方法，测试方法中可以使用 `TestCase` 特性标记为测试用例。
3. `TestCase`：标记一个方法为测试用例，测试用例中可以使用 `TestCaseSource` 特性标记为测试用例源。
4. `TestCaseSource`：标记一个方法为测试用例源，测试用例源中可以使用 `yield` 关键字返回测试用例。
5. `SetUp`：标记一个方法为测试初始化方法，测试初始化方法会在测试方法执行前执行。
6. `TearDown`：标记一个方法为测试清理方法，测试清理方法会在测试方法执行后执行。

##### Assert 断言

- 直接使用  `Assert`  断言来输出测试结果

```csharp
// 直接使用 Assert 输出测试结果
Assert.Pass();          // 测试通过
Assert.Fail();          // 测试失败
Assert.Ignore();        // 忽略测试
1ssert.Inconclusive();  // 测试不确定
```

- 使用  `Assert`  断言来判断测试结果

```csharp
// 判断测试结果
Assert.IsTrue(true);                                // 测试是否为真
Assert.IsFalse(false);                              // 测试是否为假
Assert.IsNull(null);                                // 测试是否为空
Assert.IsNotNull("test");                           // 测试是否不为空
Assert.IsEmpty("");                                 // 测试是否为空字符串
1ssert.IsNotEmpty("test");                          // 测试是否不为空字符串
```

- 使用 Assert 比较断言来判断测试结果

```csharp
Assert.AreEqual(1, 1);                              // 测试是否相等
Assert.AreNotEqual(1, 2);                           // 测试是否不相等
Assert.AreSame("test", "test");                     // 测试是否为同一个对象
Assert.AreNotSame("test", "test");                  // 测试是否不为同一个对象
Assert.IsInstanceOf(typeof(string), "test");        // 测试是否为指定类型的实例
Assert.IsNotInstanceOf(typeof(string), "test");     // 测试是否不为指定类型的实例
Assert.IsAssignableFrom(typeof(string), "test");    // 测试是否为指定类型的实例或者派生类
Assert.IsNotAssignableFrom(typeof(string), "test"); // 测试是否不为指定类型的实例或者派生类
```

##### TestFixture

- 直接使用 `TestFixture` 特性标 记一个类为测 试类，测试类中的方法可以使用 `Test` 特性标记为测试方法。

```csharp
[TestFixture]
public class TestClass {
    [Test]
    public void TestMethod() {
        // ...
    }
1
```

- 可以传入一些参数，来指定测试类中的属性

```csharp
// example 1
[TestFixture(10)]
[TestFixture(42)]
public class TestClass {
    int _x;
    public TestClass(int x) {
        _x = x;
    }

    [Test]
    public void TestMethod() {
        Assert.Pass($"X is {_x}");
    }
}

// example 2
[TestFixture(typeof(int))]
[TestFixture(typeof(string))]
public class TestClass<T> {
    [Test]
    public void TestMethod() {
        Assert.Pass($"Type is {typeof(T)}");
    }
}
```

##### Test

- 一个简单的测试单元

```csharp
[Test]
public void TestMethod() {
    Assert.Pass();
1
```

- 超时与超时重试

```csharp
[Test]
[Timeout(1000)] // 超时时间为1s
[TimeoutRetry(3)] // 超时重试次数为3次
public void TestMethod() {
    Assert.Pass();
1
```

- 异常测试

```csharp
[Test]
public void TestMethod() {
    Assert.Throws<ArgumentNullException>(() => {
        throw new ArgumentNullException();
    });
}

[Test]
[ExpectedException(typeof(ArgumentNullException))]
public void TestMethod() {
    throw new ArgumentNullException();
}
```

##### TestCase && TestCaseSource

- 直接使用  `TestCase`  特性标记一个方法为测试用例。

```csharp
[TestFixture]
public class TestClass {
    [TestCase(1, 2, 3)]
    [TestCase(2, 3, 5)]
    [TestCase(3, 4, 7)]
    public void TestMethod(int a, int b, int c) {
        Assert.AreEqual(a + b, c);
    }
1
```

- 使用  `TestCaseSource`  特性标记一个方法为测试用例源，使用  `yield`  关键字返回测试用例。

```csharp
[TestFixture]
public class TestClass {
    [TestCaseSource(nameof(TestCase))]
    public void TestMethod(int a, int b, int c) {
        Assert.AreEqual(a + b, c);
    }

    static IEnumerable TestCase {
        get {
            yield return new TestCaseData(1, 2, 3);
            yield return new TestCaseData(2, 3, 5);
            yield return new TestCaseData(3, 4, 7);
        }
    }

    // or

    private static IEnumerable<TestCaseData> TestData()
    {
        yield return new TestCaseData(2, 3, 6);
        yield return new TestCaseData(4, 5, 20);
        yield return new TestCaseData(0, 10, 0);
    }
}
```

##### SetUp && TearDown

- 使用  `SetUp`  特性标记一个方法为测试初始化方法，测试初始化方法会在测试方法执行前执行。

```csharp

[TestFixture]
public class TestClass {
    [SetUp]
    public void SetUp() {
        // ...
    }

    [Test]
    public void TestMethod() {
        // ...
    }
1
```

- 使用  `TearDown`  特性标记一个方法为测试清理方法，测试清理方法会在测试方法执行后执行。

```csharp
[TestFixture]
public class TestClass {
    [TearDown]
    public void TearDown() {
        // ...
    }

    [Test]
    public void TestMethod() {
        // ...
    }
}
```

#### 调试相关部分

##### Visual Studio

vs20 19 及以上都能够直接调试单 元测试代码，通过 `视图`>`测试资源管理器` 打开测试资源管理器，然后在测试资源管理器中选择要调试的测试。其中会将所有的测试用例列出来，可以选择要调试的测试用例，然后点击运行按钮，或者选择第一个按钮，可以全部执行。当然也可以执行相关的断点调试，在代码中设置断点，然后再测 试资源管理器中选择要调试的测试用例，右键选择 `调试`，即可进入断点调试

![测试资源管理器](https://cdn.jsdelivr.net/gh/Ailurus-2233/PicGo-Image Repo@main/da-pc2024-01-29/202401291653765-0b46d83f896e4adc.png)

也可以直接在代码编辑器中，在要执行的测试函数上右键，选择执行测试 (快捷键  `ctrl + R, T`)，或者调试测试 (快捷键 `ctrl+R, ctrl+ T`)，即可执行或者调试测试。

## #### Resharper

通过 `扩展>Resharper>Unit Test>Unit  Test Explorer `(快捷键 `ctrl+alt+U`) 打开单元测试资源管理器，然后在单元测试资源管理器中选择要调试的测试。其中会将所有的测试用例列出来，可以选择要调试的测试用例，右 键选 择 `Run Unit Test` 或者 `Debug Unit Test`，即可执行或者调试测试。

![resharp er test explorer](https:// cdn.jsdelivr.net/gh/ Ailur us-2233/PicGo-ImageR epo@main/da-pc2024-01-29/202401291704822-c2f416d9eae8d158.png)

除此之外，还可以选择 `Unit Test Sessions`，操作逻辑与 `Unit Test Explorer` 类似，但是 `Unit Test Sessions` 可以将测试结果保存到本地，方便后续查看。

![resharper test explorer](http s://cdn.jsdeliv r. net/gh/Ailurus-2233/PicGo-ImageRepo@main/da-pc2024-01-29/202401291707637-692a7c0366cdd3ff.png)

同样的，也可以直接在代码编辑器中，在要执行的测试函数上右键，选择 `Run Unit Test` 或者 `Debug Unit Test`，即可执行或者调试测试。

### 覆盖率

在测试资源管理器中，选择要 测试的测试用例，右键选择 `分析代码覆盖率`，即可生成代码覆盖率报告。在报告中可以看到测试覆盖率的相关信息，为我们编写测试用例提供了参考。

同样 Resharper 也 提供了代码覆盖率的功能，通过扩展>Resharper>Unit Test>Unit Test Explorer 打开单元测试资源管理器，然后选择要测试的测试用例，右键选择 `Run Unit Tests Under Coverage`，即可生成代码覆盖率报告，生成的结果相较于测试资源管理器中的结果更加直观。

![test coverage](https://cdn.jsdelivr.net/gh/Ailurus-2233/PicGo-ImageRepo@main/da-pc2024-01-29/202401291713119-9fbc1d27c7def2d4.png)

## NUnit4

NUnit4 的使用方式与 NUnit3 的使用方式有所不同，NUnit4 的使用方式更加简单，但是目前还在开发中，可能会存在一些问题，所以不推荐使用，不过结合文档与示例，可以简单的了解一下 NUnit4 的使用方式。

## Assert 断言改动

对 于测试结果的断言，NUni t4 中使用 `Assert.T hat` 方法来进 行断言，而不是直接使用 `Assert` 类来进行断言。

**eg:**

```csharp
Assert.That(1, Is.EqualTo(1)); // 测试是否相等
```

`As sert.That `  第一个参数为测试结果，第二 个参数为断言条件，断言条件可以使用 `Is` 类来构造，`Is` 类中包含了一些常用的断言条件，如 `Is.EqualTo`，`Is.Not` 等。

## 输出结果改动

对于一个测试函数，输出结果改为展 示断言的内容，而 不是直接输出 `Pass` 或者 `Fail`。

```csharp
// NUnit3
Message: 
  Expected: 4
  But was:  42

// NUnit4
Message: 
  Assert.That(val, Is.EqualTo(4))
  Expected: 4
  But was:  42
```

## 允许使用 async/await 来等待 Assert

```csharp
[Test]
public async Task AssertionPasses_CompletedTaskWithResult_EqualsResult()
{
    await Assert.ThatAsync(() => Task.FromResult(42), Is.EqualTo(42));
}
```

还引入了一个名为  `Assert.MultipleAsync`  的新函数，它允许您混合使用异步和同步断言在同一块内。这对于测试多个断言的情况非常有用，其中一些是异步的，而另一些是同步的。

```csharp
[Test]
public async Task AssertMultipleAsyncSucceeds()
{
    await Assert.MultipleAsync(async () =>
    {
        await Assert.ThatAsync(() => Task.FromResult(42), Is.EqualTo(42));
        Assert.That("hello", Is.EqualTo("hello"));
        await Assert.ThatAsync(() => Task.FromException(new  ArgumentNullException)), Throws.ArgumentNullException);
    });
}
```

除此之外还有一些其他的改动，具体的可以参考官方文档。

## 参考文档

1. [NUnit 官方文档](https://docs.nunit.org/articles/nunit/intro.html)
2. [NUnit Getting Started](https://docs.nunit.org/articles/nunit/getting-started/installation.html)
3. [NUnit C# 示例](https://github.com/nunit/nunit-csharp-samples)
4. [stack overflow - 如何创建 NUnit 项目使用.NET Framework](https://stackoverflow.com/questions/76750905/)
