##### 获取数组中最大值和最小值

- 给数组进行排序(小->大), 第一个和最后一个就是最小值和最大值  

```javascript
// 方案一: 
var ary = [12,23,34,46,13,35,11,15]
ary.sort(function(a,b){return a-b;});
var min = ary[0];
var max = ary[ary.length-1];
console.log(min,max) // -> 11 46
```
- 使用Math中的max/min方法实现

```javascript
// 方案二(1): 
// 以下代码不能实现
var ary = [12,23,34,46,13,35,11,15];
var min = Math.min(ary);
console.log(min); // -> NaN
console.log(Math.min(12,23,34,46,13,35,11,15)) // -> 11
// 它是在执行的时候,把需要比较的值一个个传递进来,这样才可以得到最后的结果  
// 直接放入数组进来是不可以的  
```
- 假设法: 假设当前数组中的第一个值是最大值, 然后拿这个数和后面的想逐个进行比较,如果后面某一个值比假设的还要大,说明假设错了,我们把假设的值替换...

```javascript
// 方案三 
var ary = [12,23,34,46,13,35,11,15];
var max=ary[0],min=ary[0];
for(var i=1;i<ary.length;i++){
    var cur = ary[i];
    cur>max?max=cur:null;
    cur<min?min=cur:null;
}
console.log(min,max) // 11 46
```

> eval: 把一个字符串变为js表达式执行

```javascript
eval("12+23+34+45+56") // 170
```
```javascript
// 方案二(2-1): 
// 以下代码不能实现
var ary = [12,23,34,46,13,35,11,15];
ary.join() // -> "12,23,34,46,13,35,11,15"
ary.toString() // -> "12,23,34,46,13,35,11,15"
eval(ary.toString()) // -> 15 只获取最后一项的值
```

> 括号表达式

```javascript
function fn1(){console.log(1)};
function fn2(){console.log(2)}
;(fn1,fn2)(); // -> 2 
// -> 只有fn2执行了 
// -> (x1,x2,x3...)括号表达式, 一个括号中出现多项内容,中间用 "." 隔开, 
// 但是我们最后获取到的结果只有最后一项
```
```javascript
function fn1(){console.log(this)};
function fn2(){console.log(this)}
var obj = {name:"lilei",fn:fn2};
(fn2,obj.fn)(); // -> window 
// 执行的是obj.fn, 但是执行的时候里面的this变为了window而不是obj
```

```javascript
function fn1(){console.log(this)};
function fn2(){console.log(this)}
var obj = {name:"lilei",fn:fn2};
(obj.fn)(); // -> this还是obj
```
```javascript
// 方案二(2-2): 
var ary = [12,23,34,46,13,35,11,15];
var min = eval("Math.min(" + ary.toString() + ")");
var max = eval("Math.max(" + ary.toString() + ")");
console.log(min);
console.log(max);
```

```javascript
// 方案二(2-3): 
var ary = [12,23,34,46,13,35,11,15];
var min = Math.min.apply(null,ary)
var max = Math.max.apply(null,ary)
console.log(min);
console.log(max);
```

##### 求平均数

```javascript
function avg(){
    // arguments.sort(); 
    // Uncaught TypeError: arguments.sort is not a function
    // arguments是一个类数组集合,它不是一个数组,不能直接使用数组方法
    
    // 1. 将类数组转换为数组
    var ary = [];
    for(var i=0;i<arguments.length;i++){
        ary[ary.length] = arguments[i];
    }
    // console.log(ary) // -> [9.8, 9.7, 10, 9.9, 9, 9.8, 3]
    
    // 2. 给数组排序,去掉开头和结尾,剩下的书求平均数
    ary.sort(function(a,b){return a-b;})
    ary.shift();
    ary.pop();
    return (eval(ary.join("+"))/ary.length).toFixed(2)
}
var res = avg(9.8, 9.7, 10, 9.9, 9.0, 9.8, 3.0)
console.log(res) // -> 9.64
```

```javascript
function avg(){
    // 1. 将类数组转换为数组
    // 借用数组原型上的slice方法,当slice执行的时候,让方法中的this变为我要处理的arguments,实现将数组arguments转换为数组
    var ary = Array.prototype.slice.call(arguments);
    
    ary.sort(function(a,b){return a-b;})
    ary.shift();
    ary.pop();
    return (eval(ary.join("+"))/ary.length).toFixed(2)
}
var res = avg(9.8, 9.7, 10, 9.9, 9.0, 9.8, 3.0)
console.log(res) // -> 9.64
```

```javascript
function avg(){
    Array.prototype.sort.call(arguments,function(a,b){return a-b;});
    [].shift.call(arguments);
    [].pop.call(arguments);
    return (eval([].join.call(arguments, "+"))/arguments.length).toFixed(2);
}
var res = avg(9.8, 9.7, 10, 9.9, 9.0, 9.8, 3.0);
console.log(res) // -> 9.64
```
