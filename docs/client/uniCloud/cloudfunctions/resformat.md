# 响应体规范

## 失败返回值

只要 `code` 不为0，都属于失败，前端 `vk.callFunction` 会走 `fail` 回调，并自动执行 `vk.alert(msg);`

```json
{
  "code": -1,
  "msg": "兑换失败，积分不足"
}
```

## 成功返回值

只有 `code` 为0，才代表成功，前端 `vk.callFunction` 才会走 `success` 回调
 
```json
{
  "code": 0,
  "msg": "兑换成功"
}
```

## 特殊意义的返回值

### 自动更新vuex内的userInfo缓存

当 `needUpdateUserInfo` 为true，同时 `userInfo` 不为空，则自动更新vuex内的userInfo缓存
 
```json
{
  "code": 0,
  "msg": "兑换成功",
  "needUpdateUserInfo": true,
  "userInfo":{
    ...最新的用户信息
  }
}
```