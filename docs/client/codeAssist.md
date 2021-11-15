# VK框架快速开发辅助工具

___作者：`VK`___

这是一款提升开发效率的开发辅助工具，未来会新增更多的实用功能。

插件Q群: `22466457` 如有问题或建议可以在群内讨论。

## 安装方法

直接导入插件到HBX即可

> [插件安装地址](https://ext.dcloud.net.cn/plugin?id=6663)

## 功能列表

### 1、复制页面路径
在.vue文件右键，点击VK-复制vue页面路径（同时支持在打开的文件代码编辑器中右键）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/a55536a0-583b-495d-9cf0-7913c50332c9.png)

### 2、复制VK云函数路由框架内的云函数路径
在云函数文件右键，点击VK-制云函数路径（同时支持在打开的文件代码编辑器中右键）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/6c5262f5-2ed3-43da-95cf-dd558c86dfa8.png)

### 3、新建云函数
在需要新建的云函数目录右键，点击VK-新建云函数

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/32c0b56e-1e71-4c2c-8bb6-1dfc966f8342.png)

### 4、新建Dao
在dao/modules/目录右键，点击VK-新建Dao

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/066fed7d-11fe-4c72-91a3-a8a0e6390be8.png)

### 如何设置快捷键

* 复制页面路径的命令是：extension.vk_copyPagePath

* 复制云函数路径的命令是：extension.vk_copyFunctionPath

* 新建云函数的命令是：extension.vk_createCloudfunctions

* 新建Dao文件的命令是：extension.vk_createDao

* 一键生成云函数加密配置的命令是：extension.vk_createEncryptConfig（敬请期待）

点击hbx菜单工具、自定义快捷键，将下方代码复制到右侧的[]内

```js
{"key":"你自己的快捷键，如ctrl+shift+p","command":"extension.vk_copyPagePath"},
{"key":"你自己的快捷键，如ctrl+shift+f","command":"extension.vk_copyFunctionPath"},
{"key":"你自己的快捷键，如ctrl+shift+p","command":"extension.vk_createCloudfunctions"},
{"key":"你自己的快捷键，如ctrl+shift+f","command":"extension.vk_createDao"},
{"key":"你自己的快捷键，如ctrl+shift+p","command":"extension.vk_createEncryptConfig"}
```

