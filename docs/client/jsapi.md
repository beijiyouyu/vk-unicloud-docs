# JS API文档大全

在 `vk.pubfn.` 不仅可以在 `js` 中使用，也可以直接在 `template` 模板中使用（在template中也可以用简写法$fn代替vk.pubfn）。如

```html
<view>{{ vk.pubfn.hidden("15200000001", 3, 4) }}</view>
<view>{{ $fn.hidden("15200000001", 3, 4) }}</view>
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
 * @param {String} timeoutName 定时器ID
 * @return null
 */
vk.pubfn.debounce(function() {
	
}, 1000);
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
vk.pubfn.throttle(function() {
	
}, 1000);
```

### vk.pubfn.arrayToTree（数组转树）

```js
/**
 * 数组结构转树形结构
 * @params {Array} arrayData  数据源
 * @params {Object} treeProps 树结构配置
 * { id:"_id", parent_id:"parent_id", children:"children",need_field:["_id","name"],deleteParentId:true }
 */
vk.pubfn.arrayToTree(arrayData,{
  id:"_id", 
  parent_id:"parent_id", 
  children:"children"
});
```

### vk.pubfn.treeToArray（树转数组）

```js
/**
 * 树形结构转数组结构
 * @params {Array} treeData  数据源
 * @params {Object} treeProps 树结构配置 
 * { id:"_id", parent_id:"parent_id", children:"children", deleteChildren:true }
 */
vk.pubfn.treeToArray(treeData,{
  id:"_id",
  parent_id:"parent_id",
  children:"children"
});
```

### vk.pubfn.sleep（进程强制等待，休眠）

```js
/**
 * 进程强制等待，休眠（单位毫秒）
 * @params {Number} ms 毫秒
 */
await vk.pubfn.sleep(1000);
```


### vk.pubfn.timeFormat（日期时间格式化）

```js
/**
 * 日期时间格式化
 * @params {Date || Number} date 需要格式化的时间，支持时间对象和时间戳
 * @params {Number} targetTimezone 时区 默认东8区 正数代表东 负数代表西
 */
vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
```

### vk.pubfn.getCommonTime（获取时间范围）

```js
/**
 * 获取时间范围
 * @params {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * @params {Number} targetTimezone 时区 默认东8区 正数代表东 负数代表西
 * 返回的是时间戳(防止时区问题)
 * 返回数据如下：
 {
   todayStart 今日开始时间
   todayEnd   今日结束时间
   today12End 今日上午结束时间
   monthStart 本月开始时间
   monthEnd   本月结束时间
   yearStart  本年开始时间
   yearEnd    本年结束时间
   weekStart  本周开始时间
   weekEnd    本周结束时间
   now        现在的时间点(含月年日时分秒)
   months     本年度每月的开始和结束时间 months[1] 代表1月
 }
 */
vk.pubfn.getCommonTime(new Date());
```

### vk.pubfn.getOffsetTime（获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳）

```js
/**
 * 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳
 * 返回时间戳形式
 */
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

### vk.pubfn.getDayOffsetStartAndEnd（获得相对当前时间的偏移 count 天的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 天的起止日期(日的开始和结束)
 * @params {Number} count  默认0 (0代表今日 为-1代表昨日 为1代表明日以此类推)
 * @params {Date || Number} date 指定从那天开始计算
 */
vk.pubfn.getDayOffsetStartAndEnd(0);
```

### vk.pubfn.getMonthOffsetStartAndEnd（获得相对当前时间的偏移 count 月的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 月的起止日期(月的开始和结束)
 * @params {Number} count  默认0 (0代表本月 为-1代表上月 为1代表下月以此类推)
 * @params {Date || Number} date 指定从那天开始计算
 */
vk.pubfn.getMonthOffsetStartAndEnd(0);
```

### vk.pubfn.getYearOffsetStartAndEnd（获得相对当前时间的偏移 count 年的起止日期）

```js
/**
 * 获得相对当前时间的偏移 count 年的起止日期(年的开始和结束)
 * @params {Number} count  默认0 (0代表今年 为-1代表去年 为1代表明年以此类推)
 * @params {Date || Number} date 指定从那天开始计算
 */
