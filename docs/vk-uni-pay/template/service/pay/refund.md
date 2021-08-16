# service/pay/refund.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 统一退款
   * @url pay/refund 前端调用的url参数地址
   * @description 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家。
   * data 请求参数 说明
   * @param {String} out_trade_no 商户订单号
   * @param {String} refund_desc  退款说明
   * @param {Number} refund_fee 退款金额
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '退款成功' };
    // 退款开始-----------------------------------------------------------
    let {
      out_trade_no,
      refund_desc,
      refund_fee
    } = data;
    // 注意：实际退款前应该判断你自己的业务逻辑

    let refundRes = await vkPay.refund({
      out_trade_no,
      refund_desc,
      refund_fee
    });
    if (refundRes.code !== 0) {
      return refundRes;
    }
    /**
     * 注意：退款成功后，应该执行你自己的退款后逻辑
     * 此处建议只改下订单状态和写入异步任务队列表
     * 将消息发送、返佣扣除、业绩结算扣除等业务逻辑异步处理
     * 如开启定时器每隔5秒触发一次，处理订单
     */

    // 退款结束-----------------------------------------------------------
    return res;
  }
}
```