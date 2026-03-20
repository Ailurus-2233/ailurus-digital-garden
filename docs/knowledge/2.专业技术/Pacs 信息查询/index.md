---
title: Pacs 信息查询
tags: [PACS, DICOM, fo-dicom, 医学软件开发]
createTime: 2026/03/20 13:30:00
permalink: /notes/knowledge/expertise/pacs/
---

这一组文档整理使用 fo-dicom 与 PACS 服务通信时的核心概念和常见请求，先把通讯基础讲清楚，再进入验证、查询、检索、存储以及扩展 DIMSE 命令这些具体操作。

## 通讯基础

1. [DICOM 通讯基础](./1.DICOM%20通讯基础.md)：先理解 DICOM 通讯在工程里到底要对齐哪些参数和角色。
2. [AE Title 与节点配置](./2.AE%20Title%20与节点配置.md)：梳理 Calling AE、Called AE 以及节点配置的常见错误点。
3. [SCU 与 SCP 角色说明](./3.SCU%20与%20SCP%20角色说明.md)：理解不同命令里的请求方和服务方到底是谁。
4. [Association 与 Presentation Context](./4.Association%20与%20Presentation%20Context.md)：补齐 DICOM 协议协商层的基本概念。

## 基础组件

5. [DicomClient](./5.DicomClient.md)：理解 fo-dicom 里客户端组件的职责、构建方式和发送请求的方法。

## 查询与传输

6. [C-ECHO](./6.C-ECHO.md)：验证本地与 PACS 之间的基本通信是否可用。
7. [C-FIND](./7.C-FIND.md)：按患者、检查或序列等条件查询 PACS 中的元数据。
8. [C-MOVE](./8.C-MOVE.md)：请求 PACS 把目标影像发送到指定的接收端。
9. [C-STORE](./9.C-STORE.md)：实现上传到 PACS 或从 PACS 接收影像存储的流程。
10. [C-GET](./10.C-GET.md)：在当前关联上检索并回传影像，适合无法让 PACS 反向连接本地的场景。
11. [基础通信实战](./11.基础通信实战.md)：把 C-ECHO、C-FIND、C-MOVE、C-STORE 串成一条最小可落地的联调流程。
12. [N-ACTION](./12.N-ACTION.md)：理解 Normalized DIMSE 里的动作请求，以及它在 Storage Commitment 中的典型用途。
13. [N-EVENT-REPORT](./13.N-EVENT-REPORT.md)：理解事件结果通知机制，以及如何接收存储承诺等异步回报。

## Storage Commitment 实战

14. [Storage Commitment 流程总览](./14.Storage%20Commitment%20流程总览.md)：先把 C-STORE、N-ACTION、N-EVENT-REPORT 串成一条完整业务链路。
15. [发送影像并发起存储承诺](./15.发送影像并发起存储承诺.md)：聚焦发送端如何上传对象、组织事务并发起承诺请求。
16. [接收承诺结果与状态回写](./16.接收承诺结果与状态回写.md)：聚焦接收端如何消费事件通知并回写本地业务状态。

## 完整 PACS 通信实战
17. [完整通信实战](./17.完整通信实战.md)：把前面所有的概念和命令串成一个更接近真实业务的通信流程，覆盖从验证连接、查询、检索到上传和存储承诺的全链路。