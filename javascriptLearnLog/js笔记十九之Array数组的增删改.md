### 数组的基础结构
> 数组也是对象数据类型的 typeOf [] 

```javascript
console.log(typeOf [])// -> "object"
```
> 数组也有属性名,只不过属性名是数字,我们把数字属性名称之为它的索引;   
> 数组是以数字作为索引,索引从零开始,有一个length属性代表数组的长度

```javascript
// [12,23,34]
// 0: 12
// 1: 23
// 2: 34
// length: 3
```

> 类数组: 类似于数组,但是不是数组
> 1. 通过getElementsByTagName获取的元素集合是类数组;  
> 2. 函数中的实参集合arguments也是类数组  
> ...

- 循环数组中的每一项

```javascript
// for循环
var ary = [12,23,34,45];
Array.prototype.aa = 100;
for(var i=0;i<ary.length;i++){
    console.log(ary[i]) // -> 12,23,34,45
}

// for in循环
for(var key in ary){
    // -> key: 属性名(数组中的属性名是索引)
    console.log(ary[key]) // -> 12,23,34,45,100
}

// -> 区别: for循环只能遍历到数组的私有的一些属性,儿for in循环可以吧一些定义的公共属性也能遍历到
```

#### 数组中的常用方法

> 数组中有很多常用方法 'console.dir(Array.prototype)'

- 四个方面记忆数组的方法

> 1. 方法的意义和作用
> 2. 方法的参数
> 3. 方法的返回值
> 4. 通过此方法,原来的数组是否发生了改变

- 实现数组的增加,修改,删除

##### 增加

- push() 

> 向数组的末尾增加新内容;  
> 参数: 一个或多个,任何数据类型都可以;   想要给数组末尾追加什么,直接传递到push方法中即可,传递多个用逗号隔开  
> 返回值: 新增后数组的长度  
> 原有数组改变了  

```javascript
var ary = [12,23,34];
ary.push(45,{name:'lilei'},function(){}); // -> 6
console.log(ary); // -> [12, 23, 34, 45, {…}, ƒ]
```
- unshift()

> 向数组的开头增加新内容; 
> 参数: 一个或多个,任何数据类型都可以;(可以是多个任意数据类型的值)  
> 返回值: 新增后数组的长度  
> 原有数组改变了  

```javascript
var ary = [12,23,34]
ary.unshift(45,{name:'lilei'},function(){}); // -> 6
console.log(ary); // -> [45, {…}, ƒ, 12, 23, 34]
```
> 把数组当做一个普通对象,使用对象键值对的操作,给其设置新的属性(索引)  
> 向数组的末尾添加新的内容

```javascript
var ary = [12,23,34];
ary[ary.length] = 45; 
console.log(ary) // -> [12, 23, 34, 45]
```

##### 删除

- pop(): 删除数组中的最后一项

> 参数: 无  
> 返回值: 别删除的最后一项  
> 原有数组改变  

```javascript
var ary = [12,23,34];
ary.pop()
console.log(ary) // -> [12,23]
```

- shift(): 删除数组中的第一项

> 参数: 无  
> 返回值: 被删除的那一项  
> 原有数组改变了  
> 删除第一项之后, 后面的每一项索引都要向前进一位(导致后面项的索引发生改变)  

```javascript
var ary = [12,23,34];
ary.shift()
console.log(ary) // -> [23,34]
```
- delete

> 把数组当做普通的对象操作  
> delete ary[索引]; 删除指定索引项  
> 当前项被删除后,其他项索引不会改变  
> 当前数组的长度也不会改变  

```javascript
var ary = [12,23,34];
delete ary[0]
console.log(ary) // -> (3) [empty, 23, 34]
```

- ary.length--

> 删除数组最后一项  

```javascript
var ary = [12,23,34];
ary.length--;
console.log(ary) // -> [12,23]
```

- splice

> 数组中内置方法,本意删除,但可以实现数组的增加/修改/删除  
>  
> splice(n,m): 从索引n开始,删除m个(m不写是删除到数组的末尾,)  
> 返回值: 被删除的内容的新数组  
> 原有数组改变  

```javascript
var ary = [12,23,34];
ary.splice(1,2); // 返回:[23,34]
console.log(ary) // -> 12
```

> splice(0): 清空数组  

```javascript
var ary = [12,23,34];
ary.splice(0);
console.log(ary) // -> []
```

> splice(): 一项也不删,返回一个空数组  

```javascript
var ary = [12,23,34];
ary.splice();
console.log(ary) // -> [12, 23, 34]
```

> splice实现修改  
> splice(n,m,x): 在原有删除的基础上用x代替原有项  

```javascript
var ary = [12,23,34];
ary.splice(1,1,45);
console.log(ary) // -> [12, 45, 34]
```

> splice实现增加  
> splice(n,0,x): 在修改的基础上,一项都不删除,把x插入到索引n的前面  
> splice(0,0,x): 向数组开头增加新内容  
> splice(ary.length,0,x): 向数组末尾增加新内容  
> splice(0,1): 删除数组第一项  
> splice(ary.length-1): 删除数组最后一项  

```javascript
var ary = [12,23,34];
ary.splice(1,0,45);
console.log(ary); // -> [12, 45, 23, 34]
ary.splice(0,0,56);
console.log(ary); // -> [56, 12, 45, 23, 34]
```
