# Travel Itinerary · Sanitized Demo

English · [中文](#旅行行程助手--脱敏演示版)

A WeChat Mini Program that shows one way to organise a trip itinerary:
**destination list → read-only month calendar → day-by-day stop list**.

> This is a **trimmed demo** built to show page structure and interaction design.
> It ships no cloud backend, no entitlement system, no export features and no real itinerary data.

## What it demonstrates

- **Destinations** — Available / Coming Soon tabs with an underline indicator
- **Itinerary** — read-only month calendar that lists only the months containing stops; switch by day to see that day's stops
- All data comes from the local `data/mock.js` — no network, no cloud service

## Why the content is so small

This is intentional, not unfinished:

| | This demo |
| --- | --- |
| Destinations | **2** (1 available + 1 coming soon) |
| Stops per itinerary | **3** |
| Fields per stop | **title and location only** — no notes, times or links |
| Export features | **none** |

That leaves a lot of empty space on screen, which is where the dashed hint pointing to the full app lives. The demo explains the structure; the real content lives in the product.

## Differences from the production app

| | Production | This demo |
| --- | --- | --- |
| Data source | WeChat cloud database | local `data/mock.js` |
| Cloud functions | 13 (auth, entitlement, content, admin) | none |
| Itinerary editing | change departure date, drag stops, edit text | none, read-only |
| Export | `.ics` calendar file, long calendar image | none |
| Entitlements / payment | yes | none |
| Languages | Chinese / English | English |
| Content volume | several destinations, full itineraries | 2 destinations, 3 stops each |

## Quick start

1. WeChat DevTools → *Import project* → pick this repository root
2. `appid` in `project.config.json` is `touristappid` — WeChat's placeholder for projects without an appid. No real appid or cloud credentials ship with this repo; just compile
3. No cloud configuration required

## Project structure

```
app.js / app.json / app.wxss
data/mock.js               demo data
pages/destination/         destination list (tab layout)
pages/home/                read-only month calendar + day list
```

## License

MIT

---

# 旅行行程助手 · 脱敏演示版

[English](#travel-itinerary--sanitized-demo) · 中文

一个微信小程序，演示行程工具的一种页面组织方式：
**目的地列表 → 只读月历 → 按天的行程条目**。

> 这是一个**精简的演示版本**，用来展示页面结构与交互设计。它不含云开发后端、不含权益系统、不含任何导出功能，也不含任何真实行程数据。

## 演示了什么

- **目的地页** —— 已上线 / 待上线 两个 Tab，带下划线指示器
- **行程页** —— 只读月历，只列出有行程的月份；按天切换查看当天的条目
- 数据全部来自本地 `data/mock.js`，无需网络、无需任何云服务

## 为什么内容这么少

这是刻意截断，不是没做完：

| | 本演示版 |
| --- | --- |
| 目的地 | **2 个**（1 个已上线 + 1 个待上线） |
| 每个行程的条目 | **3 条** |
| 每条条目的字段 | **只有标题与地点**，不含说明、时间、链接 |
| 导出功能 | **无** |

所以页面上会留出大片空白，那里放了一块虚线提示，引导到完整版。演示版负责把结构讲清楚，真实内容在正式版里。

## 与原版的差异

| | 原版 | 本演示版 |
| --- | --- | --- |
| 数据来源 | 微信云开发数据库 | 本地 `data/mock.js` |
| 云函数 | 13 个（登录、权益、内容、管理） | 无 |
| 行程编辑 | 可改出发日、拖拽排序、改文字 | 无，纯只读 |
| 导出 | `.ics` 日历文件、月历长图 | 无 |
| 权益 / 付费 | 有 | 无 |
| 语言 | 中 / 英 | 英文 |
| 内容量 | 多个目的地、完整行程 | 2 个目的地、每行程 3 条 |

## 快速开始

1. 微信开发者工具 → 导入项目 → 选本仓库根目录
2. `project.config.json` 里的 `appid` 是 `touristappid` —— 微信给「没有 AppID 的项目」的固定占位值。本仓库不含任何真实 AppID 或云凭据，直接编译即可
3. 无需任何云端配置

## 目录结构

```
app.js / app.json / app.wxss
data/mock.js               演示数据
pages/destination/         目的地列表（TabLayout）
pages/home/                只读月历 + 按天列表
```

## License

MIT
