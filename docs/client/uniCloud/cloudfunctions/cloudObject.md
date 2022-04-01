# 云对象

> 新增于 vk-unicloud 2.8.0（于 2022-04-01 发布）

## 云对象是什么？

云对象是云函数的集合，即N个函数写在同一个xx.js文件里。

___在VK框架中，可以做到云对象和云函数同时存在。___

**即在VK框架中，同时支持 `云对象路由模式` 和 `云函数路由模式`。**

- 1、VK框架使用云对象前的目录结构

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/ff8f0028-9a9c-464c-9c92-f900ac5354ba.png)

- 2、VK框架使用云对象后的目录结构

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1f4c0851-99e9-4fe1-8ab9-cbedee407002.png)

## 云对象能带来什么，优势是？

**云对象与之前的单文件云函数模式相比有什么优势？**

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
|originalParam	|object	|是		| 原始请求参数，特殊情况下需要	|


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

判断用户是否登录框架已经内置，无需再写代码判断用户是否登录。[查看内置权限](#内置权限)

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

云对象已内置以下权限类型。

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

sys类型的函数通常用于admin端，如商城系统角色分为 

- 管理员：可以进行所有操作。
- 财务：只能执行财务相关的操作，如：查看报表、提现等。
- 仓储：只能执行订单相关的操作，如：订单查看、发货等。
- 客服：只能执行客户、订单相关的查询操作，如：查看客户信息，查看订单信息。
- 老板：可以查看所有数据，但不可以修改和删除。如：查看报表、查看商城统计数据等。

**框架会通过用户拥有的角色权限，自动判断拦截请求。**

**拦截原理：通过admin端权限管理（设置某权限可以执行哪些云函数）、角色管理（角色赋予权限）、用户管理（用户赋予角色）完成。**

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

以创建 client 端 用户业务为例。

**手动版**

- 1、在 `router/service/client/` 目录新建 `user.js` 文件
- 2、复制 [云对象模板代码](#云对象模板代码) 覆盖 `user.js` 文件内容
- 3、完成

**自动版**

**自动版需要下载 [VK框架快速开发辅助工具](https://ext.dcloud.net.cn/plugin?id=6663)**

- 1、在 `router/service/client/` 目录右键，依次点击VK - 新建云对象
- 2、输入云对象名称 `user`，并点击确定
- 3、完成

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/613e4fb9-c562-46b4-8426-411797d218a6.png)

### 云对象模板代码

以下是一个完整的云对象代码，里面包含了 `getInfo` 、 `getList` 两个函数，以及 两个内置函数 `_before` 和 `_after`

```js
'use strict';
var vk; // 全局vk实例
// 涉及的表名
const dbName = {
	//test: "vk-test", // 测试表
};

var db = uniCloud.database(); // 全局数据库引用
var _ = db.command; // 数据库操作符
var $ = _.aggregate; // 聚合查询操作符
/**
 * 权限注意：访问以下链接查看
 * 文档地址：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#内置权限
 */
var cloudObject = {
	isCloudObject: true, // 标记为云对象模式
	/**
	 * 请求前处理，主要用于调用方法之前进行预处理，一般用于拦截器、统一的身份验证、参数校验、定义全局对象等。
	 * 文档地址：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#before-预处理
	 */
	_before: async function() {
		vk = this.vk; // 将vk定义为全局对象
		// let { customUtil, uniID, config, pubFun } = this.getUtil(); // 获取工具包
	},
	/**
	 * 请求后处理，主要用于处理本次调用方法的返回结果或者抛出的错误
	 * 文档地址：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#after-后处理
	 */
	_after: async function(options) {
		let { err, res } = options;
		if (err) {
			return; // 如果方法抛出错误，直接return;不处理
		}
		return res;
	},
	/**
	 * 模板函数
	 * @url client/muban.getInfo 前端调用的url参数地址
	 */
	getInfo: async function(data) {
		let { uid } = this.getClientInfo(); // 获取客户端信息
		let userInfo = await this.getUserInfo(); // 获取当前登录的用户信息
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		console.log("请求参数", data);
		res.userInfo = userInfo; // 返回前端当前登录的用户信息
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
	/**
	 * 模板函数
	 * @url client/muban.getList 前端调用的url参数地址
	 */
	getList: async function(data) {
		let { uid, filterResponse, originalParam } = this.getClientInfo(); // 获取客户端信息
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		console.log("请求参数", data);


		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};

module.exports = cloudObject;
```

### 前端如何调用云对象？

调用云对象有两种方式。

___注意： vk = this.vk 或 vk = uni.vk___

**方式一：使用 vk.callFunction**

**回调形式**

```js
// 回调形式 success fail complete
vk.callFunction({
  url: '云对象函数路径',
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  },
  success(data) => {
    // 成功后的逻辑
  }
});
```

**promise形式**
```js
// promise方式
vk.callFunction({
  url: '云对象函数路径',
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  }
}).then((data) => {
   // 成功后的逻辑
}).catch((err) => {
   
});
```
**async/await形式**

此方式只能在声明了 async 的函数中运行。

```js
// async/await方式
let data = await vk.callFunction({
  url: '云对象函数路径',
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  }
});
```


**云对象函数路径url获取方式**

云对象函数路径url = service内的目录名+对象名+函数名

如：`client/user.getInfo` 代表调用 client 目录下的 user 对象内的 getInfo 函数。


**方式二：使用 uni.vk.importObject**


方式二分两步

第一步：导入云对象。

```js
const userObject = uni.vk.importObject("client/user"); // 这段代码可以写在外层顶部，也可以直接写在对应函数内部。
```

第二步：调用云对象内的函数。

**回调形式**

```js
// 回调形式 success fail complete
userObject.getInfo({
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  },
  success(data) => {
    // 成功后的逻辑
  }
});
```

**promise形式**
```js
// promise方式
userObject.getInfo({
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  }
}).then((data) => {
   // 成功后的逻辑
}).catch((err) => {
   
});
```
**async/await形式**

此方式只能在声明了 async 的函数中运行。

```js
// async/await方式
let data = await userObject.getInfo({
  title:'请求中...',
  data:{
    // 请求参数
    a:1,
    b:"2"
  }
});
```




## 本地运行

**VK框架下的云对象是支持本地运行的（官方的云对象目前不支持）**

本地运行方式跟云函数一致，

**具体操作步骤：**

**手动版**

- 1、右键 router 目录，点击 【配置运行测试参数】，会在 router 根目录生成一个 `router.param.json` 文件
- 2、复制下方代码到 `router.param.json` 文件内覆盖原本内容
```json
{
	"uni_id_token":"",
	"$url":"client/user.getInfo",
	"data":{
		"a":1,
    "b":"2"
	}
}
```
- 3、右键 router 目录，点击【运行-本地云函数】（也可以按快捷键 ctrl + r，再按回车）

**自动版**

**自动版需要下载 [VK框架快速开发辅助工具](https://ext.dcloud.net.cn/plugin?id=6663)**

- 1、先选中云对象内的某个函数名，再右键依次点击 VK-本地运行云函数（此时页面会跳到 `router.param.json` 文件内且自动修改$url的值）
- 2、再右键 router 目录，点击【运行-本地云函数】（也可以按快捷键 ctrl + r，再按回车）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e647fdbb-dedb-433e-b5c9-1f15b9349a1c.png)

## 云对象URL化

与云函数基本一致

[点击查看](https://vkdoc.fsq.pub/client/question/q2.html)

## 云对象URL化之URL重写

云对象的URL会带. 如：`https://www.aaa.com/http/router/client/user.getInfo`

如果你的URL尾部不想要带. 则可以使用 `URL重写` 来达到效果。

你可以将 `https://www.aaa.com/http/router/client/user.getInfo` 重写为 `https://www.aaa.com/http/router/client/user/getInfo`

重写规则为：

```js
module.exports = {
  "rule": {
    "^client/user/(.+)": "client/user.$1"
  },
  "config": {
    // 当设置为true时，只有符合url重写规则内的云函数才可以被url化访问。
    "accessOnlyInRule":false
  }
};
```

[点击查看详细说明](https://vkdoc.fsq.pub/client/question/q2.html)

## 访问HTTP服务

与云函数一致

[点击查看](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/http.html)

## 定时器

与云函数一致，定时器是需要额外创建传统云函数的。

[点击查看](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/timer.html)

## 使用crypto进行加密解密

与云函数一致，crypto 是 Nodejs 的内置模块，提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

[点击查看](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/crypto.html)

## 同一个云对象内A函数调用B函数

在同一个云对象内，可以通过 `await this.xxx()` 来调用其他函数，xxx为函数名。

## A云对象内的函数调用B云对象的函数

**不支持**

每个云对象之间业务逻辑隔离，建议不要有A云对象调用B云对象的想法，不然业务逻辑耦合度太高，不容易维护。

**为什么要低耦合？**

【高内聚，低耦合】是当代软件设计的规范。

道理很简单，耦合度很高的情况下，维护代码时修改一个地方会牵连到很多地方，如果修改时没有理清这些耦合关系，那么带来的后果可能会是灾难性的。
特别是对于需求变化较多以及多人协作开发维护的项目，修改一个地方会引起本来已经运行稳定的模块错误，严重时会导致恶性循环，问题永远改不完。

**注意**

如果涉及到自定义的全局公共函数，可以写在 `router/util/pubFunction.js` 文件中，在云对象中通过以下方式调用

```js
let { pubFun } = this.getUtil();
let xxxRes = await pubFun.xxx();
```

## 云对象操作常见问题

与云函数一致

[点击查看](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/question.html)