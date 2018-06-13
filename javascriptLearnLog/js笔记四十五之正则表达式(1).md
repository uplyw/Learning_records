#### 正则

- 用来处理字符串的一个规则(正则就是用来处理字符串的)  

1. 判断一个字符串是否符合我们制定的规则 -> test() - reg.test(str)

```javascript
var reg = /\d/;
console.log(reg.test("li")); // -> false
console.log(reg.test("1")); // -> true
console.log(reg.test("li18")); // -> true
```
2. 把字符串中符合正则规则的内容捕获到 -> exec() - reg.exec(str)

```javascript
var reg = /\d/;
console.log(reg.exec("li")); // -> null
console.log(reg.exec("1")); // -> ["1", index: 0, input: "1", groups: undefined]
console.log(reg.exec("li18")); // -> ["1", index: 2, input: "li18", groups: undefined]
```

- 如何创建一个正则?

1. 字面量创建方式: 

```javascript
var reg = /\d/;
```
2. 实例创建方式:

```javascript
var reg = new RegExp("")
```
> 创建对象时,使用字面量和实例没有区别,但是正则的两种创建方式是有区别的

- 如何学习正则?  

```javascript
 console.dir(RegExp.prototype)
```
![image](https://t1.picb.cc/uploads/2018/06/07/2Pg7xc.png)


#### 正则表达式的元字符

- 每一个正则表达式都是由元字符和修饰符组成的 

##### 元字符: 在/ /之间具有意义的一些字符

- 具有特殊意义的元字符

1. `\` : 转义字符,转译后面字符所代表的含义;  
2.  `^` : 以某一个元字符开始;  
3. **$** : 以某一个元字符结尾; 
4. `\n` : 匹配一个换行符;  
5. `.` : 除了`\n`以外的任意字符;  
6. `()` : 分组 -> 把一个大正则划分为几个小的正则
7. `x|y` : x或者y中的一个  
8. `[xyz]` : x或者y或者z中的一个
9. `[^xyz]` : 方括号中的 ^ 读作非, 除了三个以外的任何一个字符  
10. `[a-z]` : 包含a-z之间的任何一个字符  
11. `[^a-z]` : 除了a-z之间的任何一个字符  
12. `\d` : 一个0-9之间的数字  
13. `\D` : 除了0-9之间的数字以外的任何字符  
14. `\b` : 匹配一个边界符
15. `\w` : 数字/字母/下划线中的任意一个字符 => [0-9a-zA-Z_]
16. `\s` : 匹配一个空白字符 空格/制表符/换页符

> 大小写匹配相反

- 代表出现次数的量词元字符

1. `*` : 出现零到多次;  
2. `+` : 出现一到多次;
3. `?` : 出现零次或者一次;  
4. `{n}` : 出现n次;  
5. `{n,}` : 出现n到多次;  
6. `{n,m}` : 出现n到m次;

```javascript
var reg = /^\d$/; // 只能是一个 0-9 之间的数字
console.log(reg.test("9")); //  -> true
console.log(reg.test("012")); //  -> false
```
```javascript
var reg1 = /^\d+$/;
console.log(reg1.test("9")); //  -> true
console.log(reg1.test("012")); //  -> true
```
```javascript
var reg = /^0.2$/ // -> 以0开头,以2结尾,中间可以是除了 \n 的任意字符
console.log(reg.test("0.2")); // -> true
console.log(reg.test("0-2")); // -> true
```
```javascript
var reg1 = /^0\.2$/;
console.log(reg1.test("0.2")); // -> true
console.log(reg1.test("0-2")); // -> false
```
```javascript
var reg = /^18|19$/;
// 18,19,181,189,819,1819...

var reg = /^(18|19)$/
// 18或19
```
一个简单的手机号的正则: 11位数字,第一位是1 后面10位数字
```javascript
var reg = /^1\d{10}$/;
```
