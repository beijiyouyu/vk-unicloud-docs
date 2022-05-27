# admin框架升级指南

### 目前升级框架方式：

## 方式一：升级整个框架(包含模块) 

#### HBX编译器版本需 `3.1.4` 或更高

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/80fd47c9-686f-4237-ae71-7170008f3102.png)

#### 注意事项：使用方式一更新框架是最方便的，但是如果你改动了框架内置的部分代码，你改动过的代码可能会被还原，因此如果你改动过框架内置代码，合并的时候，可以先看下改动的文件。
```js
如：
1、app.config.js
2、App.vue
3、main.js
4、pages.json
5、manifest.json
6、static_menu目录
7、store目录
等等
升级前一定要进行文件对比！
```
* 1、按上图进行操作
* 2、更新完成后，在项目根目录重新执行下 `npm i`
* 3、重新上传公共模块和云函数（如果 `admin端` 是绑定的 `client端`，则去 `client端` 上传即可）（`client端` 也执行下更新 `uni_modules` 模块）
* 4、重启hbx编译器

## 方式二：只升级模块

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/2daf712c-ae06-4f8b-8cc3-767737265361.png)
* 1、按上图进行操作

* 2、修改 `package.json` 内的npm包版本(如果npm包有更新的话)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/14a55ee2-f811-4619-8d53-19d3ec998566.png)

* 3、在项目根目录重新执行下 `npm i`(如果npm包有更新的话)

* 4、重新上传公共模块和云函数（如果 `admin端` 是绑定的 `client端`，则去 `client端` 上传即可）（`client端` 也执行下更新 `uni_modules` 模块）

* 5、重启hbx编译器

## 注意

* 更新 `vk-unicloud` 后,需要在 `common/vk-unicloud` 右键上传公共模块才会生效

* 若是本地调试模式，则需要重启本地服务才会生效。

* 注意事项：使用方式二更新框架不会造成你修改过的框架文件被覆盖，但是如果本次更新需要改动框架内一些文件，则需要你手动更改。

#### 如升级过程中遇到问题，请加群：`22466457` 你的问题可在群内解决。
