# 6、userDao - 用户表
 
```js
/**
 * 获取用户信息
 * @params {String} user_id 用户ID
 */
await vk.daoCenter.userDao.findById(user_id);

/**
 * 获取用户信息,根据 userInfo
 * data 请求参数说明
 * @params {Object} userInfo 用户信息
 * _id
 * username
 * mobile
 * email
 * wx_openid.app-plus
 * wx_openid.mp-weixin
 * wx_unionid
 * ali_openid
 * my_invite_code
 */
// 如根据手机号
await vk.daoCenter.userDao.findByUserInfo({
  mobile:"15200000001"
});
 // 如根据邮箱
await vk.daoCenter.userDao.findByUserInfo({
  email:"123@qq.com"
});
/**
 * 根据手机号直接注册账号
 * 若手机号已存在,则直接返回用户信息
 * 若不存在,则注册
 * @params {Object} data 参数
 * mobile          手机号  必填
 * password        初始密码
 * inviteCode      邀请人的邀请码
 * myInviteCode    设置当前注册用户自己的邀请码
 * needPermission  设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用
 */
await vk.daoCenter.userDao.registerUserByMobile({
  mobile:"15200000001"
});
```
