# 4、发送邮箱验证码
 
## 4.1、配置QQ邮箱教程
* 1、登录QQ邮箱
* 2、`邮箱首页` | `设置` - `换肤` 的设置
* 3、点击`常规` `帐户` `换肤` 中的 `帐户`
* 4、POP3/SMTP服务 点击开启
* 5、复制授权码
* 6、粘贴到`common`目录的`config`模块下的
```js
"vk":{
  "service": {
    "email": {
      "qq": {
        "host": "smtp.qq.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "你的邮箱@qq.com",
          "pass": "邮箱授权码"
        }
      }
    }
  }
}
```

## 4.2、配置163邮箱教程
* 1、登录163邮箱
* 2、`邮箱首页` | `设置` - `POP3/SMTP服务` - 开启 `POP3/SMTP服务`
* 3、复制授权码
* 4、粘贴到`common`目录的`config`模块下的
```js
"vk":{
  "service": {
    "email": {
      "163": {
        "host": "smtp.163.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "你的邮箱@163.com",
          "pass": "邮箱授权码"
        }
      }
    }
  }
}
```

## 4.3、发送邮箱验证码示例代码（router内版本）
```js
var nodemailer;
try {
  nodemailer = require('nodemailer');	
} catch (err) {
  // 由于 nodemailer 包比较大，不建议在router函数内安装，可以新建一个云函数专门用来发邮箱
  console.error("请先安装npm包：nodemailer，安装方法：根目录执行npm i nodemailer");
}
module.exports = {
  /**
   * 发送邮箱验证码
   * @url user/pub/sendEmailCode 前端调用的url参数地址
   * @description 发送邮箱验证码
   * data 请求参数 说明
   * @params {String} email 邮箱
   * @params {String} type  验证码类型
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   * @params {String} email 手机号  
   * @params {String} verifyCode 验证码
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { uniID, config } = util;
    let { email, type } = data;
    let res = {code : -1, msg : ''};
    // 业务逻辑开始----------------------------------------------------------- 
    const randomStr = '00000' + Math.floor(Math.random() * 1000000);
    let code = randomStr.substring(randomStr.length - 6);
    let param = {
      code,
      type,
      email
    };
    // 发送验证码开始
    let emailConfig = config.vk.service.email;
    if(typeof nodemailer === "undefined"){
      return { code : -1, msg : '请先安装npm包"nodemailer": "^6.4.11"' };
    }
    let emailService = nodemailer.createTransport({
      "host": emailConfig[data.serviceType].host,
      "port": emailConfig[data.serviceType].port,
      "secure": emailConfig[data.serviceType].secure, // use SSL
      "auth": emailConfig[data.serviceType].auth
    });
    try{
      await emailService.sendMail({
        "from": emailConfig[data.serviceType].auth.user,
        "to": data.email,
        "cc": emailConfig[data.serviceType].auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
        "subject": data.subject,
        "text": `您的验证码是${code},打死也不要告诉别人哦!`
      });
      res.code = 0;
      res.msg = "ok";
    }
    catch(err){
      res.code = -1;
      res.msg = "邮件发送失败";
      res.err = err;
    }
    // 发送验证码结束
    if(res.code === 0){
      // 发送验证码成功后,设置验证码
      await uniID.setVerifyCode(param);
    }
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}

```

## 4.4、发送邮箱验证码示例代码（非router版本）
```js
'use strict';
// 通过 require 引入 vk 实例
const vk = require('vk-unicloud');
// 通过 vk.init 初始化 vk实例（只有初始化后才能使用）
vk.init({
	baseDir: __dirname,
	requireFn: require
});

var nodemailer;
try {
	nodemailer = require('nodemailer');
} catch (err) {
	console.error("请先安装npm包：nodemailer");
}

exports.main = async (event, context) => {
	let res = { code: 0, msg: "" };
	let { config = {} } = vk.getUnicloud();

	let emailConfig = config.vk.service.email;
  
	let serviceType = "qq";
	let email = "发送给谁，他的邮箱";
	let subject = "标题";
  let text = `验证码 123456`;


	let emailService = nodemailer.createTransport({
		"host": emailConfig[serviceType].host,
		"port": emailConfig[serviceType].port,
		"secure": emailConfig[serviceType].secure, // use SSL
		"auth": emailConfig[serviceType].auth
	});

	try {
		res.sendMailRes = await emailService.sendMail({
			"from": emailConfig[serviceType].auth.user,
			"to": email,
      "cc": emailConfig[serviceType].auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
			"subject": subject,
			"text": text
		});
		res.code = 0;
		res.msg = "ok";
	} catch (err) {
		res.code = -1;
		res.msg = "邮件发送失败";
		res.err = err;
	}

	return res;
};

```