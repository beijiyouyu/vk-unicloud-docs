# 说明

#### 复制 `使用帮助/vk-pay云函数示例代码/service/` 目录内的所有文件粘贴到`vk-uni-pay/uniCloud/cloudfunctions/vk-pay/service/`目录(没有目录则新建)
#### 注意：测试完记得删除`vk-uni-pay/uniCloud/cloudfunctions/vk-pay/service/pay/`目录下的这两个文件（`refund.js`和`transfer.js`）（因为涉及资金退款和转账）

#### `pay` 目录中的`code2SessionAlipay.js`和`code2SessionWeixin.js`请勿删除
#### `pay-notify` 目录为支付异步回调时执行的逻辑，需要你自己对接你的系统。