# service/pay/createPayment.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
  /**
   * 统一支付
   * @url pay/createPayment 前端调用的url参数地址
   * @param {String} provider    供应商:wxpay、alipay
   * @param {String} openid      用户openid，小程序支付时必传
   * @param {String} out_trade_no  商户支付订单号
   * @param {Number} total_fee    订单金额(单位分 100 = 1元)
   * @param {String} subject     订单标题
   * @param {String} body        订单详情
   * @param {String} type        必填，如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} out_trade_no 商户支付订单号
   * @param {String} orderInfo  支付订单信息
   */
  main: async (event) => {
    let { data = {}, originalParam } = event;
    let res = { code: 0, msg: '' };
    /**
     * 实际项目支付的时候，应该先下单（先执行你系统的下单逻辑）
     * 你系统订单下单成功后，返回订单号，再调用await vkPay.createPayment接口，
     * 商品订单中，await vkPay.createPayment 内的金额应该从你系统的订单表中获取，而不是前端传过来）
     * 当然如果充值余额业绩，则金额是从前端传过来的。
     */
    // 这里示例是给充值余额的订单，故金额是从前端传过来的

    // 获取支付参数开始-----------------------------------------------------------
    res = await vkPay.createPayment({
      context: originalParam.context,
      provider: data.provider,
      alipayAppPayToH5Pay: data.alipayAppPayToH5Pay,
      data: {
        openid: data.openid,
        out_trade_no: data.out_trade_no,
        total_fee: Number(data.total_fee),
        subject: data.subject,
        body: data.body,
        type: data.type,
        // 自定义数据，不可与外部重复
        custom:{
          user_id: "test_001",
          recharge_balance: Number(data.total_fee),
        }
      }
    });
    // 获取支付参数结束-----------------------------------------------------------
    return res;
  }
}
```