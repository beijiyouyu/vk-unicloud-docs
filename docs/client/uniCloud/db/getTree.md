---
sidebarDepth: 0
---

# 查询返回树状结构
 
以下语句效果是：查询已启用的菜单，并自动将子菜单合并到父菜单的children字段下

```js
res = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }],
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    whereJson: {
      enable: true
    }
  }
});
```

**注意：**

1. `treeProps` 内的 `whereJson` 若需要用到 `or` 和 `and` 则

`_.or` 需写成 `_.$.or`

`_.and` 需写成 `_.$.and`

同时不支持流式语法，只支持如下写法。

```js
let selectsRes = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }],
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    whereJson: _.$.or([
      {
        menu_id: _.eq("sys-user-manage")
      },
      {
        menu_id: _.exists(false)
      }
    ])
  }
});
```

and 和 or 嵌套

```js
let selectsRes = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }],
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    whereJson: _.$.and([
    	{
    		menu_id: _.eq("sys-user-manage")
    	},
    	_.$.or([
    		{
    			menu_id: _.eq("sys-user-manage2")
    		},
    		{
    			menu_id: _.exists(true)
    		}
    	])
    ])
  }
});
```

2. `foreignDB` 属性需写在主表下，无需写在 `treeProps` 内。（子表会继承主表的 `foreignDB` 属性)

下方的代码效果是查询用户列表，并自动带出用户推广的用户列表（组成树状结构，支持带出多层）

```js
res = await vk.baseDao.selects({
  dbName: "uni-id-users",
  pageIndex: 1,
  pageSize: 1000,
  whereJson:{
    inviter_uid:  _.exists(false),
  },
  // 树状结构参数
  treeProps: {
    id: "_id",
    parent_id: $.arrayElemAt(['$inviter_uid', 0]),
    children: "children",
    level: 2,
    limit: 1000,
    whereJson: {
      
    }
  }
});
```



