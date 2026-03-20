---
title: 使用 Hyper-v 创建 OpenWrt 虚拟机
createTime: 2025/09/19 06:57:56
permalink: /blog/zoljh9hq/
tags: [Hyper-V, OpenWrt, 虚拟机, 网络配置]
---

在使用 `Hyper-V` 创建虚拟机时，经常会遇到需要科学上网的场景，例如更新系统、拉取 GitHub 项目等。虽然可以通过 `Clash` 的 `TUN` 模式为宿主机和虚拟机提供代理，但由于 `Hyper-V` 的虚拟交换机（`NAT 网络`）与 `TUN` 虚拟网卡之间可能存在冲突，不仅会导致虚拟机无法正常联网，有时还会影响宿主机的网络稳定性。

因此，更合适的做法是：在 `Hyper-V` 中额外创建一台 `OpenWrt` 虚拟机，让它充当所有虚拟机的路由器，再在 `OpenWrt` 上安装并运行 `OpenClash`，从而为虚拟机统一提供代理服务。

这种方式有以下优点：

- 网络更稳定：避免了 `TUN` 与 `Hyper-V` 虚拟网卡的冲突。
- 集中管理：只需在 `OpenWrt` 中配置代理策略，所有虚拟机即可共享。
- 灵活可控：支持对不同虚拟机、不同应用进行精细化分流。

在本文中，我将介绍如何在` Hyper-V` 中搭建 `OpenWrt`，并配置 `OpenClash`，使其作为代理网关为其他虚拟机提供服务。

## 准备工作

在开始之前，需要先准备好以下内容和工具：

