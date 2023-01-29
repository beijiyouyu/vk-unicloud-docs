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
code=403 为权限不足，通常是因为你写的云函数没有放在 pub 或 kh 目录下导致的
pub目录：任何人都可以请求的云函数
kh目录：只有登录用户才可以请求的云函数
sys目录：登录且拥有对应权限的用户才可以请求的云函数
其他目录：其他目录均为私有目录，不可被前端直接访问
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

`vk.uploadFile` 的参数 `needSave` 设置为 true 如：
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      file: res.tempFiles[0],
      needSave:true,
      success:(res) => {
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

**注意1：h5的路由模式必须配置为 `history`，因为微信公众号登录的回调地址不支持 `hash` 模式。**
**注意2：你的前端托管那需要设置404指向的页面为index.html**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/c3b343cd-0058-46db-86f4-64ae46fdf2fb.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0a79aeb8-33d6-4c7e-bc08-f0aa7d7ab4fd.png)

* 4、授权完后页面会重新返回到你自己的页面（但此时页面已经刷新了），此时在页面 `onLoad` 函数中可以获取到 `code`
* 5、运行如下代码，进行微信公众号登录（其中 this.options 是 onLoad 获取的参数对象）
```js
if (!this.options.code){
  vk.toast("请先获取code");
  return false;
}
vk.userCenter.loginByWeixin({
  data:{
    code: this.options.code,
    state: this.options.state
  },
  success: (data) => {
    // 登录成功后执行的逻辑
    vk.alert(JSON.stringify(data));
  }
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

**vk核心库版本>=2.12.0**

查看vk核心库版本的方法

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/cloudstorage/55e431c1-c89e-4922-8c04-5cb038240cec.png)

```js
'use strict';
// 引入 vk-unicloud
const vkCloud = require('vk-unicloud');
// 通过 vkCloud.createInstance 创建 vk 实例
const vk = vkCloud.createInstance({
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

**vk核心库版本<2.12.0**

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

**同时右键云函数添加依赖，必须勾上的依赖是 `uni-config-center` 和 `vk-unicloud`**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/91b28a9f-cf6c-4cdd-ae69-24ddff279941.png)


___特别注意：___

如果是在 `router` 云函数内的js，直接通过 `uniCloud.vk` 来调用

如果是在 `前端js` 内，直接通过 `uni.vk` 来调用


## 小程序加载 `uViewUI` 后，运行提示代码超2M，无法预览？

按下图所示: 运行 - 运行到小程序模拟器 - 运行时是否压缩代码（此处打钩即可），打勾后重新编译小程序运行。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2082eebd-2c42-4987-a633-20c7f865cba0.png)

___注意：如果这么做后还是超大小，那么你需要将非底部 `tabbar` 页的其他所有页面写在分包中，不要写主包中，同时图片和字体等静态文件尽量全部用外链。___



## 如何请求多服务空间?

[点击查看](https://vkdoc.fsq.pub/client/question/q9.html)

## 云函数/云对象如何递归调用自己

当一个云函数实例的资源不能满足需求，或超时时间不够用时。比如要给10万个用户发送短信，而短信发送接口一次调用最多支持50个手机号码，这样最少需要调用2000次接口才能完成；而一个云函数实例完成不了2000次接口的调用。这种场景就可以使用云函数递归调用，分解任务实现。

此处已云函数为例，云对象同理

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
    let { data = {}, userInfo, util, originalParam } = event;
    let { customUtil, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    // 业务逻辑开始-----------------------------------------------------------
    // 执行发短信的逻辑
    
    // 整个逻辑能实现递归要靠id排序来实现，也就是假设我要给10万人要发短信，每次只能发100人，那么要递归调用1000次
    // 我得清楚知道第N次执行时要给哪些人发短信
    // 原理是通过某个字段排序实现，如 _id 正序排序，那么第一次请求就是获取到了前100人，同时也得到了第100人的 _id是多少
    // 那么第二次调用时，就可以用 > _id 来获取第101-200人，同时也得到了第200人的 _id是多少
    // 那么第三次调用时，就可以用 > _id 来获取第201-300人，同时也得到了第300人的 _id是多少
    // 以此类推，
    // 那么第1000次时，就可以用 > _id 来获取第99901-100000人，这样就10万人全发完了
    let { before_id } = data;// 获取当前已操作的id
    let res = await sendSms(before_id); // 这方法的内部要实现返回最新已操作的id
    
    // 这里不加await
    vk.callFunction({
      url:"client/xxxx/xxxxx",
      data:{
        before_id: res.before_id
      }
    });
    
    // 等待500毫秒，给一个请求发出去的时间
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(res)
      }, 500)
    })
    // 业务逻辑结束-----------------------------------------------------------
  }
}

