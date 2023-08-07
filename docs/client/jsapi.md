# JS API文档大全

`vk.pubfn.` 不仅可以在 `js` 中使用，也可以直接在 `template` 模板中使用（在 `template` 中也可以用简写法 `$fn` 代替 `vk.pubfn`）。如

**以下两种写法都可用**

```vue
<template>
  <view>{{ vk.pubfn.hidden("15200000001", 3, 4) }}</view>
  <view>{{ $fn.hidden("15200000001", 3, 4) }}</view>
</template>
```

**NVUE特别注意**

如果你的页面是 `nvue` 页面，则无法直接使用 `vk`，在 `js` 中需用 `uni.vk` 代替。

同时因为 `nvue` 在 `template` 模板中，无法直接调用 `uni` 对象，故 `nvue` 想在 `template` 模板中调用 `vk的api`，则还需要写如下代码

（以下代码非nvue无需写，只有nvue且需要在 `template` 模板中调用 `vk的api` 时才需要写下面的代码）
```js
export default {
  data() {
    // 页面数据变量
    return {
      vk: uni.vk, // 将vk变量赋值给 nvue 实例
    }
  }
}
```

**支付宝小程序、百度小程序、抖音小程序特别注意**

在 `js` 中需用 `uni.vk` 代替 `vk`，或者在页面 `<script>` 标签第一行增加代码 `var vk = uni.vk;`

```vue
<script>
	var vk = uni.vk;
	export default {
		data() {
			// 页面数据变量
			return {
				
			}
		},
		...其他代码
	}
</script>
```

## 前后端通用
### vk.pubfn.debounce（防抖函数）

```js
/**
 * 防抖函数
 * 防抖原理：一定时间内，只有最后一次或第一次调用,回调函数才会执行
 * @param {Function}  fn 要执行的回调函数 
 * @param {Number}    time 延时的时间
 * @param {Boolean}   isImmediate 是否立即执行 默认true
 * @param {String}    timeoutName 定时器ID
 * @return null
 */

vk.pubfn.debounce(fn, time, isImmediate, timeoutName);

// 简写
vk.pubfn.debounce(() => {
  // 这里写你自己的逻辑
  console.log(1);
}, 1000);

// 完整写法
vk.pubfn.debounce(() => {
  // 这里写你自己的逻辑
  console.log(1);
}, 1000, true, "id1");
```

### vk.pubfn.throttle（节流函数）

```js

/**
 * 节流函数
 * 节流原理：在一定时间内，只能触发一次
 * @param {Function} fn 要执行的回调函数 
 * @param {Number} time 延时的时间
 * @param {Boolean} isImmediate 是否立即执行
 * @param {String} timeoutName 定时器ID
 * @return null
 */
vk.pubfn.throttle(fn, time, isImmediate, timeoutName);

// 简写
vk.pubfn.throttle(() => {
  
}, 1000);

// 完整写法
vk.pubfn.throttle(() => {
  // 这里写你自己的逻辑
  console.log(1);
}, 1000, true, "id1");
```

### vk.pubfn.arrayToTree（数组转树）

```js
/**
 * 数组结构转树形结构
 * @param {Array} arrayData  数据源
 * @param {Object} treeProps 树结构配置
 * { id:"_id", parent_id:"parent_id", children:"children",need_field:["_id","name"],deleteParentId:true }
 */
let arrayData = [
  { _id:"001", name:"手机" },
  { _id:"002", name:"华为", parent_id: "001" },
  { _id:"003", name:"荣耀", parent_id: "002" },
  { _id:"004", name:"苹果", parent_id: "001" },
  { _id:"005", name:"电脑" },
  { _id:"006", name:"联想", parent_id: "005" },
  { _id:"007", name:"小米", parent_id: "005" },
];
let treeProps = {
  id:"_id",
  parent_id:"parent_id", 
  children:"children"
};

let treeData = vk.pubfn.arrayToTree(arrayData, treeProps);
```

**返回的treeData**

```json
[
  {
    "_id": "001",
    "name": "手机",
    "children": [
      {
        "_id": "002",
        "name": "华为",
        "parent_id": "001",
        "children": [
          {
            "_id": "003",
            "name": "荣耀",
            "parent_id": "002"
          }
        ]
      },
      {
        "_id": "004",
        "name": "苹果",
        "parent_id": "001"
      }
    ]
  },
  {
    "_id": "005",
    "name": "电脑",
    "children": [
      {
        "_id": "006",
        "name": "联想",
        "parent_id": "005"
      },
      {
        "_id": "007",
        "name": "小米",
        "parent_id": "005"
      }
    ]
  }
]
```

### vk.pubfn.treeToArray（树转数组）

```js
/**
 * 树形结构转数组结构
 * @param {Array} treeData  数据源
 * @param {Object} treeProps 树结构配置 
 * { id:"_id", parent_id:"parent_id", children:"children", deleteChildren:true }
 */
let treeData = [
  {
    "_id": "001",
    "name": "手机",
    "children": [
      {
        "_id": "002",
        "name": "华为",
        "parent_id": "001",
        "children": [
          {
            "_id": "003",
            "name": "荣耀",
            "parent_id": "002"
          }
        ]
      },
      {
        "_id": "004",
        "name": "苹果",
        "parent_id": "001"
      }
    ]
  },
  {
    "_id": "005",
    "name": "电脑",
    "children": [
      {
        "_id": "006",
        "name": "联想",
        "parent_id": "005"
      },
      {
        "_id": "007",
        "name": "小米",
        "parent_id": "005"
      }
    ]
  }
];
let treeProps = {
  id:"_id",
  parent_id:"parent_id",
  children:"children"
};
let arrayData = vk.pubfn.treeToArray(treeData, treeProps);
```

**返回的arrayData**

```json
[
  { _id:"001", name:"手机" },
  { _id:"002", name:"华为", parent_id: "001" },
  { _id:"003", name:"荣耀", parent_id: "002" },
  { _id:"004", name:"苹果", parent_id: "001" },
  { _id:"005", name:"电脑" },
  { _id:"006", name:"联想", parent_id: "005" },
  { _id:"007", name:"小米", parent_id: "005" },
]
```

### vk.pubfn.sleep（进程强制等待，休眠）

```js
/**
 * 进程强制等待，休眠（单位毫秒）
 * @param {Number} ms 毫秒
 */
await vk.pubfn.sleep(1000);
```


### vk.pubfn.timeFormat（日期时间格式化）

```js
/**
 * 日期时间格式化
 * @param {Date || Number} date 需要格式化的时间，支持时间对象和时间戳
 * @param {String} format 时间格式 默认 "yyyy-MM-dd hh:mm:ss"
 * @param {Number} targetTimezone 时区 默认东8区 正数代表东 负数代表西
 */
vk.pubfn.timeFormat(date, format, targetTimezone);
// 不带毫秒简写（标准时间格式）
vk.pubfn.timeFormat(new Date());
// 不带毫秒（标准时间格式）
vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
// 不带毫秒（自定义时间格式）
vk.pubfn.timeFormat(new Date(),"yyyy年MM月dd日 hh时mm分ss秒");
// 带毫秒
vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss.S");
// 带季度
vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss（第q季度）");
// 带时区
vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss", 8); // 东8区
```

