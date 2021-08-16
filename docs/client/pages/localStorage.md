# 本地缓存

### 前端js调用示例
```js
 // 储存缓存
 vk.setStorageSync(key,data);
 // 获取缓存
 vk.getStorageSync(key);
 // 删除缓存
 vk.removeStorageSync(key);
 // 同步清理本地数据缓存。若key有值,则清除键值为指定字符串开头的缓存
 vk.clearStorageSync(key);
 // 获取缓存信息
 vk.getStorageInfoSync();

```