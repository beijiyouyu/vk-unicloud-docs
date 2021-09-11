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

## 尝试运行第一个Redis API
```js
const vk = require('vk-redis');
const redis = vk.redis();
await redis.set('a','我是a的值');
let redisRes = await redis.get('a');
```

#### 注意：在VK框架中，不用写 `const vk = require('vk-redis');`