vk.pubfn.getYearOffsetStartAndEnd(0);
```

### vk.pubfn.test（检测文本格式）

```js
/**
 * 检测文本是否满足指定格式
 * @params {String} str 需要检测的文本
 * @params {String} type 检测类型
 * 包含 
 * mobile 手机号码
 * tel 座机
 * card 身份证
 * mobileCode 6位数字验证码
 * username 账号以字母开头，长度在6~18之间，只能包含字母、数字和下划线
 * pwd 密码长度在6~18之间，只能包含字母、数字和下划线
 * payPwd 支付密码 6位纯数字
 * postal 邮政编码
 * QQ QQ号
 * email 邮箱
 * URL 网址
 * IP IP地址
 * date 日期 2020-08-03
 * time 时间 12:12:12
 * dateTime 日期+时间 2020-08-03 12:12:12
 * number 数字
 * english 英文
 * chinese 中文
 * HTML HTML标记
 */
vk.pubfn.test(str, type);
```

### vk.pubfn.objectAssign（对象属性浅拷贝）

```js
/**
 * 对象属性拷贝(浅拷贝)
 * @description 将 obj2 的属性赋值给 obj1 (如果obj1中有对应的属性,则会被obj2的属性值覆盖)
 * @params {Object} 	obj1
 * @params {Object} 	obj2
 */
vk.pubfn.objectAssign(obj1, obj2);
```

### vk.pubfn.copyObject（复制一份对象-没有映射关系）

```js
/**
 * 复制一份对象-没有映射关系
 * @description 主要用于解除映射关系（不支持克隆函数）
 * @params {Object} 	obj
 */
let newObj = vk.pubfn.copyObject(obj);
```

### vk.pubfn.deepClone（深度克隆一个对象-没有映射关系）

```js
/**
 * 深度克隆一个对象-没有映射关系
 * @description 主要用于解除映射关系（支持克隆函数）
 * @params {Object} 	obj
 */
let newObj = vk.pubfn.deepClone(obj);
```

### vk.pubfn.arr_concat（两个对象数组合并，并去除重复的数据）

```js
/**
 * 两个(元素为对象)的数组合并,并去除重复的数据
 * @params	{Array} 	arr1 	第一个数组(arr1和aar2没有顺序要求)
 * @params	{Array} 	arr2 	第二个数组
 * @params	{String} 	flag 	判断标识,默认用id来判断,若flag传-1,代表不去除重复数据
 */
let arr = vk.pubfn.arr_concat(arr1, arr2, "_id");
```

### vk.pubfn.getData（根据字符串路径获取对象的值）
支持.和[]，且任意一个值为undefined时，不会报错，会直接返回undefined

```js
/**
 * 自动根据字符串路径获取对象中的值支持.和[] , 且任意一个值为undefined时,不会报错,会直接返回undefined
 * @params	{Object} dataObj 数据源
 * @params	{String} name 支持a.b 和 a[b]
 * @params	{String} defaultValue undefined时的默认值
 */
let data = vk.pubfn.getData(dataObj, name, defaultValue);

// 若在vue模板中使用，可以使用简写法 {{ $getData(userInfo, "a.b.c.d[1].a", '默认值') }}
```

### vk.pubfn.setData（根据字符串路径设置对象的值）
支持.和[]

```js
/**
 * 自动根据字符串路径设置对象中的值 支持.和[]
 * @params	{Object} dataObj 数据源
 * @params	{String} name 支持a.b 和 a[b]
 * @params	{String} value 值
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
 * @params	{Array} list 数据源
 * @params	{String} key 键名
 * @params	{String} value 键值
 */
vk.pubfn.getListItem(list, key, value);
```

### vk.pubfn.getListIndex（从对象数组中获取某个对象的index）
获取对象数组中某个元素的index，根据指定的键名和键值
```js
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @params	{Array} list 数据源
 * @params	{String} key 键名
 * @params	{String} value 键值
 */
vk.pubfn.getListIndex(list, key, value);
```

### vk.pubfn.getListItemIndex（从对象数组中获取某一个对象和index）
获取对象数组中某个元素的index，根据指定的键名和键值
```js
/**
 * 获取对象数组中某个元素的index,根据指定的键名和键值
 * @description 主要用于在一个对象数组中快速获取 _id = 1 的index
 * @params	{Array} list 数据源
 * @params	{String} key 键名
 * @params	{String} value 键值
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
 */