```


## 使用router云函数后，并发和执行速度等会不会受影响？

**关于执行速度**

不受影响，不管你 `router` 的 `service` 下有多少个子云函数，每次请求时，只会加载请求的那一个云函数，且加载时间为1ms左右，几乎可以忽略。

主要影响你执行速度的是你自己的业务代码执行逻辑，数据库查询次数越多越复杂，耗时越久。

关于云函数为什么比传统开发请求速度慢的问题，[点这里](https://vkdoc.fsq.pub/client/question/question.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%84%9F%E8%A7%89%E4%BA%91%E5%BC%80%E5%8F%91%E7%9A%84%E5%93%8D%E5%BA%94%E9%80%9F%E5%BA%A6%E6%AF%94%E4%BC%A0%E7%BB%9F%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%BC%80%E5%8F%91%E8%A6%81%E6%85%A2)

**关于单个大函数的代码体积限制**

**阿里云**

因为阿里云单个函数的代码体积（含node_modules和公共模块）只有10MB，因此不建议使用太大的第三方npm包，如果必须使用，可以新建1个router2，前端请求可以通过vk.callFunction指定name参数来请求router2内的子函数

**腾讯云**

腾讯云单个函数的代码体积（含node_modules和公共模块）	有50MB，一般无需担心单个router会超大小，但建议除非必要，否则不太建议使用太大的第三方npm包

**前端请求可以通过以下方式请求router2内的子函数**

```js
vk.callFunction({
  name: 'router2',
  url: '云函数路径',
  title: '请求中...',
  data: {
    
  },
  success: (data) => {
    
  }
});
```

**云函数内可以通过以下方式请求router2内的子函数**

```js
// 云函数内调用其他云函数或云对象内的函数，在同一个router大函数下，name参数可不传
let callRes1 = await vk.callFunction({
  name: "router2",
  url: 'client/user/pub/test',
  event,
  data: {
    a:1
  },
});
console.log(callRes1)

// 云对象内调用其他云函数或云对象内的函数，在同一个router大函数下，name参数可不传
let callRes2 = await vk.callFunction({
  name: "router2",
  url: 'client/user.test',
  clientInfo: this.getClientInfo(),
  data: {
    a:1
  },
});
console.log(callRes2)

