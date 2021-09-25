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
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: "" };
    // 业务逻辑开始-----------------------------------------------------------
    let { code } = data;
    if (!code) return { code: -1, msg: "code不能为空" };
    // 获取公众号支付的配置信息
    let uniPayConfig = vkPay.getUniPayConfig("wxpay_h5-weixin");
    let requestRes = await vkPay.request({
      url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${uniPayConfig.appId}&secret=${uniPayConfig.secret}&code=${code}&grant_type=authorization_code`
    });
    if (requestRes.errcode) {
      let msg = requestRes.errmsg;
      if (requestRes.errcode === 40163) msg = "该code已被使用，请重新获取";
      return {
        ...requestRes,
        code: requestRes.errcode,
        msg
      };
    }
    // 转驼峰
    requestRes = vkPay.pubfn.snake2camelJson(requestRes);
    res = {
      ...requestRes,
      code: 0,
      msg: "ok"
    };
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}

```