vk.pubfn.arrayToJson(list, "_id");
```

### vk.pubfn.arrayObjectGetArray（从数组中提取指定字段形式新的数组）

```js
/**
 * 从数组中提取指定字段形式新的数组
 * 如[{"_id":"001","name":"name1","sex":1},{"_id":"002","name":"name2","sex":2}]
 * 提取_id字段转成
 * ["001","002"]
 */
vk.pubfn.arrayObjectGetArray(list, "_id");
```

### vk.pubfn.random（随机数）
支持任意字符,默认纯数字

```js
/**
 * 产生指定位数的随机数(支持任意字符,默认纯数字)
 * @params	{Number} length 数据源
 * @params	{String} str 指定的字符串中随机范围
 * @params	{Array} arr 产生的随机数不会和此数组的任意一项重复
 */
vk.pubfn.random(6);
vk.pubfn.random(6, "abcdefghijklmnopqrstuvwxyz0123456789");
vk.pubfn.random(1,"123456789",["1","2","3"]);
```

### vk.pubfn.hidden（将手机号、账号等隐藏中间字段）

```js
/**
 * 将手机号,账号等隐藏中间字段
 * @params {String} str   需要转换的字符串
 * @params {Number} first 前面显示的字符数量，默认为0
 * @params {Number} last  后面显示的字符数量，默认为0
 */
vk.pubfn.hidden(str, first, last);
```

### vk.pubfn.checkArrayIntersection（两数组是否有交集)

```js
/**
 * 判断常量数组A是否至少有一个元素在常量数组B中存在(两数组有交集)
 * @params {Array} arr1 数组A
 * @params {Array} arr2 数组B
 */
vk.pubfn.checkArrayIntersection(arr1, arr2);
```

### vk.pubfn.getWeekStartAndEnd（获得相对当前周addWeekCount个周的起止日期）

```js
/**
 * 获得相对当前周addWeekCount个周的起止日期
 * @params {Number} addWeekCount  默认0 (0代表本周 为-1代表上周 为1代表下周以此类推 为2代表下下周)
 */
vk.pubfn.getWeekStartAndEnd(0);
```



### vk.pubfn.calcFreights（计算运费）

```js
/**
 * 计算运费
 *  @params {Object} freightsItem 运费模板
 {
   first_weight             Number 首重 单位KG,
   first_weight_price       Number 首重 首重价格
   continuous_weight        Number 续重 单位KG
   continuous_weight_price  Number 续重价格
   max_weight               Number 重量达到此值时,会多计算首重的价格,并少一次续重的价格 倍乘(相当于拆分多个包裹)
 }
 * @params {Number} weight 运费重量
 */
vk.pubfn.calcFreights(freightsItem, weight);
```

### vk.pubfn.getNewObject（从一个对象中取多个属性，并生成一个全新的对象）

```js
/**
 * 从一个对象中取多个属性,并生成一个全新的对象
 * @params {Object} obj 对象
 * @params {Array<String>} keys 键名数组
 */
vk.pubfn.getNewObject(obj, keys);
```

### vk.pubfn.deleteObjectKeys（对象删除指定的字段，返回新的对象）

```js
/**
 * 对象删除指定的字段,返回新的对象
 * @params {Object} data  操作对象
 * @params {Array<String>} deleteKeys 需要删除的键名(数组形式)
 */
vk.pubfn.deleteObjectKeys(data, deleteKeys);
```

### vk.pubfn.timeUtil.isLeapYear（判断是否是闰年）

```js
/**
 * 判断是否是闰年
 * @params {Number | Date} year 需要计算的年份或时间,默认使用当前时间的年份
 */
vk.pubfn.timeUtil.isLeapYear(2021);
```

### vk.pubfn.timeUtil.isQingming（判断是否是清明节）

```js
/**
 * 判断是否是清明节
 * @params {Object} date 时间对象 
 */
vk.pubfn.timeUtil.isQingming(new Date());
```

### vk.pubfn.calcSize（单位进制换算）

```js
/**
 * 单位进制换算
 * length	换算前大小
 * arr		进制的数组,如["B","KB","MB","GB"]
 * ary		进制,如KB-MB-GB,进制1024
 * precision	数值精度
 */
vk.pubfn.calcSize(length,["B","KB","MB","GB"],1024,3);
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
 * @params {String} prefix 前缀
 * @params {Number} num 位数，建议在25-30之间，默认25
 */
