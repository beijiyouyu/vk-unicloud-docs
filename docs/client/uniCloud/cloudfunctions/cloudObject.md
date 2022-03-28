## 云对象

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

这里说的云函数非uniCloud官方传统云函数，而是VK路由框架下的单文件云函数。（由于每个空间有云函数数量限制，一般不建议用传统云函数模式）

看个人编码喜好，有人喜欢云函数模式，也有人喜欢云对象模式，两者各有风格和优势。

## 云对象内置API@api

### 获取客户端信息@get-client-info

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
|platform	|string	|是		|客户端平台，app，mp-weixin等					|
|deviceId	|string	|是		|客户端deviceId，目前同getSystemInfo内的deviceId|
|uniIdToken	|string	|是		|客户端用户token								|
|uid	|string	|否		| 框架通过token解析出来的uid（可信任）	|
|filterResponse	|object	|否		| 框架中间件返回值（middleware/modules内的中间件）[查看详情](https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html)	|
|originalParam	|object	|是		| 原始请求参数，与云函数一致 [查看详情](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/originalParam.html)	|


### 获取当前登录用户信息@get-user-info

**接口形式**

`await this.getUserInfo()`


**示例：**

```js
module.exports = {
	add: function() {
		let userInfo = await this.getUserInfo(); // 获取当前登录的用户信息
	}
}
```


### 获取云端信息@get-cloud-info

**接口形式**

`this.getCloudInfo()`

**示例**

```js
module.exports = {
	add: function(){
		const cloudInfo = this.getCloudInfo()
	}
}
```

**返回值**

|参数名		|类型	|必备	|说明			|
|--			|--		|--		|--				|
|provider	|string	|是		|服务空间供应商	|
|spaceId	|string	|是		|服务空间Id		|

### 获取客户端token@get-uni-id-token

**接口形式**

`this.getUniIdToken()`

**示例**

```js
module.exports = {
	add: function(){
		const token = this.getUniIdToken()
	}
}
```


### 获取当前调用的方法名@get-method-name

本方法主要用于在 `_before` 等拦截器方法里，判断客户端上传的信息进行处理，比如发现客户端调用的是a方法时，执行一段特殊逻辑。详见下文

**接口形式**

`this.getMethodName()`

**示例**

```js
module.exports = {
	_before: function() { // _before的用法请看后续章节
		const methodName = this.getMethodName() // add
	}
}
```


### 获取当前参数列表@get-params

在云对象的普通方法里，参数可以直接获取。本方法主要用于在_`_before`等拦截器方法里，判断客户端上传的信息进行处理。详见下文

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

### 获取util工具包@get-util

在云对象的普通方法里，参数可以直接获取。本方法主要用于在_`_before`等拦截器方法里，判断客户端上传的信息进行处理。详见下文

**接口形式**

`this.getUtil()`

**示例**

```js
module.exports = {
	add: function() { // _before的用法请看后续章节
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


## 预处理与后处理@before-and-after

### 预处理 _before@before

云对象内可以创建一个特殊的方法_before，用来在调用常规方法之前进行预处理，一般用于拦截器、统一的身份验证、参数校验等。

以下示例的逻辑是，当客户端调用shop云对象非pub_的方法时，校验当前登录用户是否有权限操作此店铺，校验失败则直接报错返回客户端，校验通过继续执行update方法。

```js
module.exports = {
	_before: function(){
		const methodName = this.getMethodName();
		if(methodName.indexOf("pub_") !== 0) {
      let userInfo = await this.getUserInfo(); // 获取当前登录的用户信息
      let { shop_ids = [] } = userInfo;
      let { shop_id } = data;
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


### 后处理 _after@after

与预处理`_before`对应的是后处理`_after`。云对象内可以创建一个特殊的方法`_after`用来再加工处理本次调用方法的返回结果或者抛出的错误

请看以下示例：

```js
module.exports = {
	_before: function(){
		this.startTime = Date.now() // 在before内记录开始时间并在this上挂载，以供后续流程使用
	},
	_after(error, result) {
		if(error) {
			throw error // 如果方法抛出错误，也直接抛出不处理
		}
		result.timeCost = Date.now() - this.startTime
		return result
	},
  add: function(data) {
  	return {
  		errCode: 0,
  		errMsg: '创建成功'
  	}
  },
}
```


## 如何使用云对象？

文档整理中。。。

敬请期待！
