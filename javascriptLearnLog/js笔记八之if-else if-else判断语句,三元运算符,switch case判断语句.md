### 判断操作语句

```javascript
if(条件1){
    // 条件1成立要执行的操作
}else if(条件2){
    // 条件1不成立,条件2成立,执行的操作
}
...
else{
    // 以上条件都不成立
}

// 如果好几个条件都成立了,只把第一个成立的条件执行,后面成立的条件忽略不管

//条件: a == b a >= b a <= b ...

if(a){
    // 先把a转换为布尔类型,判断真假一次来决定条件是否成立
}
```

> && 并  
> || 或


```javascript
var num = parseFloat('width:12.5px;'); // -> NaN

if(num == 12.5){ // NaN != 12.5
    alert(12.5);
}else if(num == NaN){ //NaN != NaN
    alert(NaN)
}else if(typeof num == 'number'){ // typeof NaN -> 'number' == 'number'
    alert(0)  // -> '0'
}else{
    alert('啥也不是')
}

```

### 三元运算符

**`条件?条件成立执行:条件不成立执行`**
```javascript
var num = 10;
if(num > 5 && num < 10){
    num ++;
}else{
    num --;
}
// 改写成三元运算符
num > 5 && num < 10 ? num ++ : num --;
```

```javascript
var num = 10;
if(num > 5 && num < 10){
    num ++;
}
// 改写成三元运算符
num > 5 && num < 10 ? num ++ : null ; 
// 如果条件成立或不成立的某一种情况并不需要做什么处理,我们空着语法不符合
// 我们使用null/undefined/void 0 占位即可
```

```javascript
var num = 10;
if(num > 5 && num < 10){
    num ++;
    console.log(num)
}
// 改写成三元运算符
// 某一种情况执行多条操作,使用小括号包起来,中间用逗号分隔
num > 5 && num < 10 ? (num ++,console.log(num)): null ; 
```
**`在三元运算符的操作中不能出现break/continue/return这些关键词,我们无法用三元运算符代替if else`**

### switch case

> switch case应用于if-else中一个变量在不同值情况下的不同操作

```javascript
var num = 10;
switch(num){ 
// switch后面小括号中存放的是一个值(一般我们都写变量: 把变量存储的值拿来用,有时候也可能是一个计算)
    case 1:
    // case 后面放入的都是值,目的是验证switch后面的值和哪一个case后面的值相等,相等的进行对应的处理
        ...
        break;
        // 每一个case结束后都要加break,结束当前的判断
    case 10:
        ...
        break
    default:
    // switch 后面的值和每一个case情况对应的值都不相等,执行最后的default,类似于else
        ...
}
```

```javascript
var num = 5;

// num%2 让num存储的值除以2取余数(0或1)
switch(num%2){
// 先把取余操作进行运算,那运算结果和case比较
    case 0:
        num++;
        break;
    case 2-1:
    // case 后面也应该是值,此处先把2-1计算,把计算结果和switch值比较
        num--;
        // break;
        // 最后一项可以不加break,不加也能跳出判断
}
num // -> 4
```

```javascript
var num = 6;
switch(num%3){
    case 0:
        num++;
        // 不加break,不管后面的条件是否成立,都会继续向下执行,直到遇到break为止;
    case 1:
        num--;
        break;
    case 2:
        num = 0;
        break;
}
num // -> 6
```

**`小应用`**
> 把符合某几项值都去做同一件事情,使用不加break实现

```javascript
var num = 6;
switch(num%3){
    case 0:
    case 1: // 余数是0或1都执行减减的操作
        num--;
        break;
    default:
        num = 0;
}
num // -> 5
```

```javascript
var num = '6';
switch(num){
    case 6:
        num--;
        break;
    default:
        num=0;
}
num // -> 0

//switch case中的比较是: ===

```

> =: 赋值,等号左边是变量, 右边是值  
> ==: 比较, 如果左右两边值的类型不一样,浏览器会默认转换为一样的然后在进行比较  ('6' == 6 -> true)  
> ===: 绝对相等, 不仅要求值一样,并且类型也完全一样 ('6' === 6 -> false)  
