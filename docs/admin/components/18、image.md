# 18、image 图片上传

### 万能表单使用方式

```js
{ key:"image1", title:"image类型", type:"image", limit:9 }
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| limit            | 最大上传数量 | Number  | - | -  |
| provider          | 储存空间供应商 | String  | unicloud | aliyun |
| needSave          | 是否需要保存图片url到admin后台 | Boolean  | false | true  |
| httpRequest       | 覆盖默认的上传行为，可以自定义上传的实现（下方有详细说明） | function  | - | -  |
| listType          | 文件列表的类型  | String  | picture-card | text/picture/picture-card |
| 其他       | 其他参数请查看element Upload 上传组件 https://element.eleme.cn/#/zh-CN/component/upload | -  | - | -  |

#### httpRequest 用法
#### 注意：如果是上传到unicloud云储存或阿里云OSS，无需写httpRequest，框架已集成。
```js
httpRequest(obj){
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
    header:{
      
    },
    formData: {
      
    },
    onProgressUpdate: (res) => {
      let { progress, totalBytesExpectedToWrite } = res;
      onProgress({
        percent: progress,
        isTrusted: progress >= 100 ? true:false,
        returnValue: progress >= 100 ? true:false,
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
},
```
### 万能表格使用方式

```js
 { key: "image", title: "图片", type: "image", width: 120 }
```


### template 使用方式
```html
<vk-data-upload v-model="image1" :limit="9"></vk-data-upload>
```