### vk.pubfn.getDateInfo（解析日期对象属性）

```js
/**
 * 解析日期对象属性
 * @param {Date || Number} date 需要转换的时间
 */
vk.pubfn.getDateInfo(new Date());
```

返回

```js
{
  "year": 2022, // 年
  "month": 11, // 月
  "day": 11, // 日
  "hour": 19, // 时
  "minute": 52, // 分
  "second": 28, // 秒
  "millisecond": 282, // 毫秒
  "week": 5, // 星期几（0代表星期日 1代表星期一）
  "quarter": 4, // 季度
}
```

### vk.pubfn.getCommonTime（获取时间范围）

使用 vk.pubfn.getCommonTime 可以很方便获取时间

```js
/**
 * 获取时间范围
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * @param {Number} targetTimezone 时区 默认东8区 正数代表东 负数代表西
 * 返回的是时间戳（防止时区问题）
 * 返回数据如下：
 {
 	 todayStart     今日开始时间（时间戳）
 	 todayEnd       今日结束时间（时间戳）
 	 today12End     今日上午结束时间（时间戳）
 	 monthStart     本月开始时间（时间戳）
 	 monthEnd       本月结束时间（时间戳）
 	 yearStart      本年开始时间（时间戳）
 	 yearEnd        本年结束时间（时间戳）
 	 weekStart      本周开始时间（时间戳）
 	 weekEnd        本周结束时间（时间戳）
 	 hourStart      当前小时开始时间（时间戳）
 	 hourEnd        当前小时结束时间（时间戳）
 	 yesterdayStart 昨天开始时间（时间戳）
 	 yesterday12End 昨天上午结束时间（时间戳）
 	 yesterdayEnd   昨天结束时间（时间戳）
 	 lastMonthStart 上月开始时间（时间戳）
 	 lastMonthEnd   上月结束时间（时间戳）
 	 now        现在的时间点（含月年日时分秒）
 	 months     本年度每月的开始和结束时间 months[1] 代表1月
 	 days       本月每天的开始和结束时间 days[1] 代表1日
 }
 */
vk.pubfn.getCommonTime(date, targetTimezone);

vk.pubfn.getCommonTime(new Date());

vk.pubfn.getCommonTime(new Date(), 8); // 东8区

// 获取今日00:00:00和23:59:59
let { todayStart, todayEnd } = vk.pubfn.getCommonTime(new Date());
// 获取本月开始和结束
let { monthStart, monthEnd } = vk.pubfn.getCommonTime(new Date());

```

**同时该API可以配合vk.pubfn.getOffsetTime使用**

如：获取从今天开始向前推31天每天的时间戳的开始和结束

```js
let { todayStart, todayEnd } = vk.pubfn.getCommonTime();
// 在今日的时间上往前推
let timeStart = [];
for (let i = 0; i < 31; i++) {
  let start = vk.pubfn.getOffsetTime(todayStart, {
    day: i,
    mode: "before", // after 之后 before 之前
  });
  let end = vk.pubfn.getOffsetTime(todayEnd, {
    day: i,
    mode: "before", // after 之后 before 之前
  });
  timeStart.push({
    start,
    end
  });
}
console.log('timeStart: ', timeStart)
```

### vk.pubfn.getOffsetTime（获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳）

```js
/**
 * 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * @param {Object} offsetObj 偏移参数
 * 返回时间戳形式
 */
vk.pubfn.getOffsetTime(date, offsetObj);

// 获取当前时间1小时之后的时间
vk.pubfn.getOffsetTime(new Date(), {
  hour:1,
  mode:"after", // after 之后 before 之前
});

// 获取当前时间1小时30分钟之前的时间
vk.pubfn.getOffsetTime(new Date(), {
  hour:1,
  minutes:30,
  mode:"before", // after 之后 before 之前
});

// 完整参数
vk.pubfn.getOffsetTime(new Date(), {
  year:0,
  month:0,
  day:0,
  hours:0,
  minutes:0,
  seconds:0,
  mode:"after", // after 之后 before 之前
});
```

### vk.pubfn.getHourOffsetStartAndEnd（获得相对当前时间的偏移 count 小时的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 小时的起止日期（返回小时的开始和结束时间戳）
 * @param {Number} count 默认0（0代表当前小时 -1代表上一个小时 1代表下一个小时以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getHourOffsetStartAndEnd(count, date);

vk.pubfn.getHourOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getHourOffsetStartAndEnd(0, new Date());
```

### vk.pubfn.getDayOffsetStartAndEnd（获得相对当前时间的偏移 count 天的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 天的起止日期（返回日的开始和结束时间戳）
 * @param {Number} count  默认0（0代表今日 -1代表昨日 1代表明日以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getDayOffsetStartAndEnd(count, date);

vk.pubfn.getDayOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getDayOffsetStartAndEnd(0, new Date());
```

### vk.pubfn.getWeekOffsetStartAndEnd（获得相对当前时间的偏移 count 周的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 个周的起止日期（返回周的开始和结束）
 * @param {Number} count 默认0（0代表本周 -1代表上周 1代表下周以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getWeekOffsetStartAndEnd(count, date);

vk.pubfn.getWeekOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getWeekOffsetStartAndEnd(0, new Date());
```


### vk.pubfn.getMonthOffsetStartAndEnd（获得相对当前时间的偏移 count 月的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 月的起止日期（返回月的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本月 -1代表上月 1代表下月以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getMonthOffsetStartAndEnd(count, date);

vk.pubfn.getMonthOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getMonthOffsetStartAndEnd(0, new Date());
```

### vk.pubfn.getQuarterOffsetStartAndEnd（获得相对当前时间的偏移 count 季度的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 季度的起止日期（返回季度的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本季度 -1代表上个季度 1代表下个季度以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getQuarterOffsetStartAndEnd(count, date);

vk.pubfn.getQuarterOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getQuarterOffsetStartAndEnd(0, new Date());
```

### vk.pubfn.getYearOffsetStartAndEnd（获得相对当前时间的偏移 count 年的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 年的起止日期（返回年的开始和结束时间戳）
 * @param {Number} count  默认0（0代表今年 -1代表去年 1代表明年以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 */
vk.pubfn.getYearOffsetStartAndEnd(count, date);

vk.pubfn.getYearOffsetStartAndEnd(0);

let { startTime, endTime } = vk.pubfn.getYearOffsetStartAndEnd(0, new Date());
```

### vk.pubfn.test（检测文本格式）

