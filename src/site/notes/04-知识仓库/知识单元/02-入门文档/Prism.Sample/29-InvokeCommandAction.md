---
{"dg-publish":true,"permalink":"/04//02/prism-sample/29-invoke-command-action/","title":"29-InvokeCommandAction","tags":["样例代码","Prism","WPF"]}
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
