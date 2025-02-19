---
{"title":"27-StylingDialog","note_type":"knowledge_base","description":"定制弹出窗口的样式","tags":["样例代码","Prism","WPF"],"create_time":"2024-07-29","update_time":"2025-02-19","dg-home":false,"dg-publish":true,"aliase":[],"root":"Prism.Sample","permalink":"/04-知识仓库/知识单元/02-入门文档/Prism.Sample/27-StylingDialog/","dgPassFrontmatter":true,"noteIcon":"","created":"2024-07-29","updated":"2025-02-19"}
---


所属知识库：[[04-知识仓库/归纳目录/02-入门文档/Prism.Sample\|Prism.Sample]]

可以在自定义的 Dialog 控件中，增加一个附加属性，来为弹出窗口增加样式

```xml
<prism:Dialog.WindowStyle>
    <Style TargetType="Window">
        <Setter Property="prism:Dialog.WindowStartupLocation" Value="CenterScreen" />
        <Setter Property="ResizeMode" Value="NoResize"/>
        <Setter Property="ShowInTaskbar" Value="False"/>
        <Setter Property="SizeToContent" Value="WidthAndHeight"/>
    </Style>
</prism:Dialog.WindowStyle>
```
