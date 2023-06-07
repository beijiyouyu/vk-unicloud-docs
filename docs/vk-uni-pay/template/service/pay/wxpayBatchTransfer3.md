# service/pay/wxpayBatchTransfer3.js

```js
'use strict';
const vkPay = require("vk-uni-pay");
module.exports = {
	/**
	 * 转账微信零钱 v3 版本（批量转账）最多一次性3000笔
	 * @url pay/wxpayTransfer3 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} out_biz_no 转账单号
	 * @param {String} batch_name 本次批量转账的名称
	 * @param {String} batch_remark 本次批量转账的备注
	 * @param {Number} total_amount 本次批量转账共转金额 单位为分 100 = 1元
	 * @param {Number} total_num 本次批量转账共几笔
	 * @param {Array} transfer_detail_list 本次批量转账详情
	 * @param {String} pay_type 固定wxpay
	 * @param {Number} version 固定3，代表使用v3版本
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, originalParam } = event;
		let res = { code: 0, msg: '' };
		// 转账开始-----------------------------------------------------------
		// 支持做多3000笔批量转账
		let out_biz_no = "test" + Date.now();
		let transfer_detail_list = [{
				out_detail_no: out_biz_no + "1", // 该用户的转账子单号
				transfer_amount: 50, // 该用户的转账金额 单位为分 100 = 1元
				transfer_remark: "关羽的报销单", // 该用户的转账备注
				openid: "xxxxxxxx", // 该用户的openid
				//user_name: "关羽",
			},
			{
				out_detail_no: out_biz_no + "2",  // 该用户的转账子单号
				transfer_amount: 50, // 该用户的转账金额 单位为分 100 = 1元
				transfer_remark: "张飞的报销单", // 该用户的转账备注
				openid: "xxxxxxxx", // 该用户的openid
				//user_name: "张飞",
			}
		]
		res = await vkPay.transfer({
			out_biz_no, // 转账单号（请自己控制全局唯一）
			batch_name: "2022年8月员工报销单", // 本次批量转账的名称
			batch_remark: "2022年8月员工报销单", // 本次批量转账的备注
			total_amount: 100, // 本次批量转账共转金额 单位为分 100 = 1元
			total_num: transfer_detail_list.length, // 本次批量转账共几笔
			transfer_detail_list, // 本次批量转账详情
			pay_type: "wxpay", // 固定 wxpay
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