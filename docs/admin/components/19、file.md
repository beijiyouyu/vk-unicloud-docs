# 19、file 文件上传

### 万能表单使用方式

**文件**

```js
{ key: "file", title: "文件类型", type: "file", buttonText: "点击上传", limit: 9, accept: ".txt,.xls,.xlsx,.doc,.docx,.ppt,.pptx,.pdf" },
```

**视频**

```js
{ key: "file", title: "视频类型", type: "file", buttonText: "点击上传", limit: 9, accept: ".mp4,.avi,.3gp,.mov,.rmvb,.rm,.flv,.mkv" },
```

### API

### 公共属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| limit            | 最大上传数量 | Number  | - | -  |
| provider          | 储存空间供应商 | String  | unicloud | aliyun |
| needSave          | 是否需要保存图片url到admin后台 | Boolean  | false | true  |
| categoryId          | 当needSave=true时，文件保存的分类id（即vk-files-categories表的_id） | String  | - | -  |
| cloudDirectory    | 上传至指定的云端目录（默认会以年月日为目录）  | String  | - | - |
| httpRequest       | 覆盖默认的上传行为，可以自定义上传的实现（下方有详细说明） | function  | - | -  |
| buttonText        | 上传按钮的文本  | String  | 点击上传 | - |
| drag          | 是否开启拖拽上传  | Boolean  | false | true |
| fileSize          | 限制文件大小  | Number  | - | - |
| sizeUnit          | 文件的单位  | String  | MB | KB、MB、GB |
| autoUpload       | 是否在选取文件后立即进行上传，默认为true<br/>如果为false，则提交表单前需主动调用vk.uploadFile来上传 [手动上传示例](#手动上传示例)  | Boolean  | true | false |
| tempFileType     | 当autoUpload为false时，本地文件转为哪种类型<br/>tempPath 文件临时路径<br/>base64 文件base64编码后的值 [手动上传示例](#手动上传示例)  | Boolean  | true | false |
| buttonText       | 当listType=picture或text时，上传按钮的文本 | String  | 点击上传 | - |
| tipsImageText    | 右侧提示图的文本，一般配合drag=true时使用 如 示例图 | String  | - | - |
| tipsImage        | 右侧提示图的图片地址，一般配合drag=true时使用 | String  | - | - |
| tipsImageStyle   | 右侧提示图的图片样式，一般配合drag=true时使用 | String	| width: 200px| -													|
| 其他              | 其他参数请查看element Upload 上传组件 https://element.eleme.cn/#/zh-CN/component/upload	| -				| -						| -													|

#### httpRequest 用法

注意：如果是上传到unicloud云储存或阿里云OSS，无需写httpRequest，框架已集成。

```js
{
  key: "file", title: "文件类型", type: "file", buttonText: "点击上传", limit: 9, accept: ".txt,.xls,.xlsx,.doc,.docx,.ppt,.pptx,.pdf",
  // 此时的 onSuccess 需要自己实现
  onSuccess(data) {
    // 此处写上传成功后，把数据赋值到你的表单变量中，如下
    // 多图上传 that.form1.data.file.push(data.url);
    // 单图上传 that.form1.data.file = data.url;
  },
  httpRequest(obj) {
    let { action, file, filename, data, headers, onProgress, onSuccess, onError } = obj;
    // 在此处写将 file 上传到你指定的地方
    // 上传成功后，需要执行 onSuccess(res);
    // 上传失败时，需要执行 onError(res);
    // 正在上传时，可以监听上传过程，同时执行下方代码，达到显示上传过程进度条的功能 
    /* 
    onProgress({
       percent:progress,
       isTrusted:progress >= 100 ? true:false,
       returnValue:progress >= 100 ? true:false,
       total:progressEvent.total
     }); 
     */
    // 例如
    uni.uploadFile({
      url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
      file: file,
      name: filename,
      header: {

      },
      formData: {

      },
      onProgressUpdate: (res) => {
        let { progress, totalBytesExpectedToWrite } = res;
        onProgress({
          percent: progress,
          isTrusted: progress >= 100 ? true : false,
          returnValue: progress >= 100 ? true : false,
          total: totalBytesExpectedToWrite
        });
      },
      success: (res) => {
        if (res.statusCode == 200) {
          onSuccess(res.data);
        } else {
          onError(res);
        }
      },
      fail: (res) => {
        onError(res);
      }
    });
  }
},
```

#### 手动上传示例

> vk-unicloud-admin-ui 的npm依赖需 >= 1.17.6

如果不希望选择图片马上就上传，则可以设置 `autoUpload: false`，设置后，表单双向绑定的值为图片的本地路径，在最终提交表单前，需要手动执行 `vk.uploadFile` 来上传。

```js
{
  key:"bank_front", title:"银行卡正面", type:"image", limit:1, width:800,
  autoUpload: false,
  tempFileType: "tempPath", // tempPath 文件临时路径 base64 文件base64编码后的值
  drag:true,
  fileSize:2,
  sizeUnit:"mb",
  tipsImageText: "示例图",
  tipsImage: "static/tips/bank_front.png",
  tips:"只能上传jpg/png文件，且不超过2MB"
},
```

#### 加密存储上传的文件

[传送门](https://vkdoc.fsq.pub/admin/components/18%E3%80%81image.html#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6)

### 万能表格使用方式

暂无

### template 使用方式

```html
<vk-data-upload v-model="image1" :limit="9" upload-type="file" list-type="text" button-text="点击上传"></vk-data-upload>
```
