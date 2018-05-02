### js中的数据类型  
> - 基本数据类型(值类型)  
>   + number: 数字  
>   + string: 字符串  
>   + boolean: 布尔  
>   + null: 空对象指针
>   + undefined: 未定义  
> 
> - 引用数据类型  
>   + object: 对象数据类型  
>       + {} 普通对象
>       + [] 数组
>       + /^$/ 正则
>       + ...
>   + function: 函数数据类型  

```javascript 
number : 12  12.5 0
string : 'hello' "hello", // 单双引号包起来的
Boolean : true false
null
undefined

{name: "lilei",age:18}
[12,23,34]
/^?(\d|([1-9]\d))/
```

#### 这么多数据类型js如何检测呢?

- `typeof`: 检测数据类型的运算符
- `instanceof`: 检测某个实例是否属于这个类
- `constructor`: 获取当前实例的构造器
- `Object.prototype.toString.call`: 获取当前实例的所属类信息

`typeof`
> 使用typeof检测,返回的结果是一个字符串,字符串中的额内容证明了值是属于什么类型  
> 
> **[局限性]**  
> 1. typeof null不是"null"而是"object": 因为null虽然是单独的数据类型,但是它本来的意思是空对象指针,浏览器使用typeof检测的时候会把它按照对象来检测  
> 2. 使用typeof无法具体细分出到底是数组还是正则,因为返回的结果都是'object'

```javascript
typeof 12 // -> 'number'
var num = 12;
typeof num; // -> 'number'

typeof true // -> 'boolean'
typeof 'lilei' // -> 'string'
typeof undefined // -> 'undefined'
typeof null // -> 'object'

typeof {name:"lilei"} // -> 'object'
typeof [12,23,34] // -> 'object'
typeof /^$/  // -> 'object'
```

```javascript
console.log(typeof typeof [])  // -> 'string '
```
