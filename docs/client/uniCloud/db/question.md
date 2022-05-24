# 8、数据库操作常见问题
 
### 目录
#### 1、[and、or、in、nin、neq用法](#and)
#### 2、[大于小于](#大于小于)
#### 3、[获取今日注册的用户列表](#如何获取今日注册的用户列表)
#### 4、[数组第一个字段是开始时间，第二个字段是结束时间，判断当前时间是否在范围内](#数组第一个字段是开始时间，第二个字段是结束时间，判断当前时间是否在范围内)
#### 5、[控制只获取部分字段](#如何控制只获取部分字段)
#### 6、[排序](#排序)
#### 7、[模糊查询](#模糊查询)
#### 8、[如判断字段是否存在](#如何判断字段是否存在)
#### 9、[返回字段别名](#返回字段别名)
#### 10、[查出表中字段a等于字段b的数据](#查出表中字段a等于字段b的数据)
#### 11、[如何查询数组字段内包含某个值的数据](如何查询数组字段内包含某个值的数据)
#### 12、[分组count](#分组count)
#### 13、[删除某个字段](#删除某个字段)
#### 14、[vk.baseDao.findById和vk.baseDao.findByWhereJson如何连表](#findById如何连表)

### and
### `and` 、`or`、`in`、`nin`、`neq`的用法
### 针对同一个字段的 `and` 和 `or`
```js
// num >=0 and num <= 10
// 流式简写法
num : _.gte(0).lte(10)  
// 流式完整写法
num : _.gte(0).and(_.lte(10))  
// 前置写法
num : _.and(_.gte(0), _.lte(10))

// num <=0 or num >= 10
// 前置写法
num : _.or(_.lte(0), _.gte(10))
// 流式写法
num : _.lte(0).or(_.gte(10))

// num <=0 or (num > 10 or num <20)
// 流式写法(复式)
num : _.lte(0).or(_.gt(10).and(_.lt(20)))

```
### 跨字段的 `and` 和 `or`
```js
// num >50 and name = 'test'
whereJson: _.and([
  {
    num: _.gt(50)
  },
  {
    name: 'test'
  }
])

// num >50 or name = 'test'
whereJson: _.or([
  {
    num: _.gt(50)
  },
  {
    name: 'test'
  }
])


// num >50 and (name = 'test' or sex = 1)
whereJson: _.and([
  {
    num: _.gt(50)
  },
  _.or([
    {
      name: 'test'
    },
    {
      sex: 1
    }
  ])
])

```
### 多字段模糊搜索or
### 一个搜索value对应多个字段模糊搜索
```js
let whereJson = {};
let andArr = [];
if (searchvalue) {
  // 查询包含searchvalue的数据
  try {
    let regExp = new RegExp(searchvalue);
    let orObj = _.or([
      {
        "username": regExp
      },
      {
        "nickname": regExp
      },
      {
        "mobile": regExp
      },
      {
        "_id": searchvalue
      }
    ]);
    andArr.push(orObj);
  } catch (err) {
    return { code: -1, msg: '请输入合法的查询内容' };
  }
}
if (andArr.length > 0) {
  whereJson = _.and(andArr);
}
```


### in （包含其中） `nin`（都不包含）
```js
// 等价于 _id = "1" or _id = "2" or _id =  "3"
_id : _.in(["1","2","3"])
// 等价于 _id != "1" and _id !== "2" and _id != "3"
_id : _.nin(["1","2","3"])

```

### `neq` (不等于）
```js
// num != 1
num : _.neq(1)
```

### 大于小于
### `gt`(大于）
```js
// num > 0
num : _.gt(0)
```

### `gte`(大于等于）
```js
// num >= 0
num : _.gte(0)
```
### `lt`(小于）
```js
// num < 0
num : _.lt(0)
```
### `lte`(小于等于）
```js
// num <= 0
num : _.lte(0)
```

### 组合使用
```js
// num >=0 and num <= 10
num : _.gte(0).lte(10) 
```



### 如何获取今日注册的用户列表
```js
let { todayStart, todayEnd } = vk.pubfn.getCommonTime();
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    register_date : _.gte(todayStart).lte(todayEnd)  
  }
});

```

### 数组第一个字段是开始时间，第二个字段是结束时间，判断当前时间是否在范围内
```js
let time = Date.now();
let selectRes = await vk.baseDao.select({
  dbName:"xxxx表",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    "arr.0": _.lte(time),
    "arr.1": _.gte(time)
  }
});
```


### 如何控制只获取部分字段
#### 只取 `username` 和 `nickname`
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  fieldJson:{
    username:true, 
    nickname:true
  }
});
```

#### 除了 `token` 和 `password` 其他都取
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  fieldJson:{
    token:false, 
    password:false 
  }
});
```

### 排序
#### 升序
```js
// 按注册时间升序
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  sortArr:[{ "name":"register_date", "type":"asc" }]
});
```

