### 函数中的形参和实参

> 形参: 相当于生产洗衣机的时候提供的入口,需要用户执行函数的时候把需要的值传递进来,形参是个变量,用来存储和接受这些值  
> 实参: 用户执行的时候传递给形参的具体值  

```javascript
// 随便求出两个数的和
function sum(num1,num2){ // num1/num2 就是形参变量(类似于var了一下)
    var total = num1 + num2;
    total *= 10;
    total = total.toFixed(2);
    console.log(total)
}

// 
sum(1,2)    // -> 30.00
sum(3,4)    // -> 70.00
sum(23,41)  // -> 640.00
sum(10)     // num1 = 10;num2 = undefined; undefined = NaN ; 10 + NaN = NaN;
```
```javascript
// 随便求出两个数的和
function sum(num1,num2){
    // 如果有一个值没有传递的话,为了保证结果不是NaN,我们为其设置一个默认的值: 0;
    typeof num1 === "undefined"?num1 = 0: null; // -> num1 = num1 || 0;
    typeof num2 === "undefined"?num2 = 0: null; // -> num2 = num2 || 0;
    // 容错处理
    
    var total = num1 + num2;
    total *= 10;
    total = total.toFixed(2);
    console.log(total)
}

```

### arguments 实参集合
> 当我们不知道用户具体要传递几个值的时候(传递几个值都行),此时我们无法设置形参的个数,遇到此类需求,需要使用内置的实参集合: arguments  
> 1. arguments只有函数才有  
> 2. 不管执行函数的时候时候传递实参, arguments天生就存在,没有传递实参arguments是个空集合, 传递了arguments中包含了所有的实参值  
> 3. 不管是否设置了形参,arguments中始终存储了所有的实参信息.

```javascript
function sum(){
    console.log(arguments);
}
sum(1,2,3) // ->Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
> arguments是一个类数组集合
> 1. 以数字作为索引(属性名), 从零开始  
> arguments[0] 第一个实参  
> arguments[1] 第二个实参  
> ...  
> 2. 有一个length的属性,存储的是当前集合的长度(当前传递的实参个数)  
> arguments.length  
> arguments['length']  
>  
> arguments.callee: 存储的是当前函数本身  
> arguments.callee.caller: 存储的是当前函数在哪执行的(宿主本身),在全局环境下执行的,结果是: null

```javascript
"use strict" // 开启严格模式
function sum(){
	console.log(arguments.callee)
	// Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
}
sum()

// arguments.callee或者arguments.callee.caller一般真正的项目中很少使用,因为在js严格模式下,或报错
```
```javascript
function sum(){
	var total = null;	
	for (var i = 0; i < arguments.length; i++) {
		var cur = arguments[i]; // 每一轮循环获取当前传递的那个实参值
		// 为了防止字符串+数字是字符串拼接不是数学累加,我们最好把其他数据类型首先转换为number类型
		cur  = Number(cur);
		if(isNaN(cur) === false){
			total += cur;
		}
	}
	console.log(total);
}
sum(10,20);
sum();
sum(10,20,'30');
sum(10,20,'30','lelei');
```
```javascript
function sum(){
	var total = null;	
	for (var i = 0; i < arguments.length; i++) {
		var cur = Number(arguments[i]);
		!isNaN(cur)?total += cur:null;
	}
	console.log(total);
}
sum(10,20);
sum();
sum(10,20,'30');
sum(10,20,'30','lelei');
```
