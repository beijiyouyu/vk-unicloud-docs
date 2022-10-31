# 配置支付参数文件

* 1、打开 `cloudfunctions/common/uni-config-center/uni-pay/config.js` (没有则新建)
* 复制下方代码到 `uni-pay/config.js`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/720f095f-85ac-44b8-9aa2-9c69f90a48b8.png)

**注意**

* 配置文件是 `.js` 文件，不是 `.json` 文件
* 配置文件是 `.js` 文件，不是 `.json` 文件
* 配置文件是 `.js` 文件，不是 `.json` 文件

## 完整的支付配置

___注意：就算你只使用部分支付功能，如微信小程序支付，也需保留其他支付配置（其他支付配置不填即可，但不要直接删除其他配置，包括支付宝空白证书也不要删除）___

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

## 证书存放目录

如果你的证书名字不是图上的名字，则改名成图上对应的名字即可。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/30ecaeaa-0adc-434e-94b1-733300479c6e.png)

* 蓝色框内是支付宝证书（3个）
* 红色框内是微信支付证书（1个）

## 设置异步回调notifyUrl

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/c3f0b18c-8d24-440c-8752-12330c124d14.png)

上图中在 `notifyUrl` 属性内配置支付回调

格式为："服务空间SpaceID":"URL化完整地址"

如果你有多个空间绑定（如本地和线上环境分开，则需要配置多个回调地址）

如

```js
"notifyUrl": {
  // 本地开发环境，如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可
  "a4f90532-ac60-4a43-81c1-a5c4s3fbs66": "https://a4f90532-ac60-4a43-81c1-a5c4s3fbs66.bspapp.com/http/vk-pay",
  // 线上正式环境
  "b5a9s861-ba20-dca5-56a2-bd3fbsasxz6": "https://b5a9s861-ba20-dca5-56a2-bd3fbsasxz6.bspapp.com/http/vk-pay"
},
```

**服务空间SpaceID获取方式（即：的左边部分）**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4948f2d1-1a6e-414f-88eb-93642c92debf.png)

**URL化完整地址获取方式（即：的右边部分）**

进入服务空间详情

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3aa0ccbf-8f53-45ad-ac4e-bb861fd0fb42.png)

复制vk-pay支付回调函数的URL路径

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0a3398cd-a3aa-40fa-9078-622951a697de.png)

配置完记得上传公共模块 `uni-config-center` （每当修改配置后都要上传一次）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/8612eddc-c799-4baa-a4ab-9b734b5bebcb.png)

#### 支付宝证书生成指南：[点击查看](https://opendocs.alipay.com/open/291/105971)

## 特别注意

#### 注意一

因支付宝转账接口需要用到参数 `appCertSn` 和 `alipayRootCertSn` 

> [传送门-获取证书序列号在线工具](https://vkunicloud.fsq.pub/getCertSn/#/)

__这么做是为了不导入第三方npm包（因为从证书中解析序列号需要导入额外一些npm包，增大代码体积）__

#### 注意二

* 支付宝H5网站扫码支付需签约 支付宝当面付（非PC网站支付）
* 支付宝H5移动支付需签约 支付宝当面付（非移动网站支付）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4b40e4ab-b507-43a1-9fbb-1cc3364d67c7.png)

#### 注意三

* 每次修改了支付参数后，需要重新上传公共模块 `uni-config-center`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/5bb008ac-3032-4374-88fa-1cd66e72984f.png)

#### 注意四

* 如果提示找不到 `xxx` 模块，如 `uni-id` 模块，则
* 1、在 `uniCloud/cloudfunctions/common/vk-uni-pay` 目录右键选择 `管理公共模块依赖` 菜单，引入这2个模块 `uni-config-center`、 `uni-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/7a907421-c1e3-422a-ac6c-aa4016a33b2b.png)

* 2、在需要引入支付API的云函数（如：vk-pay）右键选择 `管理公共模块依赖` 菜单，至少引入这4个模块 `uni-config-center`、 `uni-id`、 `uni-pay`、 `vk-uni-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/575f8b33-cfb6-4055-b41a-afddcdc6be0c.png)

* 3、重新上传公共模块 `vk-uni-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3505280b-dea1-4d17-a25f-b0b6bd1315c4.png)

* 4、重新上传云函数 `vk-pay`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/627737c7-0677-4f18-88c1-1f3ea087477c.png)
