---
sidebarDepth: 0
---

# 自动获取userInfo

首先需要先介绍下两个框架内置的过滤器

- `kh` 过滤器 ： `kh` 目录下的云函数需要检测用户是否已登录。
- `pub`过滤器 ： `pub`目录下的云函数所有人都可以直接访问。
- `kh`目录下的函数默认会自动获取 `userInfo`（当前登录用户信息）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e7bdb9e0-8b64-46d3-8e93-8b0978ac4f34.png "屏幕截图.png")

___如果此云函数不需要用户信息，可以在前端多传一个参数`need_user_info:false` 可以减少一次数据库查询（加快响应速度）(快100ms左右)___

此时 依然会检测token是否有效，故 `uid` （当前登录用户ID）仍然可以获取到（因为uid是从token中解密获取，而非查数据库）

```js
vk.callFunction({
  url: "client/user/kh/findMyOrderList",
  data: {
    need_user_info : false, // 如果云函数用不到 `userInfo`，则传false可以加快接口相应速度
    // 以下是你自己的参数
    a:1, 
    b:2
  },
  success: (data) => {

  }
});
```

`pub`目录下的云函数默认不会获取 `userInfo`（当前登录用户信息），且不会获取 `uid`（因为pub不解析token）

___如果`pub`目录下的云函数想要获取 `userInfo`，则可以在前端多传一个参数`need_user_info:true`___

此处如果用户token有效，就可以获取到 `userInfo`，若token无效，则取不到`userInfo`

```js
vk.callFunction({
  url: "client/user/pub/findGoodsInfo",
  data: {
    need_user_info : true, // 如果pub下的云函数需要用到 `userInfo`，则传true,
    // 以下是你自己的参数
    a:1, 
    b:2
  },
  success: (data) => {

  }
});
```
 
