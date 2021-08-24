# 万能表单

#### 核心思想：通过 JSON 配置渲染规则

如：渲染一个input输入框,只需要如下代码

 ```js
{ key:"nickname", title:"昵称", type:"text" }
```

渲染一个单选框组,只需要如下代码

 ```js
{
  key:"gender", title:"性别", type:"radio",
  data:[
    { value:1, label:"男" },
    { value:2, label:"女" }
  ]
}
```

#### 你甚至还可以通过 `表单可视化拖拽工具` 直接生成`vk框架代码` [点击体验](https://vkunicloud.fsq.pub/vk-form-visualizer/)

## 基础用法
vk-data-dialog为弹窗表单，去掉则为表单页面

```html
<vk-data-dialog
  v-model="form1.props.show"
  title="表单标题"
  width="600px"
  mode="form"
>
  <vk-data-form
    ref="form1"
    v-model="form1.data"
    :action="form1.props.action"
    :columns="form1.props.columns"
    :rules="form1.props.rules"
    :form-type="form1.props.formType"
    :loading.sync="form1.props.loading"
    :auto-close="true"
    label-width="140px"
    @success="onFormSuccess"
  ></vk-data-form>
</vk-data-dialog>
```
js部分
```js
export default {
  data() {
    // 页面数据变量
    return {
      // 表单相关开始-----------------------------------------------------------
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {
          radio: 1,
          checkbox : [1,2]
        },
        // 表单属性
        props: {
          // 表单请求地址
          action: "template/test/sys/test",
          // 表单字段显示规则
          columns: [
            { key: "text", title: "text类型字段", type: "text" },
            { key: "number", title: "number类型字段", type: "number" },
            { 
              key: "radio", title: "radio类型字段", type: "radio",
              data: [
                { value: 1, label: "选项1" },
                { value: 2, label: "选项2" },
              ]
            },
            { 
              key: "checkbox", title: "checkbox类型字段", type: "checkbox",
              data: [
                { value: 1, label: "选项1" },
                { value: 2, label: "选项2" },
              ]
            },
            { key: "switch", title: "switch类型字段", type: "switch" }
          ],
          // 表单验证规则
          rules: {
            text: [
              { required: true, message: "text不能为空", trigger: "change" },
            ]
          },
          // add 代表添加 update 代表修改
          formType: "",
          // 表单是否在请求中
          loading: false,
          // 是否显示表单1 的弹窗
          show: false
        }
      },
      // 表单相关结束-----------------------------------------------------------
    };
  }
}
```

## 进阶用法

请直接看示例文件 `/pages_template/components/form/form-pro`

# API

## 属性

