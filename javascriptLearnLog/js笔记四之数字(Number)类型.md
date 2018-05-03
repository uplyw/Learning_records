### number 数字
> 正数: 12,负数: -12,零: 0,小数: 12.5都是数字  
> js中多增加了一个number类型的数据: `NaN`  

```javascript
typeof NaN // -> 'number'  
```

**`NaN`**  

> not a number: 不是一个数,但是属于number类型

```javascript
NaN == NaN // -> false NaN和任何值都不想等
```

**`isNaN()`**
> 用来检测当前这个值是否是非有效数字,如果不是有效数字检测的结果是true,反之是有效数字则为false

```javascript
isNaN(0) // -> false
isNaN(NaN) // -> true
isNaN('12') // -> false
 //当我们使用isNaN检测值的时候,检测的值不是number类型的,浏览器会默认的把值先转换为number类型,然后再去检测
 
 isNaN([]) // -> false
```

**`Number()`**
> 把其他数据类型值转化为number类型的值

```javascript
Number('12')  // -> 12
Number('12px') // -> NaN 
// 在使用Number转换的时候只要字符串中出现任何一个非有效数字字符,最后结果都是NaN

Number(true)  // -> 1
Number(false) // -> 0

Number(null) // -> 0
Number(undefined) // -> NaN

Number([]) // -> 0 
// 把引用数据类型转换为number,首先需要把引用数据类型转换为字符串(toString方法),再把字符串转换为number即刻
// [] -> "" -> 0    空数组转换为空字符串,空字符串转化为0

Number([12]) // 12      [12] -> '12' -> 12
Number([12,23]) // NaN  [12,23] -> '12,23' -> NaN
```

**`parseInt()`**
> 也是把其他数据类型的值转换为number,和Number方法在处理字符串的时候有所区别

```javascript
Number('12px') // -> NaN
parseInt('12px') // -> 12

parseInt('12px13') // -> 12
// 提取规则: 从左到右依次查找有效数字字符,直到遇见非有效数字字符为止(不管后面是否还有,都不找了),把找到的转换为数字
parseInt('px12') // -> NaN
parseInt('12.5px') // -> 12
```

**`parseFloat`**
> 在parseInt的基础上可以识别小数点

```javascript
parseInt('12.5px') // -> 12
parseFloat('12.5px') // -> 12.5
```
