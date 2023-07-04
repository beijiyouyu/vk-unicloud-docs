# 14、switch 开关

### 万能表单使用方式

#### 开关形式

```js
{ key: "switch", title: "switch类型", type: "switch", activeValue: true, inactiveValue: false },
```

#### 多选框形式

```js
{ key: "switch", title: "switch类型", type: "switch", activeValue: true, inactiveValue: false, switchType: "checkbox", label: "允许为空" },
```

### API

### 公共属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| activeText            | switch - 打开时的文字描述 | String  | - | -  |
| inactiveText            | switch - 关闭时的文字描述 | String  | - | -  |
| activeValue            | switch 打开时或checkbox选中时的值 | Boolean/Number/String  | true | -  |
| inactiveValue            | switch 关闭时或checkbox未选中时的值 | Boolean/Number/String  | false | -  |
| activeColor            | switch - 打开时的背景色 | String  | - | -  |
| inactiveColor            | switch - 关闭时的背景色 | String  | - | -  |
| validateEvent            | switch - 状态改变时是否触发表单的校验 | Boolean  | true | false |
| switchType            | 开关的类型，设置成checkbox可以将开关显示成多选框形式  | String  | - | switch 、checkbox |
| label            | checkbox - 多选框的label | String  | - | -  |

### 万能表格使用方式

```js
{ key: "switch", title: "switch类型", type: "switch", activeValue: true, inactiveValue: false, width: 100 },
```

### 表格行内动态编辑模式

```js
{
  key: "is_on_sale", title: "是否上架", type: "switch",
  activeValue: true,
  inactiveValue: false,
  width: 80,
  watch: (res) => {
    let { value, row, change } = res;
    vk.callFunction({
      url: "上架的云函数地址",
      title: value ? "上架中..." : "下架中...",
      data: {
        _id: row._id,
        is_on_sale: value
      },
      success: data => {
        change(value); // 这一步是让表格行内的开关改变显示状态
      }
    });
  }
},
```

### template 使用方式

#### 开关形式

```html
<el-switch v-model="switch" :active-value="true" :inactive-value="false"></el-switch>
```

#### 多选框形式

```html
<el-checkbox v-model="switch" :true-label="true" :false-label="false">允许为空</el-checkbox>
```
