# 6、单笔转账到支付宝或微信

### 接口名：`vk.vkPay.transfer`

## 支付宝
```js
res = await vk.vkPay.transfer({
  account: "对方支付宝账号",
  real_name: "对方真实姓名",
  amount: 10, // 100=1元(单位分)
  title: "提现到支付宝",
  pay_type: "alipay",
  remark: "转账备注",
  out_biz_no: "转账单号"
});

if (res.code !== 0) {
  // 转账失败后的逻辑
  return res;
}

// 转账成功后的逻辑
```

## 微信
```js
res = await vk.vkPay.transfer({
  openid: "对方的openid",
  real_name: "对方真实姓名",
  amount: 10, // 100=1元(单位分)
  title: "提现到微信零钱",
  pay_type: "wxpay",
  platform: "mp-weixin",
  remark: "转账备注",
  out_biz_no: "转账单号"
});

if (res.code !== 0) {
  // 转账失败后的逻辑
  return res;
}

// 转账成功后的逻辑
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



### 同时需要在 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 添加 `uniPayConfig` 配置

代码如下

```js
const uniPayConfig = require('../uni-pay/config.js');
module.exports = {
	"uni-pay": uniPayConfig,
	"vk": {
		。。。 之前的配置
	}
};
```