| 参数             | 说明                   | 类型    | 默认值  | 可选值 |
|------------------|-----------------------|---------|--------|-------|
| v-model           | 表单数据源            | Object | {}      | - |
| rules       | 表单验证规则 | Object  | 无 | -  |
| action   | vk框架云函数地址 | String  | 无 | -  |
| before-action   | action请求前拦截器 | Function  | 无 | -  |
| is-request    | 是否是http请求模式[查看http请求模式](#http请求模式) | Boolean  | false | true |
| form-type       | 表单类型，用于复用表单 | String  | 无 | -  |
| columns          | 通用 - 字段规则 | Array  | [] | [查看columns](#columns)  |
| loading           | 表单是否在请求中 | Boolean  | false | true  |
| label-width        | 左侧label宽度 | String,Number  | "80px" | -  |
| width     | 表单宽度 | Number,String  | 无 | - |
| footer-show          | 底部按钮是否显示 | Boolean  | true | false  |
| footer-center          | 底部按钮是否居中 | Boolean  | true | false |
| show-cancel          | 是否显示取消按钮 | Boolean  | true | false |
| cancel-text     | 取消按钮的文字 | String  | 关 闭 | - |
| submit-text       | 确定按钮的文字 | String  | 确 定 | - |
| submit-disabled      | 确定按钮是否禁用 | Boolean  | false | true |
| auto-close      | 表单请求成功后自动关闭 | Boolean  | true | false |
| auto-reset      | 自动重置表单 | String  | Boolean  | true | false |
| label-position      | 对齐方式 | String  | right | right left top |
| max-height      | 表单最大高度 | String  | 无 | - |
| size      | 表单内组件的size | String  | 无 | - |
| label-suffix      | label的后缀 | String  | 无 | - |
| disabled      | 禁用表单 | Boolean  | false | true |
| clearable      | 表单内的组件有清空效果 | Boolean  | true | false |

### columns
columns是一个数组，数组内每个元素有以下属性，每个元素代表一个表单元素

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   类型    | String  | 无    |  [查看type](#type)  |
| width  |   宽度    | Number  | 无    | -  |
| tips  | 下方的提示 | String  | 无    | -  |
| disabled  |  是否禁用 | Boolean  | false | true  |
| showLabel  |  是否显示label | Boolean  | true    | false  |

### type
type类型（更多请见：`/pages_template/components/form/form-pro`）

```js
form1:{
  // 表单请求数据，此处可以设置默认值
  data: {
    
  },
  // 表单属性
  props:[
    { key:"", title:"基础字段", type:"bar-title" },
    { key:"text", title:"单行文本", type:"text" },
    {
      key:"textarea", title:"多行文本", type:"textarea",
      autosize:{ minRows:4, maxRows:10 },
      maxlength:200,
      showWordLimit:true,
    },
    { key:"money", title:"money类型", type:"money", tips:"100 = 1元。页面显示的是1，实际的值是100，请看右上角表单数据的值。" },
    { key:"number", title:"number类型", type:"number", precision:2, tips:"number类型值会转为数字，可以指定小数位数" },
    { key:"number2", title:"计数器类型", type:"number", controls:true, precision:0, min:5, max:100, placeholder:"请输入数字" },
    { key:"percentage", title:"百分比类型", type:"percentage", precision:0, tips:"页面显示的是1，实际的值是0.01，请看右上角表单数据的值。" },
    { key:"discount", title:"折扣类型", type:"discount", tips:"页面显示的是1，实际的值是0.1，请看右上角表单数据的值。" },
    { key:"text2", title:"文本2", type:"text",prepend:"前置文字",append:"后置文字",prefixIcon:"el-icon-user" },
    // 选择型字段
    { key:"", title:"选择型字段", type:"bar-title" },
    {
      key:"radio1", title:"radio类型1", type:"radio",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    {
      key:"checkbox1", title:"checkbox类型1", type:"checkbox",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    {
      key:"select1", title:"select类型1", type:"select",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    { key:"address", title:"address类型", type:"address" },
    { key:"cascader2", title:"云端数据级联", type:"cascader",
      action:"admin/system/permission/sys/getAll",
      props:{
        list:"rows",
        value:"permission_id",
        label:"label",
        children:"children",
        multiple:true
      }
    },
    { key:"switch", title:"switch类型", type:"switch" },
    { key:"rate", title:"评分类型", type:"rate", allowHalf:false },
    { key:"slider", title:"滑块类型", type:"slider" },
    { key:"color1", title:"颜色类型1", type:"color" },
    { key:"color2", title:"颜色类型2", type:"color", showAlpha:true },
    // 文件上传
    { key:"", title:"文件上传", type:"bar-title" },
    { key:"image1", title:"image类型", type:"image", limit:6 },
    // 日期型字段
    { key:"", title:"日期型字段", type:"bar-title" },
    { key:"date", title:"date类型", type:"date", dateType:"date", tips:"可选择年月日" },
    { key:"dateTime", title:"dataTime类型", type:"date", dateType:"datetime", tips:"可选择年月日时分秒" },
    { key:"dateArr", title:"date类型范围", type:"date", dateType:"daterange" },
    { key:"dataTimeArr", title:"dataTime类型范围", type:"date", dateType:"datetimerange" },
    // 时间型字段
    { key:"", title:"时间型字段", type:"bar-title" },
    { key:"time1", title:"time类型1", type:"time" },
    { key:"timeArr1", title:"time类型范围1", type:"time", isRange:true },
    // 数据库联动字段
    { key:"", title:"数据库联动字段", type:"bar-title" },
    {
      key:"user_id", title:"用户选择器", type:"remote-select", placeholder:"请输入用户账号/昵称",
      action:"admin/select/kh/user",
    },
    {
      key: "user_id", title: "选择用户", type: "table-select", placeholder:"选择",
      action:"admin/system/user/sys/getList",
      columns:[
        { key:"nickname", title:"用户昵称", type:"text", nameKey:true },
        { key:"_id", title:"用户标识", type:"text", idKey:true },
        { key:"mobile", title:"手机号", type:"text" },
      ]
    },
    {
      key: "role1", title: "通过表格选择(单选)", type: "table-select", placeholder:"请选择角色",
      action:"admin/system/role/sys/getList",
      columns:[
        { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
        { key:"role_id", title:"角色标识", type:"text", idKey:true }
      ],
    },
    {
      key: "role2", title: "通过表格选择(多选)", type: "table-select", placeholder:"请选择角色",
      action:"admin/system/role/sys/getList",
      columns:[
        { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
        { key:"role_id", title:"角色标识", type:"text", idKey:true }
      ],
      multiple:true
    },
    // 布局
    { key:"", title:"横向布局", type:"bar-title" },
    { key:"", title:"", type:"group", justify:"start",
      columns:[
        { key:"text1", title:"单行文本1", type:"text" },
        { key:"text2", title:"单行文本2", type:"text" },
        { key:"text3", title:"单行文本3", type:"text" },
        { key:"text4", title:"单行文本4", type:"text" },
      ]
    },
    { key:"", title:"", type:"group", justify:"start",
      columns:[
        { key:"text5", title:"单行文本5", type:"text" },
        { key:"text6", title:"单行文本6", type:"text" },
        { key:"text7", title:"单行文本7", type:"text" },
        { key:"text8", title:"单行文本8", type:"text" },
      ]
    },
    // 特殊类型
    { key:"", title:"特殊类型", type:"bar-title" },
    { key:"editor", title:"富文本类型", type:"editor" },
  ]
}
```


## 事件

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| success     | 表单提交成功   |  data, formType  |
| fail    | 表单提交失败       |  data, formType   |
| complete | 表单提交结束 |   data, formType |
| cancel  | 表单点击取消按钮 |    -     |


## 方法

通过 this.$refs.form1.xxx(); 方式调用

| 方法名   | 说明                    |
|----------|------------------------|
| submitForm     | 提交表单 |
| resetForm     | 重置表单 |
| clearValidate     | 移除整个表单的校验 |

## 插槽
columns中的每一个key都是插槽的名称 （详情见示例:`/pages_template/components/form/form-slot`)

#### 如重写 `rate` 字段的渲染
```html
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :rules="form1.props.rules"
  :action="form1.props.action"
  :form-type="form1.props.formType"
  :columns='form1.props.columns'
  :loading.sync="form1.props.loading"
  label-width="140px"
  @success="onFormSuccess"
>
  <!-- v-slot:rate 中的 rate 对应 columns中的 key, form对应 form1.data keyName 对应 columns中的 key -->
  <template v-slot:rate="{ form, keyName }">
    <view style="height: 36px;display: flex;align-items: center;">
      <el-rate v-model="form[keyName]"></el-rate>
    </view>
  </template>
</vk-data-form>
```


## http请求模式

#### 示例代码

```html
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :rules="form1.props.rules"
  action="https://www.xxx.com/xxx/xxx"
  :is-request="true"
  :request-header="{ 'content-type':'application/x-www-form-urlencoded'} "
  :columns="form1.props.columns"
></vk-data-form>
```


#### 更多请见：`/pages_template/components/form/form-pro`
