# 7、微信商家转账到零钱V3接口

### 接口名：`transfer`

#### 无框架下的云函数代码示例（该写法同时也适用于任何框架）

## 7.1、单笔模式
```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  //real_name: "真实姓名", // 真实姓名 大于2000元的转账需要填写真实姓名
  amount: 1, // 100=1元(单位分)
  title: "转账",
  pay_type: "wxpay",
  openid: "oJEy94iPPehudfKiHmdmaJqNOVD8",
  remark: "转账备注",
  out_biz_no: "test" + new Date().getTime(), // 转账单号（请自己控制全局唯一）
  version: 3, // 固定3，代表使用v3版本
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```


#### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| appid  |  手动传appid，不填则自动从配置中获取   | String  | -    | -  |
| real_name  |  对方真实姓名（转账大于2000元时必填）   | String  | -    | -  |
| amount  |  转账金额 100=1元(单位分)，金额最低0.1元，也就是 amount >= 10  | Number  | -    | -  |
| title  |  转账标题   | String  | -    | -  |
| pay_type  |  固定 wxpay  | String  | -  | wxpay  |
| remark  |  转账备注  | String  | -    | -  |
| out_biz_no  |  转账单号  | String  | -    | -  |
| openid  |  微信专用 - 用户的openid   | String  | -    | -  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |


## 7.2、批量模式
```js
const vkPay = require("vk-uni-pay");
let out_biz_no = "test" + new Date().getTime();
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
let transferRes = await vkPay.transfer({
  out_biz_no, // 转账单号（请自己控制全局唯一）
  batch_name: "2022年8月员工报销单", // 本次批量转账的名称
  batch_remark: "2022年8月员工报销单", // 本次批量转账的备注
  total_amount: 100, // 本次批量转账共转金额 单位为分 100 = 1元
  total_num: transfer_detail_list.length, // 本次批量转账共几笔
  transfer_detail_list, // 本次批量转账详情
  pay_type: "wxpay", // 固定 wxpay
  version: 3, // 固定3，代表使用v3版本
});

if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```


#### 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| appid  |  手动传appid，不填则自动从配置中获取   | String  | -    | -  |
| out_biz_no  |  转账单号   | String  | -    | -  |
| batch_name  |  本次批量转账的名称  | String  | -    | -  |
| batch_remark  |  本次批量转账的备注   | String  | -    | -  |
| total_amount  |  本次批量转账共转金额 单位为分 100 = 1元     | Number  | -    | -  |
| total_num  |  本次批量转账共几笔  | Number  | -    | -  |
| transfer_detail_list  |  本次批量转账详情  | Array  | -    | -  |
| pay_type  |  固定wxpay  | String  | -    | -  |
| version  |  固定3，代表使用v3版本  | Number  | -    | -  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |


#### 注意：
* 新注册的微信商户号，转账接口的申请需要入驻满90天，且连续正常交易30天（刷单不算）


#### 特别注意

微信转账接口配置

```js
{
  "wxpay":{
    ...其他配置
    // 微信 - 转账到零钱 v3版本
    "transfer": {
      "appId": "",
      "mchId": "",
      "apiV3key": "", // api v3密钥
      "appCertSn":"", // 商家应用证书的序列号
      "privateKey":"", // 商家私钥
      "wxpayPublicCertSn":"", // 微信支付公钥证书的序列号
      "wxpayPublicCertContent": "", // 微信支付公钥内容
    },
  }
}
```

#### 参数的获取方式

* 1、appId 微信appId：去微信后台查看。

* 2、mchId 微信支付商户id：去微信支付后台查看。

* 3、apiV3key api v3的密钥：去微信支付后台查看。

* 4、appCertSn 商家应用证书的序列号：可以直接在微信支付后台查看到证书的序列号

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/c87b06a2-64f2-4c6e-9bfd-2ceba8e3cd0d.png)

* 5、privateKey 商家私钥：从 `apiclient_key.pem` 这个证书的内容复制过来即可。需保持一行。（下方有小技巧）

* 6、wxpayPublicCertSn 微信支付公钥证书的序列号

**方式一（推荐）**

先把1-5的参数先填完，然后运行 `vk-uni-pay` 示例项目，将项目根目录 `使用帮助/7、vk-pay云函数示例代码/service/pay/getWxpayPublicCert.js` 文件复制到 `uniCloud/cloudfunctions/vk-pay/service/pay/` 目录中，然后启动项目，点击【获取微信支付v3平台证书】按钮，在浏览器控制台可看到证书信息。

**方式二（需安装Jdk1.8）**

下载[dependencies.jar](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3fbab731-e993-47e6-882f-a74e444709a3/3af5267f-2b69-474d-88ef-9741ba766403.jar)

将下载的 `dependencies.jar` 文件放在和微信支付证书所在目录，然后执行以下代码即可获取到序列号（必要安装软件：Jdk1.8以上，需要执行jar文件）

[Jdk1.8安装教程-传送门](https://blog.csdn.net/qq_42393720/article/details/125070939)

安装完Jdk且配置环境变量完成后，进入 `cmd` 命令，进入微信支付证书所在目录，运行下方java命令（注意将命令内的v3的密钥等替换成你自己的）

```
java -jar certificatedownloader-1.2.0-jar-with-dependencies.jar  -k v3的密钥 -m 商户号 -f apiclient_key.pem -s 证书序列号 -o ./

```

完整java命令如下：

```
java -jar certificatedownloader-1.2.0-jar-with-dependencies.jar  -k 92fc67db1ff923456d356f5a32087490 -m 1015875945 -f apiclient_key.pem -s 13232141BC5115C3FE6BAD2D857422346CECA44E -o ./

```

执行后，可以在当前目录看到 wechatpay_1C9FA130*****5EDE16ABBF8D5808 文件，  

1C9FA130*****5EDE16ABBF8D5808 就是 `wxpayPublicCertSn`

* 7、wxpayPublicCertContent 微信支付公钥内容

而这个文件的内容就是 `wxpayPublicCertContent` 参数的值（需保持一行）（下方有小技巧）

**秘钥文件内容转换为一行小技巧，高手可忽略**

1. 打开谷歌浏览器，打开任意页面，再按F12
2. 找到Console选项卡，这里可以执行简单的js
3. `-----BEGIN PRIVATE KEY....不管换行不换行，都是字符串` 一定要用这个引号框住apiclient_key.pem内的内容，按一下回车，自动把换行转化为\n
