# 2、接收付款成功异步通知

在你发起支付的api中，有个 `type` 属性，这个 `type` 属性的值你填了什么，最终回调的时候就会执行什么。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/9b5b186c-f37b-4b0d-bd28-3be9feb3a659.png)

如 `type` 填了 `goods`，则回调的时候会执行这里的 `goods.js` 内的代码。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/92da4249-8250-4a79-960d-611cefadc6d8.png)

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

**特别注意**

回调处理大致有三种方式

## 方式一：直接写数据库操作

优势：无需鉴权，无需加密解密（插件已帮你验证签名，能进到这里，就是已经通过签名验证）

代码示例

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
		user_id,
		recharge_balance
	} = data;
	// 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
	// 方式一：直接写数据库操作（原生数据库语句）
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

## 方式二：调用其他云函数

使用 await uniCloud.callFunction 调用其他云函数

优势：可以访问其他云函数，适用于回调函数的主要逻辑在另外一个云函数中执行，如router

代码示例

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
	// 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
	// 设置订单为已付款
	// 方式二：使用 await uniCloud.callFunction 调用其他云函数
  
  // 加密
	let encryptedData = vkPay.crypto.aes.encrypt({
		data: data
	});
  // 调用其他云函数（在该云函数中需要解密，加密方式见文档最后）
	let callFunctionRes = await uniCloud.callFunction({
		name: "router",
		data: {
			$url: "template/test/pub/http",
			data: encryptedData
		}
	});
  // 云函数执行成功后需要返回{ code: 0 }
	if (callFunctionRes.result.code === 0) {
		user_order_success = true; // 表示你后端执行成功了
	} else {
		user_order_success = false; // 表示你后端执行失败了
	}
	// 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
	// user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
	return user_order_success;
};
```

## 方式三：调用http接口地址（对接外部系统）

使用 await uniCloud.httpclient.request 调用http接口地址（对接外部系统）

优势：可以访问java或php写的后端接口，适用于回调函数的主要逻辑在另外一个系统中执行。

代码示例

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
	// 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
	// 设置订单为已付款
	// 方式三：使用 await uniCloud.httpclient.request 调用http接口地址
	let res = await uniCloud.httpclient.request("https://xxxx.com/xxx", {
		method: "POST",
		data: {
			...data,
			key: "与你后端约定的口令", // 你后端接受key参数，判断key等于约定的口令，则视为正常推送订单，否则，拦截
		},
		contentType: "json",
		dataType: "json"
	});
	// 后端执行成功后需要返回{ code: 0 }
	if (res && res.data && res.data.code === 0) {
		user_order_success = true; // 表示你后端执行成功了
	} else {
		user_order_success = false; // 表示你后端执行失败了
	}
	// 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
	// user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
	return user_order_success;
};
```

**注意：**

非方式一会因为跨云函数运行，所以涉及到请求过程中的数据防篡改问题。

这里插件提供了 aes 加密API（需要配置 `uni-config-center/uni-pay/config.js` 内的 `notifyKey`

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

如果是java和php，需要自己实现类似 `vkPay.crypto.aes.decrypt` 解密功能。[node.js加密解密源码](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/crypto.html#_4%E3%80%81aes%E5%8A%A0%E8%A7%A3%E5%AF%86)

或者可以传密钥key，你的后端接受key参数，判断key等于约定的口令，则视为正常推送订单，否则，拦截（因为是服务端与服务器端的交互，理论上只要key不暴露给前端，则是安全的，当然安全系数会比通过加密和解密方式稍低点，但也是安全的）

**当然加密方式不仅限此方案，如果你有自己的加密方案，则可以使用自己的方案来解决。**