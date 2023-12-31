---
sidebarDepth: 0
---

# 列表渲染前后端一体模板

页面地址 `pages_template/db-test/list/list` 

## 核心点

前端只需要更改v-for循环内的样式和请求的云函数地址即可快速开发一个列表渲染功能

## 客户端（前端）功能介绍

1. 列表数据分页获取
2. 无数据时的额外显示（显示空内容组件）
3. 搜索功能
4. 下拉底部加载下一页
5. 加载过程底部状态提示（加载更多、正在加载、没有更多了）

熟练后只需要5分钟即可开发一个钱包余额收支列表功能（其中4分钟时间还是用在写样式上）

```js
export default {
  data() {
    // 页面数据变量
    return {
      url:"db_test/pub/getList",		// 获取list数据的云函数请求路径
      ...其他
    }
  }
  ...其他
}
```

功能体验可请直接查看页面路径：`pages_template/db-test/list/list`

若无数据，需要先执行添加测试数据的函数（页面路径：`pages_template/db-test/db-test`）

## 云函数端（后端）功能介绍

根据where条件获取对应的数据表的数据（支持分页、排序、字段筛选、连表查询等）

云函数路径：`template/db_api/pub/getList`

云函数最终返回的数据格式为：

```js
{
  code: 0,							// 0 成功 其他：失败
  hasMore: true,				// 是否还有下一页
  pageIndex: 1,					// 当前第几页
  pageSize: 10,					// 每页获取的数量
  rows: [{_id: "5f44680d3228ad0001b1ec1a", money: 5, kehuid: "001",…},…], // list数据
  total: 30							// 数据库符合条件的共有多少条数据
}
```

**开发一个列表渲染就是这么简单**

## 列表渲染模板体验地址

![列表渲染体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/522060bb-089a-4e9b-9da0-72c070f4eb00.png?x-oss-process=image/resize,h_250 "列表渲染体验地址")

## 插件首页体验地址

![插件首页体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/51de83e0-e9ae-11ea-81ea-f115fe74321c.png?x-oss-process=image/resize,h_250 "插件首页体验地址")
 