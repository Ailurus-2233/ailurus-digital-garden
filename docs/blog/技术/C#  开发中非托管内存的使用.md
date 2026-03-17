---
title: C#  开发中非托管内存的使用
createTime: 2026/03/17 09:25:03
permalink: /blog/0mmgj3xq/
---
title: C# 开发中非托管内存的使用
createTime: 2025/06/19 10:04:22
permalink: /blog/thafs0p3/
tags: [C#, 非托管内存]
---

## 什么是非托管内存

在 C# 中，非托管内存指的是由开发者直接管理的内存，而不是由.NET 的垃圾回收器（GC）自动管理的内存。非托管内存通常通过使用指针、`Marshal` 类或调用 Win32 API 来分配和释放。与托管内存相比，非托管内存需要程序员在使用后手动释放，以防止内存泄漏。

非托管内存的常见用例包括：

1. **互操作性**：与 C 或 C++ 等非托管代码进行交互。
2. **性能优化**：在性能要求极高的场景下，减少垃圾回收的负担。
3. **使用特定的系统资源**：访问系统调用或硬件资源时。

非托管内存的管理需要谨慎，以避免常见的错误，比如内存泄漏、越界访问等。

> [!info] 值得注意的是，非托管内存并非仅限于 windows 平台下的开发，Linux 和 macOS 下也有相关的 API 可供使用。

## 非托管内存的使用方式

### DllImport

**P/Invoke**：通过 P/Invoke（平台调用）来调用非托管代码（如 C/C++ 库）。开发者使用 `DllImport` 特性来声明外部函数，并使用非托管内存作为参数或返回值，例如：

```csharp
[DllImport("kernel32.dll")] 
public static extern IntPtr GlobalAlloc(uint uFlags, UIntPtr dwBytes);

[DllImport("kernel32.dll")] 
public static extern bool GlobalFree(IntPtr hMem);
```

这些方法通过 [[IntPtr]] 类型来操作非托管内存，`IntPtr` 是一个平台相关的整数类型，用于表示指针或句柄。

### Interop Services

使用 `Marshal` 类分配和释放非托管内存

```csharp
int size = 10 * sizeof(int); // 分配能够存放10个整数的内存
IntPtr ptr = Marshal.AllocHGlobal(size);

try
{
    // 填充非托管内存
    for (int i = 0; i < 10; i++)
    {
        Marshal.WriteInt32(ptr, i * sizeof(int), i);
    }

    // 读取非托管内存
    for (int i = 0; i < 10; i++)
    {
        int value = Marshal.ReadInt32(ptr, i * sizeof(int));
        Console.WriteLine(value);
    }
}
finally
{
    Marshal.FreeHGlobal(ptr); // 释放内存
}
```

`Marshal` 类提供了一系列用于操作非承管内存的方法，如 `AllocHGlobal`、`FreeHGlobal`、`WriteInt32`、`ReadInt32` 等。

### 使用 `unsafe` 代码块

在 C# 中，可以使用 `unsafe` 关键字来声明不安全代码块，从而使用指针来操作非托管内存。例如：

```csharp
int size = 10;
int* ptr = (int*)Marshal.AllocHGlobal(size * sizeof(int));

try
{
    for (int i = 0; i < size; i++)
    {
        ptr[i] = i; // 填充内存
    }

    for (int i = 0; i < size; i++)
    {
        Console.WriteLine(ptr[i]); // 读取内存
    }
}
finally
{
    Marshal.FreeHGlobal((IntPtr)ptr); // 释放内存
}
```

### IO 操作

在 C# 中，可以使用 `FileStream`、`MemoryMappedFile` 等类来操作非托管内存。例如：

```csharp
string filePath = "largefile.bin";
int bufferSize = 4096; // 4KB

IntPtr buffer = Marshal.AllocHGlobal(bufferSize);
try
{
    using (FileStream fs = new FileStream(filePath, FileMode.Open))
    {
        int bytesRead;
        while ((bytesRead = fs.Read(new Span<byte>(buffer.ToPointer(), bufferSize))) > 0)
        {
            // 处理读取的数据
        }
    }
}
finally
{
    Marshal.FreeHGlobal(buffer);
}
```

### 与硬件交互

在 C# 中，可以使用 `System.IO.Ports` 命名空间来操作串口等硬件资源。例如：

```csharp
public unsafe void InteractWithDevice()
{
    using (SerialPort port = new SerialPort("COM1"))
    {
        port.Open();
        byte[] buffer = new byte[1024];
        fixed (byte* ptr = buffer)
        {
            // 读取数据
            port.Read(ptr, buffer.Length, 0);
        }
    }
}
```

## IntPtr

`IntPtr` 是 C# 中一个特定的数据类型，用于表示指针或句柄，它在处理非托管代码和系统资源时非常有用。以下是对 `IntPtr` 的详细说明：

### 定义

- `IntPtr` 是一个结构体，位于 `System` 命名空间中。它的大小与当前平台相关：在 32 位平台上，它的大小为 4 字节，而在 64 位平台上为 8 字节。
- 它主要用于表示指针或句柄，确保在不同平台上处理指针时的类型安全和正确性。

### 使用场景

`IntPtr` 通常用于以下场景：

- **与非托管代码交互**：在使用 P/Invoke 等方式调用非托管 API 时，传递指针或句柄。
- **资源管理**：表示操作系统资源（如窗口句柄、文件句柄等）。
- **动态内存操作**：用于处理通过 `Marshal` 类分配的非托管内存。

### 示例代码

1. 使用 P/Invoke，[[非托管内存的使用方式#DllImport]]
2. 与 Marshal 结合使用 [[非托管内存的使用方式#Interop Services]]

### 常用的属性

- **`IntPtr.Zero`**：表示一个空指针。
- **构造函数**：可以通过 `new IntPtr(int value)` 或 `new IntPtr(long value)` 创建一个 `IntPtr`。
- **`ToInt32` 和 `ToInt64`**：将 `IntPtr` 转换为 `int` 或 `long` 类型。
- **`Size`**：静态属性，获取当前平台的指针大小，通常用于条件编译。

### 注意事项

- **平台相关性**：`IntPtr` 的大小与当前平台相关，因此在处理指针时需要注意平台差异。
- **类型安全**：`IntPtr` 是一个不安全的类型，因此在使用时需要小心，避免出现指针错误。
- **资源释放**：`IntPtr` 通常用于处理非托管资源，需要手动释放资源，以避免内存泄漏。
- 在使用 `IntPtr` 类型时，通常会与 `unsafe` 代码或其他非托管操作一起使用，以确保数据的正确性和完整性。


