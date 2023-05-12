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


## 6、AES加解密（VK简易版）

注意：需要配置 `vk.crypto.aes` 用于返回给前端加密数据时的加密密钥

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/a4ca3d72-358e-4437-8766-d0b14e269697.png)

### 在云函数内加解密

```js
// 加密数据
let encryptedKey = vk.crypto.aes.encrypt({
  data: {
    sessionKey: "XXXXX"
  }
});
console.log('encryptedKey: ', encryptedKey)

// 解密 sessionKey 示例
let decryptedRes = vk.crypto.aes.decrypt({
  data: encryptedKey, // 待解密的原文
});
console.log('decryptedRes: ', decryptedRes)
let sessionKey = decryptedRes.sessionKey;
console.log('sessionKey: ', sessionKey)
```

### 在云函数加密，java或php等其他后端语言解密

> 以下API需要vk-unicloud核心库版本 >= 2.14.1

#### 用云函数加密

```js
// 加密数据
let key = '12345678901234561234567890123456'; // 必须是固定的32位（只支持数字、英文）
let text = { a: 1, b: "2" }; // 待加密的内容

let encrypted = vk.crypto.aes.encrypt({
  mode: "aes-256-ecb",
  data: text,
  key: key,
});
console.log('encrypted: ', encrypted);
```

#### 用java解密

```java
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class CryptoUtil {
    // 调用示例
    public static void main(String[] args) {
        try {
            String encrypted = "es2aF7DWr169X4fvMnlKNg=="; // 待解密的密文
            String key = "12345678901234561234567890123456"; // 必须是固定的32位（只支持数字、英文）
            // 解密
            String decrypted = decrypt(encrypted, key);
            System.out.println("decrypted: " + decrypted);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 解密函数
    private static String decrypt(String encryptedData, String key) throws Exception {
        if (key.length() > 32) {
            key = key.substring(0, 32);
        }
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    // 加密函数
    private static String encrypt(String data, String key) throws Exception {
        if (key.length() > 32) {
            key = key.substring(0, 32);
        }
        byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encryptedBytes = cipher.doFinal(dataBytes);
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

}
```

#### 用php解密

```php
<?php
    $key = '12345678901234561234567890123456'; // 必须是固定的32位（只支持数字、英文）
    $encrypt = "es2aF7DWr169X4fvMnlKNg=="; // 待解密的内容
    // 解密
    $decrypt = openssl_decrypt(base64_decode($encrypt), 'aes-256-ecb', substr($key, 0, 32), OPENSSL_RAW_DATA);
    echo $decrypt;
?>
```

### 在java或php等其他后端语言加密，用云函数解密

#### 用云函数解密

```js
// 加密数据
let key = '12345678901234561234567890123456'; // 必须是固定的32位（只支持数字、英文）
let encrypted = "es2aF7DWr169X4fvMnlKNg=="; // 待解密的内容
// 解密
let decrypted = vk.crypto.aes.decrypt({
  mode: "aes-256-ecb",
  data: encrypted, // 待解密的内容
  key: key,
});
console.log('decrypted: ', decrypted);
```

#### 用java加密

```java
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class CryptoUtil {
    // 调用示例
    public static void main(String[] args) {
        try {
            String key = "12345678901234561234567890123456"; // 必须是固定的32位（只支持数字、英文）
            String text = "{\"a\":1,\"b\":\"2\"}"; // 待加密的内容
            // 加密
            String encrypted = encrypt(text, key);
            System.out.println("encrypted: " + encrypted);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 解密函数
    private static String decrypt(String encryptedData, String key) throws Exception {
        if (key.length() > 32) {
            key = key.substring(0, 32);
        }
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);

        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }
    // 加密函数
    private static String encrypt(String data, String key) throws Exception {
        if (key.length() > 32) {
            key = key.substring(0, 32);
        }
        byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] encryptedBytes = cipher.doFinal(dataBytes);
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

}
```

#### 用php加密

```php
<?php
    $key = '12345678901234561234567890123456'; // 必须是固定的32位（只支持数字、英文）
    $text = '{"a":1,"b":"2"}'; // 待加密的内容
    // 解密
    $encrypted = base64_encode(openssl_encrypt($text, 'aes-256-ecb', substr($key, 0, 32), OPENSSL_RAW_DATA));
    echo $encrypted;
?>
```