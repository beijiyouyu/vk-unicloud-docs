# 常见问题
## 1、微信H5外部浏览器支付流程

* 1、用户点击发起支付
* 2、唤起微信APP，在微信APP内输入支付密码
* 3、支付成功后，会返回之前的页面（返回的页面可以通过 `return-url` 指定）
```html
<vk-uni-pay
  ref="vkPay"
  :status.sync="vkPay.status"
  :query-payment-action="vkPay.queryPaymentAction"
  :return-url="vkPay.returnUrl"
></vk-uni-pay>
```
* 4、此时页面需要弹出一个确认支付的弹窗

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e6cbafb2-bdaf-444a-bc15-7704a8b408ad.png)

* 5、用户点击已完成支付，则会请求云函数，云函数会请求微信支付服务器进行查询是否真的已付款。
* （其中第5步建议替换成请求你自己业务的订单查询云函数，云函数内查询订单是否已被异步回调处理成已付款）
* 6、若已付款，前端应该自己处理下付款成功后的页面展示逻辑。

#### 注意：
* 1、H5支付的域名需要在微信支付商户后台进行配置
* 2、H5支付的unicloud配置在 `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js` 的
```js
// 微信 - 手机外部浏览器H5支付
"wxConfigMweb": {
  "appId": "", // 可以是小程序的也可以是公众号的
  "secret": "", 
  "mchId": "", // 商户id
  "key": "", // 商户key
  "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12'),
  // 场景信息，必填
  "sceneInfo":{
    "h5_info":{
      "type": "Wap", // 此值固定Wap
      "wap_url": "https://www.xxxx.cn",// 你的H5首页地址，必须和你发起支付的页面的域名一致。
      "wap_name": "你的网站名称",// 你的H5网站名称
    }
  }
},
```
* 3、微信H5支付不支持在微信浏览器中支付（只能在非微信APP的浏览器中发起支付）（微信浏览器中只能用公众号支付）


## 2、微信公众号支付注意事项

* 1、微信公众号支付时，openid为必传参数，需要先获取用户的openid（网页授权）（一般你微信公众号登录的时候已经取到了）

获取openid的方法 [点击查看微信公众号文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

具体而言，获取openid流程分为两步：

* 1、访问授权页面，获取code

* 2、通过code换取openid

授权地址为：

`https://open.weixin.qq.com/connect/oauth2/authorize?appid=你公众号的appid&redirect_uri=你的回调地址&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

拼接完授权地址url后，直接执行下面代码即可访问授权页面

```js
window.location.href = url;
```

其中 scope = snsapi_base时，为静默授权（无需用户点击同意）（但只能获取openid）

scope = snsapi_userinfo时，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

#### 注意：
* 1、微信公众号支付的域名需要在微信支付商户后台进行配置
* 2、微信公众号支付的unicloud配置在 `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js` 的
```js
// 微信 - 公众号支付
"wxConfigH5Weixin": {
  "appId": "",
  "secret": "", 
  "mchId": "", // 商户id
  "key": "", // 商户key
  "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12')
},
```
* 3、微信公众号支付只能在微信浏览器中支付（非微信APP的浏览器中无法发起支付，非微信APP的浏览器请使用H5支付）





















<style scoped>
h1{
  font-size:1.4em;
}

h2{
  font-size:1.3em;
}

h3{
  font-size:1.1em;
}
</style>