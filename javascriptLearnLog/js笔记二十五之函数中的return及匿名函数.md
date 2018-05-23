### js中的返回值 `return`

```javascript
function sum(){
	var total = null;	
	for (var i = 0; i < arguments.length; i++) {
		var cur = Number(arguments[i]);
		!isNaN(cur)?total += cur:null;
	}
}
sum(10,20);
console.log(total) //Uncaught ReferenceError: total is not defined  闭包的保护机制导致私有作用域会保护里面的私有变量
 ```
 
 > 返回值是一个函数提供的一个出口: 我们如果想在外面使用函数私有的一些信息,,那么就需要通过return,把这些信息返回出来
 
 ```javascript
function sum(){
	var total = null;	
	for (var i = 0; i < arguments.length; i++) {
		var cur = Number(arguments[i]);
		!isNaN(cur)?total += cur:null;
	}
	return total;
	// return后面跟着的都是值(返回的都是值): 此处不是把total变量返回,而是把total存储的值返回
}
console.log(sum(10,20)); // -> 30
// sum: 函数本身
// sum(): 让函数先执行,代表的是当前函数返回的结果
 ```
 
```javascript
 function sum(){
     var total = 0;
     // return;
 }
 console.log(sum()) // -> undefined
 // 如果函数中没有return或者return后面啥也没有,默认返回的结果也是undefined
 ```
 
 ```javascript
function sum(){
    var total = 0;
    return;
    console.log(total) // 在函数体中遇到return后,return后面的代码都不再执行
}
console.log(sum())
```
```javascript
function sum(){
	var total = null;	
	for (var i = 0; i < arguments.length; i++) {
		var cur = Number(arguments[i]);
		!isNaN(cur) ? total += cur : null;
	}
	return total;
}
var total = sum(10,20,30); // 外面是全局下的total 和 函数中的total没有必然联系
console.log(total)
 ```

### 匿名函数

> 没有名字的函数  
> 函数表达式  
> 自执行函数  

- 函数表达式

```javascript
oBox.onclick = function(){
    // 把一个没有名字的函数(有名字也无所谓)作为值赋值给一个变量或者一个元素的某个时间等: 函数表达式
}
```

- 自执行函数

```javascript
(function(n){
    // 创建函数和执行函数放在一起了,创建完成立马执行: 自执行函数
})(10)

// 自执行函数 1
~function(n){
    
}(10);

// 自执行函数 2
-function(n){
    
}(10);

// 自执行函数 3
+function(n){
    
}(10);

// 自执行函数 4
!function(n){
    
}(10)
```
