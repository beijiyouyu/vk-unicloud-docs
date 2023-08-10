---
sidebarDepth: 0
---

# service模板内参数含义
 
```js
let { data = {}, userInfo, util, filterResponse, originalParam } = event;
let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
let { uid } = data;
```
## 常用
| 参数             | 说明                   | 
|------------------|-----------------------|
| data          | 前端传过来的请求参数            |
| userInfo          | 当前登录用户的用户信息（kh目录下的云函数才有，pub目录下需要多传一个参数`need_user_info:true`） [点击查看示例](#need-user-info示例)      |
| uid          | 当前登录用户的用户的id（kh目录下的云函数才有，pub目录下需要多传一个参数`need_user_info:true`）[点击查看示例](#need-user-info示例)     |
| vk          | vk实例对象            |
| pubFun          | 你自己的公共函数（函数文件在 `router/util/pubFunction.js`）            |
| db          | 数据库对象            |
| _          | 等价于 db.command            |

### need_user_info示例

**正确示例**
```js
vk.callFunction({
  url: 'template/db_api/pub/add',
  title: '请求中...',
  data: {
    need_user_info:true, // 注意，need_user_info是加在 data 的属性里，而不是与data同级
  },
  success: (data) => {
    
  }
});
```

**错误示例**

```js
vk.callFunction({
  url: 'template/db_api/pub/add',
  title: '请求中...',
  need_user_info:true, // 注意，此为错误示例，写在这里是无效的
  success: (data) => {
    
  }
});
```

## 特殊

| 参数             | 说明                   | 
|------------------|-----------------------|
| config          | 全局配置            |
| util          | 框架内置的工具函数包（公共函数）           |
| filterResponse          | 过滤器返回的数据         |
| originalParam          | 原始请求数据（IP地址这些就是从这里获取 `originalParam.context.CLIENTIP`）            |
| customUtil          | 你自己的工具包（公共函数）         |
| uniID          |  uni-id 实例对象            |


## originalParam.context 介绍

```js
//originalParam.context中可获取客户端调用的上下文
let os = originalParam.context.OS //客户端操作系统，返回值：android、ios    等
let platform = originalParam.context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
let appid = originalParam.context.APPID // manifest.json中配置的appid
let clientIP = originalParam.context.CLIENTIP // 客户端ip信息
let clientUA = originalParam.context.CLIENTUA // 客户端user-agent
let deviceId = originalParam.context.DEVICEID // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
let spaceInfo = originalParam.context.SPACEINFO // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
```






