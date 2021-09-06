# 数据库一键搬家工具

## `一键搬家`的优势

- 1、`官方的web控制台` 需要一个一个表导出导入，操作繁琐。而 `一键搬家` 不需要。

- 2、直接用 `官方的web控制台` 导出的json文件导入腾讯云，会出现24位id和外键搜索查不到的bug。而 `一键搬家` 自动帮你所有24位id增加1位解决此bug。

- 3、不仅支持将 `A账号` 下的 `A1空间` 搬家到 `A2空间`，还支持将 `A账号` 下的 `A1空间` 搬家到 `B账号` 下的 `B1空间`。

- 4、省心、省力、解放双手！

## 效果视频


<video src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/257dab2e-eedc-48c4-aef7-d6149ea7b97b.mp4" controls="controls" style="max-width:100%;">
  您的浏览器不支持 video 标签。
</video>

## 名词定义

- 1、旧空间：就是你需要搬家的空间。

- 2、新空间：就是你需要把旧空间搬到这的空间。

## 注意事项

- 1、请确保 `旧空间` 和 `新空间` 是可以正常访问的空间。

- 2、`新空间` 数据库的数据在导入前 `会被全部清空`（需要注意空间别选错了，否则后果自负）。

- 3、`旧空间` 数据库的数据 `不会被清空`（也不会被修改）

- 4、请一定要在阿里云环境 `相对稳定` 的时间段进行搬家（如果当前阿里云出 `故障` 了， `不稳定` ，则请等阿里云环境稳定了再进行搬家）

- 5、腾讯云的空间会消耗数据库查询、写入次数，以及云函数流量。

- 6、目前大致耗时 = （你数据量总记录数 / 1000） 秒（即每秒搬1000条数据）（后面会继续优化这个速度）

- 7、如有问题，可以加Q群：`22466457` 进行反馈（关于插件问题必定会得到处理）。

## 操作步骤

- 1、打开项目根目录 `vk.db.config.js` 配置文件，修改 `oldEnv` 、 `newEnv` 、`db` 配置 

#### 可以自动根据 `db_init.json` 生成 `vk.db.config.js` (在项目根目录执行 `node vk.create-db-config.js`，可以自动根据 `db_init.json` 文件生成数据库表名列表)

- 2、在 `旧空间` 上传云函数 `vk-db-migration`

- 3、HBX切换到 `新空间` ，在 `新空间` 也上传云函数 `vk-db-migration`（右键uniCloud目录，点击关联空间，如果是阿里云转腾讯云，需要把 `uniCloud` 目录重命名为 `uniCloud-tcb` ，反之，腾讯云转阿里云，则重命名为 `uniCloud-aliyun` ）

#### 特别注意：如果你购买的是普通授权版（非源码授权版），你可能需为两个空间各购买1次插件。

- 4、在 `新空间` 初始化你自己数据库的 `db_init.json` (注意，不要带任何数据库数据，这步骤只为了创建数据库索引)

- 5、HBX切换回 `旧空间` ，启动 `一键搬家` 项目（请使用连接云端云函数）

- 6、访问项目首页，当看到页面控制台上打印 `点击上方【开始一键搬家】按钮可进行一键搬家` 时，点击此按钮即可。

- 7、点击【开始一键搬家】按钮

- 8、如不出意外，等待进度条到100%即可。如果出了意外（比如阿里云数据库不稳定导致连续20次数据库连接失败（目前会自动重试20次），则需要刷新页面并重新点击【开始一键搬家】按钮

- 9、完成后请将 `uniCloud/cloudfunctions/vk-db-migration/vk.db.config.js` 的 `runKey` 设置为false，再分别上传到 `旧空间` 和 `新空间`（这步很关键，防止后面误点导致数据被清空，也可以直接去web控制台删除云函数 `vk-db-migration` ）

- 10、完成。


