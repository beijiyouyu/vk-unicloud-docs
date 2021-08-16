# 4、发起退款

### 接口名：`vk.vkPay.refund`

```js
let refundRes = await vkPay.refund({
  out_trade_no: "商户支付订单号",
  refund_desc: "退款说明",
  refund_fee: "退款金额100=1元（单位分）如不填，则全额退款"
});
if (refundRes.code !== 0) {
  return refundRes;
}
res = { code: 0, msg: '退款成功' };

```

 
### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
| refund_desc  |   退款说明  | String  | -    | -  |
| refund_fee  |  退款金额，100=1元（单位分）如不填，则全额退款  | Number  | -   | - |