1. 下载 OpenWrt 镜像，前往 [OpenWrt 官方下载](https://downloads.openwrt.org/)页面，获取合适的镜像文件
    - 建议选择 `x86_64` 平台 的镜像（例如 combined-squashfs.img.gz，这里推荐 squashfs 格式，不包含 efi的镜像，方便后续扩容）。
    - 下载后解压，得到 .img 格式的磁盘文件。
2. 安装 `qemu-img` 工具包，`qemu-img` 是 `QEMU` 提供的磁盘镜像转换工具，可用于将 `.img` 文件转成 Hyper-V 可识别的 `.vhdx` 格式。
    - 在 Windows 环境下，可以通过 winget 安装。
    - 安装完成后，qemu-img.exe 会直接添加到环境变量中，可以直接使用。（不行重启终端即可）
3. 转换 OpenWrt 镜像为 `vhdx` 格式文件，使用该命令进行转换：`qemu-img convert -f raw -O vhdx openwrt.img openwrt.vhdx`
    - `-f raw` 指定输入镜像格式（OpenWrt 镜像一般是 raw 格式）。
    - `-O vhdx` 表示输出为 Hyper-V 支持的 vhdx 格式。
    - `openwrt.img` 为下载解压后的镜像文件名，`openwrt.vhdx` 为转换后的目标文件名。

转换完成后，就可以在 `Hyper-V` 中直接使用该 `vhdx` 文件来创建虚拟机。

## 开始部署

完成镜像准备后，就可以在 Hyper-V 中部署 OpenWrt 虚拟机。

1. 创建虚拟机内部使用的虚拟交换机（`OpenWrt-Lan`），如图所示
    - 打开 Hyper-V 管理器 → 进入 虚拟交换机管理器。
    - 新建一个 内部网络，命名为 `OpenWrt-Lan`。
    - 这个交换机将作为虚拟机间的局域网，让其他虚拟机通过它连接到 `OpenWrt`。

![image.png](https://s2.loli.net/2025/09/19/Fc2uYDhiRL5KCyQ.png)

2. 创建 `OpenWrt` 虚拟机
    - 在 Hyper-V 管理器中新建虚拟机，选择 第 2 代 (Generation 2)。
    - 内存可分配 256MB~512MB（根据需求调整）。(我设了 1024 MB)
    - 硬盘选择“使用已有的虚拟硬盘”，挂载之前转换好的 openwrt.vhdx 文件。
3. 配置虚拟机使用两个网卡
    - 在虚拟机设置中，添加两个网络适配器：
    - 第一个网卡：选择 `Default Switch`，用于连接宿主机和外网。
    - 第二个网卡：选择 `OpenWrt-Lan`，用于给其他虚拟机提供内网路由。

![image.png](https://s2.loli.net/2025/09/19/t7OFJ2BhHXls6L9.png)

4. 关闭虚拟机的安全启动选项
    - 在虚拟机设置中，进入“安全”选项卡，取消勾选“启用安全启动”。
    - 这是因为 OpenWrt 镜像通常不支持 UEFI 安全启动，关闭后才能正常启动系统。
5. 启动 `OpenWrt` 虚拟机并修改网络配置
    - 启动虚拟机后，通过 `Hyper-V` 控制台进入 `OpenWrt` 系统。
    - 编辑网络配置文件：`vi /etc/config/network` 根据接口情况修改：
        - eth0 → 绑定 `Default Switch`，设为 wan 接口（DHCP 获取地址）。
        - eth1 → 绑定 `OpenWrt-Lan`，设为 lan 接口（静态地址，如 192.168.100.1/24）。
6. 重启 OpenWrt 网络服务
    - `/etc/init.d/network restart`
    - 或者直接重启虚拟机以确保配置生效。
7. 开启 DHCP 服务
    - 确保 `dnsmasq` 服务已启用，默认情况下 OpenWrt 会自动启动 DHCP 服务。
    - 如果需要手动配置，可以编辑 `/etc/config/dhcp` 文件，确保 lan 接口启用了 DHCP。
    - 需要在 `lan` 接口配置中添加 `option ignore '0'`，表示启用 DHCP 服务。
8. 测试网络连通性
    - 首先查看 `ip a` 绑定 Default Switch 的网口自动分配了 IP
    - `ping 8.8.8.8` 检查网络是否连通
    - 如果能够正常通信，说明 OpenWrt 虚拟机已成功作为虚拟路由部署完成。


> [!info]
> 可以使用 `ssh` 链接虚拟机配置，比默认提供的控制台更方便，可以进行复制粘贴等操作。

以下是我配置 `OpenWrt` 网络的 `network` 配置文件

``` bash
config interface 'loopback'
    option proto 'static'
    option ipaddr '127.0.0.1'
    option netmask '255.0.0.0'
    option device 'lo'

config interface 'lan'
    option proto 'static'
    option ipaddr '192.168.100.1'
    option netmask '255.255.255.0'
    option device 'eth1'

config interface 'wan'
    option proto 'dhcp'
    option peerdns '0'
    option device 'eth0'
    list dns '223.5.5.5'
    list dns '223.6.6.6' 
```

以下是我配置 `OpenWrt` DHCP 的 `dhcp` 配置文件

``` bash
config dnsmasq
    option domainneeded '1'
    option boguspriv '1'
    option filterwin2k '0'
    option localise_queries '1'
    option rebind_protection '1'
    option rebind_localhost '1'
    option local '/lan/'
    option domain 'lan'
    option expandhosts '1'
    option nonegcache '0'
    option cachesize '0'
    option authoritative '1'
    option readethers '1'
    option leasefile '/tmp/dhcp.leases'
    option nonwildcard '1'
    option localservice '1'
    option ednspacket_max '1232'
    option filter_aaaa '0'
    option filter_a '0'
    option noresolv '1'
    option localuse '1'
    list server '127.0.0.1#7874'

config dhcp 'lan'
    option interface 'lan'
    option start '100'
    option limit '150'
    option leasetime '12h'
    option ignore '0'

config dhcp 'wan'
    option interface 'wan'
    option ignore '1'
```

> [!info]
> 这一步可以在别的虚拟机中试一试，将网卡修改为 OpenWrt-Lan, 能否自动获得 ip 并上网。

## 配置 OpenWrt

### 设置中文

1. 在宿主机通过浏览器访问 `http://192.168.100.1/` 进入 `OpenWrt` 的 `LuCI` 管理界面。
2. 依次点击 `System` -> `System` -> `Software`，点击 `Update Lists...` 按钮，等待更新完成。
3. 在搜索框中输入 `luci-i18n-base-zh-cn`，找到后点击 `install` 按钮。
4. 安装完成后，依次点击 `System` -> `System` -> `Language and Style`，将语言切换为“简体中文”，保存并应用。

### 安装 Argon 主题

1. [luci-theme-argon Releases](https://github.com/jerrykuku/luci-theme-argon/releases) 页面下载最新的 `luci-theme-argon_*.ipk` 安装包
2. 在宿主机通过浏览器访问 `http://192.168.100.1/` 进入 `OpenWrt` 的 `LuCI` 管理界面
3. 依次点击 `系统` -> `Software`，点击 `Update Lists...` 按钮，等待更新完成。
4. 选择 `Upload Package` 上传并安装下载好的 `luci-theme-argon_*.ipk` 安装包。
5. 安装完成后，依次点击 `系统` -> `系统` -> `语言和界面`，将主题切换为 `argon`，保存并应用。

### 安装 OpenClash

接下来，在 `OpenWrt` 上安装并配置 `OpenClash`，使其作为代理网关为其他虚拟机提供服务。

1. [OpenClash Releases](https://github.com/vernesong/OpenClash/releases) 页面下载最新的 `OpenClash` 安装包 `luci-app-openclash_*_all.ipk`
2. 在宿主机通过浏览器访问 `http://192.168.100.1/` 进入 `OpenWrt` 的 `LuCI` 管理界面
3. 依次点击 `系统` -> `Software`，点击 `Update Lists...` 按钮，等待更新完成。
4. 选择 `Upload Package` 上传并安装下载好的 `luci-app-openclash_*_all.ipk` 安装包。
5. 安装完成后，依次点击 `服务` -> `OpenClash`，进入 `OpenClash` 的管理界面。
6. 在 `运行状态` 页面，点击 `运行状态` 卡片页的开关，提示安装核心，确定并等待 `OpenClash` 的核心文件下载和安装完成。
7. 安装完成后， 在 `运行状态` 页面，点击 `运行状态` 卡片页的开关，启动 `OpenClash` 服务。
8. 在 `配置订阅` 页面，添加你的 `Clash` 订阅链接，点击 `更新配置` 按钮，等待配置文件下载完成。
9. 在 `规则设置` 页面，根据需要选择合适的默认策略（如 `全局`、`自动`、`直连` 等），并根据需求添加自定义规则。
10. 保存并应用配置，确保 `OpenClash` 正常运行。
11. 在 `运行状态` 页面，`访问检查` 卡片页可以测试网络连接是否通过代理。

![image.png](https://s2.loli.net/2025/09/22/KlT6tgAazw25iXN.png)

## 配置宿主机网络

如果不进行额外配置，宿主机同样也会使用 `OpenWrt` 作为网关，这可能会使外网全走 OpenWrt，导致 DNS 解析失败 / NAT 配置缺失而断网。

需要改动 IP 策略路由表，使得：

- 192.168.100.* 走 `OpenWrt-Lan` 虚拟网卡。
- 其他流量走默认的物理网卡。

在 Windows 上可以用 route 命令（静态路由）来实现。

1. 确定网卡编号 `route print`，找到 `OpenWrt-Lan` 对应的接口编号（Interface List 中），第一列数字即为接口编号。
2. `route -p add 192.168.100.0 mask 255.255.255.0 192.168.100.1 if <接口编号>`，添加静态路由。
  - `-p` 表示永久生效，重启后依然有效。
  - `<接口编号>` 替换为第一步中找到的接口编号。
3. 调节权重配置优先走 `OpenWrt-Lan` 虚拟网卡。
  - `netsh interface ipv4 set interface <物理网卡编号> metric=10`
  - `netsh interface ipv4 set interface <OpenWrt-Lan> metric=50`
  - `metric` 数值越小优先级越低，确保物理网卡优先级低于 `OpenWrt-Lan`。

这样子配置后，宿主机访问 `192.168.100.*` 的流量会通过 `OpenWrt`，而其他流量则继续通过物理网卡访问外网，避免了断网问题。

## 配置其他虚拟机网络

最后，在其他需要使用代理的虚拟机中，将网络适配器设置为 `OpenWrt-Lan`，并确保其网络配置为自动获取 IP 和 DNS。

