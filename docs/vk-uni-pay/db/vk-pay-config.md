---
sidebarDepth: 0
---

# vk-pay-config

## 说明

**统一支付配置表**

该表为插件支付专用表，主要存放商户的支付配置

## 字段

| 字段名称						| 字段类型| 必填| 默认值| 说明																																					|
|---								|:---:		|:---:|:---:	|---																																					|
| _id									|  string	| 是	|				| 商户支付pid																																		|
| alipay							|  object	| 否	|				| 支付宝支付配置 [详情](#alipay字段-支付宝配置说明)															|
| wxpay								|  object	| 否	|				| 微信支付配置[详情](#wxpay字段-微信支付配置说明)																|
| alipayAppPayToH5Pay	|  boolean| 否	| false	| 是否使用当面付接口来代替支付宝app支付<br/>优势：可免去申请支付宝APP支付的接口	|

## 完整数据格式示例

```js
{
  "_id":"001",
  "wxpay": {
    "mp-weixin": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "version": 2
    },
    "app-plus": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "version": 2
    },
    "h5": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "version": 2
    },
    "h5-weixin": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "version": 2
    },
    "mweb": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "version": 2,
      "sceneInfo": {
        "h5_info": {
          "type": "Wap",
          "wap_url": "https://www.xxxxxx.com",
          "wap_name": "网站名称"
        }
      }
    },
    "transfer": {
      "appId": "",
      "mchId": "",
      "v3Key": "",
      "appCertContent": "",
      "appPrivateKeyContent": "",
      "wxpayPublicCertSn": "",
      "wxpayPublicCertContent": ""
    }
  },
  "alipay": {
    "mp-alipay": {
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "app-plus": {
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "h5": {
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "transfer": {
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    }
  }
}
```

## wxpay字段（微信支付配置说明）

### v2版本

| 字段名称| 字段类型| 必填| 默认值| 说明																														|
|---		|:---:		|:---:|:---:	|---																														|
| appId		|  string	| 是	|				| 微信后台的appId																									|
| secret	|  string	| 是	|				| 微信后台的secret（微信小程序、微信公众号必填）									|
| mchId		|  string	| 是	|				| 微信支付的商户id																								|
| key			|  string	| 是	|				| 微信支付V2版本的api密钥																					|
| pfx			|  string	| 否	|				| 微信支付V2版本的p12证书（apiclient_cert.p12证书转base64后的值）	|
| version	|  number	| 是	|   2		| 启用支付的版本 2代表v2版本 3 代表v3版本													|

### v3版本

| 字段名称						| 字段类型| 必填| 默认值| 说明																																																|
|---								|:---:		|:---:|:---:	|---																																																|
| appId								|  string	| 是	|				| 微信后台的appId																																											|
| secret							|  string	| 是	|				| 微信后台的secret（微信小程序、微信公众号必填）																											|
| mchId								|  string	| 是	|				| 微信支付的商户id																																										|
| v3Key								|  string	| 是	|				| 微信支付V3版本的api密钥																																							|
| appCertContent			|  string	| 是	|				| 微信支付V3版本需要用到的证书<br/>apiclient_cert.pem 文件内的字符串的值（变成一行，且换行处需要加\n）|
| appPrivateKeyContent|  string	| 是	|				| 微信支付V3版本需要用到的证书<br/>apiclient_key.pem 文件内的字符串的值（变成一行，且换行处需要加\n）	|
| version							|  number	| 是	|   3		| 启用支付的版本 2代表v2版本 3 代表v3版本																															|

## alipay字段（支付宝配置说明）

| 字段名称								| 字段类型| 必填| 默认值| 说明																			|
|---										|:---:		|:---:|:---:	|---																		|
| appId										|  string	| 是	|				| 支付宝开放平台的应用appId									|
| privateKey							|  string	| 是	|				| 应用私钥																	|
| alipayPublicCertContent	|  string	| 是	|				| 支付宝公钥证书<br/>alipayCertPublicKey_RSA2.crt	文件内的字符串的值（变成一行，且换行处需要加\n）												|
| alipayRootCertContent		|  string	| 是	|				| 支付宝根证书<br/>alipayRootCert.crt	文件内的字符串的值（变成一行，且换行处需要加\n）															|
| appCertContent					|  string	| 是	|				| 应用公钥证书<br/>appCertPublicKey.crt	文件内的字符串的值（变成一行，且换行处需要加\n）																	|
| sandbox									|  string	| 否	| false	| 是否沙箱模式 true 沙箱模式 false 正常模式	|

## 特别说明

* 微信V2版本的 `pfx` 的值是 `apiclient_cert.p12` 证书文件转 `base64` 后的值
* 微信V3版本的 `appCertContent` 的值是 `apiclient_cert.pem` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 微信V3版本的 `appPrivateKeyContent` 的值是 `apiclient_key.pem` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 支付宝的 `alipayPublicCertContent` 的值是 `alipayCertPublicKey_RSA2.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 支付宝的 `alipayRootCertContent` 的值是 `alipayRootCert.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 支付宝的 `appCertContent` 的值是 `appCertPublicKey.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）

### 证书如何转base64

新建一个云函数，同时将微信p12证书复制到跟这个云函数同级目录，运行以下代码即可获得base64。

```js
const fs = require('fs');
let pfx = fs.readFileSync(__dirname + '/apiclient_cert.p12');
let base64 = pfx.toString('base64');
console.log('base64: ', base64)
```

或直接使用证书转换工具 [传送门 - 证书转换工具](https://vkunicloud.fsq.pub/admin/#/pages_template/components/form/form-pay-cert)

### 证书如何快速变成一行

[传送门 - 证书快速变成一行](https://vkunicloud.fsq.pub/admin/#/pages_template/components/form/form-pay-cert)