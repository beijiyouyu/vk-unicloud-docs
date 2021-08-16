# service/pay/transfer.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 转账到支付宝账号或微信零钱
   * @url pay/transfer 前端调用的url参数地址
   * data 请求参数 说明
   * @param {String} account 支付宝专用 - 支付宝账号
   * @param {String} real_name 真实姓名
   * @param {Number} amount 金额 100=1元(单位分)
   * @param {String} title 转账标题
   * @param {String} pay_type 支付方式 alipay支付宝 wxpay微信
   * @param {String} openid 微信专用 - 用户的openid
   * @param {String} platform 微信专用 平台类型：app-plus、mp-weixin，用于获取对应平台的支付配置信息
   * @param {String} remark 转账备注
   * @param {String} out_biz_no 转账单号
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '' };
    // 转账开始-----------------------------------------------------------
    res = await vkPay.transfer({
      account: data.account,
      real_name: data.real_name,
      amount: 10, // 100=1元(单位分)
      title: "转账",
      pay_type: data.pay_type,
      openid: data.openid,
      platform: data.platform,
      remark: "转账备注",
      out_biz_no: "test" + new Date().getTime(),
    });
    // 转账结束-----------------------------------------------------------
    return res;
  }
}
```