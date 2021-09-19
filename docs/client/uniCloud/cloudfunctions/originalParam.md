# 12、获取云函数原始请求参数

```json
{
	"event": {
    // 路由内部云函数路径
		"$url": "template/test/pub/test",
    // 请求参数
		"data": { "a": "1" },
    // 请求token
		"uni_id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNDEzOWUxMjYxMjg1ZWVkMDczZjI5ZDEyYTIxNTMzOSIsInJvbGUiOlsic3RhZmZfaW5zaWRlX3RvX3Nob3BfMSIsInRvdGFsX3BlcmZvcm1hbmNlXzEiXSwicGVybWlzc2lvbiI6W10sImlhdCI6MTYzMDg5Nzc1NiwiZXhwIjoxNjMxNTAyNTU2fQ.ZoUGu6nVfL2ZKpD_t1WVgPjZfnXU51rOISERiHlEB3I"
	},
	"context": {
    // 当前云函数被何种方式调用
    // client   客户端callFunction方式调用
    // http     云函数url化方式调用
    // timing   定时触发器调用
    // server   由管理端调用，HBuilderX里上传并运行，仅阿里云支持，腾讯云这种方式调用也是client
    // function 由其他云函数callFunction调用，仅阿里云支持，腾讯云这种方式调用也是client
		"SOURCE": "client",
    // IP
		"CLIENTIP": "127.0.0.1",
    // UA
		"CLIENTUA": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
		// 空间信息
    "SPACEINFO": { "spaceId": "87c16e8a-f811-412b-222c-375b62c859d35", "provider": "aliyun" },
    // 以下四个属性只有使用uni-app以callFunction方式调用才能获取
    "PLATFORM": "h5", // 运行平台，返回值为 mp-weixin、app-plus等
    "OS": "ios",  //客户端操作系统，返回值：android、ios    等
    "APPID": "__UNI__721340",  // manifest.json中配置的appid
    "DEVICEID": "16310672816989449766", // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
	}
}
```
