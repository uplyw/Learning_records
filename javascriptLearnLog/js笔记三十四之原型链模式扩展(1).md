### 原型链模式扩展

##### 批量设置原型上的公有属性
```javascript
function Fn(){
    this.x = 100;
}
Fn.prototype.getX = function(){
};
Fn.prototype.getY = function(){
};
Fn.prototype.getZ = function(){
};
var f1 = new Fn;
```
1. 起一个别名

```javascript
function Fn(){
    this.x = 100;
}
var pro = Fn.prototype; 
// 把原来原型指向的地址赋值给pro,现在它们操作的是同一个内存空间
pro.getX = function(){
};
pro.getY = function(){
};
pro.getZ = function(){
};
var f1 = new Fn;
```

2. 重构原型对象的方式  -> 自己新开辟一个堆内存,存储我们共有的属性和方法,把浏览器原来给Fn.prototype开辟的那个替换掉

```javascript
function Fn(){
    this.x = 100;
}
Fn.prototype = {
    constructor: Fn, // 手动添加constructor
    x: function(){
        
    },
    y: function(){
        
    }
};
var f1 = new Fn;
f.a();
f.b();

//1. 只有浏览器天生给Fn.prototype 开辟的堆内存里面才有constructor,
// 而我们自己开辟的这个堆内存没有这个属性,这样constructor指向就不再是Fn而是Object了

// 为了和原来的保持一致, 我们需要手动的增加constructor的指向

console.log(f.constructor) // -> (没做任何处理之前) Object
```
a. 只有浏览器天生给Fn.prototype 开辟的堆内存里面才有constructor, 而我们自己开辟的这个堆内存没有这个属性,这样constructor指向就不再是Fn而是Object了  
为了和原来的保持一致, 我们需要手动的增加constructor的指向

```javascript
function Fn(){
    this.x = 100;
}
Fn.prototype = {
    constructor: Fn, // 手动添加constructor
    y: function(){
        
    },
    z: function(){
        
    }
};
var f1 = new Fn;
f1.y();
f1.z();
console.log(f1.constructor) // ->Fn(){ this.x = 100; }
```
b. 用这种方式给内置类增加公有的属性  
给内置类Array增加数组去重的方法  

```javascript
Array.prototype = {
    constructor: Array,
    unique: function(){
        
    }
}
```

> 这种方式会把之前已经存在于原型上的属性和方法给替换掉, 所以用这种凡是修改内置类的话,浏览器是会屏蔽掉的  

```javascript
var ary = [1,2,2,1,2,3,4,2,1,3];
ary.sort();
console.log(ary); // -> [1, 1, 1, 2, 2, 2, 2, 3, 3, 4]
```
> 但是可以一个个的修改内置的方法,当我们通过下述方式在数组的原型上增加方法,如果方法名和原来内置的重复了,会把人家内置的修改掉 -> 以后在内置类的原型上增加方法,命名都需要加特殊的前缀;

```javascript
Array.prototype.sort = function(){
    console.log(this) // this -> ary 当前要操作的这个数组  
    // [1,2,2,1,2,3,4,2,1,3]
}
var ary = [1,2,2,1,2,3,4,2,1,3];
ary.sort();
console.log(ary); // -> [1,2,2,1,2,3,4,2,1,3]
```
