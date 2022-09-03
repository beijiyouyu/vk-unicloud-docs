# 2、接收付款成功异步通知

### 在云函数 `vk-pay` 的 `service/pay-notify` 目录创建以下3个文件，用于编写异步回调后自己的业务逻辑
```js
1、goods.js
2、recharge.js
3、vip.js
```
#### goods : [商品订单](#goods)

#### recharge : [余额充值订单](#recharge)

#### vip : [vip购买订单](#vip)

#### goods
#### goods.js 模板示例
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
    total_fee
  } = data;
  // 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
  // 设置订单为已付款
  // 有三种方式
  // 方式一：直接写数据库操作（原生数据库语句）
  // 方式二：使用 await uniCloud.callFunction 调用其他云函数
  // 方式三：使用 await uniCloud.httpclient.request 调用http接口地址

  // 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
  // user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
  return user_order_success;
};
```

#### recharge
#### recharge.js模板示例
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
    total_fee,
    user_id,
    recharge_balance
  } = data;
  // 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
  // 给用户充值余额
  // 有三种方式
  // 方式一：直接写数据库操作（原生数据库语句）
  // 方式二：使用 await uniCloud.callFunction 调用其他云函数
  // 方式三：使用 await uniCloud.httpclient.request 调用http接口地址

  // 示例：给用户充值余额(可以去数据库查看余额是否有增加)
  let res = await db.collection("uni-id-users").doc(user_id).update({
    balance: _.inc(recharge_balance)
  });
  if (res.updated) {
    user_order_success = true;
  } else {
    user_order_success = false;
  }
  // 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
  // user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
  return user_order_success;
};
```

#### vip
#### vip.js模板示例
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
    total_fee
  } = data;
  // 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
  // 充值VIP付款成功
  // 有三种方式
  // 方式一：直接写数据库操作（原生数据库语句）
  // 方式二：使用 await uniCloud.callFunction 调用其他云函数
  // 方式三：使用 await uniCloud.httpclient.request 调用http接口地址

  // 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
  // user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
  return user_order_success;
};
```

#### 特别注意

回调处理大致有三种方式

##### 方式一：直接写数据库操作（原生数据库语句）

优势：无需鉴权（插件已帮你验证签名，能进到这里，就是已经通过签名验证）

##### 方式二：使用 await uniCloud.callFunction 调用其他云函数

优势：可以访问其他云函数，适用于回调函数的主要逻辑在另外一个云函数中执行，如router

##### 方式三：使用 await uniCloud.httpclient.request 调用http接口地址

优势：可以访问java或php写的后端接口，适用于回调函数的主要逻辑在另外一个系统中执行。

##### 注意：

其中，方式二和方式三因为跨云函数或跨服务端运行，所以涉及到请求过程中的数据防篡改问题。

这里插件提供了 aes 加密API

```js
// 对数据进行加密
let encryptedData = vkPay.crypto.aes.encrypt({
  data: {
    out_trade_no, // 订单号
    recharge_balance, // 充值余额的数量
    user_id, // 用户id
  }
});
```

```js
// 对数据进行解密
let decryptedRes = vkPay.crypto.aes.decrypt({
  data: encryptedData, // 待解密的原文
});
let {
  out_trade_no, // 订单号
  recharge_balance, // 充值余额的数量
  user_id, // 用户id
} = decryptedRes;
```

**注意**
如果是java和php，需要自己实现类似 `vkPay.crypto.aes.decrypt` 解密功能。[node.js加密源码](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/crypto.html#_4%E3%80%81aes%E5%8A%A0%E8%A7%A3%E5%AF%86)