# 快速上手 - 安装步骤

## 下载安装

* 1、从插件市场安装 `vk-redis` 插件到你的项目中。
* 2、在需要使用Redis的云函数右键选择`管理公共模块依赖`菜单，引入公共模块`vk-redis`。
* 3、Redis配置文件地址:`uniCloud/cloudfunctions/common/uni-config-center/vk-redis/config.json`(没有则新建)（注意这里是`config.json`) [查看配置文件](#配置文件)
* 4、上传公共模块`vk-redis`
* 5、上传对应的云函数
* 6、完成


## 配置文件
```json
{
	"port": 6379,
	"host": "你的Redis外网访问地址",
	"password": "用户名:密码",
	"db": 0
}
```

## 尝试运行第一个Redis API
```js
const vk = require('vk-redis');
const redis = vk.redis();
await redis.set('a','我是a的值');
let redisRes = await redis.get('a');
```

#### 注意：在VK框架中，不用写 `const vk = require('vk-redis');`