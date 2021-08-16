<template>
	<div class="doc-update">
		<ul class="u-timeline u-timeline-pending">
			<li class="u-timeline-item" v-for="(item, index) in list">
				<div class="u-timeline-item-tail"></div>
				<div class="u-timeline-item-head u-timeline-item-head-blue"></div>
				<div class="u-timeline-item-content">
					<div class="anchor">
						<h2>{{ item.version }}</h2>
					</div>
					<p>
						<code>{{ item.date }}</code>
					</p>
					<ul>
						<li v-for="(item2, index2) in item.list">
							<span :class="classFn(item2.label)">{{ item2.label }}</span>
							{{ item2.content }}
							<a v-if="item2.a && item2.a.href" :href="item2.a.href" target="_blank">
								{{ item2.a.text }}
							</a>
							<img v-if="item2.img" :src="item2.img" class="preview" />
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "doc-update",
	props: {},
	data() {
		return {
			list: [
				{
					version: "2.2.4",
					date: "2021-08-06",
					list: [{ label: "优化", content: "一些细节" }]
				},
				{
					version: "2.2.3",
					date: "2021-08-05",
					list: [
						{
							label: "修复",
							content: "因`uni-id`配置隔离导致的微信`vk.openapi.weixin` API 兼容性问题。"
						},
						{ label: "新增", content: "`vk.pubfn.isArray` 判断变量是否是数组类型" },
						{ label: "新增", content: "`vk.pubfn.isObject` 判断变量是否是对象类型" }
					]
				},
				{
					version: "2.2.2",
					date: "2021-08-04",
					list: [
						{ label: "升级", content: "`uni-id` 至 `3.3.3`" },
						{
							label: "新增",
							content: "云函数内表单验证文档",
							a: {
								text: "点击查看",
								href:
									"https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/formRules.html"
							}
						}
					]
				},
				{
					version: "2.2.0",
					date: "2021-07-28",
					list: [{ label: "新增", content: "前端 `vk.callFunction` 支持请求其他服务空间的云函数" }]
				},
				{
					version: "2.1.6",
					date: "2021-07-22",
					list: [
						{
							label: "新增",
							content:
								"常用的 vk.baseDao `javascript代码块提示` （在编辑器输入dao.即可弹出代码提示）",
							a: {
								text: "点击查看",
								href: "http://vkunicloud.fsq.pub/docs/client/codeTips.html"
							},
							img:
								"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/fe965ad9-e9ed-44fc-ad0b-5bc286988e09.png"
						}
					]
				},
				{
					version: "2.1.2",
					date: "2021-07-12",
					list: [
						{ label: "修复", content: "连表查询时，因`lastWhereJson`而导致`getCount`错误的问题。" }
					]
				},
				{
					version: "2.1.0",
					date: "2021-07-09",
					list: [
						{
							label: "重要",
							content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href: "https://vkdoc.fsq.pub/client/question/q8.html"
							}
						},
						{
							label: "重要",
							content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href: "https://vkdoc.fsq.pub/client/question/q8.html"
							}
						},
						{
							label: "重要",
							content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href: "https://vkdoc.fsq.pub/client/question/q8.html"
							}
						}
					]
				},
				{
					version: "2.0.7",
					date: "2021-06-28",
					list: [
						{ label: "修复", content: "`user/kh/getMenu`云函数获取菜单错误的bug。" },
						{
							label: "修复",
							content:
								'db_init.json `opendb-global-data`表`expired_at`索引设置错误 "MgoIsUnique": true 改为 "MgoIsUnique": false（需要把索引删除后重新创建，选择非唯一索引）'
						},
						{ label: "优化", content: "`vk.pubfn.timeFormat` 若参数不符合规则，则原值显示。" },
						{
							label: "优化",
							content:
								"`vk.pubfn.random` 新增第三个参数`arr` （产生的随机数不会和此数组的任意一项重复）",
							a: {
								text: "点击查看",
								href:
									"https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-random-%E9%9A%8F%E6%9C%BA%E6%95%B0"
							}
						}
					]
				},
				{
					version: "2.0.5",
					date: "2021-06-16",
					list: [
						{
							label: "修复",
							content:
								"`vk.baseDao.add` 因hbx 3.1.18版本导致的本地运行时 `_add_time_str` 错误的问题。"
						}
					]
				},
				{
					version: "2.0.4",
					date: "2021-06-10",
					list: [
						{
							label: "新增",
							content:
								"`onActionIntercepted`（被中间件拦截时执行） 和 `onActionError`（云函数执行异常时执行） 类型中间件",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html"
							}
						},
						{ label: "优化", content: "`vk.baseDao.sample` 支持 `fieldJson`参数" },
						{
							label: "优化",
							content: "`vk.callFunctionUtil.uploadFile` 自动识别文件类型，无需传`fileType`参数"
						},
						{
							label: "修复",
							content: "`返回树状结构`时最后一级子节点没有继承主表`foreignDB`属性的bug。"
						}
					]
				},
				{
					version: "2.0.3",
					date: "2021-05-31",
					list: [
						{
							label: "新增",
							content:
								"`vk.callFunctionUtil.uploadFile` 新增参数 `file`,`needSave` 若needSave=true，则文件URL会保存到数据库。（会显示在admin端的素材管理中）"
						},
						{
							label: "优化",
							content:
								"`vk.baseDao.selects` 和 `vk.baseDao.select` 新增两个属性`getOne` 、 `getMain` "
						},
						{
							label: "优化",
							content:
								"`云函数URL化` 路由模式下，URL重写支持只允许部分云函数可被访问。（可以做到只暴露指定的API接口，增加URL化后的安全性）",
							a: {
								text: "点击查看URL重写规则",
								href:
									"https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/urlrewrite.html"
							}
						},
						{
							label: "修复",
							content: "`vk.callFunctionUtil.uploadFile` 上传视频时后缀名可能会错误的问题。"
						}
					]
				},
				{
					version: "2.0.2",
					date: "2021-05-21",
					list: [
						{
							label: "新增",
							content:
								"`vk.callFunctionUtil.uploadFile` 新增参数 `file`,`needSave` 若needSave=true，则文件URL会保存到数据库。（会显示在admin端的素材管理中）"
						},
						{
							label: "优化",
							content:
								"`vk.baseDao.getTableData` 默认排序规则调整为`_id`降序，之前是`_add_time`降序"
						},
						{
							label: "优化",
							content: "`vk.baseDao.getTableData` 和 `vk.baseDao.selects` 连表查询逻辑。"
						},
						{ label: "优化", content: "`vk.baseDao` API的查询性能。" }
					]
				},
				{
					version: "2.0.0",
					date: "2021-05-15",
					list: [
						{ label: "新增", content: "`vk-unicloud-admin`开发框架已正式上线" },
						{ label: "优化", content: "用户角色权限，支持admin使用 " },
						{
							label: "优化",
							content: "`client端`框架地址：`https://ext.dcloud.net.cn/plugin?id=2204`",
							a: {
								text: "点击查看",
								href: "https://ext.dcloud.net.cn/plugin?id=2204"
							}
						},
						{
							label: "优化",
							content:
								"`admin端`框架地址：`https://ext.dcloud.net.cn/plugin?name=vk-unicloud-admin`",
							a: {
								text: "点击查看",
								href: "https://ext.dcloud.net.cn/plugin?name=vk-unicloud-admin"
							}
						},
						{
							label: "优化",
							content: "`client端`框架文档：`https://vkdoc.fsq.pub/client/`",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/"
							}
						},
						{
							label: "优化",
							content: "`admin端`框架文档：`https://vkdoc.fsq.pub/admin/`",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/admin/"
							}
						}
					]
				},
				{
					version: "1.9.2",
					date: "2021-04-23",
					list: [
						{
							label: "新增",
							content:
								"`pages-dev.json` 机制，写法与`pages.json` 相同，但里面的页面只有运行（开发）环境时才会被HBX打包，发行（正式）环境下不会被HBX打包进去。",
							a: {
								text: "点击查看详情",
								href: "https://vkdoc.fsq.pub/client/question/q6.html"
							}
						},
						{
							label: "新增",
							content:
								"阿里云和unicloud短信聚合API （阿里云短信的实现不依赖阿里云SDK核心库，无需`npm install @alicloud/pop-core`）",
							a: {
								text: "点击查看详情",
								href: "https://vkdoc.fsq.pub/client/uniCloud/plus/sms.html"
							}
						},
						{
							label: "废弃",
							content:
								"原目录`util/smsUtil.js`（使用新的`vk.system.smsUtil.sendSms`聚合短信发送接口，且比之前的写法更优雅）"
						}
					]
				},
				{
					version: "1.9.1",
					date: "2021-04-19",
					list: [
						{
							label: "重要",
							content:
								"【全网首家】`云函数url化` 支持以纯链接形式访问路由后的云函数 如： `https://xxx.bspapp.com/http/router/client/user/pub/findGoodsInfo?id=1`",
							a: {
								text: "点击查看升级指南",
								href: "https://vkdoc.fsq.pub/client/changeGuide.html"
							}
						},
						{
							label: "重要",
							content: "【全网首家】`云函数url化` 支持URL重写",
							a: {
								text: "点击查看URL重写详情",
								href:
									"https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/urlrewrite.html"
							}
						},
						{
							label: "优化",
							content:
								"`vk.selects` 支持主表外键是数组的情况下（如`uni-id-users`表的`role`字段）连表查出`roleList`"
						}
					]
				},
				{
					version: "1.9.0",
					date: "2021-04-19",
					list: [
						{ label: "重要", content: "`vk.selects` 支持返回树状结构" },
						{
							label: "新增",
							content: "`vk.pubfn.deepClone` 深度克隆（与`vk.pubfn.copyObject`的区别：可以克隆函数)"
						},
						{ label: "优化", content: "`vk.setData` 内部逻辑" },
						{
							label: "优化",
							content:
								"`使用帮助/代码快捷提示/javascript代码块提示.json` 代码块有更新 （将文件内的代码复制到 hbx 工具 - 代码块设置 - javascript代码块）"
						}
					]
				},
				{
					version: "1.8.14",
					date: "2021-04-13",
					list: [
						{
							label: "优化",
							content:
								"云函数中 `vk.request`新增参数`needOriginalRes` 默认为`false`，若为`true`，则会返回原始数据（包含请求头等数据）"
						},
						{ label: "优化", content: "`uni-id` 模式调整为：兼容单实例多并发模式" },
						{
							label: "优化",
							content:
								'`vk.request`默认的`header`与官方对其（之前默认是`{"content-type": "application/json; charset=UTF-8"}`）'
						},
						{
							label: "修复",
							content: "`console.log`在小程序端可能会无法打印出代码所在位置的问题。"
						}
					]
				},
				{
					version: "1.8.13",
					date: "2021-04-07",
					list: [
						{
							label: "新增",
							content:
								"`app.config.js` 新增 `tokenExpiredAutoDelete` 属性，默认`true` 若设为`false`，则`token`失效时，依然保留前端的`token缓存`。"
						},
						{
							label: "优化",
							content: "`vk.baseDao.selects` 支持`_.geoNear`API（将记录按照离给定点从近到远输出。）"
						},
						{
							label: "优化",
							content:
								'如需要在云函数中主动抛出异常，且能让前端框架自动识别后进行alert弹窗提示，则可使用以下方式: throw new Error("msg:这里是错误的提示");'
						},
						{
							label: "优化",
							content:
								'`vk.request`默认的`header`与官方对其（之前默认是`{"content-type": "application/json; charset=UTF-8"}`）'
						}
					]
				},
				{
					version: "1.8.12",
					date: "2021-03-27",
					list: [
						{
							label: "新增",
							content: "`百度开放平台API接口` (营业执照识别、身份证识别等) ",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/uniCloud/plus/baidu.html"
							}
						},
						{
							label: "优化",
							content:
								"`kh`目录下的函数默认会获取 `userInfo`（当前登录用户信息），如果此云函数不需要用户信息，可以在前端多传一个参数`need_user_info:false` 可以减少一次数据库查询（加快响应速度）(快100ms左右) "
						},
						{ label: "优化", content: "`returnUserInfoFilter` 过滤器的内部逻辑" },
						{
							label: "优化",
							content:
								"`vk.callFunction` 新增参数 `needAlert`(默认为true) 来代替 `noAlert`（默认为false） 二选一即可（建议后面都使用`needAlert`参数，它更语义化)"
						}
					]
				},
				{
					version: "1.8.11",
					date: "2021-03-24",
					list: [
						{
							label: "新增",
							content: "清明节灰色页面实现方案 ",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/pages/isQingming.html"
							}
						},
						{ label: "新增", content: "`vk.pubfn.timeUtil.isLeapYear` 判断是否是闰年" },
						{ label: "新增", content: "`vk.pubfn.timeUtil.isQingming` 判断是否是清明节" }
					]
				},
				{
					version: "1.8.10",
					date: "2021-03-23",
					list: [
						{
							label: "新增",
							content:
								"`app`环境中直接保存用户微信昵称和头像的使用示例。`/pages_template/uni-id/weixin/weixin`"
						},
						{ label: "修复", content: "`vuex`储存值为0时，会变成`空字符串`的问题。" }
					]
				},
				{
					version: "1.8.9",
					date: "2021-03-20",
					list: [
						{
							label: "优化",
							content:
								"`vk.userCenter.code2SessionWeixin` 的内部逻辑。使之可以正确的和`vk.userCenter.loginByWeixinPhoneNumber` 搭配使用"
						}
					]
				},
				{
					version: "1.8.8",
					date: "2021-03-20",
					list: [
						{ label: "新增", content: "APP本机号码一键登录API `vk.userCenter.loginByUniverify`" },
						{ label: "修复", content: "微信小程序服务端API在保存`token`时，缓存时间错误的问题。" },
						{ label: "修复", content: "`vk.callFunctionUtil.uploadFile` 上传视频返回`.png`的问题 " }
					]
				},
				{
					version: "1.8.6",
					date: "2021-03-12",
					list: [
						{
							label: "重要",
							content: "现在可以在js文件中直接通过 `uni.vk` 来使用 `vk` 对象内的API "
						},
						{
							label: "新增",
							content: "`app.config.js` 新增参数 `checkSharePages` 控制页面是否可以被小程序分享"
						},
						{
							label: "优化",
							content:
								"发行模式下，`console.log` 将不会打印任何日志。若发行模式下需要强制打印，可用 `vk.log` 代替 `console.log`"
						}
					]
				},
				{
					version: "1.8.5",
					date: "2021-03-10",
					list: [
						{
							label: "新增",
							content: "`vk.callFunctionUtil.uploadFile` 支持前端直传至`阿里云oss` "
						},
						{
							label: "新增",
							content: "`app.config.js` 新增 `myfn` 参数，可用来拓展自定义公共函数 "
						}
					]
				},
				{
					version: "1.8.4",
					date: "2021-03-06",
					list: [
						{
							label: "新增",
							content: "`vk.openapi.weixin.subscribeMessage.send` 微信小程序发送订阅消息",
							a: {
								text: "点击查看",
								href:
									"https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E5%8F%91%E9%80%81%E8%AE%A2%E9%98%85%E6%B6%88%E6%81%AF"
							}
						},
						{
							label: "优化",
							content:
								"`vk.baseDao.add` 和 `vk.baseDao.adds` 新增参数 `cancelAddTime` 为`true`,则不会有`_add_time`和`_add_time_str`字段生成"
						},
						{
							label: "优化",
							content: "`vk.baseDao.add` 和 `vk.baseDao.adds` 支持添加自定义 `_id`"
						},
						{ label: "优化", content: "`vk.setVuex` 和 `vk.setData` 的赋值逻辑" }
					]
				},
				{
					version: "1.8.3",
					date: "2021-03-04",
					list: [
						{
							label: "重要",
							content: "`vuex` 的使用方式有较大更新。(有性能提升)",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/pages/vuex.html#%E9%97%AE%E9%A2%98"
							}
						}
					]
				},
				{
					version: "1.8.2",
					date: "2021-03-01",
					list: [
						{
							label: "重要",
							content:
								"公共模块`config` 的默认`passwordSecret`和`tokenSecret`调整为与`uni-id`默认`config`一致 "
						},
						{ label: "修复", content: "`vk.baseDao.deleteById` 会报`vk is not defined`的错误。 " }
					]
				},
				{
					version: "1.8.0",
					date: "2021-03-01",
					list: [
						{
							label: "重要",
							content: "升级至`uni_modules`版本",
							a: {
								text: "点击查看升级指南",
								href: "https://vkdoc.fsq.pub/client/changeGuide.html"
							}
						},
						{
							label: "重要",
							content:
								"本次更新文件有重大改动，升级成功后将变成`uni_modules`版本，下次更新框架只需要在hbx编译器中一键更新。 "
						},
						{
							label: "新增",
							content: "微信小程序服务端API ",
							a: {
								text: "点击查看",
								href: "https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html"
							}
						},
						{
							label: "新增",
							content:
								"【小程序API】`vk.userCenter.loginByWeixinPhoneNumber` 前端可以使用微信小程序一键进行手机号登录"
						},
						{
							label: "新增",
							content:
								"【小程序API】`vk.userCenter.getPhoneNumber` 前端一键获取微信小程序绑定的手机号"
						},
						{
							label: "新增",
							content: "【小程序API】`vk.userCenter.getWeixinMPqrcode` 前端一键生成带参数的小程序码"
						},
						{
							label: "新增",
							content:
								"【小程序API】`vk.userCenter.getWeixinMPscheme` 前端一键生成带参数的小程序scheme码（支持从手机短信跳转到小程序）"
						},
						{
							label: "优化",
							content: "`middleware/modules/returnUserInfoFilter` 中间件的处理逻辑。"
						},
						{
							label: "优化",
							content:
								"`javascript代码块提示.json` 输入`vk.`可以快速提示代码块 `根目录/使用帮助/代码快捷提示`"
						}
					]
				}
			]
		};
	},
	created() {
		let that = this;
		that.init();
	},
	mounted() {},
	methods: {
		// 页面数据初始化函数
		init(options = {}) {
			let that = this;
		},
		classFn(label) {
			let obj = {
				交流反馈: "add",
				新增: "add",
				升级: "add",
				重要: "fix",
				优化: "optimize",
				修复: "fix",
				废弃: "fix"
			};
			return obj[label];
		}
	},
	// 计算属性
	computed: {}
};
</script>

