# 9、select 下拉选择

### 万能表单使用方式
#### 静态数据方式1
#### 应用场景：选项数据为静态数据的情况。
```js
{
  key:"select1", title:"select类型", type:"select",
  data:[
    { value:1, label:"选项一" },
    { value:2, label:"选项二" }
  ]
}
```
#### 静态数据方式2
#### 应用场景：选项数据需要通过函数计算
```js
{
  key:"select1", title:"select类型", type:"select",
  data:()=>{
    let list = that.list;
    return list;
  }
}
```

### 分组用法
```js
{
  key:"select3", title:"select类型3", type:"select",
  group:true,
  data:[
    {
      label: "分组1",
      children:[
        { value:1, label:"选项一" },
        { value:2, label:"选项二" }
      ]
    },
    {
      label: "分组2",
      children:[
        { value:3, label:"选项三" },
        { value:4, label:"选项四" }
      ]
    }
  ]
}
```

### 远程数据用法

请直接查看 `remote-select` 远程下拉组件 [点击前往](https://vkdoc.fsq.pub/admin/components/10%E3%80%81remote-select.html)


### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| data            | 数据源 | Array、Function  | - | -  |
| props           | 数据源的属性匹配规则 | Object  | { value:'value', label:'label', children:'children' } | -  |
| multiple        | 是否允许多选 | Boolean  | false | true  |
| multipleLimit   | 最多可选数量 | Number  | - | -  |
| group          | 是否需要分组 | Boolean  | false| true  |
| onChange          | function(val, formData, column, index, option) | Function  | -| -  |

#### onChange 使用示例
```js
{
  key:"select1", title:"select类型", type:"select",
  data:[
    { value:1, label:"选项一" },
    { value:2, label:"选项二" }
  ],
  onChange:(val, formData, column, index, option)=>{
    console.log(1,val, formData, column, index, option);
  }
}
```

### 万能表格使用方式

```js
{ 
  key: "gender", title: "性别", type: "select", width: 120, defaultValue:0,
  data:[
    { value:1, label:"男" },
    { value:2, label:"女" },
    { value:0, label:"保密" },
  ]
}
```


### template 使用方式
### 常规用法
```html
<vk-data-input-select
  v-model="form1.value1"
  :localdata='[
    { value:1, label:"选项一" },
    { value:2, label:"选项二" }
  ]'
  placeholder="请选择"
></vk-data-input-select>
```
### 分组用法
```html
<vk-data-input-select
  v-model="form1.value2"
  :group="true"
  :localdata='[
    {
      label: "分组1",
      children:[
        { value:1, label:"选项一" },
        { value:2, label:"选项二" }
      ]
    },
    {
      label: "分组2",
      children:[
        { value:3, label:"选项三" },
        { value:4, label:"选项四" }
      ]
    }
  ]'
  placeholder="请选择"
></vk-data-input-select>
```