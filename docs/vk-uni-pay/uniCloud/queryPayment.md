# 4、查询付款状态

### 接口名：`queryPayment`

#### 无框架下的云函数代码示例（该写法同时也适用于任何框架）
```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {

  let res = await vkPay.queryPayment({
    out_trade_no: "商户支付订单号"
  });

  return res;
};
```

### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
