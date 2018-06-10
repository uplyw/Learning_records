##### 数组排序

```javascript
var ary = [12,23,14,34,23,1,14,16,26,2];
// ary.sort(); // 只按第一位数字进行排序(只能排10以内的数字)
ary.sort(function(a,b){
    return a-b;
})
console.log(ary)  // [1, 2, 12, 14, 14, 16, 23, 23, 26, 34]
```

- 回调函数  

> 把一个方法A当做参数值传递给另一个函数B, 然后在B执行的过程中, 我们随时根据需求让A方法执行;

```javascript
function A(){
    
}
function B(fn){
    fn();
    fn();
    fn();
}
B(A);
```

```javascript
var ary = [12,23,14,34,23,1,14,16,26,2];
ary.sort(function(a,b){
    console.log(a,b)
    // 12 23
    // 23 14
    // 14 34
    // 34 23
    // 23 1
    // 1 14
    // 14 16
    // 16 26
    // 26 2
    
    // a -> 每一次执行匿名函数的时候,找到数组中的当前项
    // b -> 当前项的后一项 
    
    // return a-b; // -> 升序 如果a>b,返回的>0, a和b 交换位置
    // return b-a; // -> 降序 如果b>a,返回的>0,a和b变换位置 
    // return 的值是一个 > 0 或 <= 0  如果大于0 让a和b交换位置,小于等于0原来位置不变
})
```

```javascript
var ary = [12,23,14,34,23,1,14,16,26,2];
ary.sort(function(a,b){
    return 1;
})
console.log(ary)  // [2, 26, 16, 14, 1, 23, 34, 14, 23, 12]
// 不管a和b谁大, 每一次都返回一个恒大于零的数, 也就是每一次a和b都要交换位置, 最后的结果就是原有数组倒过来排列了
// 相当于reverse
```
#### 二维数组

> 二维数组排序

```javascript
var ary = [
    {name:"李雷",age:18},
    {name:"韩梅梅",age:16},
    {name:"王二",age:23},
    {name:"赵四",age:32}
]
// 给二维数组排序,按照年龄由小到大排序 

ary.sort(function(a,b){
    return a.age - b.age;
})
console.log(ary)
// {name: "韩梅梅", age: 16}
// {name: "李雷", age: 18}
// {name: "王二", age: 23}
// {name: "赵四", age: 32}
```
```javascript
var ary = [
    {name:"李雷",age:18},
    {name:"韩梅梅",age:16},
    {name:"王二",age:23},
    {name:"赵四",age:32}
]
// 给二维数组排序,按照年龄由大到小排序 

ary.sort(function(a,b){
    return (a.age - b.age)*-1; 
})
console.log(ary)
// {name: "韩梅梅", age: 16}
// {name: "李雷", age: 18}
// {name: "王二", age: 23}
// {name: "赵四", age: 32}
```

> 按姓名排序 localeCompare()

```javascript
var ary = [
    {name:"李雷",age:18},
    {name:"韩梅梅",age:16},
    {name:"王二",age:23},
    {name:"赵四",age:32}
]
ary.sort(function(a,b){
    return a.name.localeCompare(b.name); 
})
console.log(ary)
// {name: "李雷", age: 18}
// {name: "王二", age: 23}
// {name: "赵四", age: 32}
// {name: "韩梅梅", age: 16}
```
