在原型模式中,this常用的有两种情况:
1. 在类中 this.xxx=xxx; this -> 当前类的实例 
2. 某一个方法中的this -> 看执行的时候 `.` 前面是谁this就是谁  
    1. 需要先确定this的指向(this是谁);
    2. 把this替换成对应的代码
    3. 按照原型链查找机制, 一步步的查找结果

```javascript
function Fn(){
    this.x = 100;
    this.y = 200;
}
Fn.prototype = {
    constructor: Fn,
    y: 300,
    getX: function(){
        console.log(this.x)
    },
    getY: function(){
        console.log(this.y)
    }
}
var f = new Fn;
f.getX() // -> 100  => console.log(f.x) => 100
f.__proto__.getX() // -> undefined  => this是f.__proto__ => console.log(f.__proto__.x)[忽略私有,直接找原型] => undefined
Fn.prototype.getX(); // -> undefined
f.getY(); // -> 200
f.__proto__getY() // -> 300
```
```javascript
// 在内置类的原型上扩展数组去重方法
Array.prototype.myUnique = function(){
    // this -> 
    var obj = {};
    for(var i=0;i<this.length;i++){
        var cur = this[i]
        if(obj[cur] == cur){
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[cur] = cur;
    }
    obj = null;
    return this; // 目的是为了实现链式写法
}
var ary = [12,23,23,13,12,13,23,13,12];
ary.myUnique();
console.log(ary)
// Array.prototype.myUnique() // -> this -> Array.prototype
```

> 链式写法: 执行完成数组的一个方法可以紧接着执行下一个方法   
> ary为什么可以使用sort方法? -> 因为sort是Array.prototype上的公有的方法,而数组ary是Array这个类的一个实例,所以ary可以使用sort方法 -> 数组才能使用Array原型上定义的属性和方法  
> sort执行完成的返回值是一个排序后的数组,可以继续执行reverse  
> reverse执行完成的返回值是一个数组,可以继续执行pop  
> pop执行完成的返回值是一个被删除的那个元素

```javascript
ary.sort(function(a,b){
    return a-b;
}).reverse().pop();
```

思考练习:

在数组的原则上有一个方法叫做slice, 自己实现一个方法mySlice, 要求和原来的slice功能一模一样

```javascript
Array.prototype.mySlice = function(){
    // js code...
}
```
> 考虑情况:   
> slice(n,m)  
> slice(n)  
> slice()  
> n和m是负数  
> n<m  
> n和m的值超过数组的长度  
> n和m不是有效数字  
> ...
