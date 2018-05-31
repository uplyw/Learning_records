#### 原型链模式

```javascript
// 构造函数模式
function CreateJsPerson(name,age){
    this.name = name;
    this.age = age;
    this.writeJs = function(){
        console.log("my name is " + this.name + ",I can write js!")
    }
}
var p1 = new CreateJsPerson("lilei",18); 
var p2 = new CreateJsPerson("hanmeimei",16); 
console.log(p1.writeJs === p2.writeJs); // false
```
> 构造函数模式中拥有了类和实例的概念, 并且实例和实例之间是相互独立开的, -> 实例识别

```javascript
function CreateJsPerson(name,age){
    this.name = name;
    this.age = age;
}
CreateJsPerson.prototype.writeJs = function(){
    console.log("my name is " + this.name + ",I can write js!")
}
var p1 = new CreateJsPerson("lilei",18); 
var p2 = new CreateJsPerson("hanmeimei",16); 
console.log(p1.writeJs === p2.writeJs); // -> true
```
> 基于构造函数模式的原型模式解决了 方法或者属性公有的问题 -> 把实例之间相同的属性和方法提取成公有的属性和方法 -> 想让谁公有就把它放在CreateJsPerson.prototype上即可


1. 每一个函数数据类型(普通函数,类)都有一个天生自带的属性: prototype(原型), 并且这个属性是一个对象数据类型的值;  
2. 并且在prototype上浏览器天生给它加了一个属性constructor(构造函数), 属性值是当前函数(类)本身  
3. 每一个对象数据类型(普通的对象, 实例, prototype...), 也天生自带一个属性: __ proto__ , 属性值是当前实例所属类的原型(prototype)


```javascript
function Fn(){
    this.x = 100;
}
Fn.prototype.getX = function(){
    console.log(this.x);
};
var f1 = new Fn;
var f2 = new Fn;
console.log(Fn.prototype.constructor === Fn) // -> true
```

##### Object是JS中所有对象数据类型的基类(最顶层的类)  
> 1. f1 instanceof Object -> true 因为f1通过 __ proto__可以向上级查找,不管有多少级, 最后总能找到Object  
> 2. 在Object.prototype上没有 __ proto__这个属性  
> 3. f1.hasOwnProperty("x"); // hasOwnProperty是f1的一个属性  
>    但我们发现在f1的私有属性上并没有这个方法, 那么如何处理的呢?  
>    1). 通过 `对象名.属性名` 的方式获取属性值的时候, 首先在对象的私有的属性上进行查找:  
>    ->如果私有属性中存在这个属性, 则获取的是私有的属性值;  
>    ->如果私有的没有, 则通过__ proto__找到所属类的原型(类的原型上定义的属性和方法都是当前实例的属性和方法), 原型上存在的话获取的是公有的属性值;  
>    ->如果原型上也没有, 则继续通过原型上的 __ proto__继续向上查找, 一直找到Object.prototype为止...  
>    ->如果都没有,则 undefined  
> **这种查找机制就是我们的`原型链模式`**

```javascript
console.log(f1.getX === f2.getX) // -> true
console.log(f1.__proto__.getX === f2.getX) // -> true
console.log(f1.getX === Fn.prototype.getX) // -> true
```
```javascript
function Fn(){
    this.x = 100;
    this.sum = function(){
        
    }
}
Fn.prototype.getX = function(){
    console.log(this.x);
};
Fn.prototype.sum = function(){
};
var f1 = new Fn;
var f2 = new Fn;
console.log(f1.sum === f2.__proto__.sum) // -> false
console.log(f1.sum === f2.prototype.sum) // -> false
```
> 在ie浏览器中, 我们原型模式也是同样的原理, 但是浏览器怕你通过 __ proto__ 把公有的修改, 禁止我们使用 __ proto__

```javascript
f1.sum = function(){
    // 修改自己私有的sum
}
f1.__proto__.sum = function(){
    // 修改所属类原型上的sum
}
f1.prototype.sum = function(){
    // 修改所属类原型上的sum
}
```
