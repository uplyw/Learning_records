### Math中的常用方法

> 数学函数: 虽然它叫函数,但是它是对象数据类型的`typeof Math -> object`  
>  
> Math对象中给我们提供了很多常用的操作数字的方法  
> console.dir(Math) 查看所有方法

- Math.abs(): 取绝对值

```javascript
Math.abs(12)    // -> 12
Math.abs(-12)   // -> 12
```
- Math.ceil(): 向上取整

```javascript
Math.ceil(12)       // -> 12
Math.ceil(12.1)     // -> 13
Math.ceil(12.9)     // -> 13
Math.ceil(-12.1)    // -> -12
Math.ceil(-12.9)    // -> -12
```
- Math.floor(): 向下取整

```javascript
Math.floor(12)       // -> 12
Math.floor(12.1)     // -> 12
Math.floor(12.9)     // -> 12
Math.floor(-12.1)    // -> -13
Math.floor(-12.9)    // -> -13
```
- Math.round(): 四舍五入

```javascript
 Math.round(12.3)   // -> 12
 Math.round(12.5)   // -> 13
 
 Math.round(-12.3)  // -> -12
 Math.round(-12.5)  // -> -12
 Math.round(-12.51) // -> -13
```
- Math.random(): 获取[0-1)之间的随机小数

```javascript
for(var i=0;i<100;i++){
    console.log(Math.random()) // 随机输出100个0-1之间的小数
}
// -> 获取[0,10]之间的随机整数
Math.round(Math.random() * 10)

// -> 获取[3,15]之间的随机整数
Math.round(Math.random()*12+3)

// -> 获取[n,m]之间的随机整数
Math.round(Math.random()*(m-n) + n)

```
- Math.max(): 获取一组值中的最大值

```javascript
Math.max(12,2,34,1,4,6) // -> 34
```
- Math.min(): 获取一组值中的最小值

```javascript
Math.min(12,2,34,1,4,6) // -> 1
```

- Math.PI: 获取圆周率(π)

```javascript
Math.PI     // -> 3.141592653589793
```

- Math.pow(): 获取一个值的多少次幂

```javascript
Math.pow(10,3) // -> 1000
```

- Math.sqrt(): 开平方

```javascript
Math.sqrt(100)
```
