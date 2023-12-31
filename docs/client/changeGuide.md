---
sidebarDepth: 0
---

# client端框架升级指南

## 方式一：升级整个框架

![输入图片说明](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/88cbde8c-30ac-4dbc-adbc-03fb675a34a7.png "插件更新方法.png")

* 注意事项：使用方式一更新框架是最方便的，但是如果你改动了框架内置的部分代码，你改动过的代码可能会被还原，因此如果你改动过框架内置代码，合并的时候，可以先看下改动的文件。
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

**记得重新上传公共模块和云函数**

## 方式二：只升级模块

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/c72fa719-9444-4874-93a5-7b09d440feee.jpg)

## 注意事项

* 更新 `vk-unicloud` 后，需要在 `common/vk-unicloud` 右键上传公共模块才会生效

* 若是本地调试模式，则需要重启本地服务才会生效。

* 注意事项：使用方式二更新框架不会造成你修改过的框架文件被覆盖，但是如果本次更新需要改动框架内一些文件，则需要你手动更改。
