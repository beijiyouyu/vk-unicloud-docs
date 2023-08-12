---
sidebarDepth: 0
---

# 20、date 日期选择

## 万能表单使用方式

### 单个时间

#### date类型（年月日）

双向绑定的值为时间戳（如：`1666022400000`）

```js
{ key: "date1", title: "date类型", type: "date", valueFormat: "timestamp", dateType: "date", tips: "可选择年月日" },
```

双向绑定的值为字符串（如：`2022-10-18`）

```js
{ key: "date2", title: "date类型", type: "date", valueFormat: "yyyy-MM-dd", dateType: "date", tips: "可选择年月日" },
```

#### dataTime类型（年月日时分秒）

双向绑定的值为时间戳（如：`1666062000000`）

```js
{ key: "date3", title: "dataTime类型", type: "date", valueFormat: "timestamp", dateType: "datetime", tips: "可选择年月日时分秒" },
```

双向绑定的值为字符串（如：`2022-10-18 11:00:00`）

```js
{ key: "date4", title: "dataTime类型", type: "date", valueFormat: "yyyy-MM-dd hh:mm:ss", dateType: "datetime", tips: "可选择年月日时分秒" },
```

#### date类型（年月）

双向绑定的值为时间戳（如：`1664553600000`）

```js
{ key: "date5", title: "date类型", type: "date", dateType: "date", valueFormat: "timestamp", format: "yyyy年MM月", tips: "可选择年月" },
```

双向绑定的值为字符串（如：`2022-10`）

```js
{ key: "date6", title: "date类型", type: "date", dateType: "date", valueFormat: "yyyy-MM", format: "yyyy年MM月", tips: "可选择年月" },
```

#### date类型（年）

双向绑定的值为时间戳（如：`1640966400000`）

```js
{ key: "date7", title: "date类型", type: "date", dateType: "date", valueFormat: "timestamp", format: "yyyy年", tips: "可选择年" },
```

双向绑定的值为字符串（如：`2022`）

```js
{ key: "date8", title: "date类型", type: "date", dateType: "date", valueFormat: "yyyy", format: "yyyy年", tips: "可选择年" },
```

### 时间范围

#### date类型（年月日）

双向绑定的值为时间戳数组（如：`[1666022400000, 1666108800000]`）

```js
{ key: "dateArr1", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "timestamp" },
```

双向绑定的值为（如：`['2022-10-18 00:00:00', '2022-10-19 00:00:00']`）

```js
{ key: "dateArr2", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "yyyy-MM-dd" },
```

#### dataTime类型（年月日时分秒）

双向绑定的值为时间戳数组（如：`[1666062000000, 1666065600000]`）

```js
{ key: "dateArr3", title: "dataTime类型范围", type: "date", dateType: "datetimerange", valueFormat: "timestamp" },
```

双向绑定的值为字符串数组（如：`['2022-10-18 00:00:00', '2022-10-19 00:00:00']`）

```js
{ key: "dateArr4", title: "dataTime类型范围", type: "date", dateType: "datetimerange", valueFormat: "yyyy-MM-dd hh:mm:ss" },
```

#### date类型范围（年月）

双向绑定的值为时间戳数组（如：`[1666062000000, 1666065600000]`）

```js
{ key: "dateArr5", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "timestamp", format: "yyyy年MM月", tips: "可选择年月" },
```

双向绑定的值为字符串（如：`['2023-08', '2023-09']`）

```js
{ key: "dateArr6", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "yyyy-MM", format: "yyyy年MM月", tips: "可选择年月" },
```

#### date类型范围（年）

双向绑定的值为时间戳数组（如：`[1666062000000, 1666065600000]`）

```js
{ key: "dateArr7", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "timestamp", format: "yyyy年", tips: "可选择年" },
```

双向绑定的值为字符串（如：`['2022', '2023']`）

```js
{ key: "dateArr8", title: "date类型范围", type: "date", dateType: "daterange", valueFormat: "yyyy", format: "yyyy年", tips: "可选择年" },
```

## API

## 公共属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

