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
   * @param {Boolean} await_notify 是否需要等待异步通知执行完成，若为了响应速度，可以设置为false，若需要等待异步回调执行完成，则设置为true
   * @param {Boolean} pay_order_info 是否需要返回支付订单信息，默认为false
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '' };
    // 支付状态查询开始-----------------------------------------------------------
    let {
      out_trade_no, // 订单号
      await_notify = false, // 是否需要等待异步通知执行完成，若为了响应速度，可以设置为false，若需要等待异步回调执行完成，则设置为true
      pay_order_info = false, // 是否需要返回支付订单信息，默认为false
    } = data;
    res = await vkPay.queryPayment({
      out_trade_no,
      await_notify,
      pay_order_info,
    });
    // 支付状态查询结束-----------------------------------------------------------
    return res;
  }
}
```