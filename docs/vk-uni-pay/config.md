# 配置支付参数文件

* 1、打开 `cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建)
* 复制下方代码到`uni-pay/config.js`

```js
const fs = require('fs');
const path = require('path');
module.exports = {
  /**
   * 统一支付回调地址，格式为 "服务空间ID":"URL化地址"
   * 这里的本地开发并不是指 http://localhost:8080/ 的地址，而是另外一个服务空间的ULR化地址（如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可）
   * 回调的云函数地址，建议填 /http/vk-pay，因为vk-pay云函数已经写好了回调处理的逻辑，否则你需要自己写全部的回调逻辑。
   * 其中vk-pay是可以改名的，只需要修改 uniCloud/cloudfunctions/vk-pay/package.json 文件中的 "path": "/http/vk-pay", 把 /http/vk-pay 改成 /http/xxxx 即可(需要重新上传云函数vk-pay)。
   */
  "notifyUrl": {
    // 本地开发环境，如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可
    "a4f90532-ac60-4a43-81c1-xxxxxxxxxxx1": "https://a4f90532-ac60-4a43-81c1-xxxxxxxxxxx1.bspapp.com/http/vk-pay",
    // 线上正式环境
    "a4f90532-ac60-4a43-81c1-xxxxxxxxxxx2": "https://a4f90532-ac60-4a43-81c1-xxxxxxxxxxx2.bspapp.com/http/vk-pay"
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
* 2、打开`cloudfunctions/common/uni-config-center/uni-pay/alipay/`目录(没有则新建)
* 3、将`appCertPublicKey.crt`、`alipayRootCert.crt`、`alipayCertPublicKey_RSA2.crt` 3个证书放在此目录下(这里用的是最新最安全的公钥证书模式，且使用的java版的证书)
* 4、打开`cloudfunctions/common/uni-config-center/uni-pay/wxpay/`目录(没有则新建)
* 5、将`wxpay.p12` 1个证书放在此目录下

#### 支付宝证书生成指南：[点击查看](https://opendocs.alipay.com/open/291/105971)

#### 注意：因支付宝转账接口需要用到 `appCertSn` 和 `alipayRootCertSn`
* `appCertSn` 和 `alipayRootCertSn` 可以通过`gitee`导入下方的项目，将你的 `alipayRootCert.crt` 和 `appCertPublicKey.crt` 放在`test1/alipay` 目录下，本地运行test1云函数获取
* gitee地址：[https://gitee.com/vk-uni/getAlipayAppCertSn.git](https://gitee.com/vk-uni/getAlipayAppCertSn.git)

##### 这么做是为了不导入第三方npm包（因为从证书中解析序列号需要导入额外一些npm包，增大代码体积）