```


**关于最大并发量**

不受影响，此处分服务商介绍。

**阿里云**

* 阿里云整个服务空间限制1000个实例，也就是不管你新建多少个大的云函数（router1、router2、router3 ... router48(阿里云最多48个大的云函数)）
* 这48个云函数加起来的并发就是1000
* 同时，阿里云可以设置单实例多并发单实例最多100，理论最大并发量1000*100=100000 (10万)

但数据库也是有并发限制的（也是基于服务空间，跟云函数数量无关）因此实际并发是达不到10万的，除非你的请求不连接数据库。因此大部分情况下，还得看数据库的最大连接数。不过阿里云没有写数据库的最大连接数，故暂不确定阿里云的最大性能。但最小性能可以确定为1000并发

**腾讯云**

* 腾讯云限制单个云函数并发量1000
* 数据库同时连接数1000
* 云函数实例扩容速度 500个/分钟（这个很重要，代表无论你云函数并发最大有多少，你这1分钟内其实只有500并发，也就是秒杀开始，第一分钟只有500并发，第二分钟才是1000并发）

理论上腾讯云可以通过复制新建多个router函数，前端通过随机数请求router1或router2，来增大云函数最大并发量（最大5000，腾讯云限制1个服务空间目前最大5000），但数据库1000同时连接数是固定的（不管你用vk的router还是官方框架都一样，官方的前端操作数据库也受此限制），所以最终还是得看数据库的并发量。（除非你的请求不需要请求数据库）

划重点：

* 腾讯云云函数，当秒杀开始时，第一分钟其实只有500的云函数并发量。（这个跟使用框架无关，是腾讯云底层限制）（官方的前端操作数据库也受此500的影响，因为它也是要通过一个隐藏的云函数来调用数据库的）
* 数据库的并发量也很重要，系统是木桶原理，最短板的长度才是实际性能的上限。（这个也跟框架无关，也是底层限制，官方的前端操作数据库也受此影响）

**关于云函数的并发介绍**

* 1000并发不代表只能1000个人访问

**以秒杀为例：**

设
* B：云函数最大并发量
* P：你的下单接口平均访问耗时（单位为秒，这里我们假设为0.5秒）
* K：你要秒杀的商品库存（单位为个）
* R：有多少人参与秒杀（单位为个）
* X：全部商品秒完的总耗时（单位为秒）
* Y：全部商品秒完，且所有人接收到已秒完的总耗时（单位为秒）（这里我们假设用户非常想要此商品，不抢到不罢休，没有亲眼看到已秒完。则会一直点下单按钮）（实际情况一般用户点个几下还没抢到一般就不会再点了）


X = K / B * P

Y = R / B * P

**以100万人秒杀1千个商品为例。**

X = K / B * P = 1000 / 1000 * 0.5 = 0.5秒，即1秒不到，商品全部正常秒完。（实际情况因为有冷启动的原因，所以要加个1-2秒，故实际会在5秒内）

Y = R / B * P = 1000000 / 1000 * 0.5 = 500秒，即500秒后，所有人都会知道商品已秒完。也就是每多2000人，时间就加1秒。

**表现的现象**

有1000人秒到，其他99万9千人会报错，然后前端拦截报错后提示：当前活动太过火爆，请稍后再试！（当然你也可以直接提示：已秒完）当商品库存为0时。提示：已秒完，然后前端把按钮变灰，防止用户一直点，占用云函数并发量


## 更新插件提示No END header found错误

如下图所示

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1a151b6c-3ea7-42b6-97d2-835da7d81c7f.png)

___这个错误是HBX目前一直存在的问题，手动解决方案：___

**win系统**

* 1、进入CMD命令窗口，输入 `node` 按回车

* 2、再输入 `os.tmpdir()` 按回车

* 3、可以看到一个目录，比如 `C:\Users\NING MEI\AppData\Local\Temp`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/36f4f68a-b3f2-4b56-9980-a239341b77b6.png)

* 4、打开我的电脑，进入这个目录，再此目录找到 `uni_modules` 目录，进入，删除里面所有目录和文件。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/54d9cc19-846f-4a51-8f00-e1c845fbbb24.png)

* 5、重启HBX，完成。

**mac系统**

也是大概这个逻辑，找到HBX的 `uni_modules` 缓存目录，删除里面的缓存文件即可。（mac开发者如有空，欢迎补充完这个操作文档）


## 运行项目报Failed to execute 'open' on 'XMLHttpRequest': Invalid URL

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2a6639d1-7482-4ffa-b446-c5907be35f50.png)

如果你运行项目碰到这个问题，你必须重启HBX才能解决，这是HBX某个服务奔溃了导致的，如果重启HBX还无法解决，则需要重启电脑解决。

































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