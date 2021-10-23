# 前端请求云函数

#### 请求云函数 如果是点击按钮进行表单提交请求，建议加上参数 title:'请求中...'

### 回调形式 

```js
// 回调形式 success fail complete
vk.callFunction({
  url: '云函数路径',
  title:'请求中...',
  data:{
    
  },
  success:function(data){
    
  }
});
```

### promise方式

```js
// promise方式
vk.callFunction({
  url: '云函数路径',
  title:'请求中...',
  data:{
    
  }
}).then((data) => {
  
}).catch((err) => {
  
});
```

### async/await方式

```js
// async/await方式
let data = await vk.callFunction({
  url: '云函数路径',
  title:'请求中...',
  data:{
    
  }
});
``` 


### api

| 参数          | 说明                           | 类型    | 默认值  | 可选值 |
|---------------|-------------------------------|---------|--------|-------|
| url           | 请求路径，该路径实为router云函数的service目录下的路径   | String | - | - |
| data          | 请求参数 | Object  | - | -  |
| title         | 遮罩层提示语，为空或不传则代表不显示遮罩层。 | String  | - | -  |
| loading    |  自定义loading [查看详情](#loading) | Boolean、Object  |
| isRequest     | 是否使用云函数url化地址访问云函数 | Boolean  | false | true |
| needAlert     | 为true代表请求错误时，会有alert弹窗提示 | Boolean  | true | false |
| globalParamName  | 全局请求参数的名称， 如果设置了正则规则,则不需要此参数  [查看详情](#globalparamname)  | String  | - | - |
| success       | 请求成功时，执行的回调函数 | Function  | - | - |
| fail          | 请求失败时，执行的回调函数 | Function  | - | - |
| complete      | 无论请求成功与否，都会执行的回调函数 | Function  | - | - |

#### loading

loading 参数说明

* 若 `loading` 的值为 `false`，则不显示默认遮罩层提示语

* 若 `loading` 的值为 `true` ，则不显示默认遮罩层提示语，同时在请求时，会自动设置页面变量 `loading=true` ，请求完成时，自动设置页面变量 `loading=false`

* 若 `loading` 的值类型为 `Object`，如下方代码效果是：请求时，会自动执行 `that.loading2=true` ，请求完成时，会自动执行 `that.loading2=false`

```js
loading:{ that:that, name:"loading2"}
```

* name 支持. 如下方代码效果是：请求时，会自动执行 `that.page.loading=true` ，请求完成时，会自动执行 `that.page.loading=false`

```js
loading:{ that:that, name:"page.loading"}
```


#### globalParamName

globalParamName 参数说明

```js
// 需要先设置globalParamName对应的数据
/**
 * 修改请求配置中的公共请求参数
 * 若把shop-manage改成*则代表全局
 */
vk.callFunctionUtil.updateRequestGlobalParam({
  "shop-manage":{
    regExp:"^xxx/kh/",
    data:{
      shop_id : shop_id
    }
  }
});

// 此时请求若带上 globalParamName:"shop-manage" 或满足 regExp:"^xxx/kh/" 的正则规则，则请求参数会自动带上 shop_id
vk.callFunction({
  url: 'xxx/xxxxxx',
  title: '请求中...',
  globalParamName:"shop-manage",// 如果设置了正则规则,则不需要此参数
  data: {},
  success(data) {
    
  }
});
```