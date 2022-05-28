# 1、vk-uni-pay统一支付组件

## 1.1、template
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

## 1.2、属性

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| query-payment-action    |   查询支付状态的云函数配置  | Object/String  | -    | - |
| status.sync  | 支付状态 0:待支付 1:支付中 2:已支付  |  Numbner  | -    | -  |
| code-url.sync  |   PC扫码支付专用 - 二维码地址  | String  | -    | -  |
| page-show  |  PC扫码支付专用 - 当前页面是否在前端显示  | Boole  | true | false |
| polling  |  PC扫码支付专用 - 是否自动轮询检测扫码支付状态  | Boole  | false  | true |

## 1.3、方法

#### 通过 this.$refs.vkPay.xxx(); 方式调用
| 方法名   | 说明                    |
|----------|------------------------|
| createPayment     | 发起支付 |
| queryPayment     | 查询支付状态 |

## 1.4、createPayment 示例
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

## 1.5、queryPayment 示例
```js
this.$refs.vkPay.queryPayment({
  title: "查询中...",
  data: {
    out_trade_no: this.form1.out_trade_no
  },
  success: data => {
    this.vkPay.status = 2; // 标记为已支付
    this.toast(data.msg);
  }
});
```
#### toast 和 alert 简易封装
```js
toast(title, icon = "none", mask = false) {
  uni.showToast({
    title,
    icon,
    mask,
    duration: 1500
  });
},
alert(content, title = "提示") {
  uni.showModal({
    title,
    content,
    showCancel: false
  });
}
```


