---
{"dg-publish":true,"permalink":"/04//02/caliburn-micro/07-simple-io-c/","title":"07-Simple IoC容器","tags":["caliburn-micro","csharp","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Caliburn.Micro 入门\|Caliburn.Micro 入门]]

Caliburn.Micro 预先捆绑了一个名为 SimpleContainer 的依赖注入容器。对于那些不熟悉的人来说，依赖项注入容器是一个用于保存依赖项映射的对象，以便稍后通过依赖项注入在应用程序中使用。依赖注入实际上是一种通常使用容器元素而不是手动服务映射的模式。

### 入门

SimpleContainer 是 Caliburn.Micro 中用于依赖注入的主要类。还有其他类以扩展方法的形式充当支持基础结构，稍后将对此进行讨论。目前，SimpleContainer 的公共定义如下所示。

```csharp
public SimpleContainer()

void RegisterInstance(Type service, string key, object implementation)
void RegisterPerRequest(Type service, string key, Type implementation)
void RegisterSingleton(Type service, string key, Type implementation)
void RegisterHandler(Type service, string key Func<SimpleContainer, object> handler)
void UnregisterHandler(Type service, string key)

object GetInstance(Type service, string key)
IEnumerable<object> GetAllInstances(Type service)
void BuildUp(object instance)

SimpleContainer CreateChildContainer()
bool HasHandler(Type service, string key)

event Action<object> Activated
```

正如您在上面所看到的，API 分为服务注册和检索，具有几个支持方法和一个事件。

### 创建和配置

在向 SimpleContainer 添加任何服务绑定之前，请务必记住，容器本身必须向 Caliburn.Micro 注册，框架才能使用上述绑定。此过程会将 SimpleContainer 注入到 IoC 中，IoC 是 Caliburn.Micro 内置的服务定位器。下面的代码详细介绍了如何向 Caliburn.Micro 注册 SimpleContainer。

```csharp
public class CustomBootstrapper : BootstrapperBase {
	private SimpleContainer _container = new SimpleContainer();

	…

	protected override object GetInstance(Type serviceType, string key) {
		return _container.GetInstance(serviceType, key);
	}

	protected override IEnumerable<object> GetAllInstances(Type serviceType) {
		return _container.GetAllInstances(serviceType);
	}

	protected override void BuildUp(object instance) {
		_container.BuildUp(instance);
	}

	…
}
```

正如您在上面看到的，需要重写 3 个方法才能将 SimpleContainer 正确注册到 Caliburn.Micro。您可以参考 Bootstrapper 文档以获取有关上述方法的更多信息。

### 注册服务绑定

SimpleContainer 提供了许多不同的方法来根据生命周期需求创建服务绑定。除此之外，Caliburn.Micro 中包含许多扩展方法，在选择注册服务时提供了更大的灵活性。

#### 注册实例

RegisterInstance 方法允许根据类型、键或两者向容器注册预构造的实例。另一方面，实例注册一个预构造的实例，仅针对某个类型进行注册。

```csharp
void RegisterInstance(Type serviceType, string key, object instance);
SimpleContainer Instance<TService>(TService instance)
```

当实体在第一次发出请求之前需要处于特定状态时，注册预构造实例非常有用。

#### 按请求注册

SimpleContainer 包含 2 个方法来处理每个请求注册。RegisterPerRequest 注册要针对类型、键或两者注册的实现。PerRequest 被重载，以便能够针对实现的类型或其实现或继承的其他类型进行注册。PerRequest 调用可以链接起来。

```csharp
void RegisterPerRequest(Type serviceType, string key, Type implementation);
SimpleContainer PerRequest<TService, TImplementation>()
SimpleContainer PerRequest<TImplementation>()
```

每个请求注册会导致每个请求创建一次返回的实体。这意味着对同一实体的两个不同请求将导致创建两个不同的实例。

#### 注册单例

单例注册与 PerRequest 一样，有 2 种不同的注册方法。RegisterSingleton 针对类型、键或两者注册实现，同时 Singleton 被重载以启用针对实现的类型或其实现或继承的其他类型的注册。单例调用可以链式调用。

```csharp
void RegisterSingleton(Type serviceType, string key, Type implementation);
SimpleContainer Singleton<TImplementation>()
SimpleContainer Singleton<TService, TImplementation>()
```

注册单例可能看起来与注册实例相同，但生命周期有一个重要的区别。实例是在注册之前预先构建的，而单例注册仅在第一次请求时构建。

#### 注册处理程序

工厂，或者更具体地说，工厂方法可以用 Handler 方法注册。Handler 方法采用 Func 作为其参数；这使得工厂方法可以利用容器本身，这在复杂的构建场景中非常有用。

```csharp
SimpleContainer Handler<TService>(Func<SimpleContainer, object> handler)
```

某些注册可能需要注册多个上下文相关的实现。句柄提供了一种方便的方法来包装此逻辑并在请求时使用它。

#### 注册所有类型

SimpleContainer 提供基本的装配检查。AllTypesOf 允许检查程序集是否有任何实现或继承正在注册的服务类型的实现。可选地，可以提供过滤器来缩小注册的实现的集合。

```csharp
SimpleContainer AllTypesOf<TService>(Assembly assembly, Func<Type, bool> filter = null)
```

在处理模块化系统时，装配检查非常有用，因为在运行时装配可能不可用或未知。

### 注入服务

依赖注入的主要好处是，任何请求的服务都将在返回给调用者之前解决其依赖关系。这是递归的，因此返回的整个对象图满足依赖关系。此过程还可以以属性注入的形式用于并非源自依赖项容器的实例。

#### 构造函数注入

构造函数注入是最广泛使用的依赖注入形式，它表示服务与注入它们的类之间所需的依赖关系。当您需要非可选地使用给定服务时，应使用构造函数注入。

```csharp
public class ShellViewModel {
	private readonly IWindowManager _windowManager;

	public ShellViewModel(IWindowManager windowManager) {
		_windowManager = windowManager;
	}
}
```

通过将 IWindowManager 指定为构造函数参数，我们显式地将其请求为非可选服务。如果 ShellViewModel 是由依赖容器构建的，它将有一个 IWindowManager 的实现注入其中。

#### 属性注入

属性注入提供了将服务注入到依赖容器外部创建的实体中的能力。当实体传递到 BuildUp 方法时，将检查其属性，并使用与上述相同的递归逻辑注入任何可用的匹配服务。

```csharp
…
		var shellViewModel = new ShellViewModel();
		_container.BuildUp(shellViewModel);
	}
}

public class ShellViewModel {
	public IEventAggregator EventAggregator { get; set; }
}
```

在大多数情况下，构造函数注入是最好的选择，因为它使服务需求明确，但是属性注入有很多用例。需要注意的是，属性注入仅适用于接口类型。

### 高级功能

入门部分中讨论的技术对于大多数应用程序来说已经足够了，但 SimpleContainer 还提供了一些高级功能，可以帮助完成复杂的注册或检索场景。

#### 处理实例激活

SimpleContainer 提供了 Activate 事件，该事件在从容器请求服务并创建其相应的实现时引发，从而允许您对新创建的实例执行您希望的任何自定义初始化或操作。下面是一个例子。

```csharp
class CustomBootstrapper : BootstrapperBase {

	private SimpleContainer _container

	…

	protected override void Configure() {
		…
		_container.Activate += _OnInstanceActivation;
	}

	private void OnInstanceActivation(object instance) {
		// Perform any custom operations
	}
}
```

#### 使用子容器

子容器在复杂的模块化应用场景中非常有用。请求子容器将创建一个 SimpleContainer 的新实例，并复制所有当前注册的服务。向父容器注册的任何新实例都不会隐式在子容器中注册

```csharp
var childContainer = _simpleContainer.CreateChildContainer();
```

请记住，由于单例和实例注册的性质，两个容器将有效地访问同一实例。这允许实现复杂的注册场景。
