# 12、table-select 通过表格选择

### 万能表单使用方式


```js
{
  key: "role", title: "通过表格选择(单选)", type: "table-select", placeholder:"请选择角色",
  action:"admin/system/role/sys/getList",
  columns:[
    { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
    { key:"role_id", title:"角色标识", type:"text", idKey:true }, // idKey:true 代表此字段为主键字段，若设置show:["none"],则可以在表格中隐藏该字段的显示
    { key:"comment", title:"备注", type:"text" }
  ],
  queryColumns:[
    { key: "role_name", title: "角色昵称", type: "text", width: 150, mode: "%%" },
    { key: "role_id", title: "角色标识", type: "text", width: 150, mode: "%%" }
  ]
}
```


### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明               | 类型    | 默认值  | 可选值 |
|------------------|-------------------|---------|--------|-------|
| action          | 远程请求的云函数地址 | String  |  -  |  -  |
| columns          | 表格字段显示规则    | Array  |  -  |  - |
| queryColumns      | 搜索栏字段显示规则 | Array  |  -  |  -  |
| multiple      | 是否允许多选 | Boolean  | false | true  |
| multipleLimit  | 最多可选择的数量 | Number  | - | -  |
| formData      | 默认搜索字段的值 | Object  |  -  |  -  |
| listKey          | 后端返回的list数组的字段名称 | String  |  rows  |  -  |
| showCancel      | 是否显示取消按钮 | Boolean  | true | false  |
| cancelText      | 取消按钮的文字 | String  | 关闭 | -  |
| submitText      | 确定按钮的文字 | String  | 确定 | -  |
| pageSize  | 表格分页每页显示数量 | Number  | 5 | 5、10、20、50、100、500  |
| valueFields  | 用于控制value的值由哪些字段组成 | Array  | - | - |
| onChange          | function(val, formData, column, index, option) | Function  | -| -  |
| rowHeight   | 表格行高，单位为px（特殊情况下，可能需要手动设置行高） | Number  | - | - |

#### onChange 使用示例
```js
{
  key: "role", title: "通过表格选择(单选)", type: "table-select", placeholder:"请选择角色",
  action:"admin/system/role/sys/getList",
  columns:[
    { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
    { key:"role_id", title:"角色标识", type:"text", idKey:true }, // idKey:true 代表此字段为主键字段，若设置show:["none"],则可以在表格中隐藏该字段的显示
    { key:"comment", title:"备注", type:"text" }
  ],
  queryColumns:[
    { key: "role_name", title: "角色昵称", type: "text", width: 150, mode: "%%" },
    { key: "role_id", title: "角色标识", type: "text", width: 150, mode: "%%" }
  ],
  onChange:function(val, formData, column, index, option){
    console.log(1,val, formData, column, index, option);
  }
}
```

#### 不设置 `valueFields` 时 表单绑定的值为`字符串数组形式`
```js
["001","002"]
```
#### 设置 `valueFields` 时 表单绑定的值为`对象数组形式`
#### 如 `valueFields:["_id","nickname","mobile"]` 表单绑定的值为
```js
[
  {"_id":"001","nickname":"昵称1","mobile":"手机号1"}，
  {"_id":"002","nickname":"昵称2","mobile":"手机号2"}
]
```

#### columns 参数详情
| 参数             | 说明               | 类型    | 默认值  | 可选值 |
|------------------|-------------------|---------|--------|-------|
| key          | 字段名 | String  |  -  |  -  |
| title          | 字段显示的名称    | String  |  -  |  - |
| type      | 字段渲染的组件类型 | String  |  -  |  -  |
| nameKey      | 是否将此字段的值定义为lable（类似单选框的lable和value的关系） | Boolean  | false | true  |
| idKey  | 是否将此字段的值定义为value（类似单选框的lable和value的关系） | Boolean  | false |  true  |
| 其他  | 其他参数参考万能表格（和万能表格参数一致）| -  | - |  -  |

### 注意：
1、`idKey` 和 `nameKey` 只能各设置1个。
2、 设置了`idKey:true`的字段，必须在列表中非空唯一(如主键_id)，默认`idKey`为`_id`
3、 设置了`nameKey:true`的字段，用于展示在已选择的列表中（如用户昵称字段）默认`nameKey`为`name`

#### queryColumns 参数详情
| 参数             | 说明               | 类型    | 默认值  | 可选值 |
|------------------|-------------------|---------|--------|-------|
| key          | 字段名 | String  |  -  |  -  |
| title          | 字段显示的名称    | String  |  -  |  - |
| type      | 字段渲染的组件类型 | String  |  -  |  -  |
| mode      | 查询匹配方式 | String  | = | 见下方 |
| 其他  | 其他参数参考万能表单（和万能表单参数大部分一致）| -  | - |  -  |


#### queryColumns 中 mode 参数详情
| 值         | 说明              
|------------|-------------------|
| =          | 完全匹配 |
| !=          | 不等于 |
| %%          | 模糊匹配 |
| %*          | 以xxx开头 |
| *%          | 以xxx结尾 |
| >          | 大于 |
| >=          | 大于等于 |
| <          | 小于 |
| <=          | 小于等于 |
| in          | 在数组里 |
| nin          | 不在数组里 |
| []          | 范围 arr[0] <= x <= arr[1] |
| [)          | 范围 arr[0] <= x <  arr[1]|
| (]          | 范围 arr[0] <  x <= arr[1] |
| ()          | 范围 arr[0] <  x <  arr[1] |

### 万能表格使用方式

无

### template 使用方式
```html
<vk-data-input-table-select
  v-model="role"
  action="admin/system/role/sys/getList"
  placeholder="请选择"
  :columns='[
    { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
    { key:"role_id", title:"角色标识", type:"text", idKey:true },
    { key:"comment", title:"备注", type:"text" }
  ]'
></vk-data-input-table-select>
```