```js
/**
 * 检测文本是否满足指定格式
 * @param {String} str 需要检测的文本
 * @param {String} type 检测类型（忽略大小写）
 * @param {Boolean} allowEmpty 是否允许为空，默认false（vk-unicloud版本需≥2.15.2）
 * 包含
 * mobile 手机号码
 * tel 座机
 * card 身份证
 * mobileCode 6位数字验证码
 * username 账号以字母开头，长度在3~32之间，只能包含字母、数字和下划线
 * pwd 密码长度在6~18之间，只能包含字母、数字和下划线
 * password 与pwd效果一致，密码长度在6~18之间，只能包含字母、数字和下划线
 * paypwd 支付密码 6位纯数字
 * postal 邮政编码
 * qq QQ号
 * email 邮箱
 * money 金额(小数点只允许2位)
 * url 网址
 * ip IP地址
 * date 日期 2020-08-03
 * time 时间 12:12:12
 * dateTime 日期+时间 2020-08-03 12:12:12
 * number 纯数字
 * english 纯英文
 * chinese 纯中文
 * english+number 英文+数字
 * english+number+_ 英文+数字+_
 * english+number+_- 英文+数字+_-
 * lower 小写
 * upper 大写
 * version 版本号 xx.xx.xx (xx必须是数字)
 * html html格式
 * image 图片
 * video 视频
 * audio 音频
 */
vk.pubfn.test(str, type, allowEmpty);
```

如检测手机号（不允许为空）

```js
let mobile = "15200000001";
let testRes = vk.pubfn.test(mobile, 'mobile');
if (testRes) {
  // 是手机号
} else {
  // 不是手机号
}
```

如检测手机号（允许为空）

> vk-unicloud版本需≥2.15.2

```js
let mobile = "";
let testRes = vk.pubfn.test(mobile, 'mobile', true);
if (testRes) {
  // 是手机号或者手机号是空
} else {
  // 不是手机号且不是空
}
```

### vk.pubfn.objectAssign（对象属性浅拷贝）

```js
/**
 * 对象属性拷贝(浅拷贝)
 * @description 将 obj2 的属性赋值给 obj1 (如果obj1中有对应的属性,则会被obj2的属性值覆盖)
 * @param {Object} obj1
 * @param {Object} obj2
 */
vk.pubfn.objectAssign(obj1, obj2);
```

### vk.pubfn.copyObject（复制一份对象-没有映射关系）

```js
/**
 * 复制一份对象-没有映射关系
 * @description 主要用于解除映射关系（不支持克隆函数）
 * @param {Object} 	obj
 */
let newObj = vk.pubfn.copyObject(obj);
```

### vk.pubfn.deepClone（深度克隆一个对象-没有映射关系）

```js
/**
 * 深度克隆一个对象-没有映射关系
 * @description 主要用于解除映射关系（支持克隆函数）
 * @param {Object} 	obj
 */
let newObj = vk.pubfn.deepClone(obj);
```

### vk.pubfn.arr_concat（两个对象数组合并，并去除重复的数据）

```js
/**
 * 两个(元素为对象)的数组合并,并去除重复的数据
 * @param	{Array}  arr1 	第一个数组(arr1和aar2没有顺序要求)
 * @param	{Array}  arr2 	第二个数组
 * @param	{String} flag 	判断标识,默认用id来判断,若flag传-1,代表不去除重复数据
 */
let arr = vk.pubfn.arr_concat(arr1, arr2, flag);

let arr = vk.pubfn.arr_concat(arr1, arr2, "_id");
```

### vk.pubfn.getData（根据字符串路径获取对象的值）
支持.和[]，且任意一个值为undefined时，不会报错，会直接返回undefined

```js
/**
 * 自动根据字符串路径获取对象中的值支持.和[] , 且任意一个值为undefined时,不会报错,会直接返回undefined
 * @param	{Object} dataObj 数据源
 * @param	{String} name 支持a.b 和 a[b]
 * @param	{String} defaultValue undefined时的默认值
 */
let data = vk.pubfn.getData(dataObj, name, defaultValue);

// 若在vue模板中使用，可以使用简写法 {{ $getData(userInfo, "a.b.c.d[1].a", '默认值') }}
```

### vk.pubfn.setData（根据字符串路径设置对象的值）
支持.和[]

```js
/**
 * 自动根据字符串路径设置对象中的值 支持.和[]
 * @param	{Object} dataObj 数据源
 * @param	{String} name 支持a.b 和 a[b]
 * @param	{String} value 值
 */
vk.pubfn.setData(dataObj, name, value);
```

### vk.pubfn.isNull（参数是否为空）
其中 undefined、null、{}、[]、"" 均为空值  true 空值  false 有值）

```js
/**
 * 检测参数是否为空 其中 undefined、null、{}、[]、"" 均为空值  true 空值  false 有值
 */
vk.pubfn.isNull(value);
```

### vk.pubfn.isNotNull（参数是否不为空）
结果与 vk.pubfn.isNull 相反

```js
/**
 * 检测参数是否不为空 结果与 vk.pubfn.isNull 相反
 */
vk.pubfn.isNotNull(value);
```

### vk.pubfn.isNullOne（是否至少有一个参数为空）

```js
/**
 * 检测所有参数 - 是否至少有一个为空
 */
vk.pubfn.isNullOne(value1,value2,value3);
```

### vk.pubfn.isNullAll（是否全部为空）

```js
/**
 * 检测所有参数 - 是否全部为空
 */
vk.pubfn.isNullAll(value1,value2,value3);
```

### vk.pubfn.isNotNullAll（是否全部都不为空）

```js
/**
 * 检测所有参数 - 是否全部都不为空
 */
vk.pubfn.isNotNullAll(value1,value2,value3);
```

### vk.pubfn.isNullOneByObject（检测整个对象是否没有一个属性是空值）
如果有空值，则返回首个是空值的属性名

```js
/**
 * 检测整个对象是否没有一个属性是空值,如果有空值,则返回首个是空值的属性名
 */
let nullKey = vk.pubfn.isNullOneByObject({ title, content, avatar });
if (nullKey) return { code: -1, msg: `${nullKey}不能为空` };

```

### vk.pubfn.getListItem（从对象数组中获取某一个对象）
获取对象数组中的某一个item，根据指定的键名和键值
```js
/**
 * 获取对象数组中的某一个item,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的对象
 * @param	{Array}  list 数据源
 * @param	{String} key 键名
 * @param	{String} value 键值
 */
vk.pubfn.getListItem(list, key, value);
```

### vk.pubfn.getListIndex（从对象数组中获取某个对象的index）
获取对象数组中某个元素的index，根据指定的键名和键值
```js
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @param	{Array}  list 数据源
 * @param	{String} key 键名
 * @param	{String} value 键值
 */
vk.pubfn.getListIndex(list, key, value);
```

