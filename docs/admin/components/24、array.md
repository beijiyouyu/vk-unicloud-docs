# 24、array 可变数组子表单

### 效果图
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/67cda695-e3f9-469f-9870-9f248b415400.png)
### 万能表单使用方式
#### 数组<对象>类型
#### 应用场景：数组内的元素是对象类型。如`[{a:1,b:true},{a:2,b:false}]`
```js
{
  key:"array", title:"数组<对象>类型", type:"array<object>", itemWidth:260,
  showAdd:true,
  showClear:true,
  showSort:true,
  // 新增一行时,该行的默认值
  defaultValue:{
    switch:true,
    text1:""
  },
  rightBtns:['copy','delete'],
  // 每行每个字段对应的渲染规则
  columns:[
    {
      key:"text1", title:"昵称", type:"text",
      isUnique:true,
      rules:[
        { required:true, message:"该项不能为空", trigger:["change","blur"] },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ["change","blur"] }
      ]
    },
    {
      key:"number1", title:"数字", type:"number",
      rules:[
        { required:true, message:"该项不能为空", trigger:["change","blur"] },
      ]
    },
    {
      key:"select1", title:"select类型", type:"select",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ],
      rules:[
        { required:true, message:"该项不能为空", trigger:["change","blur"] },
      ],
      onChange:function(val, row, column, index){
        // 此处演示根据选择的值动态改变text1的值
        row.text1 = "昵称" + val;
      }
    },
    { key:"switch", title:"switch类型", type:"switch", width:160 },
  ]
}
```

#### 数组<字符串>类型
#### 应用场景：数组内的元素是字符串类型，如`["1","2","3"]`
```js
{ key:"array1", title:"数组<字符串>类型", type:"array<string>" },
```

#### 数组<数字>类型
#### 应用场景：数组内的元素是字符串类型，如`[1,2,3]`
```js
{ key:"array2", title:"数组<数字>类型", type:"array<number>" },
```


### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| columns            | 同万能表单 | Array  | - | 和万能表单一致，同时多了一些参数，见下方 |
| itemWidth            | 每一项的固定宽度 | Number  | - | -  |
| itemMinWidth            | 每一项的最小宽度 | Number  | - | -  |
| addButtonText            | 添加按钮的文字 | String  | 新增 | -  |
| clearButtonText            | 清除按钮的文字 | String  | 清空 | -  |
| showAdd            | 是否显示添加按钮 | Boolean  | true | false |
| showClear            | 是否显示清除按钮 | Boolean  | true | false |
| showSort            | 是否显示排序按钮 | Boolean  | false | true |
| emptyText            | 没有数据时显示的文字 | String  | 暂无数据 | -  |
| defaultValue            | 每一项的默认值 | Object  | - | -  |
| rowKey            | 每一项唯一索引值 | String  | _index | -  |
| columnIndexMethod            | 序号格式化方法 | String/Function  | - | -  |
| columnIndexWidth            | 序号显示的宽度 | Number  | 80 | -  |
| columnIndexLabel            | 序号显示的标题 | String  | # | -  |
| rightBtns            | 右侧按钮显示列表 | Array  | - | ['copy','delete'] |
| leftFixed     | 序号、多选框是否固定在左侧 |Boolean  | true | false |
| rightFixed     | 操作按钮是否固定在右侧 |Boolean  | true | false |
| maxlength     | 控制最大可添加的数量 |Number  | - | - |

### columns 比万能表单新增的参数

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| isUnique            | 是否在数组中唯一 | Boolean  | false | true |
| allowRepeat            | 唯一值需要排除的，如[""] 排除空值 | Array  | - | -  |
| rules            | 该项的表单验证规则 | Array  | - | -  |
| defaultValue            | 该项的默认值 | any  | - | -  |
| onChange            | 监听如select选项改变时触发的函数，部分组件不支持 | function(val, row, column, index)  | - | -  |

### 万能表格使用方式

### 不支持


### template 使用方式

### 不支持
