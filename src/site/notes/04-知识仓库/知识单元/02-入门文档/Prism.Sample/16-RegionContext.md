---
{"title":"16-RegionContext","note_type":"knowledge_base","description":"区域上下文设置","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/16-RegionContext/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```xml
<ListBox x:Name="_listOfPeople" ItemsSource="{Binding People}"/>
<ContentControl Grid.Row="1" Margin="10"
                prism:RegionManager.RegionName="PersonDetailsRegion"
                prism:RegionManager.RegionContext="{Binding SelectedItem, ElementName=_listOfPeople}"/>
```

通过 RegionContext 可以将一个区域的上下文设置为另一个区域的数据。
