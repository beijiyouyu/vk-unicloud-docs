# 6、单笔转账到支付宝或微信

### 接口名：`transfer`

#### 无框架下的云函数代码示例（该写法同时也适用于任何框架）

## 6.1、支付宝
```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  account: "对方支付宝账号",
  real_name: "对方真实姓名",
  amount: 10, // 100=1元(单位分)
  title: "提现到支付宝",
  pay_type: "alipay",
  remark: "转账备注",
  out_biz_no: "转账单号"
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```

## 6.2、微信
```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  openid: "对方的openid",
  real_name: "对方真实姓名",
  amount: 10, // 100=1元(单位分)
  title: "提现到微信零钱",
  pay_type: "wxpay",
  platform: "mp-weixin",
  remark: "转账备注",
  out_biz_no: "转账单号"
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```



#### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| account  |  支付宝专用 - 对方支付宝账号   | String  | -    | -  |
| real_name  |  对方真实姓名   | String  | -    | -  |
| amount  |  转账金额 100=1元(单位分)   | Number  | -    | -  |
| title  |  转账标题   | String  | -    | -  |
| pay_type  |  wxpay：微信支付 alipay：支付宝支付     | String  | -    | wxpay、alipay  |
| remark  |  转账备注  | String  | -    | -  |
| out_biz_no  |  转账单号  | String  | -    | -  |
| openid  |  微信专用 - 用户的openid   | String  | -    | -  |
| platform  |  微信专用 - 平台类型：app-plus、mp-weixin，用于获取对应平台的支付配置信息     | String  | -    | app-plus、mp-weixin、h5  |
| checkName  |  微信专用 - 是否需要检测真实姓名  | Boole  | true    | false  |


#### 注意：
* 新注册的企业支付宝账号，单笔转账接口的申请直接在支付宝官网申请可能会无法申请，此时可以联系支付宝商务人员，进行人工申请。
* 新注册的微信商户号，单笔转账接口的申请需要入驻满90天，且连续正常交易30天（刷单不算）