### vk.pubfn.getListItemIndex（从对象数组中获取某一个对象和index）
获取对象数组中某个元素的index，根据指定的键名和键值
```js
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @param	{Array}  list 数据源
 * @param	{String} key 键名
 * @param	{String} value 键值
 */
vk.pubfn.getListItemIndex(list, key, value);
```

### vk.pubfn.arrayToJson（对象数组转JSON）

```js
/**
 * 数组转对象 - 将对象数组转成json
 * 如[{"_id":"001","name":"name1","sex":1},{"_id":"002","name":"name2","sex":2}]
 * 转成
 * {"001",{"_id":"001","name":"name1","sex":1},"002":{"_id":"002","name":"name2","sex":2}}
 * @param	{Array}  list 数据源
 * @param	{String} key 键名
 */
vk.pubfn.arrayToJson(list, key);

vk.pubfn.arrayToJson(list, "_id");
```

### vk.pubfn.arrayObjectGetArray（从数组中提取指定字段形式新的数组）

```js
/**
 * 从数组中提取指定字段形式新的数组
 * 如[{"_id":"001","name":"name1","sex":1},{"_id":"002","name":"name2","sex":2}]
 * 提取_id字段转成
 * ["001","002"]
 * @param	{Array}  list 数据源
 * @param	{String} key 键名
 */
vk.pubfn.arrayObjectGetArray(list, key);

vk.pubfn.arrayObjectGetArray(list, "_id");
```

### vk.pubfn.random（随机数）
支持任意字符，默认纯数字

```js
/**
 * 产生指定位数的随机数(支持任意字符，默认纯数字)
 * @param	{Number} length 随机数固定位数
 * @param	{String} range 指定的字符串中随机范围
 * @param	{Array}  arr 产生的随机数不会和此数组的任意一项重复
 */
vk.pubfn.random(length, range, arr);

vk.pubfn.random(6);
vk.pubfn.random(6, "abcdefghijklmnopqrstuvwxyz0123456789");
vk.pubfn.random(1,"123456789",["1","2","3"]);
```

### vk.pubfn.hidden（将手机号、账号等隐藏中间字段）

```js
/**
 * 将手机号,账号等隐藏中间字段
 * @param {String} str   需要转换的字符串
 * @param {Number} first 前面显示的字符数量，默认为0
 * @param {Number} last  后面显示的字符数量，默认为0
 */
vk.pubfn.hidden(str, first, last);

vk.pubfn.hidden("15200000001", 3, 4);
```

### vk.pubfn.checkArrayIntersection（两数组是否有交集)

```js
/**
 * 判断常量数组A是否至少有一个元素在常量数组B中存在(两数组有交集)
 * @param {Array} arr1 数组A
 * @param {Array} arr2 数组B
 */
vk.pubfn.checkArrayIntersection(arr1, arr2);

vk.pubfn.checkArrayIntersection([1,2,3], [3,4,5]);
```

### vk.pubfn.calcFreights（计算运费）

```js
/**
 * 计算运费
 *  @param {Object} freightsItem 运费模板
 {
   first_weight             Number 首重 单位KG,
   first_weight_price       Number 首重 首重价格
   continuous_weight        Number 续重 单位KG
   continuous_weight_price  Number 续重价格
   max_weight               Number 重量达到此值时,会多计算首重的价格,并少一次续重的价格 倍乘(相当于拆分多个包裹)
 }
 * @param {Number} weight 运费重量
 */
vk.pubfn.calcFreights(freightsItem, weight);

let freights = vk.pubfn.calcFreights({
  first_weight: 1,
  first_weight_price: 6,
  continuous_weight: 1,
  continuous_weight_price: 2
}, 10);
```

### vk.pubfn.getNewObject（从一个对象中取多个属性，并生成一个全新的对象）

```js
/**
 * 从一个对象中取多个属性,并生成一个全新的对象
 * @param {Object} obj 对象
 * @param {Array<String>} keys 键名数组
 */
vk.pubfn.getNewObject(obj, keys);
```

### vk.pubfn.deleteObjectKeys（对象删除指定的字段，返回新的对象）

```js
/**
 * 对象删除指定的字段,返回新的对象
 * @param {Object} data  操作对象
 * @param {Array<String>} deleteKeys 需要删除的键名(数组形式)
 */
vk.pubfn.deleteObjectKeys(data, deleteKeys);
```

### vk.pubfn.timeUtil.isLeapYear（判断是否是闰年）

```js
/**
 * 判断是否是闰年
 * @param {Number | Date} year 需要计算的年份或时间,默认使用当前时间的年份
 */
vk.pubfn.timeUtil.isLeapYear(2021);
```

### vk.pubfn.timeUtil.isQingming（判断是否是清明节）

```js
/**
 * 判断是否是清明节
 * @param {Object} date 时间对象 
 */
vk.pubfn.timeUtil.isQingming(new Date());
```

### vk.pubfn.calcSize（单位进制换算）

```js
/**
 * 单位进制换算
 * @param {number} length  大小
 * @param {Array<String>} arr 进制的数组,如["B","KB","MB","GB"]
 * @param {number} ary  进制,如KB-MB-GB,进制1024
 * @param {number} precision  数值精度（小数点后面位数）
 */
vk.pubfn.calcSize(length, arr, ary, precision);

vk.pubfn.calcSize(length, ["B","KB","MB","GB"], 1024, 3);
```

### vk.pubfn.isArray（判断变量是否是数组）

```js
/**
 * 判断变量是否是数组
 * 
 */
vk.pubfn.isArray(obj);
```

### vk.pubfn.isObject（判断变量是否是对象）

```js
/**
 * 判断变量是否是对象
 */
vk.pubfn.isObject(obj);
```

### vk.pubfn.createOrderNo（产生订单号）

```js
/**
 * 产生订单号，不依赖数据库，高并发时性能高（理论上会重复，但概率非常非常低）
 * @param {String} prefix 前缀
 * @param {Number} count 位数，建议在25-30之间，默认25
 */
vk.pubfn.createOrderNo(prefix, count);

vk.pubfn.createOrderNo("NO");

vk.pubfn.createOrderNo("NO", 25);
```


### vk.pubfn.snake2camelJson（对象内的属性名 - 蛇形转驼峰）

```js
/**
 * 对象内的属性名 - 蛇形转驼峰
 * @param {Object} obj
 */
vk.pubfn.snake2camelJson(obj);
```

### vk.pubfn.camel2snakeJson（对象内的属性名 - 驼峰转蛇形）

```js
/**
 * 对象内的属性名 - 驼峰转蛇形
 * @param {Object} obj
 */
vk.pubfn.camel2snakeJson(obj);
```

### vk.pubfn.snake2camel（字符串 - 蛇形转驼峰）

```js
/**
 * 字符串 - 蛇形转驼峰
 * @param {String} value
 */
vk.pubfn.snake2camel(value);
```

### vk.pubfn.camel2snake（字符串 - 驼峰转蛇形）