#### 降序
```js
// 按注册时间降序
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  sortArr:[{ "name":"register_date", "type":"desc" }]
});
```
#### 多个排序条件
```js
// 按注册时间降序，时间相同者按_id 降序
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  sortArr:[
    { "name":"register_date", "type":"desc" },
    { "name":"_id", "type":"desc" }
  ]
});
```

### 模糊查询
#### 以`xxxx`开头
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    nickname : new RegExp('^'+searchvalue)
  }
});
```

#### 以`xxxx`结尾
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    nickname : new RegExp(searchvalue+'$')
  }
});
```
#### 包含`xxxx`
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    nickname : new RegExp(searchvalue)
  }
});
```

### 如何判断字段是否存在
```js
let selectRes = await vk.baseDao.select({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    nickname : _.exists(true), // true：存在 false：不存在
  }
});

```

### 返回字段别名
### 如何返回字段别名，如数据库中是`_id`,但想返回给前端是`user_id`

* 注意：select不支持字段别名，需要selects

```js
let selectRes = await vk.baseDao.selects({
  dbName:"uni-id-users",
  pageIndex:1,
  pageSize:20,
  fieldJson:{
    user_id:"$_id",
    nickname:true
  },
  whereJson:{
    
  }
});

```

### 查出表中字段a等于字段b的数据
```js
let selectRes = await vk.baseDao.select({
  dbName:"表名",
  pageIndex:1,
  pageSize:20,
  whereJson:_.expr(_.$.and([
    _.$.eq(['$a', '$b'])
  ]))
});

```

### 如何查询数组字段内包含某个值的数据
```js
let selectRes = await vk.baseDao.select({
  dbName:"表名",
  pageIndex:1,
  pageSize:20,
  whereJson:{
    role: roleId, // role 在数据库中是数组形式字段，如["roleid1","roleid2","roleid3"]  而 roleId = "roleid1" 代表查询数组内有包含roleid1的数据
  }
});

```



### 分组count

#### 最终返回的本月共有多少用户登录（去重后）。 
```js
let { monthStart, monthEnd } = vk.pubfn.getCommonTime(new Date());
let selectRes = await vk.baseDao.count({
  dbName: "登录日志表",
  // where条件
  whereJson: {
    _add_time: _.gte(monthStart).lte(monthEnd),
  },
  groupJson: {
    _id: "$user_id", // _id是分组id， $ 后面接字段名
  },
});
```


#### 最终返回的是每个日期登录的用户数量分别有多少个。 
```js
let selectRes = await vk.baseDao.selects({
  dbName: "登录日志表",
  pageIndex: 1,
  pageSize: 10,
  // where条件
  whereJson: {
    
  },
  groupJson: {
    _id: "$date_str", // _id是分组id， $ 后面接字段名，如按date_str字段进行分组(date_str字段是2021-08-19这样的字符串)
    count: _.$.addToSet("$user_id"), // $ 后面接字段名
  },
  sortArr: [{ name: "_id",type: "desc" }], // 对分组后的结果进行排序
  addFields:{
    count: _.$.size("$count")
  }
});
```


### 删除某个字段

```js
await vk.baseDao.update({
  dbName: "vk-test", // 表名
  whereJson: { // 条件
    _id: "5f3a14823d11c6000106ff5c"
  },
  dataJson: { 
    money: _.remove(), // 代表删除money字段
  }
});
```

### findById如何连表

`findById` 和 `findByWhereJson` 不支持连表，可以用 `selects + getOne + getMain` 代替

**完整代码**

```js
let info = await vk.baseDao.selects({
  dbName: "用户表",
  getOne: true,
  getMain: true,
  // 主表where条件
  whereJson: {
    _id: "001"
  },
  foreignDB: [
    {
      dbName: "vip", // 副表名
      localKey:"vip_id", // 主表外键字段名
      foreignKey: "user_id", // 副表外键字段名
      as: "vipInfo",
      limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
    }
  ]
});
```

**参数解析**

* getOne:true 代表只获取满足条件的第一条数据，并以对象形式返回。
* getMain:true 代表返回的数据不包含code:0

**即原本selects返回的数据格式是这样的。**

```json
{
  "code": 0,
  "msg": "查询成功",
  "total": 1,
  "hasMore": false,
  "rows": [{"_id":"001","name":"xxx"}]
}
```

**getOne:true 后 返回的数据格式是这样的（rows从数组变成了对象）**

```json
{
  "code": 0,
  "msg": "查询成功",
  "total": 1,
  "hasMore": false,
  "rows": {"_id":"001","name":"xxx"}
}
```

**getMain:true 后 返回的数据格式是这样的（直接返回rows的值）**

```json
[{"_id":"001","name":"xxx"}]
```

**getMain:true + getOne:true 后 返回的数据格式是这样的（等于findByWhereJson的效果，但具有连表功能）**

```json
{"_id":"001","name":"xxx"}
```
