# 0、框架简介

### 不使用此框架的请忽视

[点击查看](https://vkdoc.fsq.pub/client/intro.html)

### 同时需要在 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 添加 `uniPayConfig` 配置

代码如下

```js
const uniPayConfig = require('../uni-pay/config.js');
module.exports = {
	"uni-pay": uniPayConfig,
	"vk": {
		。。。 之前的配置
	}
};
```
