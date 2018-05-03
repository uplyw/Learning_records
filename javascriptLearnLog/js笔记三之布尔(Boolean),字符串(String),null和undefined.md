### 布尔类型

**`Boolean()`**

> 把其他类型的值转换为布尔类型  
>   
> 只有 `0`,`NaN`,`空字符串`,`null`,`undefined`这五个数据值转换为布尔类型的`false`,其余的都为`true`

**`!`**

> !=: 不等于;  
> 叹号在js中还有一个作用: `取反`,先把值转换为布尔值,然后再取反;

**`!!`**

> 在一个叹号取反的基础上再取反,取两次反相当于没有做操作,但是却已经把其他类型的值转换为布尔类型了,和Boolean是相同的效果


### 字符串
> 在js中用`单引号`和`双引号`包起来的都是字符串

```javascript
12 // -> number
`12` // -> string
`[12,23]` // -> 字符串
```
- 字符串常用方法

> charAt  
> charCodeAt  
> substr  
> substring  
> slice  
> toUpperCase  
> toLowerCase  
> indexOf  
> lastIndexOf  
> split  
> replace  
> match  
> ...

### null和undefined

> null: 空,没有  
> undefined: 未定义,没有
>   
> "": 空字符串,没有  
> 0: 也可以理解为没有

**`空字符串和null的区别`**

> 例如: 都是去种树  
> 空字符串属于挖了个坑,但是什么都没有种;  
> null是连坑都没挖  
> 
> 空字符串相对于null来说开辟了内存,消耗了那么一丢丢的性能

**`null和undefined的区别`**
> 都是没挖坑  
> null一般都是暂时没有,预期中以后会有的(可能以后也没有达到预期): 在js中null一般都是手动先赋值为null,后期我们再给其赋具体值  
> undefined: 完全没在预料之内的
