#### 正则分组匹配

1. 改变优先级
2. 分组引用

 ` \1 ` 代表和第一个分组出现一模一样的内容;  
 ` \2 ` 代表和第二个分组出现一模一样的内容;  

```javascript
var reg = /^(\w)\1(\w)\2$/;
console.log(reg.test("zafq")) // -> false;
console.log(reg.test("zzff")) // -> true;
 // 一模一样;
```
3. 分组捕获 -> 正则在捕获的时候,不仅仅把大正则匹配的内容捕获到,而且还可以吧小分组匹配到的内容捕获到  

> ` ?: ` 在分组中代表只匹配不捕获

```javascript
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/;
var str = "110105189801015474";
var ary = reg.exec(str)
console.log(ary); // -> ["110105189801015474", "11", "0105", "1898", "01", "01", "54", "7", "4", index: 0, input: "110105189801015474", groups: undefined]

// ary[0] -> 大正则匹配的内容
// ary[1] -> 第一分组捕获的内容
// ary[2] -> 第二分组捕获的内容
// ...
```

> ` ?: ` 在分组中代表只匹配不捕获

```javascript
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(?:\d|X)$/;
var str = "110105189801015474";
var ary = reg.exec(str)
console.log(ary); // -> ["110105189801015474", "11", "0105", "1898", "01", "01", "7", index: 0, input: "110105189801015474", groups: undefined]
```

#### replace
把原来的字符串替换为新的字符串  
在不使用正则的情况下,每次执行一次只能替换一个字符  

```javascript
var str = "lilei18lilei17";
str.replace("lilei","lileihanmeimei") // -> lileihanmeimei18lilei17
str.replace("lilei","lileihanmeimei").replace("lilei","lileihanmeimei") // -> lileihanmeimeihanmeimei18lilei17
```
```javascript
var str = "lilei18lilei17";
str.replace(/lilei/,"lileihanmeimei") // -> lileihanmeimei18lilei17
str.replace(/lilei/g,"lileihanmeimei") // -> lileihanmeimei18lileihanmeimei17
```

关于replace第一项的值是一个正则它的实现原理  

首相我们和exec捕获一样, 把所有和我们正则匹配的都捕获到,然后把捕获的内容替换成我们需要替换的新内容  
/lilei/g 按照这个正则把str中所有可以匹配的都捕获到,然后统一都替换成我们的"lileihanmeimei"  

```javascript
var str = "lilei18lilei17";
str = str.replace(/lilei/g,function(){
    console.log(arguments);
    // 第一次执行匿名函数的结果 ["lilei", 0, "lilei18lilei17", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    // 第二次执行匿名函数的结果 ["lilei", 7, "lilei18lilei17", callee: ƒ, Symbol(Symbol.iterator): ƒ]
    return "lileihanmeimei";
})
console.log(str)  // lileihanmeimei18lileihanmeimei17
```

第二个参数换成一个函数  
1. 匿名函数执行多少次,取决于正则能在字符串中捕获多少次 - > 正则捕获两次, 所以我们的匿名函数也执行两次  
2. 每一次执行匿名函数, 里面传递的参数值arguments和我们自己通过exec捕获到的结果是非常类似的(即使正则有分组, 我们同样可以通过arguments获取到分组捕获的内容)  
3. return 返回的结果是啥就相当于把当前这一次大正则捕获的内容替换成你返回的内容  


```javascript
var str = "lilei18lilei17";
str = str.replace(/\d+/g, function(){
    console.log(arguments[1]) 
    return 20;
})
console.log(str) // lilei20lilei20

// RegExp.$1 -> 获取第一个分组捕获的内容
```

```javascript
var str = "20180614"; // 贰零壹捌零陆壹肆
var ary = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
str = str.replace(/\d/g, function(){
    // var num = arguments[0];
    // var str = ary[num];
    // return str; 
    
    return ary[arguments[0]];  // 简写
});
console.log(str); // 贰零壹捌零陆壹肆
```
