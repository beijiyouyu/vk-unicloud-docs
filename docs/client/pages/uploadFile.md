# 上传 云储存或阿里云OSS

### 上传至`unicloud云储存`
#### 注意，记得小程序需要加域名白名单 [点击查看](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e4%b8%ad%e4%bd%bf%e7%94%a8unicloud%e7%9a%84%e7%99%bd%e5%90%8d%e5%8d%95%e9%85%8d%e7%bd%ae)
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: function (res) {
    // 上传至 unicloud云储存
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      suffix:"png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
      provider:"unicloud",
      success(res) {
       // 上传成功

      }
    });
  }
});

```

### 上传至 `阿里云oss`

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: function (res) {
    // 上传至 阿里云oss
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      suffix:"png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
      provider:"aliyun",
      success(res) {
       // 上传成功

      }
    });
  }
});

```

#### 注意，记得小程序需要加域名白名单
#### 还需要在`app.config.js`中配置
```js
// 第三方服务配置
service:{
  // 阿里云oss配置
  aliyunOSS:{
    // 密钥和签名信息 (由于签名的获取比较麻烦,建议初学者使用上传到unicloud的方案,上传到阿里云OSS是给有特殊需求的用户使用)
    uploadData:{
      OSSAccessKeyId: "",
      policy:"",
      signature:"",
    },
    // oss上传地址
    action:"https://xxxxxxxx.oss-cn-hangzhou.aliyuncs.com",
    // 根目录名称
    dirname:"test",
    // oss外网访问地址，也可以是阿里云cdn地址
    host:"https://xxx.xxx.com",
    // 上传时,是否按用户id进行分组储存
    groupUserId:false,
    // vk.uploadFile 是否默认上传到阿里云OSS
    isDefault:false
  }
}
```
#### service.aliyunOSS 参数生成工具 [点击下载](https://gitee.com/vk-uni/oss-h5-upload-js-direct.git)
导入项目后,修改项目根目录`upload.js`内的参数,然后运行`index.html`,随便上传一张图片,页面上会显示`aliyunOSS`参数配置

#### 如下图所示
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1a02b98c-ac0e-4662-95d9-e170f5f246d3.png)


## 上传图片，并将图片记录保存到admin后台
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: function (res) {
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      file: res.tempFiles[0],
      needSave:true,
      success(res) {
       // 上传成功

      }
    });
  }
});

```

## 自定义云端图片保存路径

通过 cloudPath 参数可直接指定路径（需包含文件后缀名）

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: function (res) {
    // 上传至 unicloud云储存
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      cloudPath: "myPath/aa.png",
      success(res) {
       // 上传成功

      }
    });
  }
});

```

