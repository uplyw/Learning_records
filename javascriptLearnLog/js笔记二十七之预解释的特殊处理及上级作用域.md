#### 预解释机制
in: "num" in window 判断num是否为window这个对象的一个属性, 是的话返回true, 不是的话返回false

```javascript
var obj = {name:"lilei",age:18}
console.log("name" in obj) // -> true;
console.log("sex" in obj) // -> false
```

---

1. 预解释的时候不管条件是否成立, 都要把带var的进行提前声明  
window的预解释:  var num -> window.num;

```javascript
if(!("num" in window)){
    var num = 12;
}
console.log(num) // -> undefined
```
---

2. 预解释的时候只预解释 "=" 左边的,右边的是值, 不参与预解释  

```javascript
// 匿名函数之函数表达式: 把函数定义的部分当做一个值赋值给我们的变量/元素的某一个事件
var fn = function (){
    console.log("ok")
}

fn();
function fn(){
    console.log("ok")
}
fn();
```

---

3. 自执行函数定义的那个function在全局作用域下不进行预解释,当代码执行到这个位置的时候定义和执行一起完成了;  
自执行函数: 定义和执行一起完成  

```javascript
(function(num){})(100);
~function(num){}(100);
-function(num){}(100);
+function(num){}(100);
!function(num){}(100);
```

---

4. 函数体中return 下面的代码虽然不在执行了,但是需要进行预解释; return后面跟着的都是我们返回的值,所以不进行预解释

```javascript
function fn(){
    console.log(num);  // -> undefined
    return function(){
        
    }
    var num = 100;
}
fn();
```

---

5. 如果在预解释的时候,如果名字已经声明过了,不需要重新的声明,但需要重新的赋值;
在js中如果变量名和函数名重复了,也算冲突了  
预解释: var fn; window.fn; fn = xxxfff000 window.fn = xxxfff000 


```javascript
var fn = 12;
function fn(){
    console.log("ok");
}

// 预解释: 
// 声明+定义
fn(); // -> 2
function fn(){console.log(1)};
fn(); // -> 2
var fn = 10;
fn(); // -> 10() error: fn is not a function
function fn(){console.log(2)};
fn();
```

#### 查找上级作用域

```javascript
var num = 12;
function fn(){
    var num = 120;
    return function(){
        console.log(num);
    }
}
var f = fn();
f(); // -> 120
~function () {
    f(); // -> 120
}();
```
**如何查找当前作用域的上一级作用域?**  
- 看当前函数是在哪个作用域下定义的,那么它的上级作用域就是谁 -> 和函数在哪执行的没有任何关系
