# 10、remote-select 远程下拉

### 万能表单使用方式
#### 下拉选择方式
#### 应用场景：直接加载所有远程待选项（数据量不大时使用。）

通过设置参数 `showAll:true` 可以直接将所有远程待选项直接加载完。（最多支持1000条数据）

```js
{
  key: "category_ids1", title: "远程select（单选）", type: "remote-select", placeholder: "请选择分类",
  action: "admin/select/kh/categorys",
  props: { list: "rows", value: "_id", label: "name" },
  showAll: true,
  actionData: {
    pageSize: 1000
  }
},
```


#### 远程搜索方式
#### 应用场景：数据量很大，不方便一次性全部加载时使用。
```js
{
  key: "user_id", title: "用户选择器", type: "remote-select", placeholder: "请输入用户账号/昵称",
  action: "admin/select/kh/user",
},
```

#### 远程搜索带参数方式1
```js
{
  key: "user_id", title: "用户选择器", type: "remote-select", placeholder: "请输入用户账号/昵称",
  action: "admin/select/kh/user",
  actionData: {
    a: 1
  }
},
```

#### 远程搜索带参数方式2
```js
{
  key: "user_id", title: "用户选择器", type: "remote-select", placeholder: "请输入用户账号/昵称",
  action: "admin/select/kh/user",
  actionData: () => {
    return {
      a: that.form1.data.a
    }
  }
},
```
#### 数据预处理
```js
{
  key: "user_id", title: "用户选择器", type: "remote-select", placeholder: "请输入用户账号/昵称",
  action: "你的云函数",
  props: { list: "rows", value: "_id", label: "name" },
  dataPreprocess: (list) => {
    list.map((item, index) => {
      item.name = `${item.name}(${item._id})`
    });
    return list;
  }
},
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| data            | 静态模式数据源 | Array  | - | -  |
| action          | 动态模式 - 远程请求的云函数地址 | String  | - | -  |
| actionData          | 动态模式 - 远程请求的云函数时的额外参数 | Object、Function  | - | -  |
| props          | 数据源的属性匹配规则 | Object  | { list:'list', value:'value', label:'label' } | - |
| dataPreprocess          | 动态模式 - 云函数返回的数据进行预处理 | function(list)  | - | -  |
| showAll           | 是否一开始就全部加载 | Boolean  | false | true  |
| multiple        | 是否允许多选 | Boolean  | false | true  |
| limit        | 最多可选数量 | Number  | - | -  |
| loadingText          | 远程加载时显示的文字 | String  | 加载中| -  |
| noMatchText          | 搜索条件无匹配时显示的文字 | String  | 无匹配数据| -  |
| noDataText          | 选项为空时显示的文字 | String  | 无数据| -  |
| clearable          | 是否可以清空选项 | Boolean  | true| false  |
| onChange          | function(val, formData, column, index, option) | Function  | -| -  |

#### onChange 使用示例
```js
{
  key: "user_id", title: "用户选择器", type: "remote-select", placeholder: "请输入用户账号/昵称",
  action: "admin/select/kh/user",
  onChange: (val, formData, column, index, option) => {
    console.log(1, val, formData, column, index, option);
  }
},
```

**推荐使用 `watch` 代替 `onChange`** [传送门 - watch](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html#watch-%E7%9B%91%E5%90%AC)

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| val            | 表单绑定的值 | Any  | - | -  |
| formData          | 整个表单数据源 | Object  | - | -  |
| column          | 该组件属性 | Object  | - | - |
| index           | 组件的索引下标 | Number  | - | -  |
| option        | 其他参数，如选项的对象值等 | Any  | - | -  |


### 万能表格使用方式

#### 暂无，请通过连表查询方式获取数据。


### template 使用方式
### 下拉选择方式
#### 应用场景：数据量不大时使用。
```html
<vk-data-input-remote-select
  v-model="form1.category_ids"
  placeholder="请选择分类"
  action="admin/select/kh/categorys"
  :props="{ list: 'rows', value: '_id', label: 'name' }"
  width="300px"
  show-all
  multiple
  :limit="3"
></vk-data-input-remote-select>
```
#### 远程搜索方式
#### 应用场景：数据量很大，不方便一次性全部加载时使用。
```html
<vk-data-input-remote-select
  v-model="form1.user_id"
  placeholder="请输入用户名"
  action="admin/select/kh/user"
  width="300px"
></vk-data-input-remote-select>
```

