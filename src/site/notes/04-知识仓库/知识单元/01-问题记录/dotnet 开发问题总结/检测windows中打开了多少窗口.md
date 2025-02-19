---
{"dg-publish":true,"permalink":"/04//01/dotnet/windows/","title":"检测windows中打开了多少窗口","tags":["csharp","dotnet"]}
---


所属知识库：[[04-知识仓库/归纳目录/01-问题记录/dotnet 开发问题总结\|dotnet 开发问题总结]]

在工作项目中进行单元测试的任务，但是在一些测试流程中，项目会弹出一些 MesaageBox，由于使用的是 WPF 默认的 MessageBox，所以并不好检测是否弹出，所以想到了一种逻辑是检测目前所有的窗口，在所有窗口找到目的窗口即可。

但是这存在一个问题，原生的 C#并不能执行系统层面的东西，即去遍历所有窗口等等，需要调用系统层面的 api，这篇总结记录便是记录一下相关的用法

### 解决方案

- **构建 WindowHelper**

```csharp
public static class WindowHelper {

    /// <summary>
    /// 查找当前用户空间下所有符合条件的窗口。如果不指定条件，将仅查找可见窗口。
    /// </summary>
    /// <param name="match">过滤窗口的条件。如果设置为 null，将仅查找可见窗口。</param>
    /// <returns>找到的所有窗口信息。</returns>
    public static IReadOnlyList<WindowInfo> FindAll(Predicate<WindowInfo> match = null) {
        var windowList = new List<WindowInfo>();
        WndEnumProc onWindowEnum = (IntPtr hWnd, int lParam) => {
            // 仅查找顶层窗口。
            if (GetParent(hWnd) != IntPtr.Zero)
                return true;
            // 获取窗口类名。
            var lpString = new StringBuilder(512);
            GetClassName(hWnd, lpString, lpString.Capacity);
            string className = lpString.ToString();
            // 获取窗口标题。
            var lptrString = new StringBuilder(512);
            GetWindowText(hWnd, lptrString, lptrString.Capacity);
            string title = lptrString.ToString().Trim();
            // 获取窗口可见性。
            bool isVisible = IsWindowVisible(hWnd);
            // 添加到已找到的窗口列表。
            windowList.Add(new WindowInfo(hWnd, className, title, isVisible));
            return true;
        };
        if (onWindowEnum == null)
            throw new ArgumentNullException(nameof(onWindowEnum));
        EnumWindows(onWindowEnum, 0);
        return windowList.FindAll(match ?? DefaultPredicate);
    }
    /// <summary>
    /// 默认的查找窗口的过滤条件。可见 + 包含窗口标题。
    /// </summary>
    private static readonly Predicate<WindowInfo> DefaultPredicate = x => x.IsVisible && x.Title.Length > 0;
    private delegate bool WndEnumProc(IntPtr hWnd, int lParam);

    [DllImport("user32.dll")]
    private static extern bool EnumWindows(WndEnumProc lpEnumFunc, int lParam);
    [DllImport("user32.dll")]
    private static extern IntPtr GetParent(IntPtr hWnd);
    [DllImport("user32.dll")]
    private static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll")]
    private static extern int GetWindowText(IntPtr hWnd, StringBuilder lptrString, int nMaxCount);
    [DllImport("user32.dll")]
    private static extern int GetClassName(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
    [DllImport("user32.dll")]
    private static extern void SwitchToThisWindow(IntPtr hWnd, bool fAltTab);
}
```

这个类中存在一些 extern 方法，并使用了 DllImport 属性，来表示这个方法另外的部分存在哪个 dll 中，`user32.dll` 便是目标所在的 dll，这里记录了一些系统级别的 API。我们也是通过调用这些方法来获取窗口的句柄。

这里还需要定义一下 Win32 窗口的基本信息

```csharp
/// <summary>  
/// 获取 Win32 窗口的一些基本信息。  
/// </summary>  
public struct WindowInfo {  
    public WindowInfo(IntPtr hWnd, string className, string title, bool isVisible) : this() {  
        Hwnd = hWnd;  
        ClassName = className;  
        Title = title;  
        IsVisible = isVisible;  
    }  
    /// <summary>  
    /// 获取窗口句柄。  
    /// </summary>  
    public IntPtr Hwnd { get; }  
  
    /// <summary>  
    /// 获取窗口类名。  
    /// </summary>  
    public string ClassName { get; }  
  
    /// <summary>  
    /// 获取窗口标题。  
    /// </summary>  
    public string Title { get; }  
  
    /// <summary>  
    /// 获取当前窗口是否可见。  
    /// </summary>  
    public bool IsVisible { get; }  
}
```

这样便可以通过 `WindowHelper.FindAll()` 来获得所有活动窗口，同样的这里有一个匹配的委托，用来定义一个匹配条件，比如想要指定标题的窗口，便可以使用 `WindowHelper.FindAll(w => w.Title == "Title")`