vk.pubfn.createOrderNo("NO");
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
 * @param {Any} obj
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
 * vk.pubfn.toDecimal(val, 2);
 */
```


## 前端专属

### vk.pubfn.dateDiff（将时间显示成1秒前、1天前）

```js
/**
 * 将时间显示成1秒前、1天前（计算方式为：当前时间 - startTime）
 * @description 主要用于 文章最后回复时间: 1分钟前
 * @params {String || Number} 	startTime	需要计算的时间 如文章最后回复时间
 * @params {String} suffix	后缀，默认为前，如 1秒前 ,若设置为空字符串，则只显示 1秒
 */
vk.pubfn.dateDiff(startTime, suffix);
```

### vk.pubfn.dateDiff2（将时间显示成1秒、1天）

```js
/**
 * 将时间显示成1秒、1天（计算方式为：endTime - 当前时间）
 * @description 主要用于 到期时间剩余 : 3天 这样的场景
 * @params {String || Number} endTime	需要计算的时间 如到期时间
 * @params {String} endText	到期时显示的文字
 */
vk.pubfn.dateDiff2(endTime, endText);
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
 * @params {Number} n 需要转换的数字
 */
vk.pubfn.numStr(n);
```

### vk.pubfn.priceFilter（金额显示过滤器）
金额显示过滤器（已分为单位，将100 转成 1）
```js
/**
 * 金额显示过滤器（已分为单位，将100 转成 1
 * @params {Number} money 金额
 */
vk.pubfn.priceFilter(money);
```

### vk.pubfn.getListData（手机长列表分页加载数据）

```js
/**
 * 手机端长列表分页加载数据
 * @description 主要用于解除映射关系
 * @params {Vue页面对象} that 页面数据对象this
 * @params {String} url 请求地址(云函数路径)
 * @params {String} listName 后端返回的list数组的字段名称,默认rows
 * @params {Object} data 额外数据
 * @params {function} dataPreprocess	数据预处理函数
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
    dataPreprocess : function(list){
      return list;
    }
});
```

### vk.pubfn.getComponentsDynamicData（动态组件数据获取）

```js


/**
 * 动态组件数据获取
 * @description 主要用于动态组件的数据获取
 * @params {Vue页面对象} that 页面数据对象this
 * @params {String}     ids  动态数据组件的ID
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
  success:function(base64){

  }
});
```

### vk.pubfn.base64ToFile（base64转文件）

```js
/**
 * base64转文件
 */
vk.pubfn.base64ToFile({
  base64:base64,
  success:function(file){

  }
});
```

## 弹窗

### vk.alert
```js
// 简写
vk.alert("内容");
// 完整写法
vk.alert("内容","提示","确定", function(){
  // 点击确定按钮后的回调
  
});
```

### vk.confirm
```js
vk.confirm("内容","提示","确定","取消",function(res){
  if(res.confirm){
    // 点击确定按钮后的回调
    
  }
});
```

### vk.prompt
```js
vk.prompt("请输入","提示","确定","取消",function(res){
  if(res.confirm){
    console.log(res.content);
  }
},"输入框内初始内容");
```

### vk.toast
```js
vk.toast("提示内容");
vk.toast("提示内容", "success"); // 带成功的图标
vk.toast("提示内容", "/static/1.png"); // 带自定义图片
vk.toast("提示内容", "none", 1000); // 修改时间延迟
// 带回调函数
vk.toast("提示内容", "none", function(){
  
}); 
// 去除遮罩
vk.toast("提示内容", "none", false);
// 全参数完整写法（最后3个参数的位置顺序没有要求）
vk.toast("提示内容", "none", 1000, true, function(){
  
});
```

### vk.showActionSheet
```js
vk.showActionSheet({
  title:"",
  list:["位置","@好友"],
  color:"rgb(0, 0, 0)",
  success:function(res){
    if(res.index==0){

    }else if(res.index==1){

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

关闭当前页面，返回上一页面

```js
vk.navigateBack();
```

### vk.navigateToHome

跳转到首页 （app.config.js 的 index.url）

```js
vk.navigateToHome();
```

### vk.navigateToLogin

跳转到登录页 （app.config.js 的 login.url）

```js
vk.navigateToLogin();
```

