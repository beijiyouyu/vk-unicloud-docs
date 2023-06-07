# 多商户（服务商版）

## 介绍

**什么是多商户？**

当你的系统是由N个客户端组成（如N个小程序组成，类似saas系统），同时希望每个小程序的收款账户各自独立（即A小程序收款到A公司，B小程序收款到B公司）此时需要多商户的支持。

在 `vk-uni-pay` 中，支持多商户（服务商版）

注意：
1. 你需要先成为支付服务商，本文不介绍如何成为服务商，如果你现在还不是服务商，你也可以使用非服务商模式 [传送门 - 非服务商模式](./multi-merchant)
2. 服务商模式下，无法使用转账功能（微信和支付宝限制的）

## 微信服务商

> vk-pay的版本需 >= 1.10.0

### 配置

配置文件：`common/uni-config-center/uni-pay/config.js` [传送门 - 支付配置](https://vkdoc.fsq.pub/vk-uni-pay/config.html)

参数和普通商户模式一样的，服务商模式下多了2个参数，`subAppId` 和 `subMchId`，但这两个参数均可不填。

H5网站二维码支付配置为

```js
"h5": {
  "appId": "", // 服务商名下的任意公众号appid（注意，不管什么支付，这里填的都是服务商名下的任意公众号appid）
  "mchId": "", // 服务商商户号
  "subAppId": "", // 默认子商户appid（可不填）
  "subMchId": "", // 默认子商户商户号（可不填）
  "key": "", // 服务商api的v2的key
  "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // 服务商v2证书
  "v3Key": "", // 服务商api的v3的key
  "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 服务商v3证书
  "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 服务商v3证书
  "version": 2
},
```

小程序支付配置为

```js
"mp-weixin": {
  "appId": "", // 服务商名下的任意公众号appid（注意，不管什么支付，这里填的都是服务商名下的任意公众号appid）
  "mchId": "", // 服务商商户号
  "subAppId": "", // 默认子商户小程序appid（可不填）
  "subSecret": "", // 默认子商户小程序secret（可不填）
  "subMchId": "", // 默认子商户商户号（可不填）
  "key": "", // 服务商api的v2的key
  "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // 服务商v2证书
  "v3Key": "", // 服务商api的v3的key
  "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 服务商v3证书
  "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 服务商v3证书
  "version": 2
},
```

APP支付配置为

```js
"app-plus": {
  "appId": "", // 服务商名下的任意公众号appid（注意，不管什么支付，这里填的都是服务商名下的任意公众号appid）
  "mchId": "", // 服务商商户号
  "subAppId": "", // 默认子商户app的appid（可不填）
  "subMchId": "", // 默认子商户商户号（可不填）
  "key": "", // 服务商api的v2的key
  "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // 服务商v2证书
  "v3Key": "", // 服务商api的v3的key
  "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 服务商v3证书
  "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 服务商v3证书
  "version": 2
},
```

公众号支付配置为

```js
"h5-weixin": {
  "appId": "", // 服务商名下的任意公众号appid（注意，不管什么支付，这里填的都是服务商名下的任意公众号appid）
  "mchId": "", // 服务商商户号
  "subAppId": "", // 默认子商户app的appid（可不填）
  "subMchId": "", // 默认子商户商户号（可不填）
  "key": "", // 服务商api的v2的key
  "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // 服务商v2证书
  "v3Key": "", // 服务商api的v3的key
  "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 服务商v3证书
  "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 服务商v3证书
  "version": 2
},
```

手机外部浏览器H5支付配置为

```js
"mweb": {
  "appId": "", // 服务商名下的任意公众号appid（注意，不管什么支付，这里填的都是服务商名下的任意公众号appid）
  "mchId": "", // 服务商商户号
  "subAppId": "", // 默认子商户app的appid（可不填）
  "subMchId": "", // 默认子商户商户号（可不填）
  "key": "", // 服务商api的v2的key
  "pfx": fs.readFileSync(__dirname + '/wxpay/apiclient_cert.p12'), // 服务商v2证书
  "v3Key": "", // 服务商api的v3的key
  "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 服务商v3证书
  "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 服务商v3证书
  "version": 2,
  "sceneInfo": {
    "h5_info": {
      "type": "Wap", // 此值固定Wap
      "wap_url": "https://www.xxx.com", // 你的H5首页地址，必须和你发起支付的页面的域名一致。
      "wap_name": "xxx", // 你的H5网站名称
    }
  }
},
```

### 使用

`vkPay.createPayment` 接口中多传两个参数 `sub_appid` 和 `sub_mchid` 即可

如果未传 `sub_appid` 和 `sub_mchid` ，将会自动从配置中获取默认的子商户，参数分别对应为：`subAppId` 和 `subMchId` 

```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      sub_appid: "xxxxxxx", // 子商户appid（注意，此appid必须绑定在子商户商户号下）
      sub_mchid: "xxxxxxx", // 子商户商户号（注意，此商户号必须绑定在服务商名下）
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

## 支付宝服务商

### 配置

配置 `common/uni-config-center/uni-pay/config.js` 中的参数使用服务商的密钥和证书

注意：支付宝服务商的配置和普通商户一模一样，无特殊参数。[传送门 - 支付配置](https://vkdoc.fsq.pub/vk-uni-pay/config.html)

### 使用

`vkPay.createPayment` 接口中多传一个参数 `app_auth_token` 即可

**什么是 `app_auth_token`**

`app_auth_token` 是子商户的授权token，可在支付宝服务商后台看到，直接复制过来即可。

示例代码

```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      app_auth_token: "xxxxxxxxxxxx", // 子商户的授权token
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