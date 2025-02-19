---
{"title":"03-CustomRegions","note_type":"knowledge_base","description":"自定义控件区域的注册","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-24","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/03-CustomRegions/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-24","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

在 Prism 框架中，默认的区域适配器支持以下几种常见的 WPF 控件：

1. **ContentControl**
2. **ItemsControl**
3. **Selector**
4. **TabControl**

除此之外使用其他系统控件或自定义控件需要实现对应控件的适配器

### **RegionAdapter：**

```csharp
public class StackPanelRegionAdapter(IRegionBehaviorFactory regionBehaviorFactory)  
    : RegionAdapterBase<StackPanel>(regionBehaviorFactory)  
{  
    protected override void Adapt(IRegion region, StackPanel regionTarget)  
    {  
        region.Views.CollectionChanged += (s, e) =>  
        {  
            if (e.Action != System.Collections.Specialized.NotifyCollectionChangedAction.Add) return;  
            if (e.NewItems == null) return;  
            foreach (FrameworkElement element in e.NewItems)  
            {  
                regionTarget.Children.Add(element);  
            }  
  
            //handle remove  
        };  
    }  
  
    protected override IRegion CreateRegion()  
    {  
        return new AllActiveRegion();  
    }  
}
```

首先需要自定义个区域适配器，需要继承 `RegionAdapterBase<T>` 并重写 `Adapt` 方法和 `CreateRegion` 方法。

其中，重写的 `Adapt` 方法的主要作用是将区域 (`IRegion`) 与目标控件 (`regionTarget`) 进行适配，以便能够动态加载和显示视图。

`CreateRegion` 方法在自定义区域适配器中用于创建一个新的区域实例，其作用是定义区域适配器将管理的具体区域类型，常见的区域类型有：

- **AllActiveRegion**：这种区域类型会使添加到该区域中的所有视图都处于活动状态。适用于不需要进行视图切换的场景。
- **SingleActiveRegion**：这种区域类型只允许一个视图处于活动状态。当一个新视图被激活时，之前的活动视图会被自动停用。适用于需要进行视图切换的场景，例如 `TabControl`。
- **Region**：这是一个基本的区域类型，没有特定的活动视图管理逻辑。

### 注册适配器到特定控件

需要在 `Bootstrapper` 中重写 `ConfigureRegionAdapterMappings()` 方法

**Bootstrapper.cs**

```cs
protected override void ConfigureRegionAdapterMappings(RegionAdapterMappings regionAdapterMappings)  
{  
    base.ConfigureRegionAdapterMappings(regionAdapterMappings);  
    regionAdapterMappings.RegisterMapping(typeof(StackPanel), Container.Resolve<StackPanelRegionAdapter>());  
}
```

### 使用 Region

```xml
<StackPanel prism:RegionManager.RegionName="StackPanelRegion" />
```
