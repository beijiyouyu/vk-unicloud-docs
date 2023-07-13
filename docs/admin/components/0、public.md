# 0、公共属性

| 参数           | 说明             | 类型   | 默认值 | 可选值 |
|---------------|------------------|--------|-------|-------|
| key           | 字段名  [查看](#key-字段名)           | String | -    | -      |
| title         | 字段显示的名称  [查看](#title-标题)     | String | -    | -      |
| type          | 组件类型    [查看](#type-组件类型)        | String | -    | -      |
| width         | 宽度      [查看](#width-宽度)          | Number | -    | -      |

**万能表单专用公共属性**

| 参数           | 说明             | 类型   | 默认值 | 可选值 |
|---------------|------------------|--------|-------|-------|
| placeholder   | 占位符   [查看](#placeholder-占位符)               | String | -    | -      |
| tips          | 下方的提示   [查看](#tips-下方的固定提示)            | String | - | -  |
| showLabel  |  是否显示label  [查看](#showLabel-是否显示label)  | Boolean  | true    | false  |
| show  | 复用时的显示规则 [查看](#show-复用时的显示规则)  | array | -  | - |
| showRule  |  自定义显示规则 [查看](#showrule-自定义显示规则)  | String、Function  | -    | -  |
| disabled      | 自定义禁用规则 [查看](#disabled-自定义禁用规则)    | Boolean、String、Function | - | -  |
| clearable     | 是否可以清空选项   [查看](#clearable-是否允许清空)      | Boolean | true | false  |
| watch         | 监听key对应的值的改变（只监听组件内部造成的值的改变） [查看](#watch-监听) | Function | - | - |

## key（字段名）

字段名，如下方代码中，`key` 为 `nickname`，代表绑定 `nickname` 字段

```js
{ key: "nickname", title: "昵称", type: "text" },
```

## title（标题）

字段显示的名称，如下方代码中，`title` 为 `昵称`，代表该字段以别名 `昵称` 显示在页面上。

```js
{ key: "nickname", title: "昵称", type: "text" },
```

## type（组件类型）

页面需要渲染的组件类型，如下方代码中，`type` 为 `text`，在 `万能表格` 中渲染为 `字符串`，在 `万能表单` 中渲染为 `input输入框`

```js
{ key: "nickname", title: "昵称", type: "text" },
```


## width（宽度）

单位是px，只能是数字，如下

```js
{ key: "nickname", title: "昵称", type: "text", width: 200 },
```

## placeholder（占位符）

占位符，类似 `input` 组件中的 `placeholder` （即用户还未输入任何内容时输入框内的提示）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/8ccbc513-8bad-4a8f-903e-e745dfdecdfd.png)

## tips（下方的固定提示）

下方的固定提示，与 `placeholder` 不同的是：不管用户是否输入信息，此提示一直都在。而 `placeholder` 是当用户输入内容后，提示就隐藏了。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/82fe7344-1aa0-4e31-9c33-8232099b700f.png)

## showLabel（是否显示label）

默认为true，当设置为false时，对应的title不显示。

## show（复用时的显示规则）

表单组件的组件 `form-type` 可以动态复用同一个表单达到显示不同字段的功能。

完整示例代码可以查看页面 `pages_template/components/form/form-dialog-2`

`show` 是一个字符串数组，`columns` 数组内每一个元素都可以单独设置 `show`

* 如果 show 字段不存在，代表显示。
* 如果 show 的某元素中包含 `form-type`的值，则代表显示。
* 如果 show 的某元素中不包含 `form-type`的值，则不显示。


## showRule（自定义显示规则）

与 show 不同，showRule 更灵活。

如 当 `login_appid_type` = 1 时，渲染 `mode` 字段，否则不渲染（支持符号 = == > >= < <= != in && || ）

提示：= 和 == 效果一样

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  showRule:"login_appid_type==1",
},
```

同时 showRule 还支持函数形式

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  showRule:(formData)=>{
    if (formData.login_appid_type == 1){
      return true;
    } else{
      return false;
    }
  }
},
```


## disabled（自定义禁用规则）

`disabled` 和 `showRule` 基本写法一致，功能区别是，`showRule` 是满足条件则显示，`disabled` 是满足条件则禁用。

如 当 `login_appid_type` = 0 时，禁用 `mode` 字段（支持符号 = == > >= < <= != in && || ）

提示：= 和 == 效果一样

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  disabled:"login_appid_type==0",
},
```

同时 disabled 还支持函数形式

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  disabled:(formData)=>{
    if (formData.login_appid_type === 0){
      return true;
    } else {
      return false;
    }
  }
},
```

## clearable（是否允许清空）

是否可以清空输入的内容或选择的选项。（个别组件没有此属性）

## watch（监听）

用于监听key对应的值的改变（只监听组件内部造成的值的改变）

使用示例如下：

```js
{
  key: "text", title: "text类型字段", type: "text",
  watch: ({ value, formData, column, index, option, $set }) => {
    // 此处演示根据选择的值动态改变text1的值
    $set("text1", `昵称${value}`);
  }
}
```


```js
{
  key: "text", title: "text类型字段", type: "text",
  watch: (res) => {
    console.log('res: ', res)
  }
}
```

**watch回调函数接收的参数**

| 参数					| 说明																				| 类型		| 默认值| 可选值|
|---------------|------------------														|--------	|-------|-------|
| value					| 当前此字段在表单内双向绑定的值							| -				| -			| -			|
| formData			| 当前整个表单的值														| Object	| -			| -			|
| column				|  此字段的属性																| Object	| -			| -			|
| index					| 在columns数组中的索引位置										| number	| -			| -			|
| option				|  部分组件有返回此值，代表当前选项的完整数据	| Object	| -			| -			|
| $set					| 等于Vue的 this.$set 函数										|Function	| -			| -			|

