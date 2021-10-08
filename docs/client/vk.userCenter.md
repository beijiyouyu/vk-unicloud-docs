# vk.userCenter 用户中心 API

## 公共返回信息

| 参数   | 说明       | 类型    | 
|------- |-----------|---------|
| code    |  错误码    | Number  |
| msg  |   错误提示    | String  |

## 通用

### vk.userCenter.register（注册）

用户名+密码

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 用户注册(用户名+密码)
 * data 请求参数 说明
 * @param {String} username 用户名
 * @param {String} password 密码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 * @param {Object} userInfo 用户信息
 * @param {String} uid 用户ID
 */
vk.userCenter.register({
  data:{
    username:"",
    password:""
  },
  success:function(data){
    // 注册成功后的逻辑
    
  }
});
```

### vk.userCenter.register（登录）

用户名+密码

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 用户登陆(用户名+密码)
 * data 请求参数 说明
 * @param {String} username 用户名
 * @param {String} password 密码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 * @param {Object} userInfo 用户信息
 * @param {String} uid 用户ID
 */
vk.userCenter.login({
  data:{
    username:"",
    password:""
  },
  success:function(data){
    // 登录成功后的逻辑
    
  }
});
```

### vk.userCenter.updatePwd（修改密码）

```js
/**
 * 修改密码
 * @description 修改成功后，需要重新登录获取新的token
 * data 请求参数 说明
 * @param {String} oldPassword 旧密码
 * @param {String} newPassword 新密码
 */
vk.userCenter.updatePwd({
  data:{
    oldPassword: "123456",
    newPassword: "654321",
    password_confirmation: "654321"
  },
  success:function(data){
    // 修改成功后的逻辑
    
  }
});
```

### vk.userCenter.logout（登出）

```js
/**
 * 登出(退出)
 */
vk.userCenter.logout({
  success:function(data){
    // 退出登录成功后的逻辑
   
  }
});
```


### vk.userCenter.resetPwd（重置密码）

```js
/**
 * 重置密码
 * data 请求参数 说明
 * @param {String} password 重置后的密码
 */
vk.userCenter.resetPwd({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.setAvatar（设置头像）

```js
/**
 * 设置头像
 * data 请求参数 说明
 * @param {String} avatar 头像地址
 * @param {Boolean} deleteOldFile 是否同时删除云储存内的头像文件
 */
