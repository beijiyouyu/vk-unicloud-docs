# service/pay/queryPayment.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 支付结果查询
   * @url pay/queryPayment 前端调用的url参数地址
   * @description 根据商户订单号或者平台订单号查询订单信息，主要用于未接收到支付通知时可以使用此接口进行支付结果验证
   * data 请求参数 说明
   * @param {String} out_trade_no 商户订单号 和 transaction_id 二选一
   * @param {String} transaction_id 平台订单号 和 out_trade_no 二选一
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '' };
    // 支付状态查询开始-----------------------------------------------------------
    res = await vkPay.queryPayment({
      out_trade_no: data.out_trade_no
    });
    // 支付状态查询结束-----------------------------------------------------------
    return res;
  }
}
```