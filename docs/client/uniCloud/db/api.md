# 数据库API
 
调用示例在`router/service/db_test/pub/`目录下

演示页面在`pages/db-test/db-test`

### vk.baseDao数据库API部分调用示例展示

## 增

### vk.baseDao.add（单条记录增加）

**接口名**

`vk.baseDao.add`

**调用示例**

```js
let id = await vk.baseDao.add({
  dbName:"vk-test",// 表名
  dataJson:{ // 需要新增的数据 json格式
    money: Math.floor(Math.random() * 9 + 1)
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   dataJson |  Object  |  是  |   需要添加的数据    |
|   cancelAddTime   |  Boolean  |  否  |   取消自动生成 _add_time 和 _add_time_str 字段    |
|   cancelAddTimeStr   |  Boolean  |  否  |   取消自动生成 _add_time_str 字段    |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值为添加数据的_id，添加失败，则返回null

### vk.baseDao.adds（批量增加）

**接口名**

`vk.baseDao.adds`

**调用示例**

```js
let ids = await vk.baseDao.adds({
  dbName:"vk-test",// 表名
  dataJson:[
    { money: Math.floor(Math.random() * 9 + 1) },
    { money: Math.floor(Math.random() * 9 + 1) }
  ]
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   dataJson |  Array  |  是  |   需要批量添加的数据    |
|   cancelAddTime   |  Boolean  |  否  |   取消自动生成 _add_time 和 _add_time_str 字段    |
|   cancelAddTimeStr   |  Boolean  |  否  |   取消自动生成 _add_time_str 字段    |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是是添加数据的_id数组，添加失败，则返回null

___注意: `add` 和 `adds` 默认会自动加上 `_add_time`字段，该字段表示该条记录的添加时间___

可以通过参数 `cancelAddTime:true` 来取消 `_add_time` 字段的添加，如下
```js
let id = await vk.baseDao.add({
  dbName:"vk-test",
  cancelAddTime: true, // 通过设置 cancelAddTime:true 可以取消 _add_time 字段的添加
  dataJson:{ 
    money: Math.floor(Math.random() * 9 + 1)
  }
});
```
也可以通过配置 `/common/uni-config-center/vk-unicloud/index.js` 内的 `vk.db.unicloud.cancelAddTime = true` 来全局取消

提示：正常情况下，没有必要特意取消该字段，该字段记录了本条记录的实际添加时间，且该字段可以用于按时间排序（默认 `vk.baseDao.getTableData` 的排序规则就是按 `_add_time` 降序。）

## 删
### vk.baseDao.del（批量删除）

**接口名**

`vk.baseDao.del`

批量删除 对应的传统sql语句: `delete from vk-test where money = 1`

**调用示例**

```js
// 返回被删除的记录条数
await vk.baseDao.del({
  dbName:"vk-test",
  whereJson:{
    money:1
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   whereJson |  Object  |  是  |   where 条件  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是删除的记录数量

**如果你想要删除此表全部数据，可以这样写**

```js
await vk.baseDao.del({
  dbName:"vk-test",
  whereJson:{
    _id : _.exists(true),
  }
});
```

### vk.baseDao.deleteById（根据ID删除数据 ）

**接口名**

`vk.baseDao.deleteById`

根据ID删除数据 对应的传统sql语句: `delete from vk-test where _id = 1`

**调用示例**

```js
// 返回被删除的记录条数
await vk.baseDao.deleteById({
  dbName:"vk-test",
  id:1
});

```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   id |  String  |  是  |   记录的_id  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是删除的记录数量

## 改
### vk.baseDao.update（批量修改）

**接口名**

`vk.baseDao.update`

批量修改 对应的传统sql语句: `update vk-test set money = money-100 where _id="5f3a14823d11c6000106ff5c" and money >= 100`

**调用示例**

```js
// 返回被修改的记录条数
let num = await vk.baseDao.update({
  dbName:"vk-test", // 表名
  whereJson:{ // 条件
    _id:"5f3a14823d11c6000106ff5c",
    money:_.gte(100)
  },
  dataJson:{ // 需要修改的数据
    money:_.inc(-100)
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   whereJson |  Object  |  是  |   where 条件  |
|   dataJson |  Object  |  是  |   需要修改的数据  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是受影响的行数

**如果你想要修改此表全部数据，可以这样写**

```js
let num = await vk.baseDao.update({
  dbName:"vk-test", // 表名
  whereJson:{ // 条件
    _id : _.exists(true),
  },
  dataJson:{ // 需要修改的数据
    money:_.inc(-1)
  }
});
```

### vk.baseDao.updateById（根据ID修改数据）

**接口名**

`vk.baseDao.updateById`

**调用示例**

```js
let newInfo = await vk.baseDao.updateById({
  dbName:"vk-test",
  id:_id,
  dataJson:{
    money:1
  },
  getUpdateData:true, // 去掉getUpdateData，则不会返回修改后的数据对象
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   id |  String  |  是  |   记录的_id  |
|   dataJson |  Object  |  是  |   需要修改的数据  |
|   getUpdateData |  Boolean  |  否  |   是否需要返回修改后的数据  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

默认返回值是受影响的行数，如果getUpdateData为true，则返回修改后的数据对象

### vk.baseDao.updateAndReturn（更新并返回更新后的数据，原子操作）

**接口名**

`vk.baseDao.updateAndReturn`

根据ID修改数据，并返回修改后的数据对象（原子操作）（支持事务）

**调用示例**

方式一（此方式目前仅阿里云支持）

```js
let newInfo = await vk.baseDao.updateAndReturn({
  dbName: "vk-test",
  id: _id,
  dataJson: {
    money: 1
  }
});
```

方式二（whereJson的条件查询后的结果必须有且只有1条记录）（此方式目前阿里云和腾讯云都支持）

```js
let newInfo = await vk.baseDao.updateAndReturn({
  dbName: "vk-test",
  whereJson: {
    _id: _id
  },
  dataJson: {
    money: 1
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   id |  String  |  是  |   记录的_id（id与whereJson二选一）  |
|   whereJson |  Object  |  是  |   where 条件（id与whereJson二选一）  |
|   dataJson |  Object  |  是  |   需要修改的数据  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

默认返回值是修改后的数据对象

`vk.baseDao.updateAndReturn` 和 `vk.baseDao.updateById + getUpdateData:true` 的区别？

* vk.baseDao.updateAndReturn 是原子操作，而后者不是原子操作（后者是先修改再查询）

vk.baseDao.updateAndReturn 可以实现什么功能？

* 1、实现id自增
* 2、实现阅读数自增（同时返回自增后的商品或文章详细信息等）
* 3、实现跟数值有关的自增和自减（同时需要实时获取自增或自减后的值）

## 查
### vk.baseDao.findById（根据id获取单条记录）

**接口名**

`vk.baseDao.findById`

根据id获取单条记录 对应的传统sql语句: `select * from vk-test where _id = "5f3a125b3d11c6000106d338"`

**调用示例**

```js
let info = await vk.baseDao.findById({
  dbName:"vk-test",
  id:"5f3a125b3d11c6000106d338"
});

```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   id |  String  |  是  |   记录的_id |
|   fieldJson |  Object  |  否  |   字段显示规则  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是该条记录数据

### vk.baseDao.findByWhereJson（根据条件获取单条记录）

**接口名**

`vk.baseDao.findByWhereJson`

根据条件获取单条记录 对应的传统sql语句: `select * from vk-test where _id = "5f3a125b3d11c6000106d338"`

**调用示例**

```js
let info = await vk.baseDao.findByWhereJson({
  dbName:"vk-test",
  whereJson:{
    _id:"5f3a125b3d11c6000106d338",
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   whereJson |  Object  |  是  |   where 条件  |
|   fieldJson |  Object  |  否  |   字段显示规则  |
|   sortArr |  Array  |  否  |   排序规则  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是该条记录数据（只返回第一条数据的内容）

### vk.baseDao.select（查多条记录，具有分页功能）

**接口名**

`vk.baseDao.select`

云开发数据库最大支持查询500条数据，而此API可以达到1万条数据，通过设置`pageSize: 10000`，最大极限要看你返回的数据量大小。

查多条记录（具有分页功能） 对应的传统sql语句: `select * from vk-test where money>=0 limit 1,20

特别注意：此分页功能会随着 `pageIndex` 的值越大，效率越低（传统mysql也有此问题），pageIndex * pageSize 的值最好不要超过 400万（如每页显示10条，则建议最多让用户查看到第40万页）

**调用示例**

```js
let res = await vk.baseDao.select({
  dbName:"vk-test", // 表名
  getCount:false, // 是否需要同时查询满足条件的记录总数量，默认false
  getMain:false, // 是否只返回rows数据，默认false
  pageIndex:1, // 当前第几页
  pageSize:20, // 每页条数
  whereJson:{ // 条件
    money:_.gte(0)  // 金额大于0
  },
  // 代表只显示_id和money字段
  fieldJson:{
    _id: true,
    money: true, 
  },
  // 按_id降序 asc 升序 desc 降序 
  sortArr:[
    { name:"_id", type:"desc" }
  ],
});
```

___若 pageSize 设置成-1，则默认查全部数据，但由于云数据库本身有最大每次只能查500条的限制。（使用VK框架可以突破到1万条以上，联表查询时，依然为500条限制）___

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   getCount |  Boolean  |  否  |   是否返回满足条件的记录总数。默认 false |
|   getMain |  Boolean  |  否  |   是否只返回rows数组。默认 false |
|   getOne |  Boolean  |  否  |   是否只返回第一条数据。默认 false  |
|   pageIndex |  Number  |  否  |   第几页 默认 1  |
|   pageSize |  Number  |  否  |   每页显示数量 默认 10  |
|   whereJson |  Object  |  否  |   where 条件  |
|   fieldJson |  Object  |  否  |   字段显示规则（见上方调用示例）   |
|   sortArr |  Array  |  否  |   排序规则（见上方调用示例）  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

|    参数名   |   类型   |     说明    |
|------------|----------|-----------|
|   rows   |  Array  |    数据列表    |
|   total   |  Number  |    满足条件的记录总数（如果getCount为false，则total=rows.length  |
|   hasMore   |  Boolean  |    分页参数，true 还有下一页 false 无下一页    |
|   pagination   |  Object  |   当前分页的页码pageIndex和每页显示的大小pageSize    |

### vk.baseDao.count（获取记录总条数）

**接口名**

`vk.baseDao.count`

获取记录总条数 对应的传统sql语句: `select count(*) from vk-test`

**调用示例**

不带条件count

```js
let num = await vk.baseDao.count({
  dbName:"vk-test",// 表名
});
```

带条件count

```js
let num = await vk.baseDao.count({
  dbName:"vk-test",// 表名
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   whereJson |  Object  |  否  |   where 条件  |
|   foreignDB |  Array  |  否  |   连表规则 |
|   groupJson |  Object  |  否  |   分组规则 |
|   lastWhereJson |  Object  |  否  |   连表后的where条件|
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是满足条件的记录总数

**扩展示例**

判断用户名是否存在

```js
// 判断用户名是否存在
let num = await vk.baseDao.count({
  dbName:"uni-id-users",// 表名
  whereJson:{ // 条件
    username: "admin"
  }
});
if(num>0){
  // 用户名存在
}
```

在设置了昵称唯一时，判断此昵称是否允许修改

```js
// 判断用户名是否存在
let uid = "当前要修改的用户的_id";
let num = await vk.baseDao.count({
  dbName:"uni-id-users",// 表名
  whereJson:{ // 条件
    _id: _.neq(uid), // 这里排除掉自己
    nickname: "我要修改的昵称"
  }
});
if(num>0){
  // 用户名存在
}
```

### vk.baseDao.sum（求和）

**接口名**

`vk.baseDao.sum`

sum求和 对应的传统sql语句: `select sum(money) from vk-test`

**调用示例**

```js
let sum = await vk.baseDao.sum({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要求和的字段名
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   fieldName |  String  |  是  |   求和的字段名 |
|   whereJson |  Object  |  否  |   where 条件  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是求和的值（只能针对数值类型的字段求和，且求和的所有记录中，该字段不允许有字符串）

### vk.baseDao.max（取最大值）

**接口名**

`vk.baseDao.max`

对应的传统sql语句: `select max(money) from vk-test`

**调用示例**

```js
let max = await vk.baseDao.max({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要取最大值的字段名
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   fieldName |  String  |  是  |   求最大值的字段名 |
|   whereJson |  Object  |  否  |   where 条件  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是最大值

### vk.baseDao.min（取最小值）

**接口名**

`vk.baseDao.min`

对应的传统sql语句: `select min(money) from vk-test`

**调用示例**

```js
let min = await vk.baseDao.min({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要取最小值的字段名
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   fieldName |  String  |  是  |   求最小值的字段名 |
|   whereJson |  Object  |  否  |   where 条件  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是最小值

### vk.baseDao.avg（取平均值）

**接口名**

`vk.baseDao.avg`

对应的传统sql语句: `select avg(money) from vk-test`

**调用示例**

```js
let avg = await vk.baseDao.avg({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要取平均值的字段名
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   fieldName |  String  |  是  |   求平均值的字段名 |
|   whereJson |  Object  |  否  |   where 条件  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是平均值

### vk.baseDao.sample（随机取N条数据）

**接口名**

`vk.baseDao.sample`

随机取N条数据

**调用示例**

注意：暂不支持连表查询

```js
let list = await vk.baseDao.sample({
  dbName:"vk-test", // 表名
  size:1, // 随机条数
  whereJson:{ // 条件
    
  }
});
```

**参数说明**

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   表名    |
|   size |  Number  |  是  |   随机获取的记录数量 |
|   whereJson |  Object  |  否  |   where 条件  |
|   fieldJson |  Object  |  否  |   字段显示规则  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

**返回值**

返回值是平均值

**...更多其他可以下载插件体验**