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
					version: "1.5.0",
					date: "2021-08-11",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.5.2`" },
						{ label: "升级", content: "`element-ui` 包升级至 `2.15.5`" },
						{
							label: "新增", content: "万能表格新增方法`getTableFormatterData`(获取整个表格数据（格式化后的数据）)",
							a: {
								text: "点击查看",
								href:
									"https://vkdoc.fsq.pub/admin/2/table.html#%E8%8E%B7%E5%8F%96%E6%95%B4%E4%B8%AA%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE-%E6%A0%BC%E5%BC%8F%E5%8C%96%E5%90%8E%E7%9A%84%E6%95%B0%E6%8D%AE"
							}
						},
					]
				},
				{
					version: "1.4.2",
					date: "2021-08-06",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.4.1`" },
						{
							label: "重要", content: "适配`uni-id 3.3.3`：支持不同端用户隔离",
							a: {
								text: "点击查看",
								href:
									"https://vkdoc.fsq.pub/admin/4/userIsolation.html"
							}
						},
						{ label: "重要", content: "用户管理全面升级，支持展示不同端用户，支持`批量设置可登录的应用`" },
						{ label: "重要", content: "新增应用管理" },
					]
				},
				{
					version: "1.3.6",
					date: "2021-07-28",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.3.4`" },
						{ label: "优化", content: "万能表单 `table-select` 组件新增 `dialogWidth` 属性(控制弹窗宽度)" },
						{ label: "修复", content: "万能表单 `array<object>` 嵌套 `array<string>`时，控制台会报错的问题。" },
					]
				},
				{
					version: "1.3.0",
					date: "2021-07-09",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.3.0`" },
						{ 
							label: "重要", content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href:
									"https://vkdoc.fsq.pub/client/question/q8.html"
							}
						},
						{
							label: "重要", content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href:
									"https://vkdoc.fsq.pub/client/question/q8.html"
							}
						},
						{
							label: "重要", content: "删除了`config`公共模块，升级为`uni-config-center`模式",
							a: {
								text: "点击查看升级教程",
								href:
									"https://vkdoc.fsq.pub/client/question/q8.html"
							}
						},
						{ label: "重要", content: "万能表格搜索组件`vk-data-table-query`文档（支持搜索折叠）" },
					]
				},
				{
					version: "1.2.7",
					date: "2021-07-07",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.2.18`" },
						{ label: "新增", content: "`admin/system/menu/sys/getCascader`（cascader 级联选择组件 远程懒加载方式的云函数示例）" },
						{ label: "新增", content: "`万能表格`新增合计列的属性show-summary、summary-method 、total-option " },
						{ label: "优化", content: "权限管理页面逻辑（部分修改完成后，减少一次数据库查询）" },
						{ label: "优化", content: "菜单管理页面逻辑（部分修改完成后，减少一次数据库查询）" },
						{ label: "优化", content: "优化手机H5浏览时的部分样式。" },
						{ label: "优化", content: "去除系统内置的`初级管理员`、`中级管理员`、`高级管理员`角色" },
						{ label: "修复", content: "`万能表单`的 `remote-select` 当 showAll:true 时，actionData参数无效的问题。" },
						{ label: "修复", content: "`万能表单`的 `file-select` 已知bug。" },
					]
				},
				{
					version: "1.2.2",
					date: "2021-07-01",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.2.9`" },
						{ label: "新增", content: "`素材管理` 页面，可管理已上传的图片、视频、文件等素材。" },
						{ label: "优化", content: "`万能表单`的 `remote-select`、 `radio`、 `checkbox`新增属性 `dataPreprocess`（数据预处理函数）" },
						{ label: "优化", content: "万能表单`remote-select`、`radio`、`checkbox`新增属性`actionData`" },
						{ label: "修复", content: "`manifest.json`的 H5 配置中运行的基础路径 由 `admin` 改成 `/admin/`（规范）（如果你的前端托管只发布admin，则可以设置为空）" },
					]
				},
				{
					version: "1.1.8",
					date: "2021-07-01",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.1.17`" },
						{ label: "新增", content: "万能表单 组件 `remote-select`、`table-select`、`select`、`checkbox`、`radio` 的 `onChange` 事件 新增返回参数 `option` 值为选项的对象值" },
						{ label: "新增", content: "万能表单 `table-select` 新增 `valueFields` 属性（用于控制value的值由哪些字段组成）" },
						{ label: "新增", content: "万能表单 新增组件 `array<object>`(子表单-对象数组) " },
						{ label: "新增", content: "万能表单 新增组件 `array<string>`(字符串数组)  " },
						{ label: "新增", content: "万能表单 新增组件 `array<number>`(数字数组)  " },
						{ label: "新增", content: "万能表格 新增属性`default-sort`，支持表格默认排序 " },
						{ label: "新增", content: "用户管理新增强制重置其他账号登录密码。" },
						{ label: "优化", content: "`el-button` 组件支持 `vk-icon` 内置图标" },
						{ label: "优化", content: "`万能表格`中`time`组件正确识别10位数时间戳和13位时间戳，同时支持自定义时间g格式化" },
						{ label: "优化", content: "`云函数URL化` 路由模式下，URL重写支持只允许部分云函数可被访问。（可以做到只暴露指定的API接口，增加URL化后的安全性）" },
						{ label: "优化", content: "`万能表格`中`tag`组件当没有匹配到值时进行忽略处理。" },
						{ label: "优化", content: "`万能表格`中`time`组件正确识别10位数时间戳和13位时间戳，同时支持自定义时间g格式化" },
					]
				},
				{
					version: "1.0.9",
					date: "2021-05-28",
					list: [
						{ label: "升级", content: "`vk-unicloud-admin-ui` 包升级至 `1.0.19`" },
						{ label: "新增", content: "`万能表格`的搜索组件 新增`cascader`、`table-select`组件渲染。 " },
						{ label: "新增", content: "`万能表格`组件新增API `deleteRows`、`updateRows` （只更新表格内数据，不更新数据库）" },
						{ label: "新增", content: "`opendb-admin-menus`(菜单表) 新增属性`hidden_menu` 若为true，则菜单存在，但在左侧菜单列表中隐藏。" },
						{ label: "新增", content: '`JSON编辑器` `type: "json"` 可自由的编辑json对象 ' },
						{ label: "优化", content: "`radio` 和 `checkbox` 支持远程数据（通过云函数获取选项）" },
						{ label: "优化", content: "`remote-select`新增属性 `props`" },
						{ label: "优化", content: "`下拉选择`支持分组 " },
						{ label: "优化", content: "`上传组件` 上传视频时后缀名可能会错误的问题。 " },
						{ label: "优化", content: "`万能表单`中单选和多选组的样式排版。增加属性`itemWidth` 所有选项的最小宽度。 " },
						{ label: "优化", content: "`vk.baseDao` API的查询性能。" },
						{ label: "优化", content: "`el-button` 组件支持 `vk-icon` 内置图标" },
						{ label: "优化", content: "`万能表格`中`time`组件正确识别10位数时间戳和13位时间戳，同时支持自定义时间g格式化" },
						{ label: "优化", content: "`云函数URL化` 路由模式下，URL重写支持只允许部分云函数可被访问。（可以做到只暴露指定的API接口，增加URL化后的安全性）" },
						{ label: "优化", content: "`vk.baseDao.getTableData` 默认排序规则调整为`_id`降序，之前是`_add_time`降序" },
						{ label: "修复", content: "手机访问时，不显示用户角色权限菜单的bug。" },
						{ label: "修复", content: "`pages_plugs/permission/list`页面`sort`的`type`为`number`(原本为`text`)" },
					]
				},
				{
					version: "1.0.0",
					date: "2021-05-15",
					list: [
						{ 
							label: "重要", content: "2021-05-15 `vk-unicloud-admin` 框架正式发布。",
							a: {
								text: "点击下载",
								href:
									"https://ext.dcloud.net.cn/plugin?id=5043"
							},
							img:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/6deebd32-8075-4bdb-8e04-5839516ef4f4.png"
						},
						{
							label: "重要", content: "体验地址",
							a: {
								text: "点击进入admin框架体验地址",
								href:
									"https://vkunicloud.fsq.pub/admin/"
							}
						},
						{ label: "重要", content: "体验账号" },
						{ label: "重要", content: "高级管理员：test11（账号）123456（密码）可以执行绝大部分功能" },
						{ label: "重要", content: "初级管理员：test12（账号）123456（密码）只能执行查询功能" },
						{ label: "重要", content: "无权限用户：test13（账号）123456（密码）无admin登录权限" },
					]
				},
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
