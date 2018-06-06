#### call
```javascript
var obj = {name:"lilei"};
function fn(num1,num2){
    console.log(num1+num2);
    console.log(this);
}
fn(100,200); // -> 300 window -> num1=100,num2=200  this - window
fn.call(100,200); // -> NaN Number {100} -> num1=200,num2=undefined  this - 100
fn.call(obj,100,200); // -> NaN Number {100} -> num1=100,num2=200  this - obj

// fn.call传的值,第一个参数是给fn的this关键字的,后面的参数是给fn传的参数

fn.call(); // -> this - window
fn.call(null); // -> this - window
fn.call(undefined); // -> this - window

```
```javascript
// 严格模式
"use strict"; // -> 告诉当前浏览器接下来的js代码将按照严格模式进行编写
var obj = {name:"lilei"};
function fn(num1,num2){
    console.log(num1+num2);
    console.log(this);
};

fn.call(); // -> this - undefined
fn.call(null); // -> this - null
fn.call(undefined); // -> this - undefined
```
#### apply

> apply和call的方法的作用是一模一样的,都是用来改变方法的this关键字并且把方法执行;  
> 而且在严格模式下和非严格模式下对于第一个参数是null和undefined这种情况的规律也是一样的;  

```javascript
var obj = {name:"lilei"};
function fn(num1,num2){
    console.log(num1+num2);
    console.log(this);
};

// fn.call(obj,100,200);
fn.apply(obj,[100,200]); 
```
> call在给fn传递参数的时候,是一个个的传递值的,而apply不是一个个传  
> 而是把要给fn传递的参数值统一的放在一个数组中进行操作  
> 但是也相当于一个个的给fn的形参赋值

#### bind
> ie6~8不兼容  
> 和call/apply类似都是用来改变this关键字的  

```javascript
var obj = {name:"lilei"};
function fn(num1,num2){
    console.log(num1+num2);
    console.log(this);
};

// fn.call(obj,100,200);
fn.bind(obj,100,200); 
```
> `call`: 改变this和执行fn函数是一起完成了  
> `bind`: 只是改变了fn中的this为obj,并且给fn传递两个参数值1,2;但是此时并没有把fn这个函数执行;   
> 执行bind会有一个返回值,这个返回值tempFn就是我们把fn的this改变后的那个结果  

```javascript
var obj = {name:"lilei"};
function fn(num1,num2){
    console.log(num1+num2);
    console.log(this);
};
var tempFn = fn.bind(obj,100,200); 
tempFn();
```
- bind中的预处理思想:  
预处理: 事先把fn的this改变为我们想要的结果,并且把对应的参数值也准备好,以后要用到了,直接执行即可