## 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| dateType            | 时间格式类型 | String  | - | date、datetime、daterange、datetimerange |
| align            | 对其方式 | String  | left | left, center, right  |
| format          | 显示在输入框中的格式 [详情](#日期格式) | String  | yyyy-MM-dd HH:mm:ss | - |
| valueFormat          | 双向绑定的值的格式 [详情](#日期格式) | String | timestamp | - |
| startPlaceholder    | 范围选择时开始日期的占位内容 | String  | - | -  |
| endPlaceholder    | 范围选择时结束日期的占位内容 | String  | - | -  |
| rangeSeparator    | 选择范围时的分隔符 | String  | '-' | - |
| pickerOptions    | 当前时间日期选择器特有的选项参考下表 | Object  | {} | - |

### 日期格式

使用 `format` 指定输入框的格式（默认yyyy-MM-dd hh:mm:ss）

使用 `value-format` 指定双向绑定值的格式（默认时间戳）

**请注意大小写**

|格式			|含义							|备注																						|举例					|
|:-:			|:-:							|:-:																						|:-:					|
|yyyy			|年								|																								|2017					|
|M				|月								|不补0																					|1						|
|MM				|月								|补0																						|01						|
|W				|周								|仅周选择器的 format 可用；不补0								|1						|
|WW				|周								|仅周选择器的 format 可用												|01						|
|d				|日								|不补0																					|2						|
|dd				|日								|补0																						|02						|
|H				|小时							|24小时制；不补0																|3						|
|HH				|小时							|24小时制																				|03						|
|h				|小时							|12小时制，须和 A 或 a 使用；不补0							|3						|
|hh				|小时							|12小时制，须和 A 或 a 使用											|03						|
|m				|分钟							|不补0																					|4						|
|mm				|分钟							|补0																						|04						|
|s				|秒								|不补0																					|5						|
|ss				|秒								|补0																						|05						|
|A				|AM/PM						|仅 format 可用，大写														|AM						|
|a				|am/pm						|仅 format 可用，小写														|am						|
|timestamp|JS时间戳					|仅 value-format 可用；组件绑定值为number类型		|1483326245000|
|[MM]			|不需要格式化字符	|使用方括号标识不需要格式化的字符 (如 [A] [MM])	|MM						|

### pickerOptions 详情说明

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| shortcuts            | 设置快捷选项，需要传入 { text, onClick }  | Object[]  | - | - |
| disabledDate            | 设置禁用状态，参数为当前日期，要求返回 Boolean| Function  |- | -  |
| cellClassName          |设置日期的 className | Function(Date)  | - | - |
| firstDayOfWeek    | 周起始日 | Number  | 7 | 1 到 7 |
| onPick    | 选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效 | Function({ maxDate, minDate })  | - | -  |

[点击查看更多element 官方API](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)

## 万能表格使用方式

### 只显示年月日

```js
{ key: "_add_time", title: "添加时间", type: "time", width: 160, valueFormat:"yyyy-MM-dd" },
```

### 显示年月日时分秒

```js
{ key: "_add_time", title: "添加时间", type: "time", width: 160 },
```

### 显示距离现在XX秒，xx时，xx天，xx年

```js
{ key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
```

### 显示距离到期剩XX秒，xx时，xx天，xx年

```js
{ key:"exp_time", title:"到期剩", type:"dateDiff2", endText:"已到期", width:120, defaultValue: "永久" },
```

## template 使用方式

### 单个时间 - date类型（年月日）

```html
<vk-data-input-date-time v-model="value1" type="date"></vk-data-input-date-time>
```

### 单个时间 - dataTime类型（年月日时分秒）

```html
<vk-data-input-date-time v-model="value1" type="datetime"></vk-data-input-date-time>
```

### 时间范围 - date类型（年月日）

```html
<vk-data-input-date-time v-model="value1" type="daterange"></vk-data-input-date-time>
```

### 时间范围 - dataTime类型（年月日时分秒）

```html
<vk-data-input-date-time v-model="value1" type="datetimerange"></vk-data-input-date-time>
```