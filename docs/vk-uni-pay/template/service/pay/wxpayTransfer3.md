# service/pay/wxpayTransfer3.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
	/**
	 * 转账微信零钱 v3 版本（单笔转账）
	 * @url pay/wxpayTransfer3 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} real_name 真实姓名 大于2000元的转账需要填写真实姓名
	 * @param {Number} amount 金额 100=1元(单位分)
	 * @param {String} title 转账标题
	 * @param {String} openid 微信专用 - 用户的openid
	 * @param {String} remark 转账备注
	 * @param {String} out_biz_no 转账单号
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code: 0, msg: '' };
		// 转账开始-----------------------------------------------------------
		res = await vkPay.transfer({
			//real_name: "真实姓名", // 真实姓名 大于2000元的转账需要填写真实姓名
			amount: 1, // 100=1元(单位分)
			title: "转账",
			pay_type: "wxpay",
			openid: "oJEy94iPPehudfKiHmdmaJqNOVD8",
			remark: "转账备注",
			out_biz_no: "test" + Date.now(), // 转账单号（请自己控制全局唯一）
			version: 3, // 固定3，代表使用v3版本
		});
		/**
		 * 成功后的返回数据格式
			{
				"code": 0,
				"msg": "转账申请已提交，请等待商家审核！",
				"result": {
					"batch_id": "1030001038501010245152022081100990045791",
					"create_time": "2022-08-11T16:41:29+08:00",
					"out_batch_no": "test1660207283242"
				}
			}
		 */
		if (res.code == 0) {
			res.msg = "转账申请已提交，请等待商家审核！";
		}
		// 转账结束-----------------------------------------------------------
		return res;
	}
}
```