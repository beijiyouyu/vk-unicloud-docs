# vk-pay-orders

#### 统一支付订单表

___该表为插件支付专用表，正常你自己业务的订单还应有一张表，如 `opendb-mall-orders`，它们之间通过商户订单号 `out_trade_no` 来关联___

### 字段

| 字段名称   | 字段类型       | 必填    | 默认值  | 说明 |
|------- |-----------|---------|-------|-------|
| _id    |  string   | 是  |   |  |
| pay_type [查看](#pay-type)   |  string   | 是  |   |  |
| platform    |  string   |   |   | uni老版本平台 h5、mp-weixin、mp-alipau、app-plus等 |
| uni_platform    |  string   |   |   | uni新版本平台 web、mp-weixin、mp-alipay、app等 |
| status    |  number   | 是  | 0  | -1：已关闭 0：未支付 1：已支付 2：已部分退款 3：已全额退款 |
| type    |  string   | 是  |   | 订单类型 goods：订单付款 recharge：余额充值付款 vip：vip充值付款 等等，可自定义 |
| out_trade_no    |  string   | 是  |   | 商户订单号（需控制唯一） |
| transaction_id    |  string   |   |   | 交易单号 (支付平台订单号，由支付平台控制唯一) |
| user_id    |  string   |   |   | 用户user_id |
| nickname    |  string   |   |   | 用户昵称（冗余） |
| device_id    |  string   |   |   | 客户端设备ID |
| client_ip    |  string   |   |   | 客户端ip |
| openid    |  string   |   |   | 用户openid |
| description    |  string   |   |   | 支付描述，如：xxxx手机1台 |
| total_fee    |  money   |   |   | 订单总金额，单位为分，100等于1元 |
| refund_fee    |  money   |   |   | 订单总退款金额，单位为分，100等于1元 |
| refund_num    |  number   |   |   | 当前退款笔数 |
| refund_list    |  array   |   |   | 退款详情 |
| provider_appid    |  string   |   |   | 公众号appid，小程序appid，app开放平台appid 等 |
| appid    |  string   |   |   | dcloud_appid |
| user_order_success    |  boolean   |   |   | 用户自己的回调逻辑是否执行成功 |
| custom    |  object   |   |   | 自定义数据|
| original_data    |  object   |   |   | 原始数据,微信是v2是xml，v3是json，支付宝是json |
| wxpay_info    |  object   |   |   | 微信支付特有数据 |
| alipay_info    |  object   |   |   | 支付宝支付特有数据 |
| create_date    |  timestamp   |   |   | 创建时间|
| pay_date    |  timestamp   |   |   | 支付时间|
| notify_date    |  timestamp   |   |   | 订单通知支付成功时间|
| cancel_date    |  timestamp   |   |   | 订单主动关闭时间|
| stat_data    |  timestamp   |   |   | 用于支付统计的相关数据|
| pid    |  string   |   |   | 商户id，若此参数有值，则会从数据库中获取支付配置进行支付|
| app_auth_token    |  string   |   |   | 支付宝服务商模式-对应子商户的token|
| auth_appid    |  string   |   |   | 支付宝服务商模式-对应子商户的appid，如果不是服务商模式，则auth_appid = appid|
| seller_id    |  string   |   |   | 支付宝服务商模式-对应的卖家id|

### pay_type

支付方式  如  wxpay_mp-weixin _ 左边是支付供应商（wxpay） _ 右边是支付类型（mp-weixin）

|         值          |     说明       | 
|-------------------- |---------------|
| wxpay_mp-weixin     |  微信 - 小程序 |
| wxpay_app-plus      |  微信 - APP   |
| wxpay_h5            |   微信 - 网站二维码 |
| wxpay_h5-weixin     |   微信 - 公众号   |
| wxpay_mweb          |   微信 - 手机外部浏览器H5 |
| alipay_mp-alipay    |  支付宝 - 小程序 |
| alipay_app-plus     |  支付宝 - APP   |
| alipay_h5           |  支付宝 - H5    |

### refund_list


| 字段名称         | 字段类型    |    说明     |
|---------------- |------------|-------------|
| refund_date     |  timestamp | 退款时间 |
| refund_fee      |  money     | 退款金额，单位为分，100等于1元 |
| out_refund_no   |  String    | 退款单号 |
| refund_desc     |  String    | 退款理由 |