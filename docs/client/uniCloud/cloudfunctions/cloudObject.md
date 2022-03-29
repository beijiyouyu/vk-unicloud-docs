# 云对象

> 新增于 vk-unicloud 2.8.0

## 云对象是什么？

云对象是云函数的集合，即N个函数写在同一个xx.js文件里。

___在VK框架中，可以做到云对象和云函数同时存在。___

___即在VK框架中，同时支持云对象路由模式和云函数路由模式。___

<img class="preview"  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/16b7382b-9f27-4c16-8b04-9098f60c6b05.png"/>

## 云对象能带来什么？与之前的单文件云函数模式相比有什么优势？

- 1、解决目录层级过深的问题

- 2、精简代码量（减少总体的代码量）

- 3、云对象作为业务逻辑相对独立的个体，自带 _before 和 _after 两个过滤器，逻辑更清晰。

## 从单文件云函数模式迁移到云对象复杂吗？

- 无需迁移，在VK框架中，可以做到云对象和云函数同时存在。

## 有了云对象是否可以放弃云函数？

这里说的云函数非uniCloud官方传统云函数，而是VK框架下的单文件云函数路由模式。（传统云函数模式早就可以放弃了）

看个人编码喜好，有人喜欢云函数路由模式，也有人喜欢云对象路由模式，两者各有风格和优势。

## 云对象内置API

### this.getClientInfo（获取客户端信息）

**接口形式**

`this.getClientInfo()`


**示例：**

```js
module.exports = {
	add: function() {
		const clientInfo = this.getClientInfo();
	}
}
```

**解构赋值：**

```js
module.exports = {
	add: function() {
		let { uid } = this.getClientInfo();
	}
}
```



**返回值**

|参数名		|类型	|必备	|说明											|
|--			|--		|--		|--												|
|os			|string	|是		|客户端系统										|
|appId		|string	|是		|客户端DCloud AppId								|
|locale		|string	|是		|客户端语言										|
|clientIP	|string	|是		|客户端ip										|
|userAgent	|string	|是		|客户端ua										|
|platform	|string	|是		|客户端平台，h5，mp-weixin等					|
|deviceId	|string	|是		|客户端deviceId，目前同getSystemInfo内的deviceId|
|uniIdToken	|string	|是		|客户端用户token								|
|uid	|string	|否		| 框架通过token解析出来的uid（可信任）	|
|filterResponse	|object	|否		| 框架中间件返回值（middleware/modules内的中间件）[查看详情](https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html)	|
|originalParam	|object	|是		| 原始请求参数，与云函数一致 [查看详情](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/originalParam.html)	|


### this.getUserInfo（获取当前登录用户信息）

**接口形式**

`await this.getUserInfo()`

___注意：此接口需要加 await___

**示例：**

```js
module.exports = {
	add: function() {
		let userInfo = await this.getUserInfo(); // 获取当前登录的用户信息
	}
}
```

**特殊注意：**

`await this.getUserInfo()` 有缓存，在同一次请求中，多次调用 `await this.getUserInfo()` ，只执行一次数据库查询

这么做是为了防止在同一次请求中重复查询（加快响应速度）如果你在本次请求中修改了用户信息同时想获取修改后的用户信息，你应该执行

```js
let { uid } = this.getClientInfo();
// 根据id查询最新用户信息
let newUserInfo = await vk.daoCenter.userDao.findById(uid);
```

或

```js
let { uid } = this.getClientInfo();
// 修改的同时返回修改后的结果
let newUserInfo = await vk.baseDao.updateAndReturn({
  dbName:"uni-id-users",
  whereJson:{
    _id: uid
  },
  dataJson:{
    nickname:"修改后的昵称"
  }
});
```

### this.getCloudInfo（获取云端信息）

**接口形式**

`this.getCloudInfo()`

**示例**

```js
module.exports = {
	add: function(){
		const cloudInfo = this.getCloudInfo();
	}
}
```

**返回值**

|参数名		|类型	|必备	|说明			|
|--			|--		|--		|--				|
|provider	|string	|是		|服务空间供应商	|
|spaceId	|string	|是		|服务空间Id		|

### this.getUniIdToken（获取客户端token）

**接口形式**

`this.getUniIdToken()`

**示例**

```js
module.exports = {
	add: function(){
		const token = this.getUniIdToken();
	}
}
```


### this.getMethodName（获取当前调用的方法名）

本方法主要用于在 `_before` 等拦截器方法里，判断客户端上传的信息进行处理，比如发现客户端调用的是a方法时，执行一段特殊逻辑。详见下文

**接口形式**

`this.getMethodName()`

**示例**

```js
module.exports = {
	_before: function() { // _before的用法请看后续章节
		const methodName = this.getMethodName(); // add
	}
}
```


### this.getParams（获取当前参数列表）

在云对象的普通方法里，参数可以直接获取。本方法主要用于在 `_before` 等拦截器方法里，判断客户端上传的信息进行处理。详见下文

**接口形式**

`this.getParams()`

**示例**

```js
module.exports = {
	_before: function() { // _before的用法请看后续章节
		let { a, b, c } = this.getParams(); 
	}
}
```

### this.getUtil（获取util工具包）

**接口形式**

`this.getUtil()`

