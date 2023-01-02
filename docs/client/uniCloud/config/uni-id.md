# uni-id配置

## 完整配置

**配置文件所在文件位置：`uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`**

**由于`uni-id`配置无法打注释，故下方为`uni-id`配置的介绍（实际使用需要去除所有注释）**

```js
{
  "passwordSecret": "passwordSecret-demo",// 加密密码所用的密钥，修改会导致所用户之前的密码失效。如一定要修改，请查看https://uniapp.dcloud.io/uniCloud/uni-id?id=modifysecret
  "tokenSecret": "tokenSecret-demo",      // 生成token所用的密钥，修改会导致所有用户之前的token失效。
  "tokenExpiresIn": 604800,               // 全平台token过期时间，未指定过期时间的平台会使用此值，604800代表7天
  "tokenExpiresThreshold": 259200,        // checkToken时如果token有效期小于此值则自动获取新token，如果不配置此参数则不开启自动获取新token功能
  "tokenMaxLimit": 10,                    // 每个账户的最大token数量，0为不限，淘汰策略：新的淘汰旧的（注意，即使设置为0，框架也会自动淘汰已过期的token）
  "passwordErrorLimit": 6,                // 密码错误最大重试次数
  "bindTokenToDevice": false,             // 是否将token和设备绑定，设置为true会进行ua校验
  "passwordErrorRetryTime": 3600,         // 密码错误重试次数超限之后的冻结时间
  "autoSetInviteCode": true,              // 是否在用户注册时自动设置邀请码
  "forceInviteCode": false,               // 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）
  "preferedAppPlatform": "app-plus",      // 指定app端对应的PLATFORM名称，用于处理app-plus和app的兼容问题，详细说明见：https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=prefered-app-platform
  "preferedWebPlatform": "h5",            // 指定web端对应的PLATFORM名称，用于处理web和h5兼容性问题
  "app-plus": {
    "tokenExpiresIn": 604800,             // app端 token过期时间
    "oauth" : {
      // App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
      "weixin" : {
        "appid" : "",
        "appsecret" : ""
      }
    }
  },
  "mp-weixin": {
    "oauth" : {
      // 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
      "weixin" : {
        "appid" : "",
        "appsecret" : ""
      }
    }
  },
  "h5-weixin": {
    "oauth": {
      // 微信公众号登录所用的appid、appsecret
      "weixin": {
        "appid": "",
        "appsecret": ""
      }
    }
  },
  "mp-alipay": {
    "oauth" : {
      // 支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr
      "alipay" : {
        "appid" : "",
        "privateKey" : ""
      }
    }
  },
  "service": {
    // unicloud短信
    "sms": {
      "name": "重要",                   // 应用名称，对应短信模版的name
      "codeExpiresIn": 180,            // 验证码过期时间，单位为秒，注意一定要是60的整数倍
      "smsKey": "你的smsKey",          // 短信密钥key，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
      "smsSecret": "你的smsSecret",    // 短信密钥secret，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
      "templateId":"你的短信模板ID"	  // 短信模板ID
    },
    // 一键登录
    "univerify": {
      "appid":"your appid",           // uniapp的appid
      "apiKey": "your apiKey",        // 一键登录的apiKey
      "apiSecret": "your apiSecret"   // 一键登录的apiSecret
    }
  }
}
```

## 自定义token内容

token内默认缓存了用户的角色权限。但是某些情况下开发者可能还希望缓存一些别的东西，以便在客户端能方便的访问（**注意：不可缓存机密信息到token内**）。

**用法**

创建文件：`uniCloud/cloudfunctions/common/uni-config-center/uni-id/custom-token.js` 内容如下：

```js
module.exports = async (tokenObj) => { 
  // tokenObj为原始token信息结构如下
  // {
  //   uid: 'abc', // 用户id
  //   role: [], // 用户角色列表
  //   permission: [] // 用户权限列表，admin角色的用户权限列表为空数组
  // }
  
  tokenObj.customField = 'hello custom token' // 自定义token字段
  return tokenObj // 注意务必返回修改后的token对象
}
```

uni-id会自动加载custom-token.js进行处理，在所有生成token的操作（包括：登录、注册、token过期自动刷新、开发者自行调用createToken）执行时自动获取新token信息，并生成token。

**注意**

- 使用custom-token时自行调用createToken接口会变为异步操作，需使用`await uniID.createToken(...)`
- 千万不要删除原始token内的字段