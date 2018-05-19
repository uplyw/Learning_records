#### 数组检查
- indexOf / lastIndexOf

> 检验数组中是否包含某一项  
> 获取当前项在数组中第一次或者最后一次出现位置的索引  

> 数组中的这两个方法在ie6~7下不兼容   
> 字符串中的这两个方法兼容所有浏览器  

> 如果当前数组并没有这一项,返回的索引是 -1 ，我们根据这一点可以验证数组中是否包含这一项  

```javascript
if(ary.indexOf(12) > -1){
    // -> 数组中包含12
}

// 自己写的indexOf方法
Array.prototype.myIndexOf = function myIndexOf(value){
    var result = -1;
    for(var i=0;i<this.length;i++){
        if(value === this[i]){
            result = i;
            break;
        }
    }
    return result
}
ary.myIndexOf(12) // -> 验证12 是否在数组中
```

#### 数组遍历

> 以下方法在ie6~8中都不兼容  

- forEach

> 遍历数组中的每一项  

```javascript
ary.forEach(function(value,index){
    // -> 数组中有多少项,当前回调函数执行多少次;
    // -> 每一次传递进来的value就是当前遍历数组这一项的值,index就是遍历这一项的索引
})
```

- map

> 遍历数组中的每一项  
> 在forEach的基础上可以修改每一项的值  

```javascript
ary,map(function(value,index){
    // -> 数组中有多少项,当前回调函数执行多少次;
    // -> 每一次传递进来的value就是当前遍历数组这一项的值,index就是遍历这一项的索引;
    return xxx;
})
```
- fillter
- find
- reduce
- every
- ...

#### 数组去重

- 方案一: 循环去重

```javascript
// 思路一
// 遍历数组中的每一项,拿每一项和它后面的项依次比较, 如果相同了, 则把相同的这一项在原来数组中删除即可;

var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
for(var i=0;i<ary.length-1;i++){
    // ary.length-1 : 最后一项的后面没有内容了,不需要再比较
    var cur = ary[i];
    // 当前遍历的这一项(索引i)
    
    // 把哪出的这一项和后面的每一项进行比较
    for(var j = i+1;j<ary.length;j++){
        // i+1: 把当前项和它后面项比较,当前项索引是i,后一项索引是i+1
        if(cur === ary[j]){
            // ary[j]: 作比较的这一项
            ary.splice(j,1); // 
            // 本次做比较的这一项和当前项相同,
            // 我们需要在原有的数组中把做比较的这一项删除掉(做比较的这一项的索引是j)
        }
    }
}
console.log(ary)  // -> [1, 2, 2, 3, 3, 5, 4] 
// 数组塌陷导致不能完全去重
// 数组塌陷问题: 使用splice删除数组中的某一项后, 删除这一项后面的每一项索引都要向前进一位(在原有索引上减一)
// 此时如果我们j++ 循环操作的值累加了,我们通过最新j获取的元素不是紧挨删除这一项的元素,而是跳过了这一项的元素;
```
```javascript
// 思路二
var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
for(var i=0;i<ary.length-1;i++){
    var cur = ary[i];
    for(var j = i+1;j<ary.length;j++){
        if(cur === ary[j]){
            ary.splice(j,1);
            j--;
            // 先让j--, 然后再j++, 相当于没加没减, 此时j还是原有索引
            // 在获取的时候就是删除这一项后面紧挨着的这一项
        }
    }
}
console.log(ary) // -> [1, 2, 3, 5, 4]
```
```javascript
// 思路三
var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
for(var i=0;i<ary.length-1;i++){
    var cur = ary[i];
    for(var j = i+1;j<ary.length;){
        if(cur === ary[j]){
            ary.splice(j,1);
        }else{
            j++; // 不删除的时候才步长累加
        }
    }
}
console.log(ary) // -> [1, 2, 3, 5, 4]

// 循环判断可以达到数组去重的结果
// 但是由于循环操作的重复性,在达到一定数量级以后,会造成严重的性能问题
```

- 方案二: indexOf方法去重

```javascript
// 利用indexOf实现数组去重(不兼容ie6~8)
// 检验数组中除去当前项意外是否包含当前项,如果存在就删除,否则保留
var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
for(var i=0;i<ary.length;i++){
    var cur = ary[i]; // 当前项
    var curNextAry = ary.slice(i+1); // 把当前项以外的那些元素以一个新数组返回,比较新数组中是否包含当前项
    if(curNextAry.indexOf(cur) > -1){
        // 后面项组成的数组中包含当前项(当前项重复了), 我们把当前这一项删除掉即可
        ary.splice(i,1);
        i--;
    }
}
console.log(ary) // -> [1, 3, 4, 5, 2]

// 方案一的方法是从前往后遍历, 所以结果保留从前往后出现的元素

// 方案二的方法使从前往后删除已存在的元素,所以结果保留从后往前的出现的元素
```

- 对象键值对处理

```javascript
// 遍历数组中的每一项,把每一项作为新对象的属性名和属性值存储起来, 
// 例如当前项1,对象中存储的{1:1}

// 在每一次向对象中存储之前,首先看一下原有对象中是否包含了这个属性
// ('typeof obj[xxx] === 'undefined' 说明当前对象中没有 xxx 这个属性)
// 如果已经存在这个属性说明数组中的当前项重复了
// (1. 在原有数组中删除这一项;2. 不再向对象中存储这个结果)
// 如果不存在(把当前项作为对象的属性名和属性值存储进来即可)

var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
var obj = {};
for(var i=0;i<ary.length;i++){
    var cur = ary[i];
    if(typeof obj[cur] !== 'undefined'){
    // 对象中已经存在该属性: 证明当前项在数组中的是重复性
        ary.splice(i, 1);
        i--;
        continue;
    }
    obj[cur] = cur;
}
console.log(ary) // -> [1, 2, 3, 5, 4]
```
```javascript
var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
var obj = {};
for(var i=0;i<ary.length;i++){
    var cur = ary[i];
    if(typeof obj[cur] !== 'undefined'){
    // 对象中已经存在该属性: 证明当前项在数组中的是重复性
    // ary.splice(i, 1); // 使用splice会导致后面的索引项前进一位,如果后面有很多项,消耗的性能很大
    // 思路: 我们把最后一项拿过来替换当前要删除的这一项,然后再把最后一项删除
        ary[i] = ary[ary.length - 1];
        ary.length--;
        i--;
        continue;
    }
    obj[cur] = cur;
}
console.log(ary) // -> [1, 2, 5, 4, 3]
```
```javascript
Array.prototype.myUnique = function myUnique(){
    var obj = {};
    for(var i=0;i<this.length;i++){
        var item = this[i];
        if(typeof obj[item] !== 'undefined'){
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;
    return this;
}
var ary = [1,2,2,2,3,3,3,1,5,3,4,5,2,4,5,2];
console.log(ary.myUnique()) // -> [1, 2, 5, 4, 3]
console.log(ary.myUnique().sort(function(a,b){return a-b})) // -> [1, 2, 5, 4, 3]
```

**方案一,二,三都实现了数组去重,但方案一性能差,方案二兼容差,所以方案三为最优解**

- 其他思路扩展

1. 相邻比较法

> 首先给数组进行排序,然后给相邻两项比较,相同的话,删除后一项
