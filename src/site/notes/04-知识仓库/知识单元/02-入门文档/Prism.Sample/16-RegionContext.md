---
{"dg-publish":true,"permalink":"/04//02/prism-sample/16-region-context/","title":"16-RegionContext","tags":["样例代码","Prism","WPF"]}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```xml
<ListBox x:Name="_listOfPeople" ItemsSource="{Binding People}"/>
<ContentControl Grid.Row="1" Margin="10"
                prism:RegionManager.RegionName="PersonDetailsRegion"
                prism:RegionManager.RegionContext="{Binding SelectedItem, ElementName=_listOfPeople}"/>
```

通过 RegionContext 可以将一个区域的上下文设置为另一个区域的数据。
