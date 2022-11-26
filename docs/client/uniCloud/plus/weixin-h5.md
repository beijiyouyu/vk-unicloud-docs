# 微信公众号API

## 配置文件

打开 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json` 文件，配置里面的 

"h5-weixin" 微信公众号

```js
"h5-weixin": {
  "oauth": {
    "weixin": {
      "appid": "",
      "appsecret": ""
    }
  }
},
```

配置完需要上传 `uni-config-center` 这个公共模块

## 微信公众号万能API调用接口


**特别注意**

微信公众号调用api需要白名单授权，[传送门](https://mp.weixin.qq.com/)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/20c44c60-7794-4edd-a1ef-957004458afb.png)

[如何获取我本地电脑的IP](https://www.baidu.com/s?wd=%E6%88%91%E7%9A%84ip)

[unicloud如何获取固定IP](#获取固定IP)

```js
let requestRes = await vk.openapi.weixin.h5.request({
  method: "GET",
  url: "wxaapi/newtmpl/gettemplate",
  data: {

  }
});
```

**请求参数**

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| method           | 请求模式，分为GET和POST（不区分大小写）  | String | POST   | GET |
| url           | 微信接口路径         | String | -   | - |
| data           | 请求数据         | Object | -   | - |
| appid           | 可不填，不填会自动从uni-id配置的h5-weixin节点里获取appid   | String | -   | - |
| appsecret       | 可不填，不填会自动从uni-id配置的h5-weixin节点里获取appsecret    | String | -   | - |


**url参数详解**

以 `生成带参数的二维码` 为例

**请求地址**

`POST` https://api.weixin.qq.com/`cgi-bin/qrcode/create`?access_token=TOKEN

`method` 为 `POST`

`url` 为 `cgi-bin/qrcode/create`

**最终代码**

```js
let requestRes = await vk.openapi.weixin.h5.request({
  method: "POST",
  url: "cgi-bin/qrcode/create",
  data: {
    expire_seconds: 604800,
    action_name: "QR_STR_SCENE",
    action_info:{
      scene:{
        user_id: "001"
      }
    }
  }
});
```


**公共返回参数**

| 参数             | 说明                           | 类型    | 
|------------------|-------------------------------|---------|
| code           | 0代表成功，其他均为失败           | Number | 
| msg           | 失败时的提示内容           | String | 

其他返回参数参考微信公众号服务端API文档 [传送门](https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html)

## 获取固定IP

**unicloud如何获取固定IP？**

### 腾讯云空间

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0c2634e7-b26a-4e6f-ae8b-ecdeed0772d2.png)

### 阿里云空间

直接把下面的ip都加进去即可。

**代理服务器IP列表（公测版）**

```js
39.100.3.155
47.92.39.39
47.92.67.205
47.92.25.106
47.92.68.159
```

**代理服务器IP列表（正式版）**

```js
47.92.132.2
47.92.152.34
47.92.87.58
47.92.207.183
8.142.185.204
```
