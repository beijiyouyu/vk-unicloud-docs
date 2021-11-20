# 获取url化后的云函数原始请求参数

`originalParam` 为原始请求参数

```js
'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url user/pub/test1 前端调用的url参数地址
	 */
	main: async (event) => {
		let { originalParam } = event;
		let res = { code: 0, msg: "" };
    
		return res;
	}
}

```

`originalParam` 参数详情

```json
{
  "event": {
    // 请求参数
    "body": "\r\n{\r\n\t\"uni_id_token\":\"\",\r\n\t\"$url\":\"template/test/pub/test\",\r\n\t\"data\":{\r\n\t   \r\n\t}\r\n\r\n}",
    // 请求头
    "headers": {
      "accept": "*/*",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "content-length": "85",
      "content-type": "application/json",
      "host": "https://ea2dc91d-ddd2-44b0-8350-1a18e4d0d142.bspapp.com",
      "postman-token": "808f27da-f56d-43e1-a7b9-af00d9ef2123",
      "user-agent": "PostmanRuntime/7.26.8",
      "x-client-proto": "https",
      "x-client-proto-ver": "HTTP/1.1",
      "x-daa-tunnel": "hop_count=1",
      "x-forwarded-for": "125.110.181.153, 180.153.100.151",
      "x-forwarded-proto": "https",
      "x-nws-log-uuid": "d709692d-67f2-4492-be64-f5ccbbe1225a",
      "x-real-ip": "181.152.101.121",
      "x-stgw-time": "1632034119.033",
      "x-tencent-ua": "Qcloud"
    },
    // 请求模式 GET POST
    "httpMethod": "GET",
    // 是否被base64编码
    "isBase64Encoded": false,
    // 请求路径
    "path": "/",
    // url?后面的参数
    "queryStringParameters": {},
    "multiValueHeaders": {
      "accept": [
          "*/*"
      ],
      "accept-encoding": [
          "gzip, deflate, br"
      ],
      "connection": [
          "keep-alive"
      ],
      "content-length": [
          "85"
      ],
      "content-type": [
          "application/json"
      ],
      "host": [
          "https://ea2dc91d-ddd2-44b0-8350-1a18e4d0d142.bspapp.com"
      ],
      "postman-token": [
          "808f27da-f56d-43e1-a7b9-cf00d9ef2416"
      ],
      "user-agent": [
          "PostmanRuntime/7.26.8"
      ],
      "x-client-proto": [
          "https"
      ],
      "x-client-proto-ver": [
          "HTTP/1.1"
      ],
      "x-daa-tunnel": [
          "hop_count=1"
      ],
      "x-forwarded-for": [
          "125.110.181.153, 180.153.100.151"
      ],
      "x-forwarded-proto": [
          "https"
      ],
      "x-nws-log-uuid": [
          "ea2dc91d-ddd2-44b0-8350-1a18e4d0d142"
      ],
      "x-real-ip": [
          "180.153.100.151"
      ],
      "x-stgw-time": [
          "1632034119.033"
      ],
      "x-tencent-ua": [
          "Qcloud"
      ]
    },
    "requestContext": {
      "appId": "1213450789",
      "envId": "vk-test-001",
      "requestId": "d97bbbbdcd61169690e96aecb0ccac3e",
      "uin": "100234245603"
    }
  },
  "context": {
    "callbackWaitsForEmptyEventLoop": true,
    "memory_limit_in_mb": 256,
    "time_limit_in_ms": 60000,
    "request_id": "9ec799ae-1915-11ec-9504-da7fa40678f4",
    "function_version": "$LATEST",
    "function_name": "router",
    "namespace": "vk-test-001",
    "tencentcloud_region": "ap-shanghai",
    "tencentcloud_appid": "12134807805",
    "tencentcloud_uin": "100234245603",
    "SOURCE": "http",
    "CLIENTIP": "180.153.100.151",
    "CLIENTUA": "PostmanRuntime/7.26.8",
    "SPACEINFO": {
        "spaceId": "vk-test-001",
        "provider": "tencent"
    },
    "FUNCTION_NAME": "router"
  }
}
```
