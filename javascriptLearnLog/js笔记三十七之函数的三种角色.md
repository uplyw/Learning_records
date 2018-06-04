```javascript
function Fn(){
    this.x = 100;
}
Fn.prototype.getX() = function(){
    console.log(this.x);
}
var f = new Fn;
```
> 函数本身也会有一些自己的属性:  
> length: 0 形参的个数  
> name: "Fn" 函数名  
> prototype 类的原型,在原型上定义的方法都是当前Fn这个类实例的公有方法  
> __ proto__: 把函数当做一个普通对象,执行Function这个类的原型  

**函数在整个js中是最复杂也是最重要的知识**

1. 一个函数存在了多面性:  
    1. "`普通函数`": 它本身就是一个普通的函数,执行的时候形成私有的作用域(闭包),形参赋值,预解释,代码执行,执行完成后栈内存销毁/不销毁  
    2. "`类`": 它有自己的实例,也有一个叫做prototype属性是自己的原型,它的实例都可以指向自己的原型  
    3. "`普通对象`": 和 var obj = {}中的obj一样,就是一个普通对象,它作为对象可以有一些自己的私有属性,也可以通过__ proto__找到Function.prototype  
    
三者之间互不冲突,没有任何关系  

```javascript
function Fn(){
    var num = 500;
    this.x = 100;
};
Fn.prototype.getX() = function(){
    console.log(this.x);
};
Fn.aaa = 1000;
var f = new Fn; // Fn中的this是f

f.num  // -> undefined
f.aaa  // -> undefined 
var res = Fn(); // Fn中的this是window
res // undefined

Fn.aaa // 1000
```
