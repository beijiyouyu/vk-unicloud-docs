# 7、radio 单选

### 万能表单使用方式
#### 静态数据方式1
#### 应用场景：选项数据为静态数据的情况。
```js
{
  key:"radio1", title:"radio类型1", type:"radio",
  itemWidth:80,
  data:[
    { value:1, label:"选项1" },
    { value:2, label:"选项2" }
  ]
}
```

**按钮形式**

```js
{
  key:"radio1", title:"radio类型1", type:"radio",
  //itemWidth:80,
  optionType:"button",
  data:[
    { value:1, label:"选项1" },
    { value:2, label:"选项2" }
  ]
}
```


#### 静态数据方式2
#### 应用场景：选项数据需要通过函数计算
```js
{
  key:"radio1", title:"radio类型1", type:"radio",
  itemWidth:80,
  data:function(){
    let list = that.list;
    return list;
  }
}
```

#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```js
{
  key:"radio4", title:"远程radio", type:"radio",
  border:true,
  itemWidth:80,
  action:"admin/select/kh/categorys",
  props:{ list:"rows", value:"_id", label:"name" },
}
```
#### 远程数据带参数方式1
```js
{
  key:"radio4", title:"远程radio", type:"radio",
  border:true,
  itemWidth:80,
  action:"admin/select/kh/categorys",
  actionData:{
    a:1
  },
  props:{ list:"rows", value:"_id", label:"name" },
}
```
#### 远程数据带参数方式2
```js
{
  key:"radio4", title:"远程radio", type:"radio",
  border:true,
  itemWidth:80,
  action:"admin/select/kh/categorys",
  actionData:function(){
    return {
      a:that.form1.data.a
    }
  },
  props:{ list:"rows", value:"_id", label:"name" },
}
```
#### 数据预处理
```js
{
  key:"radio4", title:"远程radio", type:"radio",
  border:true,
  itemWidth:80,
  action:"admin/select/kh/categorys",
  props:{ list:"rows", value:"_id", label:"name" },
  dataPreprocess:function(list){
    list.map((item, index) => {
      item.name = `${item.name}(${item._id})`
    });
    return list;
  }
}
```



### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| data            | 静态模式数据源 | Array、Function  | - | -  |
| action          | 动态模式 - 远程请求的云函数地址 | String  | - | -  |
| actionData          | 动态模式 - 远程请求的云函数时的额外参数 | Object、Function  | - | -  |
| props          | 数据源的属性匹配规则 | Object  | { list:'list', value:'value', label:'label' } | -  |
| dataPreprocess          | 动态模式 - 云函数返回的数据进行预处理 | function(list)  | - | -  |
| textColor      | 按钮形式的 Radio 激活时的文本颜色 | String  | #ffffff | -  |
| fill      | 按钮形式的 Radio 激活时的填充色和边框色 | String  | #409EFF | -  |
| optionType        | 选项形状类型 | String  | default | button  |
| border          | 是否显示边框 | Boolean  | false| true |
| itemWidth          | 选项的统一宽度（用于排版） | Number  | - | -  |
| onChange          | function(val, formData, column, index, option) | Function  | -| -  |

#### onChange 使用示例
```js
{
  key:"radio4", title:"远程radio", type:"radio",
  border:true,
  itemWidth:80,
  action:"admin/select/kh/categorys",
  props:{ list:"rows", value:"_id", label:"name" },
  onChange:function(val, formData, column, index, option){
    console.log(1,val, formData, column, index, option);
  }
}
```

### 万能表格使用方式

```js
{ 
  key: "gender", title: "性别", type: "radio", width: 120, defaultValue:0,
  data:[
    { value:1, label:"男" },
    { value:2, label:"女" },
    { value:0, label:"保密" }
  ]
}
```


### template 使用方式
#### 静态数据方式
#### 应用场景：选项数据为静态数据的情况。
```html
<vk-data-input-radio
  v-model="form1.value"
  :localdata="[
    { value:1, label:'男' },
    { value:2, label:'女' },
    { value:0, label:'保密' }
  ]"
></vk-data-input-radio>
```
#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```html
<vk-data-input-radio
  v-model="form1.value"
  :item-width="80"
  action="admin/select/kh/categorys"
  :props="{ list:'rows', value:'_id', label:'name' }"
></vk-data-input-radio>
```
