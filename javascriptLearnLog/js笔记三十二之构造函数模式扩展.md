#### 构造函数模式扩展

```javascript
function Fn(){
 
}
Fn(); // -> 普通函数执行
new Fn(); // -> 构造函数执行
var f1 = new Fn(); // -> f1是构造函数的一个实例
```

1. 在构造函数模式中new Fn()执行, 如果不需要传参, 后面的小括号可以省略: new Fn

```javascript
 var f1 = new Fn;
```

2. this的问题: 在类中出现的 this.xxx=xxx 中的this都是当前类的实例, 而某一个属性值(方法), 方法中的this需要看方法执行的时候, 前面是否有`.`才知道this是谁

```javascript
function Fn(){
    // this -> f1
    this.num = 100;
    this.getNum = function(){
        // this -> 需要看getNum执行的时候才知道
        console.log(this.num)
    }
}
var f1 = new Fn;
f1.getNum(); // 100 -> 此时的getNum函数的this是f1,f1.num = 100;
var q = f1.getNum;
q(); // undefined -> 此时的getNum函数的this是window,而window中并没num,所以...
```

3. 类有普通函数的一面, 当函数执行的时候, var x其实只是当前形成的私有作用域中的私有变量而已, 它和我们的f1这个实例没有任何的关系,只有 this.xxx=xxx才相当于给f1这个实例增加私有的属性和方法, 才和我们的f1有关系

```javascript
function Fn(){
    var x = 10;
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
}
var f1 = new Fn;
console.log(f1.x) // undefined
```
4. 在构造函数模式中, 浏览器会默认的把我们的实例返回(返回的是一个对象数据类型的值);如果我们自己手动写了return返回:   
    1. 返回的是一个基本数据类型的值,当前实例是不变的,例如: return 100; f1还是当前Fn类的实例  
    2. 返回的是一个引用数据类型的值, 当前的实例会被自己返回的值给替换掉, 例如: return {name:"lilei"} f1就不再是Fn的实例了,而是对象{name:"lilei"};

```javascript
function Fn(){
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
}
var f1 = new Fn;
console.log(f1) // -> Fn {num: 100, getNum: ƒ}   
```
```javascript
function Fn(){
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
    return 100; // 手动返回基本数据类型(值类型)
}
var f1 = new Fn;
console.log(f1) // -> Fn {num: 100, getNum: ƒ}   
```
```javascript
function Fn(){
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
    return {name:"lilei"}; // 手动返回引用数据类型(对象类型)
}
var f1 = new Fn;
console.log(f1) // -> {name: "lilei"}
```

5. 检测某一个实例是否属于这个类 -> `instanceof`

```javascript
function Fn(){
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
}
var f1 = new Fn;
console.log(f1 instanceof Fn) // -> true
console.log(f1 instanceof Array) // -> false
console.log(f1 instanceof Object) // -> true  
// 因为所有的实例都是对象数据类型 而每一个对象数据类型都是Object这个内置类的一个实例, 所以f1也是他的一个实例
```

> 对于检测数据类型来说, typeof有自己的局限性,不能细分object下的对象,数组,正则...

```javascript
var a = [];
console.log(a instanceof Array) // -> true 说明a是一个数组
```
6. f1和f2都是Fn这个类的一个实例, 都拥有num和getNum两个属性, 但是这两个属性是各自的私有属性, 所以: 

```javascript
function Fn(){
    this.num = 100;
    this.getNum = function(){
        console.log(this.num)
    }
}
var f1 = new Fn;
var f2 = new Fn;
console.log(f1 === f2) // -> false
console.log(f1.getNum === f2.getNum) // false
```
> in: 检测某一个属性是否属于这个对象 (attr in Object) 不管是私有的属性还是公有的属性, 只要存在, 用in检测都是true

```javascript
console.log("getNum" in f1) // -> true
```
> hasOwnProperty: 用来检测某一个属性是否为这个对象的"私有属性", 这个方法只能检测私有的属性

```javascript
console.log(f1.hasOwnProperty('getNum')) // -> true
```
> 思考: 检测某一个属性是否为该对象的"公有属性" hasPubProperty

```javascript
function hasPubProperty(obj,attr){
    // 首先保证是它的一个属性并且还不是私有属性, 那么只能是公有的属性了
    return (attr in obj) && !obj.hasOwnProperty(attr);
}
console.log(hasPubProperty(f1,"getNum")); // -> false
```
7. isPrototypeOf
