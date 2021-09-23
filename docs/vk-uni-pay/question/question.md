# 1、微信H5外部浏览器支付流程

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

### 注意：
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