# 配置支付参数文件

* 1、打开 `cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建)
* 复制下方代码到`uni-pay/config.js`

```js
const fs = require('fs');
const path = require('path')
module.exports = {
  /**
   * 统一支付回调地址，格式为 "服务空间ID":"URL化地址"
   * 这里的本地开发并不是指 http://localhost:8080/ 的地址，而是另外一个服务空间的ULR化地址（如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可）
   * 回调的云函数地址，建议填 /http/vk-pay，因为vk-pay云函数已经写好了回调处理的逻辑，否则你需要自己写全部的回调逻辑。
   * 其中vk-pay是可以改名的，只需要修改 uniCloud/cloudfunctions/vk-pay/package.json 文件中的 "path": "/http/vk-pay", 把 /http/vk-pay 改成 /http/xxxx 即可(需要重新上传云函数vk-pay)。
   */
  "notifyUrl":{
    // 本地开发环境，如果你本地开发和线上环境共用同一个服务空间则只需要填线上环境的即可
    "a4f90532-ac60-4a43-81c1-xxxxxxxxxxx1":"https://a4f90532-ac60-4a43-81c1-xxxxxxxxxxx1.bspapp.com/http/vk-pay",
    // 线上正式环境
    "a4f90532-ac60-4a43-81c1-xxxxxxxxxxx2":"https://a4f90532-ac60-4a43-81c1-xxxxxxxxxxx2.bspapp.com/http/vk-pay"
  },
  // 是否将支付宝APP支付转H5支付 开启后无需再申请APP支付(共用当面付API)
   "alipayAppPayToH5Pay":false,
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
    "secret": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
  },
  // 微信 - H5网站二维码支付
  "wxConfigH5": {
    "appId": "",
    "secret": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
  },
  // 微信 - 手机外部浏览器H5支付
  "wxConfigMweb": {
    "appId": "",
    "secret": "",
    "mchId": "",
    "key": "",
    "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12'),
    // 场景信息，必填
    "sceneInfo":{
      "h5_info":{
        "type": "Wap",// 此值固定Wap
        "wap_url": "https://www.xxxxxx.com",// 你的H5首页地址，必须和你发起支付的页面的域名一致。
        "wap_name": "网站名称"// 你的H5网站名称
      }
    }
  },
  // 微信 - 公众号支付
  "wxConfigH5Weixin": {
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
  // 支付宝 - H5支付 需申请支付宝当面付接口权限
  "aliConfigH5": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "alipayRootCertPath": path.join(__dirname,'alipay/alipayRootCert.crt'),
    "appCertPath": path.join(__dirname,'alipay/appCertPublicKey.crt'),
    "alipayPublicCertPath": path.join(__dirname,'alipay/alipayCertPublicKey_RSA2.crt'),
    "sandbox":false
  },
  // 支付宝 - 转账到支付宝等资金转出接口，其中 appCertSn 和 alipayRootCertSn 通过工具获取
  "aliConfigTransfer": {
    "mchId": "",
    "appId": "",
    "privateKey": "",
    "appCertSn": "",
    "alipayRootCertSn": ""
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

