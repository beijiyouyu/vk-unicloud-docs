# 快速上手 - 安装步骤

## 下载安装

* 1、从插件市场安装 `vk-redis` 插件到你的项目中。 [点击前往插件市场](https://ext.dcloud.net.cn/plugin?id=6158)
* 2、右键公共模块 `vk-redis`，选择 `管理公共模块依赖` 菜单，引入 `uni-config-center` 模块（此为uni配置中心）
* 3、在需要使用 `vk-redis` 的云函数右键选择 `管理公共模块依赖` 菜单，引入公共模块 `vk-redis`。
* 4、Redis配置文件地址：`uniCloud/cloudfunctions/common/uni-config-center/vk-redis/config.json`（没有则新建）（注意这里是 `config.json`) [查看配置文件](#配置文件)
* 5、上传公共模块 `vk-redis`
* 6、上传对应的云函数
* 7、完成

## 注意

如果使用 `uniCloud` 内置的 `Redis`，则需要额外在你的云函数根目录的 `package.json` 内添加云函数的扩展能力（如果云函数目录下没有 `package.json`，可以通过在云函数目录下执行`npm init -y`来生成）
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
	"enable": true,
	"config": {
		"port": 6379,
		"host": "你的Redis外网访问地址",
		"password": "用户名:密码",
		"db": 0
	}
}
```

* enable ：true：代表使用外部 Redis false：代表使用 uniCloud 内置的Redis，若使用外部 Redis 则需配置下面的配置信息。

* port ：Redis端口号

* host ：Redis外网访问地址

* password ：Redis账号密码，格式：用户名:密码，若 password 只有密码，没有用户名，则直接填密码即可。

* db ：Redis默认访问的dbIndex

#### 这里给你提供一个外网可以访问的测试Redis，仅供你开发测试使用，请勿在生产环境中使用。

```json
{
	"enable": true,
	"config": {
		"port": 6379,
		"host": "redistest.fsq.pub",
		"password": "redis123456",
		"db": 0
	}
}
```
* 测试的Redis是阿里云杭州机房服务器，故延迟可能较高

* 经过测试

* 如果你是阿里云空间，则买张家口可用区B的Redis服务器，延迟为1ms，完美媲美内网延迟。（阿里云空间一定要买阿里云官方上的张家口的服务器，延迟媲美内网）

* 如果你是腾讯云空间，则可以买上海Redis服务器（或北京或深圳，看你主要用户群体在哪），延迟为10ms-20ms左右

* 这里的延迟为热启动Redis连接复用时的延迟。

#### 如何购买Redis服务器?

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

* 如果你的空间是腾讯云，请一定要把云函数设置为 `node8` 版本，`node12` 版本目前无法复用Redis连接（腾讯云空间的问题，阿里云没问题）

* 设置方法：云函数根目录的 `package.json` 的 `cloudfunction-config` 的 `runtime` 设置为 `Nodejs8`

* 如果你的云函数已经是 `node12` 版本，则需要先删除云函数，再重新上传。

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