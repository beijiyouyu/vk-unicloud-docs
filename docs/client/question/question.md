# 群友问题集

## 为什么云函数执行成功了，前端还是会返回错误呢？

云函数最终返回的数据必须带上code:0 如：

```js
return {
  code: 0,
  msg: "添加成功"
}
```

```js
return {
  code: 0,
  orderInfo: {
    
  }
}
```

```js
let res = { code: 0, msg: "" };

res.orderInfo = xxxxx1;
res.userInfo = xxxxx2

return res;
```

如果return的code不为0，则当错误处理，框架会自动alert(msg) 如：

```js
return { code: -1, msg: "积分不足" };
```

```js
return { code: -1, msg: "参数错误" };
```


建议使用以下云函数模板

```js
'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url user/pub/test1 前端调用的url参数地址
	 * data 请求参数
	 * @param {String} params1  参数1
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始-----------------------------------------------------------

		res.orderInfo = xxxxxxx;
    
		res.userInfo = userInfo;
    
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
```

## 请求云函数报403错误
```js
code=403 为权限不足，通常是因为你写的云函数没有放在`pub`或`kh`目录下导致的
pub目录：任何人都可以请求的云函数
kh目录：只有登录用户才可以请求的云函数
sys目录：登录且拥有对应权限的用户才可以请求的云函数
```

## 如何在云函数中访问http服务
```js
let requestRes = await vk.request({
  url:`https://xxxxxxx.xxxx.com`,
  method:"POST",
  data:{
    a:1,
    b:{
     c:"2"
    }						
  },
  useContent:true, // true代表将参数转为使用body请求体
});
```

## 云函数中时区问题导致获取到的本月起始时间和截止时间不准确
```js
// 使用以下api可以解决时区问题：
let commonTime = vk.pubfn.getCommonTime(new Date());
```

## 云函数中如何使用缓存

[点击查看缓存使用](https://vkdoc.fsq.pub/client/uniCloud/cache/cache.html)

## 云函数中如何将网络图片上传到云储存
```js
let imageBuffer = await vk.request({
  url: "https://xxxx.xxxx.com/xxx.jpg",
  method: "GET",
  dataType: "default"
});
let uploadFileRes = await uniCloud.uploadFile({
  cloudPath: "test.jpg",
  fileContent: imageBuffer
});
let fileUrl = uploadFileRes.fileID;
```

## 云函数中如何将网络图片转成base64
```js
let imageBuffer = await vk.request({
  url: "https://xxxx.xxxx.com/xxx.jpg",
  method: "GET",
  dataType: "default"
});
let base64 = "data:image/png;base64," + imageBuffer.toString('base64');
```

## 云函数（云对象）中如何调用另一个云函数（云对象）

#### 方式一（推荐，vk-unicloud版本需>=2.9.0）
**注意：方式一只支持符合VK框架路由规则的云函数或云对象**

优势：完美契合VK框架，且拥有继承当前用户token、ip等功能。

```js
// 云函数内调用其他云函数或云对象内的函数，在同一个router大函数下，name参数可不传
let callRes = await vk.callFunction({
  name: "router",
  url: 'client/user/pub/test',
  event,
  data: {
    a:1
  },
});
console.log(callRes)

// 云对象内调用其他云函数或云对象内的函数，在同一个router大函数下，name参数可不传
let callRes = await vk.callFunction({
  name: "router",
  url: 'client/user.test',
  clientInfo: this.getClientInfo(),
  data: {
    a:1
  },
});
console.log(callRes)
```

#### 方式二（此方式适用任何场景）

优势：可以请求不是vk框架下的云函数

```js
let callFunctionRes = await uniCloud.callFunction({
  name: "router",
  data: {
    $url: "client/user/pub/test",
    data: {
      a:1,
      b:2
    }
  }
});
console.log(callFunctionRes.result)
```

#### 方式三 （此方式需要单独写成公共函数，如 `service/user/util/login_log.js`）、

优势：减少一次网络请求，性能高

```js
// 下方代码是演示调用 service/user/util/login_log 文件内的 add函数
let loginLogService = vk.require("service/user/util/login_log");
await loginLogService.add({
  type: "login",
  login_type: "univerify",
  user_id: res.uid,
  context: originalParam.context
},util);
```

## 文件上传成功后如何自动保存到vk-files表里？

`vk.callFunctionUtil.uploadFile` 的参数 `needSave` 设置为 true 如：
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.callFunctionUtil.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      file: res.tempFiles[0],
      needSave:true,
      success(res) {
       // 上传成功

      }
    });
  }
});
```

## 为什么前端路由页面刷新报404错误，正常跳转可以，刷新报错？

方案一：在 `manifest.json` 中 `H5配置` 设置路由模式为 `hash`

方案二：在 uniCloud `前端网页托管` 页面中 点击 `参数配置` 编辑路由规则 把 `网站首页` 和 `404页面` 都设置为 `index.html`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/b4a3a8b9-1132-4d63-a6d3-371612f6b9c8.png)


## 公众号登录流程

