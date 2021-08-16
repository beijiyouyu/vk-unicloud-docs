# 17、color 颜色选择

### 万能表单使用方式

```js
{ key:"color", title:"颜色类型", type:"color" }
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| showAlpha            | 是否支持透明度选择 | Boolean  | false | true  |
| colorFormat            | 写入 v-model 的颜色的格式 | String  | hex（show-alpha 为 false）/ rgb（show-alpha 为 true） | hsl / hsv / hex / rgb  |
| predefine            | 预定义颜色 | Array  | - | -  |

### 万能表格使用方式

### 暂无


### template 使用方式
```html
<el-color-picker v-model="color"></el-color-picker>
```
