```javascript
// Array.prototype.slice -> function(){}
var ary = [12,23,34];
ary.slice()
// ary.slice -> ary这个实例通过原型链的查找机制找到Array.prototype上的slice方法
// ary.slice() -> 让找到的slice方法执行,在执行slice方法的过程中,才把ary数组进行了截取  
```

> call改变this关键字

```javascript
// Function.prototype.call = function(){};

var obj = {name:"lilei"};
function fn(){
    console.log(this);
}
fn(); // -> window
obj.fn(); // -> Uncaught TypeError: obj.fn is not a function
fn.call(obj) // -> {name: "lilei"}
```
> call方法的作用:  
> 首先我们让原型上的call方法执行,在执行call方法的时候,我们放fn方法中的this变为第一个参数值obj,然后再把fn这个函数执行;

```javascript
// 重写call方法
Function.prototype.myCall = function (context){
    // -> myCall方法中的this就是当前要操作和改变其this关键字的那个函数名
    
    // -> 1. 让fn中的this关键字变为context的值 -> obj
    // -> 让this这个函数中的"this关键字"变为context
    
    // this.toString().replace("this","obj")
    
    // -> 2. 让fn方法在执行
    // this()
};
fn.myCall(obj); // -> myCall方法中的this是fn
sum.myCall(obj) // -> myCall方法中的this是sum
function sum(){
    
};
```

```javascript
function fn1(){console.log(1);}
function fn2(){console.log(2);}
fn1.call(fn2)  // -> 1
// -> 首先fn1通过原型链机制找到 Function.prototype上的call方法,并且让call方法执行
// -> 此时call这个方法中的this就是我们要操作的fn1
// -> 在call方法代码执行的过程中首先让 fn1 中的"this关键字"变成 fn2 ,然后在让 fn1 这个方法执行

fn1.call.call(fn2) // -> 2
// -> fn1.call 首先fn1通过原型链找到Function.prototype上的call方法
// -> 然后在让call方法通过原型在找到Function原型上的call
// -> (因为call本身的值也是一个函数,所以同样可以找到Function.prototype)
// -> 在第二次再找到call的时候让方法执行,方法中的this是 fn1.call
// -> 首先让这个方法中的this变为fn2,然后再让fn1.call执行

fn1.call.call.call.call.call(fn2)  // -> 2

Function.prototype.call(fn1);  // 什么都不输出

Function.prototype.call.call.call(fn1);  // -> 1
```
