# 2、dialog 弹窗

### template 使用方式

#### 普通弹窗 

完整代码见示例项目的 `pages_template/components/dialog/dialog-basic`
```html
<vk-data-dialog
  v-model="dialog.show1"
  title="标题1"
  width="500px"
  top="14vh"
  center
  :close-on-click-modal="true"
>
  这里是自定义按钮内容
  <template v-slot:footer>
    <el-button @click="dialog.show1 = false">取 消</el-button>
    <el-button type="primary" @click="dialog.show1 = false">确 定</el-button>
  </template>
</vk-data-dialog>
```

#### 表单弹窗

完整代码见示例项目的 `pages_template/components/dialog/dialog-form`
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
### API

### 属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| v-model            | 双向绑定一个变量,当变量为true: 弹窗显示 false: 弹窗关闭 | Boolean  | - | -  |
| title          | 弹窗标题 | String  | - | - |
| width          | 弹窗宽度  | Number|  - | - |
| mode      | 弹窗模式 | String  | default | form  |
| top          | margin-top 值 | String  | 7vh | - |
| closeOnClickModal          | 是否可以通过点击 modal 关闭 Dialog  | Boolean  | false | true  |
| closeOnPressEscape          | 是否可以通过按下 ESC 关闭 Dialog  | Boolean  | true | false  |
| showClose          | 是否显示关闭按钮  | Boolean  | true | false  |
| modal          | 是否需要遮罩层  | Boolean  | true | false  |
| fullscreen      | 是否全屏 | Boolean  | false | true  |
| customClass          | Dialog 的自定义类名| String  | - | - |
| showFullscreen          | 是否显示全屏按钮（仅在mode="form"时生效）  | Boolean  | true | false  |
| showHeader          | 是否显示头部  | Boolean  | true | false  |
| beforeClose          | 关闭前的回调，会暂停 Dialog 的关闭  | Function  | - | -  |
| center          | 是否对头部和底部采用居中布局  | Boolean  | false | true  |
| maxHeight          | 最大高度，超过会有滚动条 | String| Number | - | - |

### 事件

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| open     | 监听 - 弹窗打开 - 动画开始  |  -  |
| opened    | 监听 - 弹窗打开 - 动画结束     |  -    |
| close | 监听 - 弹窗关闭 - 动画开始 |  -  |
| closed    | 监听 - 弹窗关闭 - 动画结束     |  -    |

### 方法

#### 通过 this.$refs.dialog1.xxx(); 方式调用

| 方法名   | 说明                    |
|----------|------------------------|
| changeFullscreen     | 全屏切换 |
