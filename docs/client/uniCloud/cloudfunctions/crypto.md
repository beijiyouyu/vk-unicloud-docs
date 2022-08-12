# 使用crypto进行加密解密
 
___crypto 是 Nodejs 的内置模块，提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。___

## 1、MD5加密 

MD5称为不可逆加密，该加密方式会生成固定长度的加密内容，无法通过加密内容解密成原始内容。

```js
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
let cryptostr = md5.update('Hello, world!').digest('hex');
```

## 2、SHA1加密 
```js
const crypto = require('crypto');
const sha1 = crypto.createHash('sha1');
let cryptostr = sha1.update('Hello, world!').digest('hex');
```


## 3、HMAC加密

HMAC算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法，需要配置密钥。

```js
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'secret-key');
let cryptostr = hmac.update('Hello, world!').digest('hex');
```

## 4、AES加解密

AES属于对称加密方法，高级加密标准(Advanced Encryption Standard，AES)

即加密和解密都用同一个密钥

```js
const crypto = require('crypto');
 
let key = ""; // 密钥

// 加密
let text = "aaa"; // 需要加密的原始数据文本
const cipher = crypto.createCipher('aes192', key);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
// encrypted 为加密后的内容
console.log('encrypted: ', encrypted)

// 解密
const decipher = crypto.createDecipher('aes192', key);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
// decrypted 为解密后的内容，即最开始需要加密的原始数据文本text
console.log('decrypted: ', decrypted)

```

## 5、RSA-SHA256签名

一般用于对传输的http文本内容进行签名，防止伪造。

__与AES加密的区别是，签名是固定长度的字符串，无法通过签名解密原始文本，只能通过原始文本和密钥验证签名是否正确。__

`RSA-SHA256` 属于非对称加密，即 `公钥签名` 需要用 `私钥验签`，而 `私钥签名` 需要用 `公钥验签`

```js
const crypto = require('crypto');

let text = "aaa"; // 要加密的文本
let publicKey = ""; // 公钥内容
let privateKey = ""; // 私钥内容

// 生成签名
let sign = crypto.createSign('RSA-SHA256').update(text).sign(privateKey, 'base64');
console.log('sign: ', sign);

// 验证签名是否正确
let verify = crypto.createVerify('RSA-SHA256').update(text).verify(publicKey, sign, 'base64');
console.log('verify: ', verify);
```
