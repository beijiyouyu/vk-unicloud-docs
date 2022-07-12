# 群友问题集

## vk-data-table、vk-data-form 框架里面这两个组件没有文档？

[点击查看『vk-data-table』文档](https://vkdoc.fsq.pub/admin/2/table.html)
 
[点击查看『vk-data-form』文档](https://vkdoc.fsq.pub/admin/3/form.html)


## 数据库明明有数据，但用户登录提示用户不存在？

* 1、先用admin账号登录后台，进入应用管理

因为每个人的 `DCloud Appid`是不一样的，所以你需要在应用管理中添加自己的应用（或直接修改内置的2条数据的appid即可）

`DCloud Appid` 获取方法

复制 `uniapp` 项目根目录的 `manifest.json` 文件内的 `appid`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e717232f-0f18-4dee-8437-5dec2c224920.png)

* 2、再进入用户管理，对需要设置的用户点击编辑，设置该用户可以登录哪些端。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/18cd54d5-bedc-4d4f-bda2-7c339c865257.png)

* 3、完成，可以登录了。

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

## 如何使用官方 `unicloud-admin` 的插件，如 `APP升级中心`

插件根目录下的 `common/unicloud-admin` 目录为官方模板的一些样式文件

* 如果你需要引入 `unicloud-admin` 官方的一些插件，如[升级中心](https://ext.dcloud.net.cn/plugin?id=4470)
* 你可能会碰到样式错乱的问题，那是因为 `vk-unicloud-admin` 并没有引入 `unicloud-admin` 的公共样式
* 但框架已经帮你整理好了公共样式的文件，就在 `common/unicloud-admin` 目录内

在 `App.vue` 中引入 `unicloud-admin` 的公共样式

```html
<style lang="scss">
	@import '@/common/unicloud-admin/css/uni.css';
	@import '@/common/unicloud-admin/css/uni-icons.css';
</style>

```


同时官方的插件一般是不通过 `云函数` 获取数据的，而是通过 `clientDB` 操作数据库（前端操作数据库）

* 因此，你需要上传一些数据库的 `schema.json` 文件

如 `升级中心` 需要上传以下两个 `schema.json` 文件

* opendb-app-list.schema.json
* opendb-app-versions.schema.json

这些 `schema.json` 文件一般在插件包里就有，直接右键点击对应的文件即可上传。

* 如升级中心的 `schema.json` 目录在 `uni_modules/uni-upgrade-center/uniCloud/database/opendb-app-list.schema.json`

* 同时一般插件还会有一个自己的 `db_init.json` 文件 如 `uni_modules/uni-upgrade-center/uniCloud/database/db_init.json` （也是右键上传）


## 如何关闭当前打开的tabs页面

```js
vk.menuTabs.closeCurrent();
```

若提示 `menuTabs is undefined` 则请在 `windows/topWindow.vue` 页面 添加如下代码

```js
// 组件挂载完毕时
mounted() {
  this.vk.menuTabs = this.$refs.menuTabs;
},
```

同时需【升级】`vk-unicloud-admin-ui` 包升级至 `1.7.2` 或以上

## 如何升级 `vk-unicloud-admin-ui` 包

步骤:

* 1、根目录的 `package.json` 文件打开，修改 `dependencies` 节点下的 `vk-unicloud-admin-ui` 的版本
* 2、项目根目录执行 `npm i`
* 3、重启项目




## 为什么 `npm i vk-unicloud-admin-ui` 提示版本不存在?

那一定是你的npm使用了别的镜像源（如淘宝镜像源）导致的。

解决方案：

* 1、先运行命令 `npm config set registry https://registry.npmjs.org`
* 2、再运行命令 `npm i vk-unicloud-admin-ui` 

小知识：

* 查看镜像源 `npm config get registry`
* 设置taobao镜像 `npm config set registry https://registry.npm.taobao.org`
* 恢复成原来的镜像 `npm config set registry https://registry.npmjs.org`


## 如何美化默认滚动条?

将下方的css样式复制到全局样式文件 `common/css/app.scss` 中

```css
::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
::-webkit-scrollbar-track {
	background: rgba(135, 135, 135, 0.1);
}
::-webkit-scrollbar-thumb {
	background: rgba(135, 135, 135, 0.4);
	border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
	background: rgba(135, 135, 135, 0.8);
}
```

## 如何发布admin系统到unicloud前端网页托管?

依次点击HBX的 发行 - 上传网站到服务器（注意，目前只有阿里云的云空间支持在HBX上直接上传）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/b7996a5b-6b2c-41e6-8820-a790fabfc091.png)

## 如何发布admin系统到自己的web服务器?

依次点击HBX的 发行 - 网站-PC-Web - 输入你的网站域名

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3fd36d06-e901-4a77-8489-01dfe5cfc492.png)

打包完成 HBX控制台会提示源码文件位置，将源码上传到你自己的web服务器对应目录即可。


## 使用router云函数后，并发和执行速度等会不会受影响？

**关于执行速度**

不受影响，不管你 `router` 的 `service` 下有多少个子云函数，每次请求时，只会加载请求的那一个云函数，且加载时间为1ms左右，几乎可以忽略。

主要影响你执行速度的是你自己的业务代码执行逻辑，数据库查询次数越多越复杂，耗时越久。

关于云函数为什么比传统开发请求速度慢的问题，[点这里](https://vkdoc.fsq.pub/client/question/question.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%84%9F%E8%A7%89%E4%BA%91%E5%BC%80%E5%8F%91%E7%9A%84%E5%93%8D%E5%BA%94%E9%80%9F%E5%BA%A6%E6%AF%94%E4%BC%A0%E7%BB%9F%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%BC%80%E5%8F%91%E8%A6%81%E6%85%A2)

**关于单个大函数的代码体积限制**

**阿里云**

因为阿里云单各函数的代码体积（含node_modules和公共模块）只有10MB，因此不建议使用太大的第三方npm包，如果必须使用，可以新建1个router2，前端请求可以通过vk.callFunction指定name参数来请求router2内的子函数

**腾讯云**

腾讯云单个函数的代码体积（含node_modules和公共模块）	有50MB，一般无需担心单个router会超大小，但建议除非必要，否则不太使用太大的第三方npm包

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

* 阿里云整个服务空间限制1000个实例，也就算不管你新建多少个大的云函数（router1、router2、router3 ... router48(阿里云最多48个大的云函数)）
* 这48个云函数加起来的并发就是1000
* 同时，阿里云可以设置单实例多并发单实例最多100，理论最大并发量1000*100=100000 (10万)

但数据库也是有并发限制的（也是基于服务空间，跟云函数数量无关）因为实际并发是达不到10万的，除非你的请求不连接数据库。因此大部分情况下，还得看数据库的最大连接数。不过阿里云没有写数据库的最大连接数，故暂不确定阿里云的最大性能。但最小性能可以确定为1000并发

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

X = K / B * P = 1000 / 1000 * 0.5 = 0.5秒，即1秒不到，商品全部正常秒完。

Y = R / B * P = 1000000 / 1000 * 0.5 = 500秒，即500秒后，所有人都会知道商品已秒完。也就是每多2000人，时间就加1秒。

**表现的现象**

有1000人秒到，其他99万9千人会报错，然后前端拦截报错后提示：当前活动太过火爆，请稍后再试！（当然你也可以直接提示：已秒完）当商品库存为0时。提示：已秒完，然后前端把按钮变灰，防止用户一直点，占用云函数并发量














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