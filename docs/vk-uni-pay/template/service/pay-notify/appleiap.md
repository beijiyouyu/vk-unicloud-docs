# service/pay-notify/goods.js

[传送门 - 异步回调说明](https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/pay-notify.html)

```js
'use strict';
/**
 * 此处建议只改下订单状态，保证能及时返回给第三方支付服务器成功状态
 * 且where条件可以增加判断服务器推送过来的金额和订单表中订单需支付金额是否一致
 * 将消息发送、返佣、业绩结算等业务逻辑异步处理(写入异步任务队列表)
 * 如开启定时器每隔5秒触发一次，处理订单
 */
module.exports = async (obj, originalParam) => {
  let user_order_success = true;
  let { data = {}, verifyResult } = obj;
  let { db, _ } = originalParam;
  let {
    out_trade_no,
    transaction_id,
    total_fee,
  } = data;

  console.log("type: appleiap");
  // 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
  // 设置订单为已付款
  // 有三种方式
  // 方式一：直接写数据库操作（原生数据库语句）
  // 方式二：使用 await uniCloud.callFunction 调用其他云函数
  // 方式三：使用 await uniCloud.httpclient.request 调用http接口地址

  // 注意：如果使用方式二和方式三时，为了安全起见，请带上请求密钥（密钥自己传一个固定的32位字符串即可），然后在你请求的接口中判断密钥是否一致，可以有效的防止伪造请求。（因为密钥只有你自己知道）

  // 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
  // user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
  return user_order_success;
};
```