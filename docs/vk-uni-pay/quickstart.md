# 快速上手 - 安装步骤

**友情提醒：**

在对接自己的项目之前，建议先下载 `vk-uni-pay` 的示例项目，先将示例项目跑通之后再来对接你自己的项目。

[点击查看示例项目运行教程](https://vkdoc.fsq.pub/vk-uni-pay/example.html)

**如果你已经跑通了示例项目，则继续往下看！**

## 1、 下载安装
* 1、从插件市场安装 `vk-uni-pay` 插件到你的项目中。[插件市场传送门](https://ext.dcloud.net.cn/plugin?id=5642)
* 2、在 `uniCloud/cloudfunctions/common/vk-uni-pay` 目录右键选择 `管理公共模块依赖` 菜单，引入这2个模块 `uni-config-center`、 `uni-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/631a3863-8094-4901-bd7f-17322b96a536.png)
* 3、在需要引入支付API的云函数右键选择 `管理公共模块依赖` 菜单，至少引入这4个模块 `uni-config-center`、 `uni-id`、 `uni-pay`、 `vk-uni-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2a66eeaf-f245-415e-babf-147b294c913e.png)
* 4、配置支付参数文件地址: `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js` (没有则新建)（注意这里是 `config.js` ) [查看支付参数](#支付参数)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/af8fb6fa-0c40-4202-8de3-20e9ac9fdfb1.png)
* 5、上传公共模块 `vk-uni-pay`（右键，上传公共模块）
* 6、上传云函数 `vk-pay`（右键，上传云函数）
* 7、完成

## 2、 配置uni-id里的小程序参数
因为小程序支付需要获取用户openid

* 打开文件 `cloudfunctions/common/uni-config-center/uni-id/config.json`(没有则新建)（注意这里是`config.json`)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/bc4c3c64-531c-4711-b32e-40679445fbdd.png)
* 完整的uni-id配置代码如下
##### 注意：获取 `openId` 使用的 `uni-id` 接口，故 `uni-id` 和 `uni-pay` 都是要配置的
##### 微信小程序支付时需要获取 `openId`，故需要配置 `mp-weixin`
##### 支付宝小程序支付时需要获取 `openId`，故需要配置 `mp-alipay`
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

* 配置完后，还需要到项目根目录的 `manifest.json` 文件中再次配置一下微信小程序的 `appid`，如下图所示

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/193905eb-6840-43fb-a5db-d3cfde6a9a3d.png)

