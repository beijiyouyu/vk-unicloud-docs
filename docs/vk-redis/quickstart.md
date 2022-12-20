# 快速上手 - 安装步骤

## 安装

* 1、右键云函数，选择 `管理公共模块依赖` 菜单，打勾 `uni-cloud-redis` 模块
* 2、安装完成。就是这么简单。

## 尝试运行第一个Redis API

```js
const redis = vk.redis();
await redis.set('a','我是a的值');
let redisRes = await redis.get('a');
```

#### 特别注意：

* 使用腾讯云node12和redis，务必仔细阅读此文档：[keepRunningAfterReturn](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#keep-running)