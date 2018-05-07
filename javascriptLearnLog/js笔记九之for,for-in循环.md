### 循环操作语句
> 循环: 重复做一件事情

**`for循环`**
```javascript
// for(设置循环起始值;设置循环执行的条件;步长累加){
//     循环体: 重复做的事情都在循环体中
// }

for(var i=0;i<5;i++){
    console.log(i) // 0 1 2 3 4
}
console.log(i) // 5
```

```javascript
var i=0
for(;i<5;){ // 初始值可以在循环外声明,但不能省略分号,
    console.log(i) // 省略步长会陷入死循环,导致浏览器崩溃
    i++; // 步长累加可以放在循环体中
}
console.log(i)
```

```javascript
for(var i = 0;i < 5;i++){
    console.log(i);
    continue;
    // 结束本轮循环,继续执行下一轮: 循环体中continue后面的代码都不会再执行,它会直接的去执行步长,然后进入到下一轮
    // ...
}
console.log(i); // -> 5
```

```javascript
for(var i = 0;i < 5;i++){
    console.log(i);
    break;
    // 结束整个循环: 循环体中一旦遇到break,首先后面代码不执行了,而且步长累加也不执行了,循环都结束了
    // ...
}
console.log(i);  // -> 0
```
*面试题*
```javascript
for(var i=1;i<10;i+=2){
    if(i<5){
        i++;
        continue;
    }else{
        i+=3;
        break;
    }
    console.log(i)
}
console.log(i)  // -> 10
```

### for - in循环

##### 用来遍历(循环)对象键值对的


> 对象中有多少组键值对,我们的for in循环就遍历多少次(不一定)  
> 每一次循环key这个变量存储的都是当前循环这组键值对的属性名  
> - key存储的值都是字符串格式的(不管属性名是不是数字)  
> - 在for in循环遍历的时候,大部分浏览器都是先把对象中的键值对进行排序(把数字属性名的排在前面,并且排列的时候按照数字有小到大排列`[小数不算]`),其次再把非数字的属性名按照之前编写的顺序排列,循环的时候按照重新排列的顺序依次遍历

```javascript
var obj = {name:"lilei",age:18,1:"abc",3:"ABC",2:"xyz"}
// -> 对象中有多少组键值对,我们的for in循环就遍历多少次(不一定)
// -> 每一次循环key这个变量存储的都是当前循环这组键值对的属性名
for(var key in obj){
    console.log(key)  // -"string"  1,2,3,name,age
    console.log(obj.key) // undefined
    console.log(obj[key]) //每一次循环把key存储的值(当前遍历的属性名)获取到放在中括号中,获取obj中对应的属性的属性值
}
// 'key': 字符串key,属性名
// key: 变量key,代表的是存储的值

// obj['key']  obj.key: 属性名是key
// obj[key]: 属性名不是key而是key变量存储的值
```
