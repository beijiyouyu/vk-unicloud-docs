# App升级中心管理

最低 `vk-admin` 版本号：`1.14.0`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/dbbfaba7-339e-46e5-80b9-33e260bc67d7.png)

## 功能介绍

App升级中心 uni-upgrade-center，提供了 App 的版本更新服务。包括

* Android、iOS的完整App安装包升级和wgt资源包增量更新
* 后台管理系统，用于发布新版、设置升级策略

**升级中心分为两个部分：Admin管理后台 和 app前台检测更新**

## 和官方的uni-upgrade-center有什么区别？

* 功能上保持和官方一致（可能会额外新增一些功能）
* 数据库字段保持和官方一致（可能会额外新增一些字段）

## 升级中心admin端

### 页面路径

* /pages_plugs/system/app-upgrade-center/list

### 相关云函数路径

* /router/service/admin/system/app-upgrade-center/


### 功能

* 云储存安装包CDN加速，使安装包下载的更快、更稳定

* 应用管理，对 App 的信息记录和应用版本管理

* 版本管理，可以发布新版，也可方便直观的对当前 App 历史版本以及线上发行版本进行查看、编辑和删除操作

* 版本发布信息管理，包括 更新标题，更新内容，版本号，静默更新，强制更新，灵活上线发行 的设置和修改

* 原生 App 安装包，发布 Apk 更新，用于 App 的整包更新，可设置是否强制更新

* wgt 资源包，发布 wgt 更新，用于 App 的热更新，可设置是否强制更新，静默更新

* App 管理列表及 App 版本记录列表搜索


### 注意

* 版本号格式必须是x1.x2.x3形式
* * x1的范围【1-99】
* * x2的范围【0-99】
* * x3的范围【0-99】
* * 正确的格式，如：1.0.1 、2.11.2
* * 错误的格式，如：1.0.01、0.0.1

* iOS的wgt更新肯定是违反apple政策的，注意事项：
* * 审核期间请不要弹窗升级 
* * 升级完后尽量不要自行重启
* * 尽量使用静默更新


### 问题

#### 为什么无法添加版本？

首先，需要在应用管理里开启某个应用的App升级中心功能，然后才能添加。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/d8b3d370-9990-4e70-8e4b-3857be5042c1.png)


## 升级中心App前台检测更新client端

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/76ebfe4d-e3a6-4d89-a9d3-9381de9a9d21.png)

可以直接使用官方的 `升级中心 uni-upgrade-center - App` [传送门](https://ext.dcloud.net.cn/plugin?id=4542) 

### 代码需要更改的地方

`uni_modules/uni-upgrade-center-app/utils/call-check-version.js` 文件内的代码

```js
uniCloud.callFunction({
  name: 'uni-upgrade-center',
  data,
  success: (e) => {
    console.log("e: ", e);
    resolve(e)
  },
  fail: (error) => {
    reject(error)
  }
});
```

替换为

```js
uniCloud.callFunction({
  name: 'router',
  data:{
    $url:"user/pub/checkVersion",
    data
  },
  success: (e) => {
    console.log("e: ", e);
    resolve(e)
  },
  fail: (error) => {
    reject(error)
  }
})
```

### 测试时注意

请用自定义基座打包app（因为默认基座的appid固定为HBuilder），使用访问云端云函数方式启用项目

### 调用检测更新代码示例

在 `App.vue` 的 `onLaunch` 执行下面的代码即可自动检测更新

```html
<script>
  // 引入插件
	import upAPP from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js'
	export default {
		onLaunch: function() {
      // 执行更新
			upAPP();
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

```

当然你也可以手动通过按钮的形式触发更新，如

```html
<template>
	<view>
		<button @click="doUpAPP">手动检查更新</button>
	</view>
</template>

<script>
	import upAPP from '@/uni_modules/uni-upgrade-center-app/utils/check-update.js'

	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			doUpAPP(){
				upAPP();
			}
		}
	}
</script>

<style>
	
</style>

```

