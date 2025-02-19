---
{"dg-publish":true,"permalink":"/04//02/prism-sample/21-passing-parameters/","title":"21-PassingParameters","tags":["样例代码","Prism","WPF"]}
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
