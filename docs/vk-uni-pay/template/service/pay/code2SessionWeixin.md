# service/pay/code2SessionWeixin.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 获取微信openid
   * @url pay/code2SessionWeixin 前端调用的url参数地址
   * data 请求参数 说明
   * @param {String} code 微信登录返回的code
   * @param {String} pid 多商户模式下的自定义商户id（等于vk-pay-config表的_id）
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} openid 用户openid
   * @param {String} unionid 用户unionid，可以取到此值时返回
   */
  main: async (event) => {
    let { data = {} } = event;
    let res = await vkPay.code2SessionWeixinMP(data);
    if (res.code === 0) {
      delete res.sessionKey; // 删除明文sessionKey
      delete res.accessToken; // 删除明文accessToken
      delete res.refreshToken; // 删除明文refreshToken
    }
    return res;
  }
}
```