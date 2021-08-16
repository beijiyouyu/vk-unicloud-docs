# 2、发起支付

### 使用`vk-uni-pay`的优势
* 1、自动请求云函数
* 2、自动识别H5、小程序、APP，抹平不同平台的代码差异
* 3、H5扫码支付自动获取二维码地址vkPay.codeUrl，支持自动轮询获取支付状态
* 4、可实时监听支付状态vkPay.status 0：待支付 1：支付中 2：已支付
* 5、支付成功的判断是直接查你数据库的订单状态是否已支付，安全可靠。

## 2.1、template
```html
<vk-uni-pay
  ref="vkPay"
  :query-payment-action="vkPay.queryPaymentAction"
  :status.sync="vkPay.status"
  :code-url.sync="vkPay.codeUrl"
  :page-show="vkPay.pageShow"
  :polling="vkPay.polling"
></vk-uni-pay>
```

## 2.2、data
```js
export default {
  data() {
    return {
      vkPay:{
        /**
         * 查询支付状态的云函数配置
         * 如果是非路由框架，则action为字符串，值为云函数名称
         * 如果是路由框架，则按下方配置填写
         */
        queryPaymentAction:{
          name:"vk-pay", // 云函数名称
          action:"pay/queryPayment", // 路由模式下云函数地址
          actionKey:"action", // 路由模式下云函数地址的识别key
          dataKey:"data" // 路由模式下云函数请求参数的识别key
        },
        // PC支付的付款二维码地址
        codeUrl:"",
        // 当前支付状态 0:等待发起支付 1:支付中 2:已支付
        status:0,
        // 当前页面是否显示
        pageShow:true,
        // 启用轮询检测订单支付状态（仅h5支付有效）
        polling:true,
      },
      // 表单请求数据
      form1:{
        provider:"wxpay",
        totalFee:1,
        outTradeNo:"",
        subject:"测试订单标题",
        body:"测试订单详情",
        type: "recharge"
      },
    }
  }
}
```

## 2.3、methods
```js
this.$refs.vkPay.createPayment({
  // 如果是非路由框架，则action为字符串，值为云函数名称
  // 如果是路由框架，则按下方配置填写
  action: {
    name: "vk-pay", // 云函数名称
    action: "pay/createPayment", // 路由模式下云函数地址
    actionKey: "action", // 路由模式下云函数地址的识别key(注意VK路由框架下,此值为$url)
    dataKey: "data" // 路由模式下云函数请求参数的识别key
  },
  // 请求数据
  data: {
    provider: form1.provider,
    total_fee: form1.total_fee,
    out_trade_no: form1.out_trade_no,
    subject: form1.subject,
    body: form1.body,
    type: form1.type
  },
  // 成功回调
  success: res => {
    this.toast("支付成功", "success");
    console.log("paySuccess", res);
  },
  // 失败回调
  fail: res => {
    if (res.failType === "create") {
      // 创建支付失败时提示
      this.alert(res.msg);
    } else if (res.failType === "request") {
      // 请求支付失败时提示
      this.toast("请求支付失败");
    } else if (res.failType === "result") {
      // 支付结果失败时提示
      this.toast("支付失败");
    }
  },
  // 取消回调
  cancel: res => {
    this.toast("用户取消支付");
  }
});
```

