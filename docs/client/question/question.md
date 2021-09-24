# 群友问题集

## 1、为什么云函数执行成功了，前端还是会返回错误呢？

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

## 2、文件上传成功后如何自动保存到uni-id-files表里？

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

## 3、为什么前端路由页面刷新报404错误，正常跳转可以，刷新报错？

方案一：在 `manifest.json` 中 `H5配置` 设置路由模式为 `hash`

方案二：在 uniCloud `前端网页托管` 页面中 点击 `参数配置` 编辑路由规则 把 `网站首页` 和 `404页面` 都设置为 `index.html`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/b4a3a8b9-1132-4d63-a6d3-371612f6b9c8.png)



















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