```js
/**
 * 字符串 - 驼峰转蛇形
 * @param {String} value
 */
vk.pubfn.camel2snake(value);
```

### vk.pubfn.string2Number 将能转成数字的字符串转数字（支持字符串、对象、数组）

```js
/**
 * 将能转成数字的字符串转数字（支持字符串、对象、数组）
 * @param {Any} obj 数据源
 * @param {Object} option 哪些格式需要排除
 * 默认排除
 * mobile:true 手机号，如 15200000001
 * idCard:true 身份证，如 330154202109301214
 * startFrom0:true 第一位是0，且长度大于1的，同时第二位不是.的字符串  如 01，057189101254
 */
vk.pubfn.string2Number(obj, option);
```

### vk.pubfn.toDecimal 保留小数

```js
/**
 * 保留小数
 * @param {Number} val 原值
 * @param {Number} precision 精度
 */
vk.pubfn.toDecimal(val, precision);

vk.pubfn.toDecimal(1.56555, 2);
```


### vk.pubfn.priceFilter（金额显示过滤器）
金额显示过滤器（以分为单位，将 100 转成 1）
```js
/**
 * 金额显示过滤器（已分为单位，将100 转成 1
 * @param {Number} money 金额
 */
vk.pubfn.priceFilter(money);

vk.pubfn.priceFilter(100); // 1
```

### vk.pubfn.percentageFilter（百分比显示过滤器）
百分比过滤器 将 0.01 显示成 1%  1 显示成 100%
```js
/**
 * 百分比过显示滤器
 * @param {Number} value 百分比值
 * @param {Boolean} needShowSymbol 显示 % 这个符号
 * @param {String | Number} defaultValue value为空时的默认值
 */
vk.pubfn.percentageFilter(value);
vk.pubfn.percentageFilter(value, needShowSymbol, defaultValue);
vk.pubfn.percentageFilter(0.1); // 10%
```


### vk.pubfn.discountFilter（折扣显示过滤器）
折扣过滤器 将 0.1 显示成 1折 1 显示成 原价 0 显示成免费
```js
/**
 * 折扣显示过滤器
 * @param {Number} value 折扣值
 * @param {Boolean} needShowSymbol 显示 折 这个中文字符
 * @param {String | Number} defaultValue value为空时的默认值
 */
vk.pubfn.discountFilter(value);
vk.pubfn.discountFilter(value, needShowSymbol, defaultValue);
vk.pubfn.discountFilter(0.7); // 7折
```


### vk.pubfn.dateDiff（将时间显示成1秒前、1天前）

```js
/**
 * 将时间显示成1秒前、1天前（计算方式为：当前时间 - startTime）
 * @description 主要用于 文章最后回复时间: 1分钟前
 * @param {String || Number}  startTime	需要计算的时间 如文章最后回复时间
 * @param {String} suffix	后缀，默认为前，如 1秒前 ,若设置为空字符串，则只显示 1秒
 */
vk.pubfn.dateDiff(startTime, suffix);

vk.pubfn.dateDiff(Date.now()-1000*3600*24); // 1天前
```

### vk.pubfn.dateDiff2（将时间显示成1秒、1天）

```js
/**
 * 将时间显示成1秒、1天（计算方式为：endTime - 当前时间）
 * @description 主要用于 到期时间剩余 : 3天 这样的场景
 * @param {String || Number} endTime	需要计算的时间 如到期时间
 * @param {String} endText	到期时显示的文字
 */
vk.pubfn.dateDiff2(endTime, endText);

vk.pubfn.dateDiff2(Date.now()+1000*3600*24); // 23小时
```

### vk.pubfn.numStr（将大数字转中文）

```js
/**
 * 将大数字转中文
 * @description 主要用于展示浏览量等不需要非常精确显示的场景
 * 如:
 * 3210 -> 3千
 * 31210 -> 3万
 * 1523412 -> 1百万
 * 15234120 ->1千万
 * @param {Number} n 需要转换的数字
 */
vk.pubfn.numStr(n);

vk.pubfn.numStr(1523412); // 1百万
```

### vk.pubfn.numStr（将大数字转中文）

```js

/**
 * 将一个大数组拆分成N个小数组（分割数组）
 * @param {Array} array 大数组
 * @param {Number} size 小数组每组最大多少个
 */
vk.pubfn.splitArray(array, size);

let newArray = vk.pubfn.splitArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 6);
```

**返回的newArray**

```json
[
  [1,2,3,4,5,6],
  [7,8,9,10,11,12],
  [13,14,15,16]
]
```

### vk.pubfn.objectKeySort（对象属性排序）

```js

/**
 * 将对象内的属性按照ASCII字符顺序进行排序，返回排序后的对象
 * @param {Object} obj 需要排序对象
 */
vk.pubfn.objectKeySort(obj);

let newObj = vk.pubfn.objectKeySort({
  c:1,
  a:2,
  b:3
});
```

**返回的newObj**
```json
{
  "a": 2,
  "b": 3,
  "c": 1
}
```

### vk.request（请求http接口）

