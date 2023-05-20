# 4、查询付款状态

### 接口名：`queryPayment`

#### 无框架下的云函数代码示例（该写法同时也适用于任何框架）
```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {

  let res = await vkPay.queryPayment({
    out_trade_no: "商户支付订单号", 
    await_notify: false, // 是否需要等待异步通知执行完成，若为了响应速度，可以设置为false，若需要等待异步回调执行完成，则设置为true
    pay_order_info: false, // 是否需要返回支付订单信息，默认为false
  });

  return res;
};
```

### 请求参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
| await_notify  |   是否需要等待异步通知执行完成后才返回给前端支付结果   | Boolean  | false  | true  |
| await_max_time  |   最大等待时长，默认20秒（单位秒）   | Number  | 20  | 范围1-40  |
| pay_order_info  |   是否需要返回支付订单信息  | Boolean  | false  | true  |
 
### await_notify

详细说明

以支付宝为例，整个支付环节大致会经过这几个步骤

* 1、用户在支付宝app输入支付密码
* 2、支付宝异步回调开发者服务器（云函数）
* 3、云函数接受到异步通知后，准备执行自己业务系统逻辑（比如给用户充值余额、或修改订单状态为已支付等等）
* 4、前端响应（如用户看到余额增加了或订单变成已支付了）
* 5、完成

上面的步骤中，第3步和第4步的顺序不一定谁先谁后，为了确保顺序一定是3前4后，则设置 `await_notify` 为 `true` 即可（一般这种情况的场景是前端页面数据需要通过数据库查询获得，因此需要等异步回调更新数据库数据完成后才行）

但是如果你想让前端更快的获得结果（比如不管异步回调执行是否完成，前端都显示支付成功，则设置 `await_notify` 为 `false` 可以加快响应速度）


### 返回值

|参数名							|类型		|说明																																																																						|
|:-:								|:-:		|:-:																																																																						|
|orderPaid					|boolean|标记用户是否已付款成功（此参数只能表示用户确实付款了，但系统的异步回调逻辑可能还未执行完成）																										|
|user_order_success	|boolean|用户异步通知逻辑是否全部执行完成，且无异常（参数await_notify为true时此值才能正常返回，此时建议前端可以通过此参数是否为true来判断是否支付成功）	|
|out_trade_no				|string	|支付插件订单号																																																																	|
|transaction_id			|string	|第三方支付交易单号（只有付款成功的才会返回）																																																		|
|status							|int		|当前支付订单状态 -1：已关闭 0：未支付 1：已支付 2：已部分退款 3：已全额退款																																		|
|payOrder						|object	|支付订单完整信息（参数pay_order_info为true时才会返回此值）																																											|

