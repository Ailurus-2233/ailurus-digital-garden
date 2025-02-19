---
{"title":"04-关于Actions","note_type":"knowledge_base","description":"快速绑定方法到 View 中的方法","tags":["caliburn-micro","csharp","WPF"],"create_time":"2024-08-12","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Caliburn.Micro 入门","permalink":"/04-知识仓库/知识单元/02-入门文档/Caliburn.Micro 入门/04-关于Actions/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-08-12","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Caliburn.Micro 入门\|Caliburn.Micro 入门]]

### 简单介绍

举一个简单的例子，这里为了方便理解到底发生了什么，并没采用命名约定的模式

```xml
<StackPanel>
    <Label Content="Hello please write your name" />
    <TextBox x:Name="Name" />
    <Button Content="Click Me">
        <i:Interaction.Triggers>
            <i:EventTrigger EventName="Click">
                <cal:ActionMessage MethodName="SayHello" />
            </i:EventTrigger>
        </i:Interaction.Triggers>
    </Button>
</StackPanel>
```

如您所见，操作功能利用 Microsoft.Xaml.Behaviors 作为其触发机制。这意味着您可以使用从 Microsoft.Xaml.Behaviors.TriggerBase 继承的任何内容来触发 ActionMessage 的发送。

1. 在触发器中使用了 `ActionMessage`，它是该标记的 CM 特定部分。直接阅读可能会理解它表示为当触发发生时，我们应该发送一条消息 `SayHello`。但在 CM 中并不会发送这样一条消息，而是会沿着可视化树中冒泡搜索它的目标实例，如果找到目标但是没有 `SayHello` 方法，会继续寻找直到最后抛出异常；
2. 除了查找 `SayHello` 方法之外，他同时还会查找名为 `CanSayHello` 的属性或方法。如果代码中实现了这个属性，并且能够通知属性的变化，即实现了 `INotifyPropertyChanged` 这个接口，那么相应的变化也会相应到按钮上面去

### ACTION.TARGET

官方文档说的有点晕乎乎的，这里简单的总结一下:

如果使用 x:Name 来给控件命名，那么在 CM 创建 View 的过程中，ViewModelBinder 会将对应的 ViewModel 与 View 绑定，这里自动的将对应的 ViewModel 设置为 Action.Target，并会从中找到对应的名称的方法或属性。

当然我们可以不给这个控件命名，给控件命名只是 CM 隐藏了一些操作，使 CM 能够知道要调用哪个方法，实际上可以使用 `cal:Message.Attach="MethodName"` 来指定使用哪个方法，当然最终的效果还是和最上方的例子一致，实际上还是在 Trigger 中使用 `cal:ActionMessage MethodName="MethodName"` 来查找具体的方法。

同样也可手动的指定目标，例如使用附加属性 `cal:Action.Target="{Binding}"`，这句话同样将是将 Action.Target 设置为 ViewModel，原因是 Binding 不加参数即使用默认的 DataContext，而这个 DataContext 是继承可视化树中父节点的 DataContext，而 View 曾的 DataContext 被 CM 设置为对应的 ViewModel。我们可以指定 ViewModel 中的一个具体的属性作为他的 Action.Target, 如下代码所示

```xml
<Button Content="Click" cal:Action.Target="{Binding Test}" cal:Message.Attach="SayHello" />
```

这里我们绑定了一个 Test 属性，那么他的 DataContext 会被设置为 Test（一般情况下这两个是一致的），并优先从 Test 里找名为 SayHello 的方法，如果找不到，会沿着可视化树向上寻找同名方法，找到距离 Action.Target 最近的同名方法，并执行，如果找不到，那就会抛出异常。

如果想不设置 DataContext 的值，可以使用 Action.TargetWithOutContext 附加属性指定目标。

### 传递函数参数

```csharp
public void SayHi(string info) {
    MessageBox.Show($"Hi,{info}");
}
```

```xml
<Button Content="Click With Parameter" cal:Message.Attach="SayHi('Hello World!')" />
```

```xml
<TextBox x:Name="InputText"/>
<Button Content="Click With Input">
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="Click">
            <cal:ActionMessage MethodName="SayHi">
                <cal:Parameter Value="{Binding ElementName=InputText, Path=Text}" />
            </cal:ActionMessage>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</Button>
```

这里展示了两种传递参数的方式，一个传递静态的参数，一个传递动态的参数，虽然参数是一项便利功能，它们非常强大，可以帮助您解决一些棘手的问题，但它们很容易被滥用。

#### 其他传递参数的方式

##### 特殊值

```xml
<ItemsControl x:Name="Items">
    <ItemsControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <Button Content="Remove"
	                    cal:Message.Attach="Remove($dataContext)" />
                <TextBlock Text="{Binding Id}" />
            </StackPanel>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

可以发现这里使用了一个 $dataContext，他的作用是给函数传递 ActionMessage 附加到的元素的 DataContext，如果没有 DataContext 那么就会在可视化树上冒泡到父控件上。除了 $dataContext 还有以下几种特殊值来用于传递特定参数

1. `$eventArgs`: 将 EventArgs 或输入参数传递给您的 Action。注意：对于保护方法来说，这将为空，因为触发器实际上尚未发生
2. `$dataContext`：传递 ActionMessage 附加到的元素的 DataContext。这在主/详细场景中非常有用，在这种场景中，ActionMessage 可能会冒泡到父节点，但需要在子节点调用函数
3. `$source`: 触发要发送的 ActionMessage 的实际 FrameworkElement
4. `$view`: 绑定到 ViewModel 的视图（通常是 UserControl 或 Window）
5. `$executionContext`: 操作的执行上下文，其中包含所有上述信息以及更多信息。这在高级场景中很有用。
6. `$this`: 操作所附加到的实际 UI 元素。在这种情况下，元素本身不会作为参数传递，而是作为其默认属性传递。

> 当使用 $this 这种特殊值时，当不指定属性时，CM 将使用由特定控制约定指定的默认属性。对于按钮，该属性恰好是 "DataContext"，而 TextBox 默认为 Text，Selector 默认为 SelectedItem，等等。

##### 枚举值

如果要将枚举值作为参数传递，则需要将该值作为（大写）字符串传递：

```xml
<Fluent:Button Header="Go!" cal:Message.Attach="[Event Click] = [Action MethodWithEnum('MONKEY')]" />
```

```csharp
public enum Animals {
	Unicorn,
	Monkey,
	Dog
}

public class MyViewModel {
    public void MethodWithEnum(Animals a) {
         Animals myAnimal = a;
    }
}
```

#### MESSAGE.ATTACH

在 CM 中使用对 Xaml 开发人员更加友好的机制来声明 ActionMessage。Message.Attach 属性由一个简单的解析器支持，该解析器获取文本输入并将其转换为之前看到的完整 Interaction.Trigger/ActionMessage。这样能够更简单清晰的展示出这个方法的全部内容，例如

```xml
<Button Content="Remove" cal:Message.Attach="[Event Click] = [Action Remove($dataContext)]" />
```

假设我们要使用 Message.Attach 语法重写参数化的 SayHello 操作。它看起来像这样：

```xml
<Button Content="Click Me" cal:Message.Attach="[Event Click] = [Action SayHello(Name.Text)]" />
```

但我们也可以利用解析器的一些智能默认设置，如下所示：

```xml
<Button Content="Click Me" cal:Message.Attach="SayHello(Name)" />
```

也可以指定文字作为参数，甚至可以通过用分号分隔来声明多个操作：

```xml
<Button Content="Let's Talk" cal:Message.Attach="[Event MouseEnter] = [Action Talk('Hello', Name.Text)]; [Event MouseLeave] = [Action Talk('Goodbye', Name.Text)]" />
```

> [!info] 注
>
> 1. Message.Attach 并不是将代码塞进 Xaml 中。它的目的是提供一种简化的语法来声明何时/什么消息发送到 ViewModel。请不要滥用这一点。
> 2. CM 自动对参数执行类型转换，例如 TextBox.Text 注入 System.Double 参数，而不必担心转换问题

### VIEW FIRST 实现方法

这里有类似方法绑定的方法，可以以一种先构建 View 然后再绑定 ViewModel 的流程，比较神奇 hhhhh

#### 1 更改引导程序

```csharp
public class MefBootstrapper : BootstrapperBase {
    //same as before

    protected override void OnStartup(object sender, StartupEventArgs e) {
        Application.RootVisual = new ShellView();
    }

    //same as before
}
```

这里只是创建一个 View 对象，而不是 ViewModel 对象，并将其设置为 RootVisual。

#### 2 定义 SHELLVIEWMODEL

将通过添加显式命名的合约来稍微改变导出 ShellViewModel 的方式

```csharp
[Export("Shell", typeof(IShell))]
public class ShellViewModel : PropertyChangedBase, IShell {
    //same as before
}
```

#### 3 绑定到 VIEW

使用 Bind.Model 附加属性绑定显示命名的 ViewModel

```xml
<UserControl x:Class="Caliburn.Micro.ViewFirst.ShellView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:cal="http://www.caliburnproject.org"
             cal:Bind.Model="Shell">
    <StackPanel>
        <TextBox x:Name="Name" />
        <Button x:Name="SayHello"
                Content="Click Me" />
    </StackPanel>
</UserControl>
```

这通过 IoC 容器中的键解析我们的 VM，设置 Action.Target 和 DataContext 并应用所有约定。

一些相关附加属性的说明：

1. Action.Target：将 Action.Target 属性和 DataContext 属性设置为指定的实例。字符串值用于解析 IoC 容器中的实例。
2. Action.TargetWithoutContext：仅将 Action.Target 属性设置为指定实例。字符串值用于解析 IoC 容器中的实例。
3. Bind.Model：View-First 设计中将 Action.Target 和 DataContext 属性设置为指定实例。将约定应用于视图。字符串值用于解析 IoC 容器中的实例。只能在根节点中使用。
4. Bind.ModelWithoutContext：View-First - 将 Action.Target 设置为指定实例。将约定应用于视图。在 DataTemplate 中使用
5. View.Model：ViewModel-First 设计中找到指定 VM 实例的视图并将其注入到内容站点。将 VM 设置为 Action.Target 和 DataContext。将约定应用于视图。
