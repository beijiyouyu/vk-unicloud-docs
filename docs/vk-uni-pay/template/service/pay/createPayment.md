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
    let { data = {}, originalParam, uniIdToken } = event;
    let res = { code: 0, msg: '' };
    /**
     * 实际项目支付的时候，应该先下单（先执行你系统的下单逻辑）
     * 你系统订单下单成功后，返回订单号，再调用await vkPay.createPayment接口，
     * 商品订单中，await vkPay.createPayment 内的金额应该从你系统的订单表中获取，而不是前端传过来）
     * 当然如果充值余额，则金额是从前端传过来的。
     */
    // 这里示例是给充值余额的订单，故金额是从前端传过来的

    // 尝试解析下 uniIdToken，如果能拿到user_id，则传给支付接口（主要用作记录用，做支付统计时会用到）
    let user_id = await vkPay.checkTokenReturnUserId({ uniIdToken, context: originalParam.context });
    let nickname = await vkPay.getUserNickname(user_id);
    // 获取支付参数开始-----------------------------------------------------------
    res = await vkPay.createPayment({
      context: originalParam.context,
      provider: data.provider,
      alipayAppPayToH5Pay: data.alipayAppPayToH5Pay,
      isPC: data.isPC,
      data: {
        openid: data.openid, // 用户的openid
        out_trade_no: data.out_trade_no, // 商户支付订单号，需自行保证全局唯一（必填）
        total_fee: Number(data.total_fee), // 订单金额（单位分 100 = 1元）（必填）
        subject: data.subject, // 订单标题（必填）
        body: data.body, // 订单内容（选填）
        type: data.type, // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑（必填）
        user_id: user_id, // 用户id（选填）
        nickname: nickname, // 用户昵称（选填）
        profit_sharing: data.profit_sharing, // 若为true，则本单资金会冻结（以便后面发起分账请求），默认false
        // 自定义回调数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
        custom: {
          // custom1: data.custom.custom1,
          // custom2: data.custom.custom2
        },
        // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
        other: {

        }
      }
    });
    // 获取支付参数结束-----------------------------------------------------------
    return res;
  }
}
```