前端调用时文档看这里：[传送门 - 前端request](https://uniapp.dcloud.net.cn/api/request/request.html)

前端调用时文档看这里：[传送门 - 云端request](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#httpclient)

vk.request 就是通过上面2个API封装的，参数跟上面的基本一致

#### vk.request（前端调用）

```js
vk.request({
	url: `https://www.xxx.com/api/xxxx`,
	method: "POST",
	header: {
		"content-type": "application/json; charset=utf-8",
	},
	data:{

	},
	success: (data) => {

	},
	fail: (err) => {

	}
});
```

**前端调用常用参数列表**

|参数名					|类型												|必填	|默认值	|说明																																										|平台差异说明																																		|
|:-							|:-													|:-		|:-			|:-																																											|:-																																							|
|url						|String											|是		|				|开发者服务器接口地址																																		|																																								|
|data						|Object、String、ArrayBuffer|否		|				|请求的参数																																							|App 3.3.7 以下不支持 ArrayBuffer 类型																					|
|header					|Object											|否		|				|设置请求的 header，header 中不能设置 Referer																						|App、H5端会自动带上cookie，且H5端不可手动修改																	|
|method					|String											|否		|POST		|注意，vk.request默认是POST请求，其他有效值详见下方说明																	|																																								|
|timeout				|Number											|否		|60000	|超时时间，单位 ms																																			|H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序|
|dataType				|String											|否		|json		|可选值为<br/> json 会对返回的数据进行一次 JSON.parse <br/> default 不会进行 JSON.parse	|																																								|
|responseType		|String											|否		|text		|设置响应的数据类型。合法值：text、arraybuffer																					|支付宝小程序不支持																															|
|needOriginalRes|Boolean										|否		|false	|此参数为vk新增，设置为true后，返回数据会多一个originalRes参数，里面有请求头等信息			|																																								|
|interceptor		|Object											|否		|false	|此参数为vk新增，请求拦截器[详情](#interceptor)																														|																																								|
|success				|Function										|否		|				|收到开发者服务器成功返回的回调函数																											|																																								|
|fail						|Function										|否		|				|接口调用失败的回调函数																																	|																																								|
|complete				|Function										|否		|				|接口调用结束的回调函数（调用成功、失败都会执行）																				|&nbsp;																																					|

**method 有效值**

注意：method有效值必须大写，每个平台支持的method有效值不同，详细见下表。

|method	|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|抖音小程序、飞书小程序	|快手小程序	|京东小程序	|
|:-:		|:-:|:-:|:-:				|:-:					|:-:				|:-:										|:-:				|:-:				|
|GET		|√	|√	|√					|√						|√					|√											|√					|√					|
|POST		|√	|√	|√					|√						|√					|√											|√					|√					|
|PUT		|√	|√	|√					|x						|√					|√											|x					|x					|
|DELETE	|√	|√	|√					|x						|√					|x											|x					|x					|
|CONNECT|x	|√	|√					|x						|x					|x											|x					|x					|
|HEAD		|√	|√	|√					|x						|√					|x											|x					|x					|
|OPTIONS|√	|√	|√					|x						|√					|x											|x					|x					|
|TRACE	|x	|√	|√					|x						|x					|x											|x					|x					|

##### interceptor

> vk-unicloud 核心库版本需 >= 2.14.4

拦截器，可在发起请求前、成功回调前、失败回调前、完成回调前进行拦截并执行一段自定义逻辑。

**属性**

|参数名		|类型			|必填	|默认值	|说明																																							|平台差异说明	|
|:-				|:-				|:-		|:-			|:-																																								|:-						|
|invoke		|Function	|否		|				|发起请求前拦截，可在此修改请求参数，若函数return false，可阻止请求发起						|							|
|success	|Function	|否		|				|成功回调前拦截，可在此修改success回调参数，若函数return false，可阻止success回调	|							|
|fail			|Function	|否		|				|失败回调前拦截，可在此修改fail回调参数，若函数return false，可阻止fail回调				|							|
|complete	|Function	|否		|				|完成回调前拦截，可在此complete回调参数，若函数return false，可阻止complete回调		|							|

**执行顺序**

执行成功时：interceptor.invoke -> 执行request请求 -> interceptor.success -> success -> interceptor.complete -> complete

执行失败时：interceptor.invoke -> 执行request请求 -> interceptor.fail -> fail -> interceptor.complete -> complete

特殊情况，如果code返回的不是0，则执行顺序为：interceptor.invoke -> 执行request请求 -> interceptor.success -> fail -> interceptor.complete -> complete

**interceptor示例**

```js
vk.request({
	url: `https://www.xxx.com/api/xxxx`,
	method: "POST",
	header: {
		"content-type": "application/json; charset=utf-8",
	},
	data:{

	},
  interceptor: {
    invoke: (res) => {
      console.log('interceptor-invoke: ', res);
      if (!res.data) res.data = {};
      res.data.a = 1; // 新增请求参数a=1
    },
    success: (res) => {
      console.log('interceptor-success: ', res);
      // 处理code状态码和msg
      res.code = res.returnCode === "SUCCESS" ? 0 : res.returnCode;
      res.msg = res.returnMsg;
      delete res.returnCode;
      delete res.returnMsg;
    },
    fail: (res) => {
      console.log('interceptor-fail: ', res);
    },
    complete: (res) => {
      console.log('interceptor-complete: ', res);
    }
  },
	success: (data) => {

	},
	fail: (err) => {

	}
});
```

#### vk.request（云端调用）

云端必须加 `await` 同时没有 success 和 fail 回调

```js
await vk.request({
	url: `https://www.xxx.com/api/xxxx`,
	method:"POST",
	header:{
		"content-type": "application/json; charset=utf-8",
	},
	data:{

	}
});
```

**云端调用常用请求参数**

|参数名							|类型																																					|是否必填	|默认值	|说明																																																																																			|
|:--								|:-:																																					|:-:			|:-:		|:--																																																																																			|
|method							|String																																				|-				|POST		|HTTP 请求方法, 默认为：POST. 可选值： GET, POST, DELETE, PUT																																																							|
|data								|Object																																				|-				|-			|发送的数据																																																																																|
|header							|Object																																				|-				|-			|请求头																																																																																		|
|dataAsQueryString	|Boolean																																			|-				|true		|是否强制转换data为queryString																																																																						|
|dataType						|String																																				|-				|-			|返回的数据格式，默认为json，可选值为 <br/>json 返回数据转为JSON（如果不满足JSON格式会报错）<br/>text 返回数据转为字符串<br/>default 返回二进制数据												|
|contentType				|String																																				|-				|-			|上传数据的格式，设为json会自动在header内设置Content-Type: application/json																																																|
|useContent					|Boolean																																			|-				|false	|是否将data的值转content，效果：content = JSON.stringify(data);																																																						|
|content						|String、 Buffer																															|-				|-			|手动设置请求的payload，设置后会忽略data																																																																	|
|timeout						|Number、 Array																																|-				|5000		|超时时间设置。设置为数组时第一项为请求超时，第二项为返回超时。设置为数字时相当于同时设置请求超时和返回超时，即timeout:3000效果等于timeouut:[3000,3000]										|
|files							|Array<ReadStream、Buffer、String> 、 Object 、 ReadStream 、 Buffer、 String	|-				|-			|上传的文件，设置后将会使用 multipart/form-data 格式。如果未设置method，将会自动将method设置为POST																																				|
|nestedQuerystring	|Boolean																																			|-				|-			|转换data为queryString时默认不支持嵌套Object，此选项设置为true则支持转换嵌套Object																																												|
|needOriginalRes		|Boolean						|否																																						|false		|此参数为vk新增，设置为true后，返回数据的格式是原始返回数据，里面有请求头等信息<br/>注意，此参数与前端调用时效果不一样<br/>前端是多返回一个originalRes参数<br/>云端是直接返回原始返回数据|																																																																																					|
|consumeWriteStream	|Boolean																																			|-				|true		|是否等待 writeStream 完全写完才算响应全部接收完毕																																																												|
|auth								|String																																				|-				|-			|简单登录授权（Basic Authentication）参数，必须按照 user:password 格式设置																																																|
|ca									|String、Buffer、Array																												|-				|-			|证书内容																																																																																	|
|pfx								|String、Buffer																																|-				|-			|包含了私钥, 证书和CA certs, 一般是 PFX 或者 PKCS12 格式																																																									|
|key								|String、Buffer																																|-				|-			|PEF格式的服务器的私钥																																																																										|
|cert								|String、Buffer																																|-				|-			|PEM格式的服务器证书密钥																																																																									|
|stream							|ReadStream																																		|-				|-			|发送请求正文的可读数据流																																																																									|
|writeStream				|WriteStream																																	|-				|-			|接受响应数据的可写数据流																																																																									|
|streaming					|Boolean																																			|-				|false	|是否直接返回响应流，开启 streaming 之后，HttpClient 会在拿到响应对象 res 之后马上返回， 此时 result.headers 和 result.status 已经可以读取到，只是没有读取 data 数据而已。|

**注意**

默认情况下request接口会尝试将返回数据`JSON.parse(res)`，但需要对方接口返回的数据格式不是JSON，而是普通文本或xml格式，则你需要将 `dataType` 设置为 `text`，如果对方返回的是二进制流，则需要设置 `dataType` 设置为 `default`

接收text示例代码

```js
let requestRes = await vk.request({
  method: 'POST',
  url: "https://www.xxx.com/xxx",
  data: {
    test: 'testValue'
  },
  contentType: 'json', // 指定以application/json发送data内的数据
  dataType: 'text' // 指定返回值为text格式
})
console.log(requestRes)
```

接收二进制流示例代码

```js
let imageBuffer = await vk.request({
  url: "https://xxxx.xxxx.com/xxx.jpg",
  method: "GET",
  dataType: "default",
  header: {
    "cache-control": "no-cache",
  }
});
// 还可以把二进制流转base64
let base64 = "data:image/png;base64," + imageBuffer.toString('base64');
```

## 前端专属

### vk.pubfn.getListData（手机长列表分页加载数据）

```js
/**
 * 手机端长列表分页加载数据
 * @description 自动处理下一页。数据合并，更新数据源（会自动更新vue页面上的this.data变量的值）源码请看 uni_modules/vk-unicloud/vk_modules/vk-unicloud-page/libs/function/index.js 中的 getListData 内部实现
 * @param {Vue页面对象} that 页面数据对象this
 * @param {String} url 请求地址(云函数路径)
 * @param {String} listName 后端返回的list数组的字段名称,默认rows
 * @param {Object} data 额外数据
 * @param {function} dataPreprocess	数据预处理函数
 *
 * 代码示例
 */
