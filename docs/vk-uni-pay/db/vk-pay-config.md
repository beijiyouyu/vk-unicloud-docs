# vk-pay-config

#### 统一支付配置表

___该表为插件支付专用表，主要存放商户的支付配置___

### 字段

| 字段名称   | 字段类型       | 必填    | 默认值  | 说明 |
|------- |-----------|---------|-------|-------|
| _id    |  string   | 是  |   | 商户支付pid |
| alipay |  object   |   |   | 支付宝支付配置 |
| wxpay  |  object   |   |   | 微信支付配置 |


### 完整数据格式示例

```js
{
  "_id":"001",
  "wxpay": {
    "mp-weixin": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": ""
    },
    "app-plus": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": ""
    },
    "h5": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": ""
    },
    "h5-weixin": {
      "appId": "wx2ebf03d174875bed",
      "secret": "84119e740cc4e98b84e088c5051d05bb",
      "mchId": "",
      "key": "",
      "pfx": ""
    },
    "mweb": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": "",
      "sceneInfo": {
        "h5_info": {
          "type": "Wap",
          "wap_url": "https://www.xxxxxx.com",
          "wap_name": "网站名称",
        }
      }
    }
  },
  "alipay": {
    "mp-alipay": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "app-plus": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "h5": {
      "appId": "",
      "mchId": "",
      "privateKey": "",
      "alipayPublicCertContent": "",
      "alipayRootCertContent": "",
      "appCertContent": "",
      "sandbox": false
    },
    "transfer": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "appCertSn": "",
      "alipayRootCertSn": "",
      "sandbox": false
    }
  }
}
```

### 特别说明

* 微信的 `pfx` 的值是 `wxpay.p12` 证书文件转 `base64` 后的值
* 支付宝的 `alipayPublicCertContent` 的值是 `alipayCertPublicKey_RSA2.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 支付宝的 `alipayRootCertContent` 的值是 `alipayRootCert.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）
* 支付宝的 `appCertPublicKeyContent` 的值是 `appCertPublicKey.crt` 证书文件内的字符串的值（变成一行，且换行处需要加\n）