# 1、数据库API
 
### 调用示例在`router/service/db_test/pub/`目录下
### 演示页面在`pages/db-test/db-test`

### `vk.baseDao`数据库API部分调用示例展示

## 增
### 单条记录增加
`vk.baseDao.add`
```js
let id = await vk.baseDao.add({
  dbName:"vk-test",// 表名
  dataJson:{ // 需要新增的数据 json格式
    money: Math.floor(Math.random() * 9 + 1)
  }
});
```

### 批量增加
`vk.baseDao.adds`
```js
let ids = await vk.baseDao.adds({
  dbName:"vk-test",// 表名
  dataJson:[
    { money: Math.floor(Math.random() * 9 + 1) },
    { money: Math.floor(Math.random() * 9 + 1) }
  ]
});
```

## 删
### 批量删除
`vk.baseDao.del`
批量删除 对应的传统sql语句: `delete from vk-test where money = 1`

```js
// 返回被删除的记录条数
await vk.baseDao.del({
  dbName:"vk-test",
  whereJson:{
    money:1
  }
});
```

### 据ID删除数据 
`vk.baseDao.deleteById`
据ID删除数据 对应的传统sql语句: `delete from vk-test where _id = 1`

```js
// 返回被删除的记录条数
await vk.baseDao.deleteById({
  dbName:"vk-test",
  id:1
});

```

## 改
### 批量修改
`vk.baseDao.update`
批量修改 对应的传统sql语句: `update vk-test set money = money-1 where _id="5f3a14823d11c6000106ff5c" and money > 0`
```js
// 返回被修改的记录条数
let num = await vk.baseDao.update({
  dbName:"vk-test", // 表名
  whereJson:{ // 条件
    _id:"5f3a14823d11c6000106ff5c",
    money:_.gt(0)
  },
  dataJson:{ // 需要修改的数据
    money:_.inc(-1)
  }
});
```
### 根据ID修改数据
`vk.baseDao.updateById`
根据ID修改数据，并返回修改后的数据对象
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

### 更新并返回更新后的数据（原子操作）
`vk.baseDao.updateAndReturn`
根据ID修改数据，并返回修改后的数据对象（原子操作）(支持事务)

#### 方式一（此方式目前仅阿里云支持）
```js
let newInfo = await vk.baseDao.updateAndReturn({
  dbName: "vk-test",
  id: _id,
  dataJson: {
    money: 1
  }
});
```

#### 方式二（whereJson的条件查询后的结果必须有且只有1条记录）（此方式目前阿里云和腾讯云都支持）
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

#### `vk.baseDao.updateAndReturn` 和 `vk.baseDao.updateById + getUpdateData:true` 的区别？

* vk.baseDao.updateAndReturn 是原子操作，而后者不是原子操作（后者是先修改再查询）

#### vk.baseDao.updateAndReturn 可以实现什么功能？

* 1、实现id自增
* 2、实现阅读数自增
* 3、实现跟数值有关的自增和自减（同时需要实时获取自增或自减后的值）

## 查
### 根据id获取单条记录
`vk.baseDao.findById`
根据id获取单条记录 对应的传统sql语句: `select * from vk-test where _id = "5f3a125b3d11c6000106d338"`
```js
let info = await vk.baseDao.findById({
  dbName:"vk-test",
  id:"5f3a125b3d11c6000106d338"
});

```
### 根据条件获取单条记录
`vk.baseDao.findByWhereJson`
根据条件获取单条记录 对应的传统sql语句: `select * from vk-test where _id = "5f3a125b3d11c6000106d338"`
```js
let info = await vk.baseDao.findByWhereJson({
  dbName:"vk-test",
  whereJson:{
    _id:"5f3a125b3d11c6000106d338",
  }
});
```

### 查多条记录(具有分页功能)

`vk.baseDao.select`

查多条记录(具有分页功能) 对应的传统sql语句: `select * from vk-test where money>=0 limit 1,20

特别注意：此分页功能会随着 `pageIndex` 的值越大，效率越低（传统mysql也有此问题），pageIndex * pageSize 的值最好不要超过 400万（如每页显示10条，则建议最多让用户查看到第40万页）

```js
let res = await vk.baseDao.select({
  dbName:"vk-test", // 表名
  getMain:false,// 是否只返回rows数据
  pageIndex:1, // 当前第几页
  pageSize:20, // 每页条数
  whereJson:{ // 条件
    money:_.gte(0)  // 金额大于0
  }
});
```

### 获取记录总条数
`vk.baseDao.count`
获取记录总条数 对应的传统sql语句: `select count(*) from vk-test`
```js
let num = await vk.baseDao.count({
  dbName:"vk-test",// 表名
  whereJson:{ // 条件
    
  }
});
```

#### 判断用户名是否存在
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


#### 在设置了昵称唯一时，判断此昵称是否允许修改
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


### 求和
`vk.baseDao.sum`
sum求和 对应的传统sql语句: `select sum(money) from vk-test`
```js
let sum = await vk.baseDao.sum({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要求和的字段名
  whereJson:{ // 条件
    
  }
});
```
### 取最大值
`vk.baseDao.max`
对应的传统sql语句: `select max(money) from vk-test`
```js
let max = await vk.baseDao.max({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要求和的字段名
  whereJson:{ // 条件
    
  }
});
```
### 取最小值
`vk.baseDao.min`
对应的传统sql语句: `select min(money) from vk-test`
```js
let min = await vk.baseDao.min({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要求和的字段名
  whereJson:{ // 条件
    
  }
});
```
### 取平均值
`vk.baseDao.avg`
对应的传统sql语句: `select avg(money) from vk-test`
```js
let avg = await vk.baseDao.avg({
  dbName:"vk-test", // 表名
  fieldName:"money", // 需要求和的字段名
  whereJson:{ // 条件
    
  }
});
```
### 随机取N条数据
`vk.baseDao.sample`
随机取N条数据
```js
let list = await vk.baseDao.sample({
  dbName:"vk-test", // 表名
  size:1, // 随机条数
  whereJson:{ // 条件
    
  }
});
```

#### ...更多其他可以下载插件体验

