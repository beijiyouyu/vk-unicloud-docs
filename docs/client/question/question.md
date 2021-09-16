# 1、为什么云函数执行成功了，前端还是会返回错误呢？

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