<style scoped>
.doc-update {
	padding: 10px 5px;
	position: relative;
	line-height: 1.5;
	color: #515a6e;
}
.u-timeline {
	padding-left: 0;
}
ol,
p,
ul {
	line-height: 1.7;
}
ol,
ul {
	padding-left: 1.2em;
}
.page li {
	font-size: 14px;
	color: #5e6d82;
	line-height: 1.8em;
}
li {
	list-style: none;
}
.u-timeline-item {
	margin: 0 !important;
	padding: 0 0 12px;
	list-style: none;
	position: relative;
}
.u-timeline-item-tail {
	height: 100%;
	border-left: 1px solid #e8eaec;
	position: absolute;
	left: 7px;
	top: 0;
}
.u-timeline-item-head {
	width: 13px;
	height: 13px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid transparent;
	position: absolute;
}
.u-timeline-item-head-blue {
	border-color: #2d8cf0;
	color: #2d8cf0;
}

.doc-update .u-timeline .u-timeline-item-content {
	top: -4px;
}
.u-timeline-item-content {
	padding: 1px 1px 10px 28px;
	font-size: 14px;
	position: relative;
	top: -3px;
}
.doc-update h2 {
	font-size: 18px;
	font-weight: 400;
	display: inline-block;
	margin: 0;
	border: none;
	color: #515a6e;
}
.page .doc-update p {
	margin: 5px 0 !important;
	font-size: 14px;
}
.page p {
	font-size: 14px;
	color: #5e6d82;
	line-height: 2em;
	margin: 15px 0 !important;
}
.doc-update code {
	margin: 8px 0 !important;
	font-size: 85%;
	background-color: #fff5f5 !important;
	border-radius: 3px;
	font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
	color: #fa795e !important;
	padding: 2px 4px;
}
.theme-default-content code {
	color: #5e6d82;
	background-color: #e6effb;
	margin: 0 4px;
	padding: 1px 5px;
	font-size: 13px;
	border-radius: 3px;
	height: 18px;
	line-height: 18px;
}
.doc-update ol ul:not([class^="u-"]),
.doc-update ul ul:not([class^="u-"]) {
	list-style-type: circle;
}
.doc-update li:not([class^="u-"]) {
	margin-bottom: 5px;
	font-size: 14px;
}
.u-timeline-item span.add {
	color: #19be6b;
	background-color: #dbf1e1;
	border-color: #71d5a1;
}
.u-timeline-item span {
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	color: #fff;
	font-size: 12px;
	border-width: 1px;
	border-style: solid;
	line-height: 1;
	margin-right: 5px;
}
a {
	color: #2d8cf0;
	background: 0 0;
	text-decoration: none;
	outline: 0;
	cursor: pointer;
	transition: color 0.2s ease;
}
.u-timeline-item span.optimize {
	color: #2979ff;
	background-color: #ecf5ff;
	border-color: #a0cfff;
}
.u-timeline-item span {
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	color: #fff;
	font-size: 12px;
	border-width: 1px;
	border-style: solid;
	line-height: 1;
	margin-right: 5px;
}
.u-timeline-item span.fix {
	color: #f90;
	background-color: #fdf6ec;
	border-color: #fcbd71;
}
.u-timeline-item span {
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	color: #fff;
	font-size: 12px;
	border-width: 1px;
	border-style: solid;
	line-height: 1;
	margin-right: 5px;
}
</style>
