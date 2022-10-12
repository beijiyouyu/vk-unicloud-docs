# 1、获取支付参数

### 接口名：`createPayment`

#### 无框架下的云函数代码示例（该写法同时也适用于任何框架）
```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      openid: "用户openid，小程序支付时必传",
      out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
      total_fee: 1, // 订单金额(单位分 100 = 1元)
      subject: "订单标题",
      type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
      // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
      custom:{
        
      },
      // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
      other:{
      
      }
    }
  });

  return res;
};

```
 
### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| context    |   云函数的context  | Object  | -    | - |
| provider  |   wxpay：微信支付 alipay：支付宝支付  | String  | -    | wxpay、alipay  |
| isPC  |  如果是PC扫码支付，则设为true（使用支付组件时，组件会自动上传isPC的参数）| Boolean  | false  | true  |
| needQRcode | 是否强制使用二维码支付（让顾客扫码支付，一般用于物联网，如按摩椅上的扫码支付） | Boolean  | false  | true  |
| data  |  订单数据  | Object  | -   | [见下方](#data参数)  |

### data 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| openid    |   用户openid，小程序支付和微信公众号支付时必传    | String  | -    | - |
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
| total_fee  |   订单金额(单位分 100 = 1元)    | Number  | -    | -  |
| subject  |   订单标题    | String  | -    | -  |
| type  |   订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。    | String  | -    | -  |
| custom  |   自定义数据，不可与外部重复（custom内的参数不会发送给微信、支付宝）    | Object  | -    | -  |
| other  |   微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）    | Object  | -    | -  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id）[查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |

 * out_trade_no作用: 用于根据out_trade_no查订单状态、发起退款等接口需要。
 * 同时该订单号需保证全局唯一。
 * 通常情况下，支付订单号就是你系统的订单表的订单号或订单表的_id 
 * 假设你的订单号是：2107151010101541001
 * 但如果你的订单分多次付款（如预付款，尾款等，则需要分别创建不同的支付订单号，如pre2107151010101541001、due2107151010101541001，也可以是2107151010101541001-1、2107151010101541001-2）
 * 对未支付的订单再次发起支付时，商户应该使用原单号发起，不要更换支付单号，避免用户重复支付。