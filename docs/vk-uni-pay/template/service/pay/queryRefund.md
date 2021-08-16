# service/pay/queryRefund.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 查询退款结果
   * @url pay/queryRefund 前端调用的url参数地址
   * @description 提交退款申请后，通过调用该接口查询退款状态。
   * data 请求参数 说明
   * @param {String} out_trade_no 商户订单号
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '' };
    // 退款状态查询开始-----------------------------------------------------------
    res = await vkPay.queryRefund({
      out_trade_no: data.out_trade_no
    });
    // 退款状态查询结束-----------------------------------------------------------
    return res;
  }
}
```