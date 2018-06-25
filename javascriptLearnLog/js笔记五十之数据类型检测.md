#### 数据类型检测

1. `typeof` 用来检测数据类型的运算符

```javascript
console.log(typeof 12); // -> "number"
var str = "lilei";
console.log(typeof str); // -> "string"
console.log(typeof null); // -> "object"

console.log(typeof typeof typeof function(){}) // -> "string"
```
> 使用typeof检测数据类型, 首先返回的都是一个字符串其次字符串中包含了对应的数据类型  
> `"number"`, `"string"`, `"boolean"`,`"object"`, `"function"`, `"undefined"`  
> `局限性:` 不能具体的细分是数组,正则,或对象中的其他的值,因为使用typeof检测数据类型, 对于对象数据类型中的所有的值,最后返回的都是"object";

```javascript
// 定义形参不传值,默认"undefined"
function fn(num1,num2){
    if(typeof num2 === "undefined"){
        num2 = 0;
    }
}
fn(10);


// 回调函数执行
function fn(callback){
    typeof callback === "function"?callback():null;
    
    // callback && callback();
}
fn(function(){
    
})
```
---

2. `instanceof` 检测某一个实例是否属于某个类

```javascript
var obj = [12,23];
console.log(obj instanceof Array); // -> true
console.log(obj instanceof RegExp); // -> false
```
```javascript
console.log(1 instanceof Number); // -> false
console.log(new Number(1) instanceof Number); // -> true
```
> 1. 不能用来检测和处理字面量方式创建出来的基本数据类型的值  
> `局限性: `对于基本数据类型来说,字面量方式创建出来的结果和实例方式创建出来的结果是有一定的区别的, 从严格意义上来讲, 只有实例创建出来的结果才是标准的对象数据类型, 也是标准的Number这个类额一个实例; 对于字面量方式创建出来的结果是基本数据类型值,不是严谨的实例,但是由于js的松散特点,导致了可以使用Number.prototype上提供的方法;

```javascript
var ary = [];
console.log(ary instanceof Array); // -> true
console.log(ary instanceof Object); // -> true
function fn(){};
console.log(fn instanceof Function); // -> true
console.log(fn instanceof Object); // -> true
```

> 2. instanceof的特性: 只要在当前实例的原型链上,我们用其检测出来的结果都是true  

![instanceof](http://img.uplyw.com/note/20180621230925.png)
---

3. `constructor` 构造函数 作用和instanceof非常相似

```javascript
var obj = [];
console.log(obj.constructor === Array) // -> true
console.log(obj.constructor === RegExp) // -> false
var num = 1;
console.log(num.constructor === Number) // -> true
// constructor能够处理基本数据类型的检测
// constructor检测Object和instanceof不一样, 一般情况下是检测不了的
var reg = /^$/;
console.log(reg.constructor === RegExp) // -> true
console.log(reg.constructor === Object) // -> false
```
> `局限性: `我们可以把类的原型进行重写, 在重写的过程中很有可能出现把之前的constructor给覆盖了, 这样检测出来的结果就是不准确的  
> 对于特殊的数据类型null和undefined, 她们的所属类是Null和Undefined, 但是浏览器把这两个类保护起来了, 不允许我们在外面访问使用  

---

4. `Object` 对象数据类型的基类  
 `Object.prototype.toString.call()` 最准确最常用的方式  
首先获取Object原型上的toString方法, 让方法执行,并且改变方法中的this关键字的指向  

Object.prototype.toString它的作用是返回当前方法的执行主体(方法中this) 所属类的详细信息

**toString的理解:**   
字面意思应该是转换为字符串, 但是某些toString方法不仅仅是转换为字符串
```javascript
// Number.prototype.toString把数字转换为字符串
console.log((1).toString()); // Number.prototype.toString -> 转换为字符串

console.log((128).toString(2/8/10)); // 把数字转换为二进制/八进制/十进制

console.log((1).__proto__.__proto__.toString()); // Object.prototype.toString -> "[object Object]"
```
> 对于Number/String/Boolean/Array/RegExp/Date/Function原型上的toString方法都是把当前的数据类型转换为字符串的类型(作用仅仅是用来转换为字符串的)  

![toString](http://img.uplyw.com/note/20180621231444.jpg)  

> Object.prototype.toString并不是用来转换为字符串的

![toString](http://img.uplyw.com/note/20180621232223.jpg)

```javascript
var ary = [];
console.log(Object.prototype.toString.call(ary)); // -> "[object Array]"
console.log(Object.prototype.toString.call(ary)); // -> [object Array]"
console.log(({}).toString.call(new Date)); // -> "[object Date]"

console.log(Object.prototype.toString.call(12)); // -> "[object Number]"
console.log(Object.prototype.toString.call("lilei")); // -> "[object String]"
console.log(Object.prototype.toString.call(true)); // -> "[object Boolean]"
console.log(Object.prototype.toString.call(undefined));// -> "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // -> "[object Null]"
console.log(Object.prototype.toString.call(function(){})); // -> "[object Function]"
```