vk.pubfn.getListData({
    that : this,
    url : "db_test/pub/select",
    listName : "rows",
    data : {
      a : 1
    },
    dataPreprocess: (list) => {
      return list;
    }
});
```

### vk.pubfn.getComponentsDynamicData（动态组件数据获取）

```js
/**
 * 动态组件数据获取
 * @description 主要用于动态组件的数据获取
 * @param {Vue页面对象} that 页面数据对象this
 * @param {String}     ids  动态数据组件的ID
 *
 */

 // 代码示例
 // 如:放置一个动态数据的 公告组件 和 一个轮播图组件
 // view  核心:自定义组件接收一个 Object 类型的属性 datas
```

```html
  <vk-u-notice-bar :datas='componentsDynamic["notice-bar-01"]'></vk-u-notice-bar>
  <vk-u-swiper :datas='componentsDynamic["index-swiper-01"]' :custom-datas='{
    "height":600,
  }'></vk-u-swiper>
```

```js
// 在页面数据变量中新增 componentsDynamic
  data() {
    return {
      // 动态组件数据集合
      componentsDynamic:{}
    }
  }
// 在页面初始化方法中执行下面的函数
this.vk.pubfn.getComponentsDynamicData({
  that : this,
  ids : ["notice-bar-01","index-swiper-01"]
});
```

### vk.pubfn.getCurrentPage（获取当前页面实例）

```js
/**
 * 获取当前页面实例
 * 返回数据
 * fullPath 当前打开页面的完整路径(带页面参数)
 * options  当前打开页面的参数
 * route    当前打开页面的路径(不含参数)
 * $vm      当前打开页面的vue实例
 */
vk.pubfn.getCurrentPage();
```

### vk.pubfn.fileToBase64（文件转base64）

```js
/**
 * 文件转base64
 */
vk.pubfn.fileToBase64({
  file:res.tempFiles[0],
  success: (base64) => {

  }
});
```

### vk.pubfn.base64ToFile（base64转文件）

```js
/**
 * base64转文件
 */
vk.pubfn.base64ToFile({
  base64: base64,
  success: (file) => {

  }
});
```

## 弹窗

### vk.alert
```js
// 简写
vk.alert("内容");

// 完整写法
vk.alert("内容", "提示", "确定", () => {
  // 点击确定按钮后的回调
  
});
```

### vk.confirm
```js
// 简写
vk.confirm("内容", (res) => {
  if (res.confirm) {
    // 点击确定按钮后的回调
    
  }
});

// 完整写法
vk.confirm("内容", "提示", "确定", "取消", (res) => {
  if (res.confirm) {
    // 点击确定按钮后的回调
    
  }
});
```

### vk.prompt
```js
// 简写
vk.prompt("请输入", (res) => {
  if (res.confirm){
    console.log(res.content);
  }
});

