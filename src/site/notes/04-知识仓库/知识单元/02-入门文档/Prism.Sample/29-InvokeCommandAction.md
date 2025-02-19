---
{"title":"29-InvokeCommandAction","note_type":"knowledge_base","description":"通过 InvokeCommandAction 调用 ViewModel 中的命令","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/29-InvokeCommandAction/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

```xml
<ListBox Grid.Row="1" Margin="5" ItemsSource="{Binding Items}" SelectionMode="Single">
    <i:Interaction.Triggers>
        <!-- This event trigger will execute the action when the corresponding event is raised by the ListBox. -->
        <i:EventTrigger EventName="SelectionChanged">
            <!-- This action will invoke the selected command in the view model and pass the parameters of the event to it. -->
            <prism:InvokeCommandAction Command="{Binding SelectedCommand}" TriggerParameterPath="AddedItems" />
        </i:EventTrigger>
    </i:Interaction.Triggers>
```

```csharp
public DelegateCommand<object[]> SelectedCommand { get; private set; } = new DelegateCommand<object[]>(OnItemSelected);

private void OnItemSelected(object[] selectedItems)
{
    if (selectedItems != null && selectedItems.Count() > 0)
    {
        SelectedItemText = selectedItems.FirstOrDefault().ToString();
    }
}

```