## 3、 配置uni-pay支付参数
* 1、打开文件 `cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/af8fb6fa-0c40-4202-8de3-20e9ac9fdfb1.png)
* 复制下方代码到 `uni-pay/config.js`
```js
const fs = require('fs');
const path = require('path');
module.exports = {
  /**
   * 统一支付回调地址，格式为 "服务空间SpaceID":"URL化完整地址"
   * 这里的本地开发并不是指 http://localhost:8080/ 的地址，而是另外一个服务空间的ULR化地址（如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可）
   * 回调的云函数地址，建议填 /http/vk-pay，因为vk-pay云函数已经写好了回调处理的逻辑，否则你需要自己写全部的回调逻辑。
   * 其中vk-pay是可以改名的，只需要修改 uniCloud/cloudfunctions/vk-pay/package.json 文件中的 "path": "/http/vk-pay", 把 /http/vk-pay 改成 /http/xxxx 即可(需要重新上传云函数vk-pay)。
   */
  "notifyUrl": {
    // 本地开发环境，如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可
    "a4f90532-ac60-4a43-81c1-a5c4s3fbs66": "https://a4f90532-ac60-4a43-81c1-a5c4s3fbs66.bspapp.com/http/vk-pay",
    // 线上正式环境
    "b5a9s861-ba20-dca5-56a2-bd3fbsasxz6": "https://b5a9s861-ba20-dca5-56a2-bd3fbsasxz6.bspapp.com/http/vk-pay"
  },
  /**
   * 微信
   * 公共参数说明
   * appId   微信后台的appId
   * secret  微信后台的secret
   * mchId   微信支付的商户id
   * key     微信支付的api密钥（V2版本）
   * pfx     微信支付的p12证书（退款需要）
   */
  "wxpay": {
    // 微信 - 小程序支付
    "mp-weixin": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12')
    },
    // 微信 - APP支付
    "app-plus": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12')
    },
    // 微信 - H5网站二维码支付
    "h5": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12')
    },
    // 微信 - 公众号支付
    "h5-weixin": {
      "appId": "wx2ebf03d174875bed",
      "secret": "84119e740cc4e98b84e088c5051d05bb",
      "mchId": "",
      "key": "",
      "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12')
    },
    // 微信 - 手机外部浏览器H5支付
    "mweb": {
      "appId": "",
      "secret": "",
      "mchId": "",
      "key": "",
      "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12'),
      // 场景信息，必填
      "sceneInfo": {
        "h5_info": {
          "type": "Wap", // 此值固定Wap
          "wap_url": "https://www.xxxxxx.com", // 你的H5首页地址，必须和你发起支付的页面的域名一致。
          "wap_name": "网站名称", // 你的H5网站名称
        }
      }
    }
  },
  /**
   * 支付宝（证书记得选java版本）
   * 公共参数说明
   * mchId                  支付宝商户id 2088开头的那个（此参数可以去除）
   * appId                  支付宝开放平台的应用appId
   * secret                 支付宝开放平台的应用secret
   * privateKey             应用私钥
   * alipayPublicCertPath   支付宝公钥证书路径地址  与之对应的 alipayPublicCertContent 为支付宝公钥证书内容（值可以是字符串也可以是Buffer）
   * alipayRootCertPath     支付宝根证书路径地址   与之对应的 alipayRootCertContent 为支付宝根证书内容（值可以是字符串也可以是Buffer）
   * appCertPath            应用证书路径地址      与之对应的 appCertPathContent 为应用证书内容（值可以是字符串也可以是Buffer）
   * sandbox  是否沙箱模式 true 沙箱模式 false 正常模式
   */
  "alipay": {
    // 支付宝 - 小程序支付配置
    "mp-alipay": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'),
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'),
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'),
      "sandbox": false
    },
    // 支付宝 - APP支付配置
    "app-plus": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'),
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'),
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'),
      "sandbox": false
    },
    // 支付宝 - H5支付配置（包含：网站二维码、手机H5，需申请支付宝当面付接口权限）
    "h5": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "alipayPublicCertPath": path.join(__dirname, 'alipay/alipayCertPublicKey_RSA2.crt'),
      "alipayRootCertPath": path.join(__dirname, 'alipay/alipayRootCert.crt'),
      "appCertPath": path.join(__dirname, 'alipay/appCertPublicKey.crt'),
      "sandbox": false
    },
    // 支付宝 - 转账到支付宝等资金转出接口，其中 appCertSn 和 alipayRootCertSn 通过工具获取
    "transfer": {
      "mchId": "",
      "appId": "",
      "privateKey": "",
      "appCertSn": "", // 应用证书的序列号
      "alipayRootCertSn": "", // 支付宝根证书的序列号
      "sandbox": false
    }
  }
}
```
* 2、打开 `cloudfunctions/common/uni-config-center/uni-pay/alipay/` 目录(没有则新建)
* 3、将 `appCertPublicKey.crt`、`alipayRootCert.crt`、`alipayCertPublicKey_RSA2.crt` 3个证书放在此目录下(这里用的是最新最安全的公钥证书模式，且使用的java版的证书)
* 4、打开 `cloudfunctions/common/uni-config-center/uni-pay/wxpay/` 目录(没有则新建)
* 5、将 `wxpay.p12` 1个证书放在此目录下

### notifyUrl 设置异步回调URL

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
* 每次修改了支付参数后，需要重新上传公共模块 `uni-config-center`

#### 注意四
* 如果提示找不到 xxx 模块，如 `uni-id` 模块，则
* 1、在 `uniCloud/cloudfunctions/common/vk-uni-pay` 目录右键选择 `管理公共模块依赖` 菜单，引入这2个模块 `uni-config-center`、 `uni-pay`
* 2、在需要引入支付API的云函数右键选择 `管理公共模块依赖` 菜单，至少引入这4个模块 `uni-config-center`、 `uni-id`、 `uni-pay`、 `vk-uni-pay`
* 3、重新上传公共模块 `vk-uni-pay`
* 4、重新上传云函数 `vk-pay`