**示例**

```js
module.exports = {
	add: function() {
		let { customUtil, uniID, config, pubFun } = this.getUtil(); // 获取工具包
	}
}
```


**返回值**

|参数名		|类型	|必备	|说明			|
|--			|--		|--		|--				|
|customUtil	|object	|是		|自定义工具包	|
|uniID	|object	|是		| uni-id实例		|
|config	|object	|是		| 全局配置信息	|
|pubFun	|object	|是		| 自定义公共函数		|
|db	|object	|是		| 数据库实例	= uniCloud.database() |
|_	|object	|是		| 数据库操作符 = db.command	|
|$	|object	|是		| 聚合查询操作符 = _.aggregate	|


## 预处理与后处理

### _before（预处理）

云对象内可以创建一个特殊的方法_before，用来在调用常规方法之前进行预处理，一般用于拦截器、统一的身份验证、参数校验等。

以下示例的逻辑是，当客户端调用shop云对象非pub_的方法时，校验当前登录用户是否有权限操作此店铺，校验失败则直接报错返回客户端，校验通过继续执行update方法。

```js
module.exports = {
  _before: function(){
    let methodName = this.getMethodName(); // 获取当前执行的函数名称
    if(methodName.indexOf("pub_") !== 0) {
      let { shop_id } = this.getParams(); // 获取前端传过来的参数
      let userInfo = await this.getUserInfo(); // 获取当前登录的用户信息
      let { shop_ids = [] } = userInfo;
      if (vk.pubfn.isNull(shop_id)) {
        return { code : -1, msg : `店铺id不能为空` };
      }
      if (shop_ids.indexOf(shop_id) === -1) {
        return { code : -1, msg : `无权限操作店铺【${shop_id}】` };
      }
    }
  },
  update: function(data) {
    return {
      errCode: 0,
      errMsg: '修改成功'
    }
  }
}
```

**注意**

判断用户是否登录框架已经内置，无需再写代码判断用户是否登录。

### _after（后处理）

与预处理 `_before` 对应的是后处理 `_after`。云对象内可以创建一个特殊的方法 `_after` 用来再加工处理本次调用方法的返回结果或者抛出的错误

请看以下示例：

```js
module.exports = {
  _before: function(){
    this.startTime = Date.now(); // 在before内记录开始时间并在this上挂载，以供后续流程使用
  },
  _after(error, result) {
    if(error) {
      throw error; // 如果方法抛出错误，也直接抛出不处理
    }
    result.timeCost = Date.now() - this.startTime;
    return result;
  },
  add: function(data) {
    return {
      errCode: 0,
      errMsg: '创建成功'
    }
  },
}
```

## 内置权限



### pub（无需登录即可访问的函数类型）

**满足以下任意一条规则，即为 `pub` 类型函数**

- 1、云对象内的函数名称以 `pub_` 开头，如：`pub_getList`（权重3）
- 2、云对象以 `pub.js` 命名 或以 `pub.xxx.js` 命名（xxx可以是任意字符串，如：`pub.user.js`）（权重2）
- 3、云对象写在 `pub` 目录下，如：`pub/user.js`（权重1）

### kh（需要登录才能访问的函数类型）

**满足以下任意一条规则，即为 `kh` 类型函数**

- 1、默认云对象内的函数均需要登录才能访问 如：`getList` `getInfo` 等（权重0）
- 2、云对象内的函数名称以 `kh_` 开头，如：`kh_getList`（权重3）
- 3、云对象以 `kh.js` 命名 或以 `kh.xxx.js` 命名（xxx可以是任意字符串，如 `kh.user.js`）（权重2）
- 4、云对象写在 `kh` 目录下，如：`kh/user.js`（权重1）

### sys（需要角色授权才能访问的函数类型）

**满足以下任意一条规则，即为 `sys` 类型函数**

- 1、云对象内的函数名称以 `sys_` 开头，如：`sys_getList`（权重3）
- 2、云对象以 `sys.js` 命名 或以 `sys.xxx.js` 命名（xxx可以是任意字符串，如：`sys.user.js`）（权重2）
- 3、云对象写在 `sys` 目录下，如：`sys/user.js`（权重1）

### _（禁止访问，私有函数类型）

**满足以下任意一条规则，即为 `私有` 类型函数**

- 1、云对象内的函数名称以 `_` 开头则禁止前端访问 如：`_before` `_after` `_aaa`（权重99）

### 特殊（同时满足多个类型时）

当云对象内某一个函数同时满足 `kh` 和 `pub` 类型时，通过权重值来决定属于哪一种类型。

如：

- 1、云对象名为 `pub.js`（满足pub权重2） 函数名为 `kh_getList`（满足kh权重3），则属于 `kh` 类型函数（取权重大的一方）。

- 2、云对象名为 `user.js`（满足kh权重0） 函数名为 `pub_getList`（满足pub权重3），则属于 `pub` 类型函数（取权重大的一方）。

## 快速上手 - 如何使用云对象？

### 如何编写云对象？

文档整理中。。。

敬请期待！

### 前端如何调用云对象？

文档整理中。。。

敬请期待！


## 本地运行

文档整理中。。。

敬请期待！

## 云对象URL化

文档整理中。。。

敬请期待！



