# 1、获取支付参数

### 接口名：`vk.vkPay.createPayment`

```js
res = await vk.vkPay.createPayment({
  context: originalParam.context,
  provider: "alipay",
  data: {
    openid: "用户openid，小程序支付时必传",
    out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
    total_fee: 1, // 订单金额(单位分 100 = 1元)
    subject: "订单标题",
    type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。"
  }
});

```
 
### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| context    |   云函数的context  | Object  | -    | - |
| provider  |   wxpay：微信支付 alipay：支付宝支付  | String  | -    | wxpay、alipay  |
| data  |  订单数据  | Object  | -   | [见下方](#data参数)  |

### data 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| openid    |   用户openid，小程序支付时必传    | String  | -    | - |
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
| total_fee  |   订单金额(单位分 100 = 1元)    | Number  | -    | -  |
| subject  |   订单标题    | String  | -    | -  |
| type  |   订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。    | String  | -    | -  |



 * out_trade_no作用: 用于根据out_trade_no查订单状态、发起退款等接口需要。
 * 同时该订单号需保证全局唯一。
 * 通常情况下，支付订单号就是你系统的订单表的订单号或订单表的_id 
 * 假设你的订单号是：2107151010101541001
 * 但如果你的订单分多次付款（如预付款，尾款等，则需要分别创建不同的支付订单号，如pre2107151010101541001、due2107151010101541001）
 * 对未支付的订单再次发起支付时，商户应该使用原单号发起，不要更换支付单号，避免用户重复支付。