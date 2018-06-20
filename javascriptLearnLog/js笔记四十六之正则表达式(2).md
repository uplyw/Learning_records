在正则中字面量创建方式和实例创建方式是有区别的  

1. 在字面量方式中, ` // ` 之前包起来的所有内容都是元字符,有的具有特殊意义,大部分都是代表本身含义的普通元字符

```javascript
var name = "lilei";
var reg = /^\d+"+name+"\d+$/
console.log(reg.test("2017lilei2018")); // -> false
console.log(reg.test('2017""nameee"2018')); // -> true
```
> 对于这样的需求,我们只能使用实例创建的方式

```javascript
var name = "lilei";
var reg = new RegExp("^\\d+" + name + "\\d+$", "g");
console.log(reg.test("2017lilei2018")); // -> true
```

##### 元字符应用

**规律**
1. `[]` 在中括号中出现的所有字符都是代表本身意思的字符(没有特殊的含义)  
2. `[]` 中括号中不识别两位数

- 有效数字正则 -> 正数/负数/零/小数 

> 1. `.`可以出现也可以不出现,但是一旦出现,后面必须跟着一位或者多位数字  
> 2. 最开始可以有 `+/-` 也可以没有  
> 3. 整数部分,一位数可以是0-9之间的一个,多位数不能以0开头  

```javascript
var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/
```
```javascript
var reg1 = /^[12]$/; // -> 1或者2
var reg2 = /^[12-68]$/ // -> 1/2-6/8三个中的一个
var reg3 = /^[\w-]$/ // ->数字,字母,下划线,- 中的一个
```

- **区别**

a. 字面量方式中出现的一切都是元字符,所以不能进行变量值的拼接,而实例创建方式是可以的  

b. 字面量方式中直接写 ` \d ` 就可以,而在实例中需要把它转义 ` \\d `

- **实例**

1. 年龄介于18-65之间

```javascript
var reg = /^(1[8-9]|[2-5]\d|6[0-5])$/
console.log(reg.test(16)) // -> false
console.log(reg.test(18)) // -> true
console.log(reg.test(25)) // -> true
console.log(reg.test(47)) // -> true
console.log(reg.test(65)) // -> true
console.log(reg.test(88)) // -> false
```

2. 验证邮箱的正则(简版)  

`@` 左边:数字,字母,下划线, ` . ` , ` - `  

```javascript
var reg = /^[\w.-]+@[0-9a-zA-Z]+(\.a-zA-Z)[2,4]{1,2}$/
```

3. 中国标准真实姓名 2-4 位汉字

```javascript
var reg = /^[\u4e00-\u9fa5]{2,4}$/
```

4. 身份证号码

```javascript
// 简版
var reg = /^\d{17}(\d|X)$/;
// 进阶版
var reg = /^\d{2}\d{4}\d{4}\d{2}\d{2}\d{2}\d(\d|X)$/
```
