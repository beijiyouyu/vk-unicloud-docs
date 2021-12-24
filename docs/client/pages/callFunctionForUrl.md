# 云函数url化方式调用云函数

开启URL化方法为：打开 `router/package.json` 文件，在 `path` 里填写 `/http/router`，最后重新上传云函数。

```js
cloudfunction-config": {
  "concurrency": 1,
  "memorySize": 256,
  "path": "/http/router",
  "timeout": 60,
  "triggers": [],
  "runtime": "Nodejs12"
}
```


### isRequest:true 代表使用url访问云函数，一般用于PC后台管理页面使用

```js
this.vk.callFunction({
  url: 'user/kh/setAvatar',
  title:'请求中...',
  isRequest:true,
  data:{
    avatar: "https://xxxxxxx.jpg"
  },
  success(data) {
    // 修改成功
  }
});

```
### 注意：云函数url化方式调用需要配置你的云函数url路径地址

___如果 `云函数url化` 是给外部访问（不在uniapp内访问），则不需要以下配置。___

`main.js` 在代码`Vue.use(vk); `的下方添加
```js
// 自定义云函数路由配置
Vue.prototype.vk.callFunctionUtil.setConfig({
  functionNameToUrl:{
    // 云函数路由（主函数url化地址）
    "router":"https://xxxxxxx.bspapp.com/http/router",
    // 云函数路由（开发测试函数url化地址）
    "router-test":"https://xxxxxxx.bspapp.com/http/router-test"
  }
});

```

### 使用axios、jquery等工具访问云函数方式(云函数url化外部访问) [点击查看](https://vkdoc.fsq.pub/client/question/q2.html)