## 1.6、完整示例
```html
<template>
  <view class="app content">
    <!-- #ifdef H5 || APP-PLUS -->
    <view>请选择支付方式（H5和APP可以选择）</view>
    <radio-group @change="radioChange" style="display: flex;margin: 10rpx 0;">
      <label style="flex: 1;">
        <radio value="wxpay" :checked="form1.provider == 'wxpay'" />
        微信
      </label>
      <label style="flex: 1;">
        <radio value="alipay" :checked="form1.provider == 'alipay'" />
        支付宝
      </label>
    </radio-group>
    <!-- #endif -->

    <view style="margin-bottom: 16rpx;">支付金额：(单位分 100 = 1元)</view>
    <input type="text" v-model="form1.total_fee" placeholder="支付金额" />
    <view style="margin-bottom: 16rpx;">订单号</view>
    <input type="text" v-model="form1.out_trade_no" placeholder="订单号" />

    <!-- #ifdef H5 -->
    <button v-if="vkPay.status == 0" type="primary" @click="createPayment">获取支付二维码</button>
    <!-- #endif -->
    <!-- #ifdef H5 || APP-PLUS -->
    <view v-if="vkPay.status < 2 && vkPay.codeUrl" class="qrcode-view">
      <vk-uni-qrcode :text="vkPay.codeUrl" :size="450"></vk-uni-qrcode>
    </view>
    <button v-if="vkPay.status == 1" type="primary" @click="queryPayment">我已完成支付</button>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <button @click="createPayment">支付</button>
    <!-- #endif -->
    <button @click="queryPayment">支付结果查询</button>
    <button @click="refund">申请退款</button>
    <button @click="queryRefund">退款结果查询</button>

    <button @click="transferAlipay">转账到支付宝</button>
    <button @click="transferWxpay">转账到微信零钱</button>

    <vk-uni-pay
      ref="vkPay"
      :query-payment-action="vkPay.queryPaymentAction"
      :status.sync="vkPay.status"
      :code-url.sync="vkPay.codeUrl"
      :page-show="vkPay.pageShow"
      :polling="vkPay.polling"
    ></vk-uni-pay>
  </view>
</template>

<script>
export default {
  data() {
    // 页面数据变量
    return {
      vkPay: {
        /**
         * 查询支付状态的云函数配置
         * 如果是非路由框架，则action为字符串，值为云函数名称
         * 如果是路由框架，则按下方配置填写
         */
        queryPaymentAction: {
          name: "vk-pay", // 云函数名称
          action: "pay/queryPayment", // 路由模式下云函数地址
          actionKey: "action", // 路由模式下云函数地址的识别key
          dataKey: "data" // 路由模式下云函数请求参数的识别key
        },
        // PC支付的付款二维码地址 渲染二维码需要自己写，可以参考示例中的二维码组件 vk-uni-qrcode
        codeUrl: "",
        // 当前支付状态 0:等待发起支付 1:支付中 2:已支付
        status: 0,
        // 当前页面是否显示
        pageShow: true,
        // 启用轮询检测订单支付状态（仅h5支付有效）
        polling: true
      },
      // 表单请求数据
      form1: {
        provider: "wxpay",
        total_fee: 1,
        out_trade_no: "",
        subject: "测试订单标题",
        body: "测试订单详情",
        type: "recharge"
      }
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
   
  },
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {
    this.vkPay.pageShow = true;
  },
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {
    this.vkPay.pageShow = false;
  },
  // 函数
  methods: {
    // 发起支付
    createPayment() {
      let that = this;
      let { form1 } = that;
      // 这里的订单号\金额等数据应该是从数据库里获取的,这里为演示需要,故直接本地生成.
      form1.out_trade_no = "test_" + new Date().getTime();
      // #ifdef MP-WEIXIN
      form1.provider = "wxpay";
      // #endif
      // #ifdef MP-ALIPAY
      form1.provider = "alipay";
      // #endif
      that.$refs.vkPay.createPayment({
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
          that.toast("支付成功", "success");
          console.log("paySuccess", res);
        },
        // 失败回调
        fail: res => {
          if (res.failType === "create") {
            // 创建支付失败时提示
            that.alert(res.msg);
          } else if (res.failType === "request") {
            // 请求支付失败时提示
            that.toast("请求支付失败");
          } else if (res.failType === "result") {
            // 支付结果失败时提示
            that.toast("支付失败");
          }
        },
        // 取消回调
        cancel: res => {
          that.toast("用户取消支付");
        }
      });
    },
    // 支付状态查询
    queryPayment() {
      let that = this;
      // 支付状态查询你可以直接查你的订单表，看订单是否已支付（因为最终判定用户是否支付成功应该以你的订单表为准）
      // 如果vkPay.queryPayment接口返回支付成功，但你的订单表查询到未支付，代表你的异步回调函数写的有问题。
      that.$refs.vkPay.queryPayment({
        title: "查询中...",
        data: {
          out_trade_no: that.form1.out_trade_no
        },
        success: data => {
          that.vkPay.status = 2; // 标记为已支付
          that.toast(data.msg);
        }
      });
    },
    // 退款，此为演示，实际业务开发不应该写在前端，而是写在云函数中。
    refund() {
      let that = this;
      that.callFunction({
        title: "退款中...",
        name: "vk-pay",
        data: {
          action: "pay/refund",
          data: {
            out_trade_no: that.form1.out_trade_no,
            refund_fee: 1
          }
        },
        success: data => {
          that.toast(data.msg);
        }
      });
    },
    // 退款查询
    queryRefund() {
      let that = this;
      that.callFunction({
        title: "查询中...",
        name: "vk-pay",
        data: {
          action: "pay/queryRefund",
          data: {
            out_trade_no: that.form1.out_trade_no
          }
        },
        success: data => {
          that.alert(data.msg);
        }
      });
    },
    // 转账到支付宝，此为演示，实际业务开发不应该写在前端，而是写在云函数中。
    transferAlipay() {
      let that = this;
      that.callFunction({
        title: "请求中...",
        name: "vk-pay",
        data: {
          action: "pay/transfer",
          data: {
            real_name: "真实姓名",
            account: "对方支付宝账号",
            pay_type: "alipay"
          }
        },
        success: data => {
          that.alert(data.msg);
        }
      });
    },
    // 转账到微信零钱，此为演示，实际业务开发不应该写在前端，而是写在云函数中。
    transferWxpay() {
      let that = this;
      that.callFunction({
        title: "请求中...",
        name: "vk-pay",
        data: {
          action: "pay/transfer",
          data: {
            real_name: "真实姓名",
            openid: "oaQxQ5SYLXdTeGMeuBYjUqaguDBY",
            pay_type: "wxpay",
            platform: "mp-weixin"
          }
        },
        success: data => {
          that.alert(data.msg);
        }
      });
    },
    // 云函数调用简易封装，你可以用你原本框架的云函数请求封装方法来调用云函数。
    callFunction(obj) {
      let that = this;
      let { needAlert = true } = obj;
      if (obj.title) uni.showLoading({ title: obj.title });
      uniCloud.callFunction({
        ...obj,
        success: (result = {}) => {
          if (obj.title) uni.hideLoading();
          let res = result.result;
          if (res.code === 0) {
            if (typeof obj.success == "function") obj.success(res);
          } else {
            if (needAlert && res.msg) that.alert(res.msg);
            if (typeof obj.fail == "function") obj.fail(res);
          }
        },
        fail: (res = {}) => {
          if (obj.title) uni.hideLoading();
          if (needAlert && res.msg) that.alert(res.msg);
          if (typeof obj.fail == "function") obj.fail(res);
        }
      });
    },
    radioChange(e) {
      this.form1.provider = e.detail.value;
    },
    toast(title, icon = "none", mask = false) {
      uni.showToast({
        title,
        icon,
        mask,
        duration: 1500
      });
    },
    alert(content, title = "提示") {
      uni.showModal({
        title,
        content,
        showCancel: false
      });
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style lang="scss" scoped>
.content {
  padding: 15px;
}
.content input {
  height: 46px;
  border: solid 1px #dddddd;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 0px 15px;
}
.content button {
  margin-bottom: 15px;
}
.content navigator {
  display: inline-block;
  color: #007aff;
  border-bottom: solid 1px #007aff;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 15px;
}
.tips {
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: #999999;
  margin-bottom: 20px;
}
.qrcode-view {
  text-align: center;
  .qrcode-img {
    width: 400rpx;
  }
}
</style>

```
