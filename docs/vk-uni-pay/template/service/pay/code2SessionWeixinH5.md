# service/pay/code2SessionWeixinH5.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
	/**
	 * 获取微信openid（公众号版本）
	 * @url pay/code2SessionWeixinH5 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} code 微信登录返回的code
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} openid 用户openid
	 * @param {String} unionid 用户unionid，可以取到此值时返回
	 * @param {String} accessToken 网页授权接口调用凭证,注意：此accessToken与基础支持的accessToken不同
	 * @param {String} expiresIn accessToken接口调用凭证超时时间，单位（秒）
	 * @param {String} refreshToken 用于刷新accessToken
	 */
	main: async (event) => {
		let { data = {} } = event;
		return await vkPay.code2SessionWeixinH5(data);
	}
}

```