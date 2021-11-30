# 主题

`vk-admin` 框架自 `1.8.0`版本起，支持自定义主题，同时内置了（纯黑、纯白、黑白）3个主题。

## 黑白主题效果预览

tips：图片被压缩，比较模糊。

<img class="preview"  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/ad18e7d6-ae0e-4424-bf3d-6e3dad1036a1.png"/>

## 安装教程

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2f06133d-a2c6-4bf2-83b4-5806e129809e.png)

`app.config.js` 内代码示例

```js
// 引入主题配置文件
import themeConfig from '@/common/theme/index.js'
```


```js
// 主题配置
theme: {
  // 当前使用哪个主题
  use: "blackWhite", // white blackWhite black custom
  ...themeConfig,
  // 自定义主题
  custom: {
    // 左侧菜单样式
    leftMenu: {
      backgroundColor: "", // 背景色
      subBackgroundColor: "", // 子菜单背景色
      textColor: "", // 菜单文字颜色
      activeTextColor: "", // 菜单被选中时的文字颜色
      activeBackgroundColor: "", // 菜单被选中时的背景颜色
      hoverTextColor: "", // 菜单hover时的文字颜色
      hoverBackgroundColor: "",  // 菜单hover时的背景颜色
    },
    // 顶部菜单样式
    topMenu: {
      backgroundColor: "", // 顶部背景颜色
      textColor: "", // 顶部文字颜色
    }
  }
},
```

使用内置主题时，只需要修改 `theme.use` 内的值即可，如设置 `blackWhite`，代表使用黑白主题。

注意：`1.8.0` 之前的版本，需要先替换项目根目录下的 `windows/leftWindow.vue` 和 `windows/topWindow.vue` 两个文件。（从最新版框架项目中复制）

## 如何使用自定义主题？

方式一：将 `theme.use` 值设置为 `custom`，然后编写 `theme.custom` 的样式

方式二：将 `theme.use` 值设置为 `aaa`（随你定义），然后在项目根目录/common/theme/目录新建 `aaa.js`

aaa.js 代码模板

```js
// 黑白主题（左侧菜单黑，顶部白）
export default {
	// 左侧菜单样式
	leftMenu: {
		backgroundColor: "#191a23", // 背景色
		subBackgroundColor:"#101117", // 子菜单背景色
		textColor: "#f0f0f0", // 菜单文字颜色
		activeTextColor: "#ffffff", // 菜单被选中时的文字颜色
		activeBackgroundColor: "#2d8cf0", // 菜单被选中时的背景颜色
		hoverTextColor: "#ffffff", // 菜单hover时的文字颜色
		hoverBackgroundColor: "#545f6c",  // 菜单hover时的背景颜色
	},
	// 顶部菜单样式
	topMenu: {
		backgroundColor: "#ffffff", // 顶部背景颜色
		textColor: "#999999", // 顶部文字颜色
	}
}
```

## 如何分享自己的主题？

1、直接将 `aaa.js` 文件发给你的好友。（可以上传到群里，Q群：22466457）

2、好友将 `aaa.js` 文件复制到 `项目根目录/common/theme/` 内，同时修改 `/common/theme/index.js` 文件，引入 `aaa` 主题

```js
import white from './white.js'
import black from './black.js'
import blackWhite from './blackWhite.js'

import aaa from './aaa.js'

export default {
	white,
	black,
	blackWhite,
  
  aaa
};


```

3、最后修改 `theme.use` 内的值为 `aaa`，代表使用 `aaa` 主题。