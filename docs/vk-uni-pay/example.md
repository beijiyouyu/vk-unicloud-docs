# 示例项目运行教程

## 1、 下载安装

* 1、从插件市场下载 `vk-uni-pay` 插件示例项目到你的hbx中。
* 2、配置支付参数文件地址: `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建) [查看支付参数](#支付参数)
* 3、复制 `使用帮助/vk-pay云函数示例代码/service/` 目录内的所有文件粘贴到 `vk-uni-pay/uniCloud/cloudfunctions/vk-pay/service/` 目录(没有目录则新建)
* 注意：测试完记得删除 `vk-uni-pay/uniCloud/cloudfunctions/vk-pay/service/pay/`目录下的这两个文件（`refund.js`和`transfer.js`）（因为涉及资金退款和转账）
* 4、右键 `uniCloud` 点击 `运行云服务空间初始化向导`
* 5、完成

## 2、 配置uni-id里的小程序参数
因为小程序支付需要获取用户openid

* 打开文件 `cloudfunctions/common/uni-config-center/uni-id/config.json`(没有则新建)（注意这里是`config.json`)
* 完整的uni-id配置代码如下
##### 注意：获取 `openId` 使用的 `uni-id` 接口，故 `uni-id` 和 `uni-pay` 都是要配置的
##### 微信小程序支付时需要获取 `openId` ，故需要配置 `mp-weixin`
##### 支付宝小程序支付时需要获取 `openId` ，故需要配置 `mp-alipay`
```json
{
  "passwordSecret": "passwordSecret-demo",
  "tokenSecret": "tokenSecret-demo",
  "tokenExpiresIn": 7200,
  "tokenExpiresThreshold": 600,
  "passwordErrorLimit": 6,
  "bindTokenToDevice": false,
  "passwordErrorRetryTime": 3600,
  "autoSetInviteCode": true,
  "forceInviteCode": false,
  "app-plus": {
    "tokenExpiresIn": 2592000,
    "oauth" : {
      "weixin" : {
        "appid" : "weixin appid",
        "appsecret" : "weixin appsecret"
      },
      "apple":	{
        "bundleId": "your APP bundleId"
      }
    }
  },
  "mp-weixin": {
    "oauth" : {
      "weixin" : {
        "appid" : "weixin appid",
        "appsecret" : "weixin appsecret"
      }
    }
  },
  "mp-alipay": {
    "oauth" : {
      "alipay" : {
        "appid" : "alipay appid",
        "privateKey" : "alipay privateKey"
      }
    }
  },
  "service": {
    "sms": {
      "name": "DCloud",
      "codeExpiresIn": 300,
      "smsKey": "your sms key",
      "smsSecret": "your sms secret"
    },
    "univerify": {
      "appid":"your appid",
      "apiKey": "your apiKey",
      "apiSecret": "your apiSecret"
    }
  }
}

```

## 3、 配置uni-pay支付参数
* 1、打开文件 `cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建)
* 复制下方代码到 `uni-pay/config.js`
```js
const fs = require('fs');
const path = require('path')
module.exports = {
  // 统一 - 支付回调地址,格式为 "服务空间ID":"URL化地址"
  "notifyUrl":{
    // 本地开发环境
    "你的本地开发环境服务空间ID":"你的本地开发环境异步通知云函数url化地址",
    // 线上正式环境
    "你的线上正式环境服务空间ID":"你的线上正式环境异步通知云函数url化地址"
  },
  // 是否将支付宝APP支付转H5支付 开启后无需再申请APP支付(共用当面付API)
  "alipayAppPayToH5Pay":true,
  // 微信 - 小程序支付
  "wxConfigMp": {
    "appId": "",
    "secret": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
  },
  // 微信 - APP支付
  "wxConfigApp": {
    "appId": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
  },
  // 微信 - H5网站支付
  "wxConfigH5": {
    "appId": "",
    "secret": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
  },
  // 支付宝 - 小程序支付 支付宝证书记得选java版本
  "aliConfigMp": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "alipayRootCertPath": path.join(__dirname,'alipay/alipayRootCert.crt'),
    "appCertPath": path.join(__dirname,'alipay/appCertPublicKey.crt'),
    "alipayPublicCertPath": path.join(__dirname,'alipay/alipayCertPublicKey_RSA2.crt'),
    "sandbox":false
  },
  // 支付宝 - APP支付
  "aliConfigApp": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "alipayRootCertPath": path.join(__dirname,'alipay/alipayRootCert.crt'),
    "appCertPath": path.join(__dirname,'alipay/appCertPublicKey.crt'),
    "alipayPublicCertPath": path.join(__dirname,'alipay/alipayCertPublicKey_RSA2.crt'),
    "sandbox":false
  },
  // 支付宝 - H5支付
  "aliConfigH5": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "alipayRootCertPath": path.join(__dirname,'alipay/alipayRootCert.crt'),
    "appCertPath": path.join(__dirname,'alipay/appCertPublicKey.crt'),
    "alipayPublicCertPath": path.join(__dirname,'alipay/alipayCertPublicKey_RSA2.crt'),
    "sandbox":false
  },
  // 支付宝 - 转账到支付宝等资金转出接口
  "aliConfigTransfer": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "appCertSn": "",
    "alipayRootCertSn": "",
    "sandbox":false
  }
}
```
* 2、打开 `cloudfunctions/common/uni-config-center/uni-pay/alipay/` 目录(没有则新建)
* 3、将 `appCertPublicKey.crt`、`alipayRootCert.crt`、`alipayCertPublicKey_RSA2.crt` 3个证书放在此目录下(这里用的是最新最安全的公钥证书模式，且使用的java版的证书)
* 4、打开 `cloudfunctions/common/uni-config-center/uni-pay/wxpay/` 目录(没有则新建)
* 5、将 `wxpay.p12` 1个证书放在此目录下

* notifyUrl参数来源
复制服务空间ID
<img class="preview" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4948f2d1-1a6e-414f-88eb-93642c92debf.png"/>
进入服务空间详情
<img class="preview" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3aa0ccbf-8f53-45ad-ac4e-bb861fd0fb42.png"/>
复制vk-pay支付回调函数的URL路径
<img class="preview" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0a3398cd-a3aa-40fa-9078-622951a697de.png"/>

## 4、支付宝证书生成指南
[点击查看](https://opendocs.alipay.com/open/291/105971)


## 5、特别注意
#### 注意一
* 因支付宝转账接口需要用到 `appCertSn` 和 `alipayRootCertSn`
* `appCertSn` 和 `alipayRootCertSn` 可以通过 `gitee` 导入下方的项目，将你的 `alipayRootCert.crt` 和 `appCertPublicKey.crt` 放在 `test1/alipay` 目录下，本地运行test1云函数获取
* gitee地址：[https://gitee.com/vk-uni/getAlipayAppCertSn.git](https://gitee.com/vk-uni/getAlipayAppCertSn.git)

##### 这么做是为了不导入第三方npm包（因为从证书中解析序列号需要导入额外一些npm包，增大代码体积）

#### 注意二
* 支付宝H5网站扫码支付需签约 支付宝当面付（非PC网站支付）
* 支付宝H5移动支付需签约 支付宝当面付（非移动网站支付）

#### 注意三
* 如果提示找不到 xxx 模块，如 `uni-id` 模块，则在 `uniCloud/cloudfunctions/vk-pay` 目录右键选择 `管理公共模块依赖` 菜单，至少引入这4个模块 `uni-config-center`、 `uni-id`、 `uni-pay`、 `vk-uni-pay`
