# 26、icon 图标选择

### 万能表单使用方式

```js
{ key:"icon", title:"图标", type:"icon" },
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| multiple            | 是否可多选 | Boolean  | false | true  |
| multipleLimit          | 最大多选数量 | Number  | - | -  |


### 万能表格使用方式

```js
{ key:"icon", title:"图标", type:"icon" },
```

### template 使用方式

```html
<vk-data-input-icon v-model="icon" placeholder="请选择图标"></vk-data-input-icon>
```