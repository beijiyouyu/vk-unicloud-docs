# 万能表格

#### 核心思想：通过 JSON 配置渲染规则

## 基础用法
```html
<vk-data-table :data="table1.data" :columns="table1.columns"></vk-data-table>
```
```js
export default {
  data() {
    // 页面数据变量
    return {
      table1:{
        // 表格数据
        data:[],
        // 表格字段显示规则
        columns:[
          { key:"_id" , title:"用户ID" , type:"text" , width:200 },
          { key:"username" , title:"用户名" , type:"text" , width:200 },
          { key:"nickname" , title:"用户昵称" , type:"text" , width:200 },
          { key:"mobile" , title:"手机号" , type:"text" , width:200 },
          { key:"comment" , title:"备注" , type:"text" , minWidth:200 },
        ]
      }
    };
  }
};
```

## 进阶用法

请直接看示例文件 `/pages_template/components/table/table-easy`

# API

## 属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| action           | 动态模式 - vk框架下的云函数地址            | String | 无      | - |
| auto-action       | 动态模式 - 是否组件加载完毕后自动运行action | Boolean  | 无 | -  |
| query-form-param   | 动态模式 - 请求参数（表格查询参数） | Object  | {} | -  |
| data-preprocess          | 动态模式 - 云函数返回的数据进行预处理 | function(list)  | - | -  |
| is-request    | 动态模式 - 是否是http请求模式 | Boolean  | false | true |
| props    | 动态模式 - 渲染数据的配置选项 | Object  | [查看http请求模式](#http请求模式)  | - |
| data             | 静态模式 - 列表数据 | Array  | 无 | -  |
| total            | 静态模式 - 总记录数 | Number  | 无 | -  |
| columns          | 通用 - 字段显示规则 | Array  | [] | [查看columns](#columns)   |
| height           | 通用 - table的高度 | Number  | 无 | -  |
| max-height        | 通用 - table的最大高度 | Number  | 无 | -  |
| row-height        | 通用 - 行高 | Number  | 无 | -  |
| top          | 通用 - margin-top的高度 | Number  | 10 | -  |
| selection          | 通用 - 显示多选框 | Boolean  | false | true |
| rowNo          | 通用 - 显示序号 | Boolean  | false | true |
| pagination     | 通用 - 显示分页器 | Boolean  | false | true |
| page-size       | 通用 - 每页显示数量 | Number  | 10 | - |
| page-sizes      | 通用 - 每页显示数量选择列表 | Array  | [1, 5, 10, 20, 50, 100, 1000] | - |
| right-btns      | 通用 - 右侧显示的按钮列表 | Array  | [] | [查看right-btns](#right-btns)  |
| right-btns-type      | 通用 - 右侧显示的按钮类型 | String  | "button" | "text" |
| right-btns-more      | 通用 - 右侧更多按钮 | Array  | [] | [查看right-btns-more](#right-btns-more) |
| custom-right-btns      | 通用 - 自定义右侧按钮 | Array  | [] | [查看custom-right-btns](#custom-right-btns) |
| row-key      | 通用 - 行数据的 Key | Function,String  | "_id" | - |
| empty-text      | 通用 - 空数据时显示的文本内容 | String  | "暂无数据" | - |
| default-expand-all      | 通用 - 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | Boolean  | false | true |
| tree-props      | 通用 - 渲染嵌套数据的配置选项 | Object  | {children: 'children', hasChildren: 'hasChildren'} | - |
| border     | 通用 - 是否带有纵向边框 | Boolean  | false | true |
| stripe     | 通用 - 是否为斑马纹 | Boolean  | false | true |
| size     | 通用 - Table 的尺寸 | String  | 无 | medium / small / mini |
| show-header     | 通用 - 是否显示表头 | Boolean  | true | false |
| highlight-current-row     | 通用 - 是否要高亮当前行 | Boolean  | true | false |
| detail-dialog-width     | 通用 - 详情弹窗的宽度 | Number,String  | "830px" | - |
| multiple     | 通用 - 可多选 |Boolean  | true | false |
| default-sort     | 默认排序规则 |Object  | - | [查看default-sort](#default-sort)  |
| show-summary     | 通用 - 是否需要显示合计行 |Boolean  | false | true |
| summary-method     | 通用 - 自定义合计的计算函数（详情见下方） |Function  | - | [查看summary-method](#summary-method)  |
| total-option     | 通用 - 需要自动统计的行（详情见下方） |Array  | - | - |


### default-sort
| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| name           | 需要排序的字段名            | String | -      | - |
| type           | 排序类型            | String | asc（升序）  | desc（降序） |

### columns
columns 是一个数组，数组内每个元素有以下属性

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   类型    | String  | 无    | [查看type](#type)   |
| width  |   宽度    | Number  | 无    | -  |
| minWidth  | 最小宽度（设置此值会自动填充宽度） | Number  | 无    | -  |
| alignt  |  对其方式 | String  | center    | left 、right  |
| headerAlign  |  表头对其方式 | String  | center    | left 、right  |
| sortable  |  是否是排序字段 | String  | custom  | true 、false  |
| fixed  | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean  | 无  | true、left、right  |
| show  | 显示规则，当为"detail" 代表只在详情弹窗时显示，"row" 代表只在表格内显示，"none" 代表均不显示 | string 、 array | ["detail","row"]  | "detail"、"row"、"none"  |
| defaultValue  |   默认值  | String  | 无  | -  |
| formatter  | 自定义格式化函数 | function(val, row, column, index)  | -  | -  |

### type
type（类型）
```js
table1:{
  columns:[
    { key: "nickname", title: "昵称", type: "text", width: 120, defaultValue:"未设置昵称", },
    { key: "avatar", title: "头像", type: "avatar", width: 80 },
    { key: "images", title: "图片", type: "image", width: 120 },
    { key: "rate", title: "评分", type: "rate", width: 120 },
    { key: "switch", title: "开关", type: "switch", width: 120 },
    { key: "icon", title: "图标", type: "icon", width: 120 },
    { 
      key: "type", title: "类型", type: "tag", width: 120, size: "mini",
      data:[
        { value:1, label:"收入", tagType:"success" },
        { value:2, label:"支出", tagType:"danger" }
      ]
    },
    { key: "_add_time", title: "添加时间", type: "time", width: 160, valueFormat:"yyyy-MM-dd hh:mm:ss" },
    { key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
    { 
      key: "nickname", title: "html渲染", type: "html", defaultValue: "未设置",
      formatter: function(val, row, column, index) {
        let str = `<text>${val}</text>（审核通过）`;
        return str;
      }
    },
    { key: "balance", title: "余额", type: "money", width: 120 },
    { key: "percentage", title: "占比", type: "percentage", width: 120 },
    { key: "address", title: "地址", type: "address", width: 120 },
    { key: "userInfo", title: "用户", type: "userInfo", width: 120 },
    { 
      key: "", title: "分组显示", type: "group", minWidth: 290, align:"left",
      columns:[
        { key: "_id", title: "ID", type: "text" },
        { key: "avatar", title: "头像", type: "avatar" },
        { key: "nickname", title: "昵称", type: "text" },
      ],
    },
    { 
      key: "object1", title: "对象字段", type: "object", width: 180, align:"left",
      columns:[
        { key: "key1", title: "对象内字段1", type: "text" },
        { key: "key2", title: "对象内字段2", type: "text" },
      ],
    },
    { 
      key: "gender", title: "性别", type: "radio", width: 120, defaultValue:0,
      data:[
        { value:1, label:"男" },
        { value:2, label:"女" },
        { value:0, label:"保密" },
      ]
    },
    { 
      key: "gender", title: "性别", type: "select", width: 120, defaultValue:0,
      data:[
        { value:1, label:"男" },
        { value:2, label:"女" },
        { value:0, label:"保密" },
      ]
    },
    { 
      key: "checkbox", title: "多选字段", type: "checkbox", width: 120, defaultValue:1,
      data:[
        { value: 1, label: "选项1" },
        { value: 2, label: "选项2" },
      ]
    }
  ]
}
```


### right-btns
right-btns（右侧按钮列表）
```html
<vk-data-table
  :right-btns="['detail_auto','update','delete','more']"
></vk-data-table>
```
##### right-btns数组内的可选值有
| 可选值   | 说明                    |
|----------|------------------------|
| detail     | 点击后触发detail事件 |
| detail_auto     | 点击后自动弹出详情页 |
| update     | 点击后触发update事件 |
| delete     | 点击后触发delete事件 |
| more     | 与 rightBtnsMore 搭配使用|

### right-btns-more 
right-btns-more（右侧更多按钮点击后显示的按钮列表）
```html
<vk-data-table
  right-btns="['detail_auto','update','delete','more']"
  :right-btns-more="table1.rightBtnsMore"
></vk-data-table>

```

```js
data() {
  return {
    table1:{
      rightBtnsMore:[
        {
        title:'按钮1',
          onClick:function(item){
          
          }
        },
        {
          title:'按钮2',
            onClick:function(item){
        
          }
        }
      ]
    }
  }
}

```
### custom-right-btns
custom-right-btns（右侧自定义按钮）
```html
<vk-data-table
  :custom-right-btns="[
     { title: '按钮1', type: 'primary', icon: 'el-icon-edit' },
     { title: '按钮2', type: 'success', icon: 'el-icon-edit' },
     { title: '按钮3', type: 'warning', icon: 'el-icon-edit' },
     { title: '按钮4', type: 'danger', icon: 'el-icon-edit' }
  ]"
  @custom-right-btns="customRightBtns"
></vk-data-table>
```
```js
methods: {
  customRightBtns(item, btn){
		
  }
}

```

### http请求模式
#### props 对象属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| rows           | 表格数据源的键名            | String | rows      | - |
| total           | 总记录条数的键名           | String | total  | - |
| pageIndex       | 查询时当前第几页的键名      | String | pageIndex  | - |
| pageSize        | 查询时每页显示几条的键名    | String | pageSize  | - |
| formData        | 查询表单的数据源的键名      | String | formData  | - |

#### 示例代码

```html
<vk-data-table
  ref="table1"
  action="https://www.xxx.com/xxx/xxx"
  :is-request="true"
  :props="{ rows: 'rows', total: 'total', pageIndex: 'pageIndex', pageSize: 'pageSize', formData: 'formData' }"
  :columns="table1.columns"
  :query-form-param="queryForm1"
></vk-data-table>
```


## 事件

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| selection-change     | 多选框状态发生变化时   |  rows  |
| current-change    | 点击(高亮)某一行          |  row    |
| row-click | 单击某一行 |   row, column, event  |
| row-dblclick  | 双击某一行 |    row, column, event     |
| row-contextmenu | 鼠标右键某一行 |   row, column, event  |
| cell-click | 单击某一个单元格 |    row, column, cell, event     |
| cell-dblclick | 双击某一个单元格 |    row, column, cell, event     |
| header-click | 某一列的表头被点击时 |    column, event     |
| header-contextmenu | 某一列的表头被鼠标右键点击时 |    row, btn    |
| custom-right-btns | 自定义右侧按钮点击事件 |    column, event     |
| 其他 | 其他element自带的事件大部分也支持 |    -     |


## 方法

#### 通过 this.$refs.table1.xxx(); 方式调用
| 方法名   | 说明                    |
|----------|------------------------|
| refresh     | 刷新 |
| search     | 查询（搜索） |
| getCurrentRow     | 获取当前选中的行的数据 |
| getTableData     | 获取整个表格数据 |
| getTableFormatterData     | 获取整个表格数据（格式化后的数据） |
| getMultipleSelection     | 获取多选框的数据 |
| showDetail     | 显示详情页 |
| closeDetail     | 关闭详情页 |
| exportExcel     | 导出xls表格文件 |
| deleteRows     | 删除指定的行（不删数据库数据） |
| updateRows     | 更新指定的行数据（不更新据库数据） |


### 删除指定的行（不删数据库数据）
```js
that.$refs.table1.deleteRows({
  ids:["60acf6248a69dc00018d8520"],
  success:function(){
    
  }
});
```
### 更新指定的行数据（不更新据库数据）
```js
that.$refs.table1.updateRows({
  mode:"update", // update 局部字段更新 set 覆盖字段更新
  rows:[
    { _id:"60acf6248a69dc00018d8520", remark:"被修改了", money:10000 }
  ],
  success:function(){
    
  }
});
```

### 导出表格显示的数据
```js
that.$refs.table1.exportExcel();
```
### 自定义导出表格数据
```js
that.$refs.table1.exportExcel({
  fileName : "表格数据",
  original : false,
  columns: [
    { key:"_id", title:"id", type:"text" },
    { key:"money", title:"金额", type:"money" },
  ]
});
```
### 导出自定义数据
```js
that.$refs.table1.exportExcel({
  fileName:"文件名称",
  data:[
    { a:1,b:2},
    { a:11,b:22}
  ],
  columns:[
    { key:"a", title:"标题a", type:"text" },
    { key:"b", title:"标题b", type:"text" },
  ]
});
```
### 获取整个表格数据（格式化后的数据）
```js
let info = that.$refs.table1.getTableFormatterData();
console.log(info);
```
### 获取整个表格数据（格式化后的数据,key为中文）
```js
let info = that.$refs.table1.getTableFormatterData({
  key:"title"
});
console.log(info);
```

        
## 插槽
#### columns中的每一个key都是插槽的名称
#### 如重写`gender`字段的渲染
* 注意: 只需要把下方`<template></template>`标签和标签内的代码复制到你页面上的`<vk-data-table></vk-data-table>`标签内即可

```html
<vk-data-table>

  <!-- v-slot:gender 中的 gender 对应 columns中的 key, row对应 这一行的数据源 -->
  <template  v-slot:gender="{ row, column, index }">
    <view>我是插槽：{{ row.gender }}</view>
  </template>
  
</vk-data-table>
```


## 万能表格搜索组件 


```html
<!-- 表格搜索组件开始 -->
<vk-data-table-query
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  @search="search"
></vk-data-table-query>
<!-- 表格搜索组件结束 -->

<!-- 表格组件开始 -->
<vk-data-table
 ...其他参数
  :query-form-param="queryForm1"
 ...其他参数
></vk-data-table>
<!-- 表格组件结束 -->
```


#### 折叠抽屉弹窗模式
```html
<vk-data-table-query
  ref="tableQuery1"
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  :main-columns="['user_id','_add_time']"
  @search="search"
></vk-data-table-query>
```

```js
queryForm1:{
  // 查询表单数据源，可在此设置默认值
  formData:{

  },
  // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
  columns:[
    { key:"nickname", title:"昵称", type:"text", width:160, mode:"%%" },
    { key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
  ]
}

```


### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| v-model            | 绑定查询表单数据源 | Object  | - | -  |
| columns            | 字段渲染规则  | Array  | - |  [查看columns](#columns)   |
| show-reset            | 是否显示重置按钮 | Boolean  | false | true |
| main-columns            | 在页面上直接显示的字段名数组，此值若不为空，则会显示高级搜索按钮 | Array  | - | -  |
| drawer            | 高级搜索的抽屉弹窗的属性（详情见element的drawer文档）| Object | -  |
| search-text            | 搜索按钮的文本 | String  | 搜索 | -  |
| senior-search-text            | 高级搜索按钮的文本 | String  | 高级搜索 | -  |

### columns
queryForm1.columns 参数说明
columns属性的写法与万能表单相似(但部分表单组件搜索不支持)

[万能表单文档](https://vkdoc.fsq.pub/admin/3/form.html)


| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   组件类型    | String  | 无    | -  |
| width   |  组件宽度    | Number  | 无    | -  |
| placeholder   |   输入前的提示    | String  | - | -  |
| mode   |  查询模式    | String  | = | [查看mode](#mode)  |
| fieldName   |  数据库字段名称，默认=key的值    | String  | key的值  | -  |
| lastWhereJson   |  是否是连表后的where条件 | Boolean  | false | true  |
| hidden   |  是否隐藏该字段 | Boolean  | false | true  |
| show     | 显示规则,page代表显示在页面上，drawer代表显示在高级搜索中 | Array  | ["page"] |  ["page","drawer"] |


### fieldName 参数的用处
##### 如余额按金额范围查询
```js
columns:[
  { 
    key:"balance1", title:"金额范围", type:"money", width:160, placeholder:"请输入最小金额", 
    mode:">=", fieldName:"balance", 
  },
  { 
    key:"balance2", title:"-", type:"money", width:160, placeholder:"请输入最大金额", 
    mode:"<=", fieldName:"balance", 
  }
]
```
### lastWhereJson 参数的用处
##### 如userInfo是连表字段的as的值，想要根据 userInfo.mobile 进行查询
```js
columns:[
  { 
    key:"mobile", title:"手机号", type:"text", width:160,
    mode:"=", fieldName:"userInfo.mobile", lastWhereJson:true
  }
]
```

### mode
#### queryForm1.columns 中 mode 参数详情
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

## vk.baseDao.getTableData

用法与vk.baseDao.selects相似，区别是 vk.baseDao.getTableData  多了一个data参数

[vk.baseDao.selects万能连表文档](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html)

### data 参数介绍
data参数的作用是让前端可以直接传查询条件和排序条件。同时为了控制安全性，getTableData的whereJson参数可以设置强制where条件
#### Ta的优势是：
* 1、条件查询很方便，且减少了很多代码量。
* 2、在云函数端写强制条件，不用担心用户看到不该看的数据。
* 3、代码结构比较清晰，容易阅读与理解。

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| pageIndex        | 第几页            | Number | 1      | - |
| pageSize         | 每页查询数量 | Number  | - | -  |
| sortRule         | 排序规则 | Array  | - | -  |
| formData         | 查询条件数据源 | Object  | - | -  |
| columns          | 静态模式 - 总记录数 | Array  | - | -  |

### 云函数代码示例
```js
// 通常data是前端传过来的数据
let data = {
  pageIndex:1,
  pageSize:20,
  sortRule:[
    { name:"_add_time", type:"desc" }
  ],
  formData:{
    
  },
  columns:[
    { key:"nickname", title:"昵称", type:"text", width:160, mode:"%%" },
    { key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
  ]
};
let dbName = "表名";
vk.baseDao.getTableData({
  dbName,
  data,
  // 强制where条件，比如这里设置了只能查询当前登录用户的数据
  whereJson: {
    user_id:uid
  }, 
  // 强制字段显示规则
  fieldJson: {
    
  }, 
  // 默认排序规则
  sortArr: [
    
  ], 
  // 副表列表
  foreignDB:[
    
  ], 
  // 聚合结束后的where条件
  lastWhereJson: {
    
  } 
});

```



## 万能表格合计列的示例
### 简单模式
```html
<vk-data-table
  ...其他属性
  :show-summary="true"
  :total-option=" [
     { label: '标题1（此为table1.columns中title的值）', 'unit': '单位' }
  ]"
></vk-data-table>
```
#### summary-method
### 自定义模式
#### 自定义函数方法，如果涉及到金额，则需要使用summary-method属性进行自定义，代码如下
```html
<vk-data-table
  ...其他属性
  :show-summary="true"
  :summary-method="summaryMethod"
></vk-data-table>
```

```js
summaryMethod({ columns, data }) {
  const means = ['']; // 合计
  // 需要进行合计的字段
  let totalOption = [
    { key: 'money', 'unit': '元', type:"money" },
  ];
  for(let columnIndex=0; columnIndex<columns.length; columnIndex++){
    let column = columns[columnIndex];
    if (columnIndex === 0) {
      means.push('合计');
    } else {
      let columnItem = vk.pubfn.getListItem(totalOption, "key", column.property);
      if(!columnItem){
        continue;
      }
      const values = data.map(dataItem => Number(dataItem[column.property]));
      // 合计
      if (!values.every(value => isNaN(value))) {
        means[columnIndex] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        if(columnItem.type === "money"){
          // 金额字段的特殊处理
          let money = vk.pubfn.priceFilter(means[columnIndex]);
          means[columnIndex] = `<span style="color: red">${money}${columnItem.unit}</span>`;
        }else{
          means[columnIndex] = `<span style="color: red">${means[columnIndex]}${columnItem.unit}</span>`;
        }
      } else {
        // 如果不是数字类型,则直接为空
        means[columnIndex] = "";
      }
    }
  }
  return [means];
}
```