# 快速上手 - 安装步骤

下载地址：[https://ext.dcloud.net.cn/plugin?id=2204](https://ext.dcloud.net.cn/plugin?id=2204)

## 后端（云函数端）安装步骤
打开 `uniCloud/cloudfunctions` 目录

#### 前置工作：修改云函数全局配置文件（用到微信登录的必须要配置）[微信小程序配置详细教程](https://vkdoc.fsq.pub/client/question/q12.html)
#### 注意：
* 1、开发微信小程序和APP微信登录需要额外配置 manifest.json 以及 uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 这2个配置文件，且改动配置后需要重新上传 公共模块 和 router 函数。
* 2、若你的电脑没有安装 Node.js，则无法使用 npm 命令。
* 3、Node.js 安装包及源码下载地址为：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* 4、Node.js 安装教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

查看 `uni-id/config.json` 代码格式 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/config/uni-id.html)


#### 正式安装

直接右键`uniCloud`目录 点击 `运行云服务空间初始化向导` 即可

## 前端（页面端）安装步骤

### Vue2.0版本

`main.js` 引入 `vk-unicloud-page` 库

```js
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';
Vue.use(vk);
```

完整 `main.js` 示例

```js
import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';
Vue.use(vk);

// 初始化 vk框架
Vue.prototype.vk.init({
  Vue,               // Vue实例
  config,	     // 全局配置
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
});
app.$mount();

```

### Vue3.0版本

`main.js` 引入 `vk-unicloud-page` 库

完整 `main.js` 示例

```js
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 使用 vuex
  app.use(store)
  
  // 使用 vk框架前端
  app.use(vk);
  
  // 初始化 vk框架
  app.config.globalProperties.vk.init({
    Vue: app,          // Vue实例
    config,	           // 配置
  });
  
  return { app }
}
```

### 自 client端框架 2.6.0 起，不再内置任何 UI 框架，你可以选择自己喜欢的 UI 组件库进行开发。

### 集成 `vk-uview-ui`（vue2.0版）

___若不想集成 `vk-uview-ui` 可跳过此处___

适合开发：H5、App(vue版本)、微信小程序、支付宝小程序（其他小程序未验证）

> 插件市场导入 `vk-uview-ui` 框架：[点击前往](https://ext.dcloud.net.cn/plugin?id=6692)

* 1、main.js 引入 vk-uview-ui 

```js
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);
```

* 2、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

* 3、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/vk-uview-ui/theme.scss";
```


### 集成 `vk-uview-ui`（vue3.0版）

___若不想集成 `vk-uview-ui` 可跳过此处___

适合开发：H5、App(vue版本)、微信小程序（其他小程序未验证）

> 插件市场导入 `vk-uview-ui` 框架：[点击前往](https://ext.dcloud.net.cn/plugin?id=6692)

不建议把老项目 升级到 Vue3.0 (升级非常麻烦，建议新项目才考虑是否使用Vue3.0)

___注意：目前（2020-11-18） `uniapp` 的 `Vue3.0` 版本只兼容：H5、App、微信小程序___

* 1、前置步骤：修改 `manifest.json` 内的 `vue` 版本为 `vue3`
* 2、项目根目录新增 `index.html` 文件，文件代码为
```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
		<title></title>
		<!--preload-links-->
		<!--app-context-->
		<!-- 配置H5的 web图标static/logo.png -->
		<link rel="icon" href="./static/logo.png" />
	</head>
	<body>
		<div id="app">
			<!--app-html-->
		</div>
		<script type="module" src="/main.js"></script>
	</body>
</html>
```

* 3、main.js 引入 vk-uview-ui 

```js
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 使用 uView UI
  app.use(uView)
  
  return { app }
}

```

* 4、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

* 5、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/vk-uview-ui/theme.scss";
```


### 集成 `uview-ui`（nvue2.0版）

___若不想集成 `uview-ui` 可跳过此处___

适合开发：App(nvue版本)，如果你只开发App，推荐用这个UI

> 插件市场导入 `uview-ui` 框架：[点击前往](https://ext.dcloud.net.cn/plugin?id=1593)

* 1、main.js 引入 uview-ui 

```js
import uView from './uni_modules/uview-ui';
Vue.use(uView);
```

* 2、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
	@import "./uni_modules/uview-ui/index.scss";
</style>
```

* 3、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/uview-ui/theme.scss";
```

### 集成 `uview-ui`（nvue3.0版）

别想了，uniapp官方也还没支持。

### 组件库并不限制只能从以上选择，理论上支持任何UI组件库进行开发。

### 卸载 `uView1` 的步骤

* 1、main.js 删除 uView1

```js
import uView from 'uview-ui'
Vue.use(uView);
```

* 2、App.vue 删除基础样式

```html
<style lang="scss">
	@import "uview-ui/index.scss";
</style>
```

* 3、uni.scss 删除全局 scss 变量文件

```css
@import "uview-ui/theme.scss";
```

* 4、pages.json 删除 easycom 规则

```js
"easycom": {
	"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue",
},
```

* 5、package.json 删除 uview-ui 依赖

```js
"dependencies": {
  "uview-ui": "^1.8.3"
},
```

* 6、package-lock.json 删除 uview-ui 依赖

```js
"dependencies": {
  "uview-ui": {
    "version": "1.8.3",
    "resolved": "https://registry.npmjs.org/uview-ui/-/uview-ui-1.8.3.tgz",
    "integrity": "sha512-DqKc+qRrOZLPcyfWv4b0HspSS9n1Cd6BbgKiYEv9rjTAnWoqJV7rXsvWqZdr5iKGP5EMNbNS741GLNw4sIHbpw=="
  }
}
```

