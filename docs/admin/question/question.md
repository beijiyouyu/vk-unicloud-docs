# 群友问题集

## vk-data-table、vk-data-form 框架里面这两个组件没有文档？

[点击查看『vk-data-table』文档](https://vkdoc.fsq.pub/admin/2/table.html)
 
[点击查看『vk-data-form』文档](https://vkdoc.fsq.pub/admin/3/form.html)


## 数据库明明有数据，但用户登录提示用户不存在？

* 1、先用admin账号登录后台，进入应用管理

因为每个人的 `DCloud Appid`是不一样的，所以你需要在应用管理中添加自己的应用（或直接修改内置的2条数据的appid即可）

DCloud Appid` 获取方法

复制`uniapp`项目根目录的`manifest.json`文件内的`appid`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e717232f-0f18-4dee-8437-5dec2c224920.png)

* 2、再进入用户管理，对需要设置的用户点击编辑，设置该用户可以登录哪些端。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/18cd54d5-bedc-4d4f-bda2-7c339c865257.png)

## 为什么云函数URL化后，明明数据库里有该用户，登录提示用户不存在？

[点击查看](https://vkdoc.fsq.pub/client/question/question.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BA%91%E5%87%BD%E6%95%B0url%E5%8C%96%E5%90%8E-%E6%98%8E%E6%98%8E%E6%95%B0%E6%8D%AE%E5%BA%93%E9%87%8C%E6%9C%89%E8%AF%A5%E7%94%A8%E6%88%B7-%E7%99%BB%E5%BD%95%E6%8F%90%E7%A4%BA%E7%94%A8%E6%88%B7%E4%B8%8D%E5%AD%98%E5%9C%A8)

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