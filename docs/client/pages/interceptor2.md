---
sidebarDepth: 0
---

# 配置前端全局异常拦截器

在`app.config.js`的 `interceptor`属性新增

```js
interceptor:{
  fail:(obj)=>{
     let { vk, params, res } = obj;
     console.log("params:",params);
     console.log("res:",res);
     return true;// 返回false则取消框架内置fail的逻辑,返回true则会继续执行框架内置fail的逻辑
  }
}
```