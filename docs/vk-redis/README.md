# 什么是Redis?

Redis是现在最受欢迎的NoSQL数据库之一，Redis是一个使用ANSI C编写的开源、包含多种数据结构、支持网络、基于内存、可选持久性的键值对存储数据库，其具备如下

### 特性

* 基于内存运行，性能高效
* 支持分布式，理论上可以无限扩展
* key-value存储系统
* 开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API

### 特点

相比于其他数据库类型，Redis具备的特点是：

* C/S通讯模型
* 单进程单线程模型
* 丰富的数据类型
* 操作具有原子性
* 持久化
* 高并发读写
* 支持lua脚本

### 性能

下面是官方的bench-mark数据： 

测试完成了50个并发执行100000个请求。

设置和获取的值是一个256字节字符串。

Linux box是运行Linux 2.6,这是X3320 Xeon 2.5 ghz。

文本执行使用loopback接口(127.0.0.1)。

结果:读的速度是110000次/s,写的速度是81000次/s 。

### uniCloud的Redis和MongoDB的比较

* 读写速度：MongoDB数据存储在磁盘里，读写语法复杂，速度较慢。redis在内存中读写，只根据key访问数据，速度快很多。
* 并发能力：MongoDB并发能力有限。redis几乎没有限制，更多取决于云函数的并发限制。
* 查询能力：MongoDB支持所有查询语法，各种where、联表。redis只能根据key和有限语法操作数据。
* 计费：MongoDB按读写次数收费。redis虽然也收费，但无论写多少次读多少次，费用固定，在超过一定量的情况下，使用redis会大大降低成本，同时还能提升性能。

### redis主要用来做什么?

* 云端全局缓存

* IP白名单机制

* 秒杀活动记录库存

* 其他涉及高并发的场景

### 注意

* 使用腾讯云node12和redis，务必仔细阅读此文档：[keepRunningAfterReturn](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#keep-running)

### Q群：22466457 
