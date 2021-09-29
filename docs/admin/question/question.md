# 群友问题集

## vk-data-table、vk-data-form 框架里面这两个组件没有文档？

[点击查看『vk-data-table』文档](https://vkdoc.fsq.pub/admin/2/table.html)
 
[点击查看『vk-data-form』文档](https://vkdoc.fsq.pub/admin/3/form.html)


## 数据库明明有数据，但用户登录提示用户不存在？

* 1、先用admin账号登录后台，进入应用管理

因为每个人的 `DCloud Appid`是不一样的，所以你需要在应用管理中添加自己的应用（或直接修改内置的2条数据的appid即可）

DCloud Appid` 获取方法

复制`uniapp`项目根目录的`manifest.json`文件内的`appid`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e717232f-0f18-4dee-8437-5dec2c224920.png)

* 2、再进入用户管理，对需要设置的用户点击编辑，设置该用户可以登录哪些端。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/18cd54d5-bedc-4d4f-bda2-7c339c865257.png)
























<style scoped>
h1{
  font-size:1.4em;
}

h2{
  font-size:1.3em;
}

h3{
  font-size:1.1em;
}
</style>