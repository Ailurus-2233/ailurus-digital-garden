---
{"title":"21-PassingParameters","note_type":"knowledge_base","description":"跳转时，传递参数","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":null,"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/21-PassingParameters/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]  

**实例：**

```csharp
private void PersonSelected(Person person)
{
    var parameters = new NavigationParameters();
    parameters.Add("person", person);

    if (person != null)
        _regionManager.RequestNavigate("PersonDetailsRegion", "PersonDetail", parameters);
}
```

```csharp
public void OnNavigatedTo(NavigationContext navigationContext)
{
    var person = navigationContext.Parameters["person"] as Person;
    if (person != null)
        SelectedPerson = person;
}

public bool IsNavigationTarget(NavigationContext navigationContext)
{
    var person = navigationContext.Parameters["person"] as Person;
    if (person != null)
        return SelectedPerson != null && SelectedPerson.LastName == person.LastName;
    else
        return true;
}
```

**说明：**

- 在导航时，可以通过 `NavigationParameters` 传递参数，然后在导航到的视图中获取参数。