* 1、需要登录公众号后台，获取 `appid` 和 `appsecret` 并填写在 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json` 内
```js
"h5-weixin": {
  "oauth": {
    "weixin": {
      "appid": "微信公众号appid",
      "appsecret": "微信公众号appsecret"
    }
  }
},
```
* 2、在公众号后台左侧菜单 - 设置与开发 - 公众号设置 - 功能设置 - 配置业务域名、网页授权域名、JS接口安全域名
* 3、运行如下代码，访问授权页面
```js
let appid = "你的公众号appid";
let redirect_uri = window.location.href.split("?")[0];
let scope = "snsapi_userinfo";
let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
window.location.href = url;
```
* 4、授权完后页面会重新返回到你自己的页面（但此时页面已经刷新了），此时在页面 `onLoad` 函数中可以获取到 `code`
* 5、运行如下代码，进行微信公众号登录（其中 this.options 是 onLoad 获取的参数对象）
```js
if(!this.options.code){
  vk.toast("请先获取code");
  return false;
}
vk.userCenter.code2SessionWeixin({
  data:{
    code: this.options.code,
    state: this.options.state,
  },
  success: (data) => {
    // 登录成功后执行的逻辑
    vk.alert(JSON.stringify(data));
  },
});
```



## 为什么感觉云开发的响应速度比传统服务器开发要慢？

先看一下实际测试数据。

| 项目                      | 云开发耗时（单位毫秒） | 传统本地开发耗时（单位毫秒）    | 
|--------------------------|-------|------|
| 1次请求（无数据库简单查询） |  100  |  1  | 
| 1次数据库简单查询耗时 |  80  |  40  | 
| 1次请求（1次数据库简单查询） |  180  |  41  | 
| 1次请求（3次数据库简单查询） |  340  |  121  | 
| 1次请求（5次数据库简单查询） |  500  |  201  | 
| 1次请求（10次数据库简单查询） |  900  |  401  | 


友情提醒：云函数连接云端比连接本地云函数要快（上面的测试是连接云端时的速度）（因为本地云函数连接云开发的数据库是外网访问，但本地的优势是不需要上传，且能实时打印日志）


从测试数据中我们可以看出云开发响应速度确实比传统服务器开发要慢，且至少慢了1倍，那么为什么呢？

以java为例

传统开发 用户前端请求 - nginx - tomact - mysql 大致为3层（如果去掉nginx，则只有2层，甚至tomact和mysql是在同一台服务器上的）。

而云开发 内部更为复杂，中间环节也比较多，导致耗时长，且云开发是所有人共享整个服务器集群，所以服务器承担的总并发量也是很大的，导致延迟会高。

云厂商如果要将延迟降低，势必要增加服务器集群，增加机房，这些都是成本。所以云厂商会尽量让延迟控制在一个合理的范围内，成本和收益要对等。


## 为什么云函数URL化后，明明数据库里有该用户，登录提示用户不存在？

这是因为现在的 `uni-id` 模块强制不同端用户隔离导致的，你需要在URL化请求后多传2个参数

分别为：

* vk_appid    （你项目的manifest.json内的appid）
* vk_platform （当前环境，比如h5）

以jquery为例

```js
$.ajax({
  type: 'POST',
  url: "https://xxxxxx.com/http/router/user/pub/login",
  data: JSON.stringify({
    vk_appid: "__UNI__A8V6E8P",
    vk_platform: "h5",
    username: "test",
    password: "123456"
  }),
  success: (data) => {
    console.log("data", data);
  }
})
```


## 如何在非VK框架目录结构的云函数中使用VK框架的API？

这里的非VK框架目录结构的云函数指的是：不是 `router` 目录结构的云函数。

任意云函数其实都可以通过下面的方式去使用 `VK` 框架的API

```js
'use strict';
// 通过 require 引入 vk 实例
const vk = require('vk-unicloud');
// 通过 vk.init 初始化 vk实例（只有初始化后才能使用）
vk.init({
	baseDir: __dirname,
	requireFn: require
});

exports.main = async (event, context) => {
	//event为客户端上传的参数
  
  // 调用 select API
	let res = await vk.baseDao.select({
		dbName:"uni-id-users",
		pageIndex:1,
		pageSize:20,
		whereJson:{

		},
		fieldJson:{},
		sortArr:[{ "name":"_id", "type":"desc" }],
	});

	//返回数据给客户端
	return res
};

```

___特别注意：___

如果是在 `router` 云函数内的js，直接通过 `uniCloud.vk` 来调用

如果是在 `前端js` 内，直接通过 `uni.vk` 来调用





## 小程序加载 `uViewUI` 后，运行提示代码超2M，无法预览？

按下图所示: 运行 - 运行到小程序模拟器 - 运行时是否压缩代码（此处打钩即可），打勾后重新编译小程序运行。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2082eebd-2c42-4987-a633-20c7f865cba0.png)

___注意：如果这么做后还是超大小，那么你需要将非底部 `tabbar` 页的其他所有页面写在分包中，不要写主包中，同时图片和字体等静态文件尽量全部用外链。___



## 如何请求多服务空间?

[点击查看](https://vkdoc.fsq.pub/client/question/q9.html)






































<style scoped>
h1{
  font-size:1.4em;
}

h2{
  font-size:1.3em;
}

h3{
  font-size:1.1em;
}
</style>