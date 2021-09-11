# 快速上手 - 安装步骤

## 下载安装

* 1、从插件市场安装 `vk-redis` 插件到你的项目中。
* 2、在需要使用Redis的云函数右键选择`管理公共模块依赖`菜单，引入公共模块`vk-redis`。
* 3、Redis配置文件地址:`uniCloud/cloudfunctions/common/uni-config-center/vk-redis/config.json`(没有则新建)（注意这里是`config.json`) [查看配置文件](#配置文件)
* 4、上传公共模块`vk-redis`
* 5、上传对应的云函数
* 6、完成

## 注意

如果使用uniCloud内置的Redis，则需要额外在你的云函数根目录的package.json内添加云函数的扩展能力（如果云函数目录下没有package.json，可以通过在云函数目录下执行npm init -y来生成）
```js
{
  "name": "你的云函数名称",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  // 配置为此云函数开启redis扩展能力，值为空对象留作后续追加参数，暂无内容（此注释不可以有）
  "extensions": {
    "uni-cloud-redis": {} 
  }
}
```

## 配置文件
```json
{
	"port": 6379,
	"host": "你的Redis外网访问地址",
	"password": "用户名:密码",
	"db": 0
}
```
## 若 password 只有密码，没有用户名，则直接填密码即可。

### 这里给你提供一个外网可以访问的测试Redis，仅供你测试使用，请勿在生产环境中使用。
```js
{
	"port": 6379,
	"host": "redistest.fsq.pub",
	"password": "redis123456",
	"db": 0
}
```

### 如何购买Redis服务器?

[点击前往阿里云官网购买19年/年的Redis服务器(新账号19元)](https://www.aliyun.com/minisite/goods?userCode=eeg47b5x)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/66697a9c-e993-4ab2-8110-d6337db0f38f.png)

## 尝试运行第一个Redis API
```js
const vk = require('vk-redis');
const redis = vk.redis();
await redis.set('a','我是a的值');
let redisRes = await redis.get('a');
```

#### 注意：在VK框架中，不用写 `const vk = require('vk-redis');`

#### 特别注意：

* 如果你的空间是腾讯云，请一定要把云函数设置为node8版本，node12版本目前无法复用redis连接（腾讯云空间的问题，阿里云没问题）

* 设置方法：云函数根目录的`package.json` 的 `cloudfunction-config`的`runtime` 设置为 `Nodejs8`

* 如果你的云函数已经是node12版本，则需要先删除云函数，再重新上传

```js
{
	"cloudfunction-config": {
		"concurrency": 1,
		"memorySize": 256,
		"path": "",
		"timeout": 60,
		"triggers": [],
		"runtime": "Nodejs8"
	}
}
```