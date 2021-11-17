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

## 文件上传成功后如何自动保存到uni-id-files表里？

`vk.callFunctionUtil.uploadFile` 的参数 `needSave` 设置为 true 如：
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: function (res) {
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
* 5、运行如下代码，进行微信公众号登录（其中 that = this，that.options 是 onLoad 获取的参数对象）
```js
if(!that.options.code){
  vk.toast("请先获取code");
  return false;
}
vk.userCenter.code2SessionWeixin({
  data:{
    code: that.options.code,
    state: that.options.state,
  },
  success:function(data){
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
  success:function(data){
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