// 完整写法
vk.prompt("请输入", "提示", "确定", "取消", (res) => {
  if (res.confirm){
    console.log(res.content);
  }
},"输入框内初始内容");
```

### vk.toast
```js
// 简写
vk.toast("提示内容");
// 带图标
vk.toast("提示内容", "success"); // 带成功的图标
vk.toast("提示内容", "/static/1.png"); // 带自定义图片
vk.toast("提示内容", "none", 1000); // 修改时间延迟
// 带回调函数
vk.toast("提示内容", "none", () => {
  
}); 
// 去除遮罩
vk.toast("提示内容", "none", false);
// 全参数完整写法（最后3个参数的位置顺序没有要求）
vk.toast("提示内容", "none", 1000, true, () => {
  
});
```

### vk.showActionSheet
```js
vk.showActionSheet({
  title: "",
  list: ["位置", "@好友"],
  color: "#000000",
  success: res => {
    if (res.index == 0) {
      
    } else if (res.index == 1) {
      
    }
  }
});
```

### vk.showLoading
```js
vk.showLoading("加载中...");
```

### vk.hideLoading
```js
vk.hideLoading();
```


## 页面跳转

### 与直接用 `uni.navigateTo` 的优势

使用下方的页面跳转API，框架会自动判断目标页面是否需要登录才能访问。

如果需要登录，会先到登录页面，登录成功后，再跳转到原本需要访问的页面。

如何设置哪些页面需要登录？

项目根目录 `app.config.js` 配置文件

```js
// 需要检查是否登录的页面列表
checkTokenPages: {
  /**
   * 如果 mode = 0 则代表自动检测
   * 如果 mode = 1 则代表list内的页面需要登录，不在list内的页面不需要登录
   * 如果 mode = 2 则代表list内的页面不需要登录，不在list内的页面需要登录
   * 注意1: list内是通配符表达式，非正则表达式
   * 注意2: 需要使用 vk.navigateTo 代替 uni.navigateTo 进行页面跳转才会生效
   */
  mode: 2,
  list: [
    "/pages_template/*",
    "/pages/login/*",
    "/pages/error/*"
  ]
},
```

还可以设置哪些页面允许在小程序中分享

```js
// 需要检查是否可以分享的页面列表(仅小程序有效)
checkSharePages: {
  /**
   * 如果 mode = 0 则不做处理
   * 如果 mode = 1 则代表list内的页面可以被分享，不在list内的页面不可以被分享
   * 如果 mode = 2 则代表list内的页面不可以被分享，不在list内的页面可以被分享
   * 注意: list内是通配符表达式，非正则表达式
   */
  mode: 1,
  // ['shareAppMessage', 'shareTimeline'],
  menus: ['shareAppMessage'],
  list: [
    //"/pages/index/*",
    //"/pages/goods/*",
    "/pages/live-player/*",
    "/pages_template/*",
  ]
},
```

### vk.navigateTo

支持跳转到tab页

```js
vk.navigateTo(url);
```

### vk.redirectTo

关闭当前页面，跳转到应用内的某个页面。

```js
vk.redirectTo(url);
```

### vk.reLaunch

关闭所有页面，打开到应用内的某个页面。

```js
vk.reLaunch(url);
```

### vk.switchTab

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

```js
vk.switchTab(url);
```

### vk.navigateBack

关闭当前页面，返回上一页面，支持原生`uni.navigateBack(OBJECT)`中的属性。

```js
vk.navigateBack();
```

### vk.navigateToHome

关闭所有页面，并跳转到首页 （app.config.js 的 index.url）

```js
vk.navigateToHome();
```

### vk.navigateToLogin

关闭所有页面，并跳转到登录页 （app.config.js 的 login.url）

```js
// 关闭所有页面，并跳转到登录页 
vk.navigateToLogin();
// 不关闭页面，直接跳转到登录页，登录成功自动返回当前页面
vk.navigateToLogin({ mode:"navigateTo" });
```

### vk.pubfn.checkLogin

检测是否需要登录，根据 `app.config.js` 配置文件的 `checkTokenPages` 参数判断

当前不支持首页检测，故首页可以添加以下代码检测是否登录。

```js
// 在首页的 onLoad 函数中新增下方代码
setTimeout(() => {
  vk.pubfn.checkLogin(); // 检测是否需要登录
}, 0);
```

### vk.navigateTo（页面间通信）
A 页面跳转 B 页面

```js
vk.navigateTo({
  url: `页面地址`,
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    update: (data) => {
      // 当B页面运行 eventChannel.emit('update', { a:1 }); 时，会运行这里的代码逻辑。
      
    }
  },
  success: (res) => {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('data', { b:2 })
  }
})
```

B页面接收A页面传过来的数据
```js
// 监听 - 页面每次【加载时】执行(如：前进)
onLoad(options = {}) {
  const eventChannel = this.getOpenerEventChannel();
  // 监听data事件，获取上一页面通过eventChannel.emit传送到当前页面的数据
  if (eventChannel.on) {
    eventChannel.on('data', (data) => {
      
    });
  }
},
```

B页面返回时，触发A页面逻辑（如刷新A页面数据）
```js
const eventChannel = this.getOpenerEventChannel();
if (eventChannel.emit) eventChannel.emit('update', { a:1 }); // 触发A页面的 update 监听事件
vk.navigateBack();
```

## 全局配置

### vk.getConfig

获取 `app.config.js` 内的配置信息（不包含函数）

```js
// 获取所有配置
let config = vk.getConfig();
// 获取指定配置
let url = vk.getConfig("login.url");
```


## 云函数专属

以下函数只能在云函数内调用

### vk.pubfn.batchRun

批量循环并发执行异步函数（使用场景: 批量发送短信、邮件、消息通知等。）

注意：`concurrency` 并不是越大越好，太大可能会卡死（一次性并发太多请求可能反而会卡死，且大部分三方api其实是有并发限制的）。

**有数据源形式**

一般用于：批量发短信、邮件、消息通知等等

```js
let batchRunRes = await vk.pubfn.batchRun({
  // 主执行函数
  main: async (item, index) => {
    await vk.pubfn.sleep((Math.floor(Math.random() * (3 - 0)) + 0) * 100);
    console.log(index, item);
    return { code:0, index }
  },
  // 最大并发量，如果设置为1，则会按顺序执行
  concurrency: 50, 
  // 数据源，这些数据会依次跑一遍main函数
  data: [
    { a: 1 }, 
    { a: 2 }, 
    { a: 3 },
    { a: 4 },
    { a: 5 },
    { a: 6 }, 
    { a: 7 },
    { a: 8 },
    { a: 9 }
  ],
});
```


**无数据源形式**

一般用于：将多个不一样的异步函数并发执行。

```js
let res = { code: 0, msg: '' };
// 业务逻辑开始-----------------------------------------------------------
let batchRunRes = await vk.pubfn.batchRun({
  // 主执行函数
  main: [
    // 已上架的商品数量
    async () => {
      return await vk.daoCenter.goodsDao.count({
        status: 1,
        is_on_sale: true
      });
    },
    // 已下架的商品数量
    async () => {
      return await vk.daoCenter.goodsDao.count({
        status: 1,
        is_on_sale: false
      });
    },
    // 回收站内的商品数量
    async () => {
      return await vk.daoCenter.goodsDao.count({
        status: 2
      });
    },
    // 已售罄的商品数量
    async () => {
      return await vk.daoCenter.goodsDao.count({
        status: 1,
        stock: _.lte(0)
      });
    },
  ],
  // 最大并发量，如果设置为1，则会按顺序执行
  concurrency: 10
});
res.group = batchRunRes.stack;
// 业务逻辑结束-----------------------------------------------------------
return res;
```

### vk.pubfn.getUniCloudRequestId

获取本次云函数请求id（只有云端云函数才有，本地云函数无法获取请求id）

```js
let request_id = vk.pubfn.getUniCloudRequestId();
```


### vk.pubfn.randomAsync

（异步）产生指定位数的不重复随机数（支持任意字符，s默认纯数字）

```js
/**
 * （异步）产生指定位数的随机数（支持任意字符，range默认纯数字）
 * @param	{Number} length 随机数固定位数
 * @param	{String} range 指定的字符串中随机范围
 * @param	{Function} fn 产生的随机数判断重复的自定义函数
 * @param	{Number} maxRetryCount 最大重试次数 默认500
 */
await vk.pubfn.randomAsync(length, range, fn, maxRetryCount);
```

**以下是产生用户6位数分享码的具体代码**

特意从可选字符中去除 0、1、I、O

```js
let randomStr = await vk.pubfn.randomAsync(6, "23456789ABCDEFGHJKLMNPQRSTUVWXYZ", async (val)=>{
  let num = await vk.baseDao.count({
    dbName:"uni-id-users",
    whereJson:{
      my_invite_code: val
    }
  }, 10); // 最大重试10次
  return num === 0 ? true : false;
});
```
