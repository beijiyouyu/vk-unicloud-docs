# vk-pay-orders

#### 统一支付订单表

___该表为插件支付专用表，正常你自己业务的订单还应有一张表，如 `opendb-mall-orders`，它们之间通过商户订单号 `out_trade_no` 来关联___

### 字段

| 字段名称   | 字段类型       | 必填    | 默认值  | 说明 |
|------- |-----------|---------|-------|-------|
| _id    |  string   | 是  |   |  |
| pay_type [查看](#pay-type)   |  string   | 是  |   |  |
| status    |  number   | 是  | 0  | 0：未支付 1：已支付 2：已部分退款 3：已全额退款 |
| type    |  string   | 是  |   | 订单类型 goods：订单付款 recharge：余额充值付款 vip：vip充值付款 等等，可自定义 |
| out_trade_no    |  string   | 是  |   | 商户订单号(唯一) |
| transaction_id    |  string   |   |   | 支付平台订单号 |
| openid    |  string   |   |   | 用户openid |
| total_fee    |  money   |   |   | 订单总金额，单位为分，100等于1元 |
| refund_fee    |  money   |   |   | 订单总退款金额，单位为分，100等于1元 |
| refund_num    |  number   |   |   | 当前退款笔数 |
| refund_list    |  array   |   |   | 退款详情 |
| appid    |  string   |   |   | 公众号id,小程序id,app开放平台id |
| original_data    |  object   |   |   | 原始数据,微信是xml,支付宝是json |
| wxpay_info    |  object   |   |   | 微信支付特有数据 |
| alipay_info    |  object   |   |   | 支付宝支付特有数据 |
| user_order_success    |  boolean   |   |   | 用户自己的回调逻辑是否执行成功 |
| notify_time    |  time   |   |   | 订单通知支付成功时间|
| custom    |  object   |   |   | 自定义数据|
| pid    |  string   |   |   | 商户id，若此参数有值，则会从数据库中获取支付配置进行支付|

### pay_type

| 值   | 说明       | 
|------- |-----------|
| wxpay_mp-weixin     |  微信 - 小程序   |
| wxpay_app-plus    |  微信 - APP   |
| wxpay_h5     |   微信 - 网站二维码   |
| wxpay_h5-weixin     |   微信 - 公众号   |
| wxpay_mweb    |   微信 - 手机外部浏览器H5   |
| alipay_mp-alipay    |  支付宝 - 小程序   |
| alipay_app-plus    |  支付宝 - APP   |
| alipay_h5     |  支付宝 - H5    |
