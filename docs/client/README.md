# 对开发者的价值
 
### `vk-unicloud-router` 主要功能 以及 对开发者的价值

#### 1、实现云函数路由模式（同时支持对云对象的路由）
* 1.1、路由模式不使用任何第三方包，兼容性强，运行稳定
* 1.2、减少云函数数量，云函数有个数限制（用一个云函数即可实现多个云函数效果）
* 1.3、部分通用的代码块可以放在公共区执行，具有公共函数的效果，增加代码复用率，便于维护。
* 1.4、美化云函数请求过程中的日志排版，使请求日志一目了然。（再也不用为日志分散，难找而头疼）
* 1.5、可以强制关闭云端服务（适用于需要临时关闭后端服务的情况，如腾讯云迁移数据到阿里云时需要先关闭服务，否则迁移过程中会有新数据产生）

#### 2、实现 `全局过滤器`，过滤非法请求。您无需关心用户角色权限问题。

#### 3、众多现成的 `JS API`，让您无需重复造轮子。（持续增加中）

#### 4、众多现成的 `云函数 API`，为您的业务扫平障碍，让您可以专注于自身业务开发。（微信登录、短信、验证码、缓存、生成小程序码等等）（持续增加中）

#### 5、全面支持 `url化` 的云函数请求，您无需关心url化后参数的获取问题

#### 6、已集成 `uni-id` 当前版本: `3.3.26`（已支持真实发送邮箱验证码和短信验证码）
* 6.1、由于每个应用基本都会用上用户系统，官方建议所有 `uniCloud` 应用均使用 `uni-id` 作为用户体系，
有了统一的账户规范，并且围绕这套账户规范，有各种各样插件，那么开发者可以随意整合这些插件，让数据连同。

* 6.2、同时方便其他用户使用 `unicloud` 插件发布者发布的前后端一体插件，只需要导入一个云函数即可。
(如导入一个社区插件，可能要导入几十个云函数，而使用此云函数路由后，只需导入一个云函数，且已集成 `uni-id`，打通账号体系)。

#### 7、在 `uni-id` 基础上升级为 `vk.userCenter` 用户中心API 通过this.vk.userCenter 即可调用 [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html)
 
#### 8、封装 `uni.callFunction` 和 `uni.request` 使之合二为一 通过this.vk.callFunction 调用

#### 9、`vk.baseDao` 数据库API，使小白也能轻松上手对数据库的调用。 [传送门](https://vkdoc.fsq.pub/client/uniCloud/db/api.html)

#### 10、`vk.baseDao.selects` 数据库万能连表查询API [传送门](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html)

#### 11、`商品SKU选择器组件`（打造uni插件市场功能最全的SKU选择器组件）[传送门](https://ext.dcloud.net.cn/plugin?id=2848)

#### 12、对 `Vuex` 进行了深度封装（支持持久化），现在可以很方便的使用Vuex进行读取和储存。[传送门](https://vkdoc.fsq.pub/client/pages/vuex.html)

#### 13、自定义过滤器（在业务云函数执行之前(或之后)，统一拦截，进行过滤后再放行，支持设置多个过滤器，并按指定顺序执行）[传送门](https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html)

#### 14、支持设置需要登录的页面列表或不需要登录的页面列表（通过本地token检测，无网络请求，支持通配符写法）[传送门](https://vkdoc.fsq.pub/client/pages/config.html)

#### 15、支持设置可以被分享的页面列表或禁止分享的页面列表（支持通配符写法）[传送门](https://vkdoc.fsq.pub/client/pages/config.html)

#### 16、`vk.localStorage` 封装本地缓存的curd，同时具有监听缓存被更新和被删除的功能。[传送门](https://vkdoc.fsq.pub/client/pages/localStorage.html)

#### 17、美化云函数请求过程中的日志排版，使请求日志一目了然。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4a44fbf8-6b5e-43a6-b443-51a108dec125.png)

#### 18、可以 `强制关闭` 云端服务（适用于需要临时关闭后端服务的情况，如腾讯云迁移数据到阿里云时需要先关闭服务，否则迁移过程中会有新数据产生）

#### 19、全局数据缓存API，现在可以很方便的在云函数中使用缓存。 [传送门](https://vkdoc.fsq.pub/client/uniCloud/cache/cache.html)

#### 20【全网首家】云函数URL化之URL重写 [传送门](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/urlrewrite.html)

#### 21、千人群交流开发心得，助你避坑，作者亲自在群内解答框架使用问题，让你轻松上手 `uniCloud云开发`。

#### 22、其他好处…

### 目前已集成的服务端API

#### 1、微信小程序服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html)

#### 2、微信公众号服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin-h5.html)

#### 3、百度开放平台服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/baidu.html)

#### 4、短信发送 [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/sms.html)

#### 5、邮箱发送 [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/mail.html)

#### 6、Redis [传送门](https://vkdoc.fsq.pub/vk-redis/)


### 开发辅助工具

#### 1、VK框架快速开发辅助工具（大大提升开发效率） [传送门](https://vkdoc.fsq.pub/client/codeAssist.html)