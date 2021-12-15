
通过下方示例方法分页则没有性能问题，但只能在当前页上进行上一页、下一页、上N页、下N页切换，无法直接指定第几页查看。

分页升序
```js
let {
  lastTime = 0, // 上一次查询时最后一条数据记录的_add_time
} = data;
res = await vk.baseDao.select({
  dbName:"vk-test", // 表名
  getMain:false,// 是否只返回rows数据
  pageIndex:1, // 当前第几页
  pageSize:20, // 每页条数
  whereJson:{ // 条件
    _add_time: _.gt(lastTime)
  },
  sortArr: [{ "name": "_add_time","type": "asc" }], // 按 _add_time 升序
});
// 将当前 lastTime 返回给前端
res.lastTime = Math.max(...res.rows.map(item => item._add_time));
```

分页降序
```js
let {
  lastTime, // 上一次查询时最后一条数据记录的_add_time
} = data;
let whereJson = {};
if (lastTime) {
  whereJson._add_time = _.lt(lastTime);
}
res = await vk.baseDao.select({
  dbName:"vk-test", // 表名
  getMain:false,// 是否只返回rows数据
  pageIndex:1, // 当前第几页
  pageSize:20, // 每页条数
  whereJson, // 条件
  sortArr: [{ "name": "_add_time","type": "desc" }], // 按 _add_time 降序
});
// 将当前 lastTime 返回给前端
res.lastTime = Math.min(...res.rows.map(item => item._add_time));
```


