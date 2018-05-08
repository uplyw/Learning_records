### 数据类型转换

#### 把其他数据类型转换为number
> isNaN , Number , parseInt , parseFloat   
> 在进行加减乘除数学运算的时候

```javascript
// true         -> 1
// false        -> 0

// null         -> 0
// undefined    -> NaN

// ""           -> 0
// "12"         -> 12
// "12px"       -> NaN/12
// "lilei"      -> NaN
// {}           -> NaN
// function()   -> NaN
// /^$/         -> NaN
// [] -> ""     -> 0
// [12]     -> "12"     -> 12
// [12,23]  -> "12,23"  -> NaN/12

// 引用数据类型转换为数字
// 通过toString方法把数组转化为字符串,然后再调用Number把字符串转换为数字
``` 

**`js中的数学运算`**
> `+  -  *  / `加减乘除  
> 除了加法有特殊性,其他的运算符都是数学运算,也就是遇到非数字类型,需要把其他转换为number在进行运算  
> *加法的特殊性: *  
> 在遇到字符串的时候 , `+` 不是数学运算 , 而是字符串拼接 ,  只要不遇到字符串就是数学运算   

```javascript
// 减 乘 除
// 1 -'1'           -> 0
// 10 * null        -> 0
// 10 / undefined   -> NaN
// 10 * [10]        -> 100

// 加
// 1 + "1"         -> "11"
// null + "1"      -> "null1"

// 字符串拼接: 是把其他的值转换为字符串然后再拼接(toString)
// 其他数据类型的toString是直接的把值用单(双)引号包起来即可,只有对象的有特殊性,对象.toString() === "[object Object]"

// 练习
// 1+null+true+undefined+[]+'lilei'+null+undefined+[]+10

/* 1 + null         -> 1
 * 1 + true         -> 2
 * 2 + undefined    -> NaN
 * NaN + [] -> NaN + "" -> "NaN"
 * "NaN" + "lilei" -> "NaNlilei"
 * ...
 * "NaNlileinullundefined10"
/
```

#### 把其他类型转换为布尔类型
> Boolean , ! , !!  
> 在条件判断的时候,也是转换为布尔类型,然后验证条件的真假  
>  
> 只有`0 , NaN , 空字符串 , null , undefined `五个转换为false,其余的都是转换为true

```javascript
// [] -> true
// -1 -> true

if(box){
    // -> 首先把box变量存储的值获取到,转换为布尔类型,如果为true条件成立,反之不成立
}

if(3 + "3px"){  // "33px"
    // -> 条件成立
}

if(3 - "3px"){  // NaN
    // -> 条件不成立
}
```
**`在使用 == 进行比较的时候`**
> 在使用 `==` 进行比较的时候,如果左右两边的数据类型不相同,浏览器会默认转换为相同的类型,然后再比较(`===`不会这样操作)

```javascript
// -> 对象和对象: 比较的是空间地址,不是相同的空间,结果肯定是false
// [] == [] -> false
// var a = {};
// var b = a;
// a == b -> true

// -> 对象和数字: 把对象转换为数字
// [] == 0 -> true  
// ({}) == NaN -> false       NaN和自己不相等,和其他任何值都不相等

// -> 对象和字符串: 把两边都转换为数字比较的
// [] == "" -> true

// -> 对象和布尔: 把两边都转换为数字
// [] == true -> 0 == 1 -> false
// [] == false -> 0 == 0 -> true
// ![] == false -> true ->  ![] 把数组变为布尔再取反 = false , false == false -> true

// -> 字符串和数字: 字符串转换为数字

// -> 字符串和布尔: 都转换为数字

// -> 布尔和数字: 布尔转换为数字
```
#### `规律: 两个等于号比较,左右两边数据值的类型不一样,浏览器会把两边的类型都转换为数字然后再比较,但是null和undefined除外`
> null == undefined -> true  
> null === undefined -> false  
>  
> null以及undefined和其他任何值都不相等  
> - null == 0 -> false