vk.userCenter.setAvatar({
  data:{
    avatar:"https://www.aa.com/1.jpg"
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.updateUser（设置昵称等）

```js
/**
 * 设置昵称等用户展示的个人信息
 * data 请求参数 说明
 * @param {String} nickname 昵称
 * @param {String} avatar 头像
 * @param {Number} gender 性别
 */
vk.userCenter.updateUser({
  data:{
    nickname:"剑圣李白",
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getCurrentUserInfo（取用户信息）

```js
/**
 * 获取用户最新信息
 * res 返回参数说明
 * @param {Object} userInfo 用户信息
 */
vk.userCenter.getCurrentUserInfo({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.checkToken（token校验）

```js
/**
 * token校验
 * res 返回参数说明
 * @param {String} uid 当前token对应的用户uid
 * @param {Object} userInfo 当前用户信息
 * @param {Array} role 当前用户角色
 * @param {Array} permission 当前用户权限
 */
vk.userCenter.checkToken({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

## 手机号

### vk.userCenter.bindMobile（绑定手机）
 
```js
/**
 * 绑定手机号
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 手机收到的验证码
 */
vk.userCenter.bindMobile({
  data:{
    mobile: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindMobile（解绑手机）

```js
/**
 * 绑定手机号
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 手机收到的验证码
 */
vk.userCenter.unbindMobile({
  data:{
    mobile: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.loginBySms（手机号登录）

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 手机号登录(手机号+手机验证码)
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginBySms({
  data:{
    mobile: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.sendSmsCode（发送手机号验证码）

```js
/**
 * 发送手机号验证码
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} type  验证码类型
 * res 返回参数说明
 * @param {Object} requestRes 原始返回数据
 * @param {Object} requestParam 包含服务供应商和发送的手机号
 */
vk.userCenter.sendSmsCode({
  data:{
    mobile: '',
    type: 'login',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.resetPasswordByMobile（根据手机验证码重置账号密码）

```js
/**
 * 根据手机验证码重置账号密码
 * data 请求参数 说明
 * @param {String} password 重置后的密码
 * @param {String} code 验证码
 * @param {String} mobile 手机号
 */
vk.userCenter.resetPasswordByMobile({
  data:{
    password:"123456",
    code:"",
    mobile:""
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.loginByUniverify（手机一键登录）

只有 `APP` 端可以用

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * APP端 手机一键登录
 * data 请求参数 说明
 * @param {String} access_token 			uni.login登录成功后，返回的access_token参数
 * @param {String} openid 						uni.login登录成功后，返回的openid参数
 * @param {String} type 							指定操作类型，可选值为login、register，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册
 * @param {String} password 					密码，type为register时生效
 * @param {String} inviteCode 				邀请人的邀请码，type为register时生效
 * @param {String} myInviteCode 			设置当前注册用户自己的邀请码，type为register时生效
 * res 返回参数说明
 * @param {Number} code			错误码，0表示成功
 * @param {String} msg				详细信息
 * @param {String} uid 			当前token对应的用户uid
 * @param {String} type			操作类型，login为登录、register为注册
 * @param {String} mobile		登录者手机号
 * @param {String} userInfo	用户全部信息
 * @param {String} token			登录成功之后返回的token信息
 * @param {String} tokenExpired		token过期时间
 */
vk.userCenter.loginByUniverify({
  // 更多配置请查看 https://uniapp.dcloud.io/univerify
  univerifyStyle: {
    "fullScreen": true,									// 是否全屏显示(hbx3.1.5起支持全屏)，true表示全屏模式，false表示非全屏模式，默认值为false。
    "backgroundColor": "#f5f5f5",				// 授权页面背景颜色，默认值：#ffffff
    "authButton": {
      "normalColor": "#19be6b",					// 授权按钮正常状态背景颜色 默认值：#3479f5
      "highlightColor": "#18b566",			// 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
      "disabledColor": "#71d5a1",				// 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
      "textColor": "#ffffff",						// 授权按钮文字颜色 默认值：#ffffff
      "title": "本机号码一键登录"					// 授权按钮文案 默认值：“本机号码一键登录”
    },
    "privacyTerms":{
      "suffix": "使用本机号码登录", 		// 条款后的文案 默认值：“并使用本机号码登录”
      "termsColor":"#555555"
    }
  },
  data:{

  },
  success:function(data){
    uni.closeAuthView();
    setTimeout(function(){
      vk.alert(data.msg);
    },300);
  },
  fail:function(res){
    uni.closeAuthView();
  }
});
```

## 邮箱

### vk.userCenter.bindEmail（绑定邮箱）

```js
/**
 * 绑定邮箱
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 */
vk.userCenter.bindEmail({
  data:{
    email: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindEmail（解绑邮箱）

```js
/**
 * 解绑邮箱
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 */
vk.userCenter.unbindEmail({
  data:{
    email: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```


### vk.userCenter.loginByEmail（邮箱登录）

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 邮箱登录(邮箱+邮箱验证码)
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByEmail({
  data:{
    email: '',
    code: '',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.sendEmailCode（发送邮件验证码）

```js
/**
 * 发送邮件验证码
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} type  验证码类型
 * res 返回参数说明
 * @param {String} email 手机号
 * @param {String} verifyCode 验证码
 */
vk.userCenter.sendEmailCode({
  data:{
    email: '',
    type: 'login',
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

## 微信

### vk.userCenter.loginByWeixin（微信登录）

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 用户登录(微信授权)
 * @description 用户登录(微信授权)
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByWeixin({
  data:{
    type:""
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.code2SessionWeixin（获取微信openid）

```js
/**
 * 获取微信openid
 * res 返回参数说明
 * @param {String} openid 用户openid
 * @param {String} unionid 用户unionid，可以取到此值时返回
 * @param {String} sessionKey 客户端为微信小程序时返回
 * @param {String} accessToken 客户端为APP时返回
 * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
 * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
 */
vk.userCenter.code2SessionWeixin({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.bindWeixin（绑定微信）

```js
/**
 * 绑定微信
 */
vk.userCenter.bindWeixin({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindWeixin（解绑微信）

```js
/**
 * 解绑微信
 */
vk.userCenter.unbindWeixin({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getPhoneNumber（获取微信绑定的手机号）

```html
<button type="default" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">获取微信绑定的手机号</button>
```

```js
// 需要先在onLoad内执行此函数
vk.userCenter.code2SessionWeixin({
  data:{
    needCache:true
  },
  success:function(data){
    that.sessionKey = data.sessionKey;
  }
});
```
        
```js
// 获取微信绑定的手机号码
getPhoneNumber(e){
  let { encryptedData, iv } = e.detail;
  if (!encryptedData || !iv) {
    return false;
  }
  vk.userCenter.getPhoneNumber({
    data:{
      encryptedData,
      iv,
      sessionKey:that.sessionKey
    },
    success:function(data){
      vk.alert("手机号:" + data.phone);
    }
  });
},
```

### vk.userCenter.loginByWeixinPhoneNumber（通过微信小程序绑定的手机号登录）

```html
<button type="default" open-type="getPhoneNumber"  @getphonenumber="loginByWeixinPhoneNumber">使用微信绑定的手机号登录/注册</button>
```

```js
// 需要先在onLoad内执行此函数
vk.userCenter.code2SessionWeixin({
  data:{
    needCache:true
  },
  success:function(data){
    that.sessionKey = data.sessionKey;
  }
});
```
        
```js
// 使用微信绑定的手机号登录/注册
loginByWeixinPhoneNumber(e){
  let { encryptedData, iv } = e.detail;
  if (!encryptedData || !iv) {
    return false;
  }
  vk.userCenter.loginByWeixinPhoneNumber({
    data: {
      encryptedData,
      iv,
      sessionKey : that.sessionKey
    },
    success(data) {
      // 成功后的逻辑
      
    }
  });
},
```

### vk.userCenter.getWeixinMPqrcode（生成微信小程序码）

```js
/**
 * 生成微信小程序码
 * @param {String} scene        自定义参数最大32个可见字符 只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
 * @param {String} page         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
 * @param {number} width        二维码的宽度，单位 px，最小 280px，最大 1280px
 * @param {boolean} auto_color  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
 * @param {Object} line_color   auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {boolean} is_hyaline  是否需要透明底色，为 true 时，生成透明底色的小程序
 */
vk.userCenter.getWeixinMPqrcode({
  data: {
    scene: "a=1"
  },
  success(data) {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getWeixinMPscheme（生成微信小程序scheme码）

```js
/**
 * 生成微信小程序scheme码
 * data 请求参数 说明
 * @param {String} path    小程序页面路径
 * @param {String} query   小程序页面参数
 */
vk.userCenter.getWeixinMPscheme({
  data: {
    query: "a=1&b=2",
    path: "pages/index/index"
  },
  success(data) {
    // 成功后的逻辑
    
  }
});
```

## 支付宝

### vk.userCenter.loginByAlipay（支付宝登录）

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * 支付宝登录
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByAlipay({
  data:{
    type:""
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.code2SessionAlipay（获取支付宝openid）

```js
/**
 * 获取支付宝openid
 * res 返回参数说明
 * @param {String} openid 用户openid
 * @param {String} accessToken 客户端为APP时返回
 * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
 * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
 * @param {String} reExpiresIn refreshToken超时时间，单位（秒）
 */
vk.userCenter.code2SessionAlipay({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.bindAlipay（绑定支付宝）

```js
/**
 * 绑定支付宝
 */
vk.userCenter.bindAlipay({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindAlipay（解绑支付宝）

```js
/**
 * 解绑支付宝
 */
vk.userCenter.unbindAlipay({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

## QQ

### vk.userCenter.loginByQQ（QQ登录）

___框架会自动保存 `token`，无需你再手动去保存。___

```js
/**
 * QQ登录
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByQQ({
  data:{
    type:""
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.bindQQ（绑定QQ）

```js
/**
 * 绑定QQ
 */
vk.userCenter.bindQQ({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindQQ（解绑QQ）

```js
/**
 * 解绑QQ
 */
vk.userCenter.unbindQQ({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```


## 裂变分销

### vk.userCenter.setUserInviteCode（设置邀请码）

```js
/**
 * 设置用户邀请码(自动生成)
 * @description 针对未生成邀请码的用户使用此方法生成邀请码(自动生成)
 * res 返回参数说明
 * @param {String} myInviteCode 最终设置的邀请码
 */
vk.userCenter.setUserInviteCode({
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.acceptInvite（用户接受邀请）

```js
/**
 * 用户接受邀请
 * @description 此接口用于在注册之后再填写邀请码的场景，多数情况下不会用到此接口而是在注册时填写邀请码
 * data 请求参数 说明
 * @param {String} inviteCode 邀请人的邀请码
 */
vk.userCenter.acceptInvite({
  data:{
    inviteCode:""
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getInvitedUser（获取接受邀请的用户列表）

```js
/**
 * 获取接受邀请的用户清单
 * data 请求参数 说明
 * @param {Number}         pageIndex 当前页码
 * @param {Number}         pageSize  每页显示数量
 * @param {Array<Object>}  sortRule  排序规则
 * @param {object}         formData  查询条件数据源
 * @param {Array<Object>}  columns   查询条件规则
 */
vk.userCenter.getInvitedUser({
  data:{
    pageIndex:1,
    pageSize:100
  },
  success:function(data){
    // 成功后的逻辑
    
  }
});
```
