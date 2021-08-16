# 发起支付

## 使用 `vk-uni-pay` 的优势

* 1、自动请求云函数

* 2、自动识别H5、小程序、APP，抹平不同平台的代码差异

* 3、H5扫码支付自动获取二维码地址vkPay.codeUrl，支持自动轮询获取支付状态

* 4、可实时监听支付状态vkPay.status 0：待支付 1：支付中 2：已支付

* 5、支付成功的判断是直接查你数据库的订单状态是否已支付，安全可靠。

## template
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

## data
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
          name:"router", // 云函数名称
          action:"client/pay/pub/queryPayment", // 路由模式下云函数地址
          actionKey:"$url", // 路由模式下云函数地址的识别key
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

## methods
```js
this.$refs.vkPay.createPayment({
  // 如果是非路由框架，则action为字符串，值为云函数名称
  // 如果是路由框架，则按下方配置填写
  action: {
    name: "router", // 云函数名称
    action: "client/pay/pub/createPayment", // 路由模式下云函数地址
    actionKey: "$url", // 路由模式下云函数地址的识别key(注意VK路由框架下,此值为$url)
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

## client/pay/pub/createPayment 示例
```js
'use strict';
module.exports = {
  /**
   * 统一支付
   * @url client/pay/pub/createPayment 前端调用的url参数地址
   * @param {String} provider    供应商:wxpay、alipay
   * @param {String} openid      用户openid，小程序支付时必传
   * @param {String} out_trade_no  商户支付订单号
   * @param {Number} total_fee    订单金额(单位分 100 = 1元)
   * @param {String} subject     订单标题
   * @param {String} type        必填，如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} outTradeNo 商户支付订单号
   * @param {String} orderInfo  支付订单信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 创建支付开始-----------------------------------------------------------
    res = await vk.vkPay.createPayment({
      context: originalParam.context,
      provider: data.provider,
      data: {
        openid: data.openid,
        out_trade_no: data.out_trade_no,
        total_fee: data.total_fee, // 订单金额(单位分 100 = 1元)
        subject: data.subject,
        type: data.type // 订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。"
      }
    });
    // 创建支付结束-----------------------------------------------------------
    return res;
  }
}
```


## client/pay/pub/queryPayment 示例
```js
'use strict';
module.exports = {
  /**
   * 支付结果查询
   * @url client/pay/pub/queryPayment 前端调用的url参数地址
   * @description 根据商户订单号或者平台订单号查询订单信息，主要用于未接收到支付通知时可以使用此接口进行支付结果验证
   * data 请求参数 说明
   * @param {String} out_trade_no 商户订单号 和 transaction_id 二选一
   * @param {String} transaction_id 平台订单号 和 out_trade_no 二选一
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util, originalParam } = event;
    let { uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 支付状态查询开始-----------------------------------------------------------
    res = await vk.vkPay.queryPayment({
      out_trade_no: data.out_trade_no
    });
    // 支付状态查询结束-----------------------------------------------------------
    return res;
  }
}
```
