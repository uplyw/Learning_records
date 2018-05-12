### 字符串常用方法
> 在js中用单(双)引号包起来的都是字符串

```javascript
var str = "welcome to javascript,good good study,day day up!"
// -> 字符创就是由零到多个字符组成的
```
- 索引

> 字符串中的第一个字符索引是0  
> 字符串中的第二个字符索引是1  
> ...  
> 以数字作为索引,从零开始  
> 字符串中最后一个字符的索引为`length-1`  
> 如果指定的索引不存在,输出的结果为`undefined`

```javascript
str[0] // -> 'w'
str[str.length-1] // -> '!'
str[100] // -> undefined
```
- 长度

> 有一个叫做length的属性,存储的是当前字符串中字符的个数(字符串的长度)  

```javascript
str.length  // -> 49
```

> 真实项目中,我们经常操作字符串,此时我们需要掌握常用的一些字符串操作方法  
> `console.dir(String.prototype)` -> 查看字符串的所有方法

- charAt()

> str.charAt(索引): 返回指定所索引位置的字符串  
> 和str[索引]的区别在于,当指定的索引不存在的时候,中括号的方式获取的是undefined,而charAt获取的是空字符串

```javascript
str.charAt(0)       // -> 'w'
str.charAt(str.length - 1)      // -> '!'
str.charAt(100)     // -> ''
```

- charCodeAt()

> str.charCodeAt(索引): 在charAt基础上,把获取的字符变为Unicode编码值(对应ASCII码表)  
> 48 ~ 57: 0 - 9  
> 65 ~ 90: A - Z  
> 97 ~ 122: a - z  
> ...  

```javascript
str.charCodeAt(0) // -> 119
String.fromCharCode(119) // -> 'w' 以ASCII码表数值找到对应的字符
```
- sunstr() & substring() & slice()

> str.substr(n,m): 截取字符串,从索引n开始,截取m个字符;  
> str.substring(n,m): 截取字符串,从索引n开始,截取到索引m处(不包含m,把找到部分截取)  
> str.slice(n,m): 和substring语法一样,区别在于slice支持以负数做索引  
> 当索引是负数的时候,浏览器在处理的时候,是用字符串的总长度加上负数索引,然后按照正数处理操作  
> + 细节  
>   1. 如果只写n(str.substr(n)&str.substring(n)&str.slice(n)),是从n处截取到字符串末尾;  
>   2. 如果传递的索引`m`超出最大限制,也是把能截取的部分截取到  
>   3. 如果一个参数都不传递的话,相当于把整个字符串截取(字符串的克隆)  



```javascript
str.substr(3,7)     // -> "come to"
str.substring(3,7)  // -> "come"
str.slice(3,7)      // -> 'come'

str.substring(-7,-3)    // -> ''
str.slice(-7,-3)        // -> 'day ' => str.slice(str.length-7,string-3)

```
- toUpperCase & toLowerCase

```javascript  
// 全部转换为大写
str.toUpperCase()
// "WELCOME TO JAVASCRIPT,GOOD GOOD STUDY,DAY DAY UP!"

// 全部转换为小写
str.toLowerCase()
// "welcome to javascript,good good study,day day up!"
```

- indexOf & lastIndexOf

> str.indexOf(): 获取当前字符在字符串中第一次出现的位置  
> str.lastIndexOf(): 获取当前字符在字符串中最后一次出现的位置  

```javascript
str.indexOf(',')        // -> 21
str.lastIndexOf(',')    // -> 37

// 字符串中不存在的字符 结果为 -1
str.indexOf('#') // -> -1
```
> 如果当前字符在字符串中没有出现过,结果是-1; 我们根据这个规律可以验证一下当前字符串中是否包含某个字符

```javascript
if(str.indexOf('?') === -1){
    // -> 字符串中不存在该字符
}

if(str.indexOf('?') >= 0){
    // -> 字符串中存在该字符
}
```
- split

> str.split(): 按照某一个字符把字符串拆分成数组中的某一项,和数组中的join对应  

```javascript
var hobbyList = "music|movie|sport|read"
hobbyList.split('|')        // -> ["music", "movie", "sport", "read"]

// 如果不存在要分割的字符,则把字符串作为一个元素存在数组中
hobbyList.split('#')        // -> ["music|movie|sport|read"]


// 如果要分割的字符在字符串中最后一位,则分割出的数组会在最后添加一个空字符串作为数组的一个元素
var hobbyList = "music|movie|sport|read|"
hobbyList.split('|')        // -> ["music", "movie", "sport", "read", ""]

// split支持正则的规则拆分
var str = "name=lilei&age=18";
str.split(/=|&/g)           // -> ["name", "lilei", "age", "18"]
```
- replace

> str.replace(): 实现字符串的替换  
> 执行一次replace只能替换一次,如果有好几个都需要替换,在不使用正则的情况下我们需要执行很多次replace

```javascript
var str = 'his name is lilei,his name is lilei';
str.replace('lilei','李雷')     // -> "his name is 李雷,his name is lilei"

// 有些需求即使执行多次replace也实现不了,此时需要使用正则处理,真实项目中replace一般是和正则搭配使用的
var str = 'his name is lilei,his name is lilei';
str.replace(/lilei/g,"李雷")    // -> "his name is 李雷,his name is 李雷"
```
- trim & trimLeft(trimStart) & trimRight(trimEnd)

> str.trimLeft(): 去除字符串开始的空格 
> str.trimRight(): 去除字符串开始的空格
> str.trim(): 去除首尾空格

```javascript
var str = "   javascript  "
str.trimLeft()  // -> "javascript  "
str.trimRight() // -> "   javascript"
str.trim()      // -> “javascript
```
