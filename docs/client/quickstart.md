# 快速上手 - 安装步骤

下载地址：[https://ext.dcloud.net.cn/plugin?id=2204](https://ext.dcloud.net.cn/plugin?id=2204)

## 后端（云函数端）安装步骤
打开 `uniCloud/cloudfunctions` 目录

#### 前置工作：修改云函数全局配置文件（用到微信登录的必须要配置）
#### 注意：
* 1、开发微信小程序和APP微信登录需要额外配置 manifest.json 以及 uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 这2个配置文件，且改动配置后需要重新上传 公共模块 和 router 函数。
* 2、若你的电脑没有安装 Node.js，则无法使用 npm 命令。
* 3、Node.js 安装包及源码下载地址为：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* 4、Node.js 安装教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

查看 `uni-id/config.json` 代码格式 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/config/uni-id.html)

#### 正式安装
直接右键`uniCloud`目录 点击 `运行云服务空间初始化向导` 即可

## 前端（页面端）安装步骤

`main.js` 引入 `vk-unicloud-page` 库

```js
// 引入 vk框架前端
import vk from 'uni_modules/vk-unicloud/vk_modules/vk-unicloud-page';
Vue.use(vk);
```

完整 `main.js` 示例

```js
import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 uView UI
import uView from 'uview-ui';
Vue.use(uView);

// 引入 vk框架前端
import vk from 'uni_modules/vk-unicloud/vk_modules/vk-unicloud-page';
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


#### 集成 `uview-ui` 安装步骤开始 （若不想集成`uview-ui`可跳过此处）

```bash
# npm方式安装
npm i uview-ui
```


1. `main.js`引入uView库
```js
import uView from 'uview-ui';
Vue.use(uView);
```

2. `App.vue`引入基础样式(注意style标签需声明scss属性支持)
```css
<style lang="scss">
@import "uview-ui/index.scss";
</style>
```

3. `uni.scss`引入全局scss变量文件
```css
@import "uview-ui/theme.scss";
```

4. `pages.json`配置easycom规则(按需引入)

```js
{
  "easycom": {
    "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
  },
  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```

#### 集成 `uview-ui` 安装步骤结束 （若不想集成`uview-ui`可跳过此处）
