---
sidebarDepth: 0
---

# VK框架快速开发辅助工具

___作者：`VK`___

这是一款提升开发效率的开发辅助工具，未来会新增更多的实用功能。

插件Q群: `22466457` 如有问题或建议可以在群内讨论。

## 安装方法

直接导入插件到HBX即可

> [插件安装地址](https://ext.dcloud.net.cn/plugin?id=6663)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/13d1526d-f3c1-4626-8e4e-fe13066af7f9.png)

## 更新

点击HBX上方菜单【工具】- 【插件安装】找到插件，点击【升级】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4bbd16a1-6978-42c0-8cc0-043440698dca.png)

## 卸载

点击HBX上方菜单【工具】- 【插件安装】找到插件，点击【卸载】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/efe3d294-9a11-4495-aa4c-ebacc999c694.png)

## 功能列表

### 1、复制页面路径
在.vue文件右键，点击VK-复制vue页面路径（同时支持在打开的文件代码编辑器中右键）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/a55536a0-583b-495d-9cf0-7913c50332c9.png)

### 2、复制VK云函数路由框架内的云函数路径
在云函数文件右键，点击VK-复制云函数路径（同时支持在打开的文件代码编辑器中右键）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/6c5262f5-2ed3-43da-95cf-dd558c86dfa8.png)

### 3、复制VK云函数路由框架内的云对象下的云函数路径
需要先选中云对象内的某个函数名（双击函数名达到选中效果），再右键-VK-复制云函数（云对象）路径

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/cloudstorage/1be8a665-499e-4e00-864b-6604117ce336.png)

### 4、新建云函数
在需要新建云函数的目录右键，点击VK-新建云函数

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/32c0b56e-1e71-4c2c-8bb6-1dfc966f8342.png)

### 5、新建云对象
在需要新建云对象的目录右键，点击VK-新建云对象

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/613e4fb9-c562-46b4-8426-411797d218a6.png)

### 6、新建Dao
在dao/modules/目录右键，点击VK-新建Dao

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/066fed7d-11fe-4c72-91a3-a8a0e6390be8.png)

### 7、本地运行云函数
右键云函数，点击VK-本地运行云函数1

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/f0e2ff43-8e54-45b3-bc93-3cd5f461f38f.png)

### 8、本地运行云对象
需要先选中云对象内的某个函数名（双击函数名达到选中效果），再右键-VK-本地运行云函数

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e647fdbb-dedb-433e-b5c9-1f15b9349a1c.png)

### 9、一键生成云函数加密配置
右键需要加密的云函数根目录下的 `package.json` 文件，点击VK-一键生成云函数加密配置

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1ecf9272-0a67-4248-b8a5-216822d0bd40.png)

### 10、schema2code（vk-admin版）
右键需要生成 `.schema.json` 文件，点击VK-schema2code

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/29ead8cb-a775-43f1-a80e-1716b93e6f47.png)

### 11、快速插入日志
选中某变量名，右键，点击VK-插入日志

### 12、一键删除所有log类型日志
在编辑器文档内右键，点击VK-删除所有log类型日志

### 13、一键删除所有类型日志
在编辑器文档内右键，点击VK-删除所有类型日志

### 如何设置快捷键

| 快捷键命令                           | 说明                           |
|-------------------------------------|-------------------------------|
| extension.vk_copyPagePath           | 复制页面路径                   |
| extension.vk_copyFunctionPath       | 复制云函数路径                 |
| extension.vk_copyFunctionPathRunCloudfunctions | 本地运行云函数      |
| extension.vk_createCloudfunctions   | 新建云函数                     |
| extension.vk_createDao              | 新建Dao文件                    |
| extension.vk_createEncryptConfig    | 一键生成云函数加密配置          |
| extension.vk_schema2code            | schema2code（vk-admin版）     |
| extension.vk_insertLog              | 快速插入日志                   |
| extension.vk_deleteAllLog1          | 一键删除所有log类型日志         |
| extension.vk_deleteAllLog2          | 一键删除所有类型日志            |
| extension.vk_createCloudObject      | 新建云对象                     |


点击hbx菜单工具、自定义快捷键，将下方代码复制到右侧的[]内


```js

{
  "command": "extension.vk_insertLog",
  "key": "shift+ctrl+l",
  "mac": "shift+cmd+l",
  "when": "editorTextFocus",
  "override":true
},
{
  "command": "extension.vk_deleteAllLog1",
  "key": "shift+ctrl+d",
  "mac": "shift+cmd+d"
},
{
  "command": "extension.vk_deleteAllLog1",
  "key": "ctrl+shift+alt+d",
  "mac": "shift+cmd+d"
}
  
```
