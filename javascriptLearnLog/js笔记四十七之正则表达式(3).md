#### 正则的捕获 exec  

- 捕获的内容格式

每一次捕获的时候都是先进行默认的匹配,如果没有匹配成功的,捕获到额结果是null;只有有匹配的内容才能捕获到

1) 捕获到的内容是一个数组  
    数组中的第一项是但钱大正则捕获的内容  
    ` index ` : 捕获内容在字符串中开始的索引位置  
    ` input ` : 捕获的原始字符串  
2) 正则捕获的特点  
    **懒惰性**: 每一次执行exec值捕获第一个匹配的内容, 在不进行任何处理的情况下, 再执行多次捕获, 捕获的还是第一个匹配的内容  
    **贪婪性**: 正则的每一次捕获都是按照匹配最长的结果捕获的,例如: 2符合正则/2015页符合正则,我们默认捕获的是2015

```javascript
var reg = /\d+/;
var str = "lilei18hanmeimei16";

console.log(reg.lastIndex) // -> 0
console.log(reg.exec(str)); // -> ["18", index: 5, input: "lilei18hanmeimei16", groups: undefined]

console.log(reg.lastIndex) // -> 0
console.log(reg.exec(str)); // -> ["18", index: 5, input: "lilei18hanmeimei16", groups: undefined]
```

##### 如何解决正则的懒惰性?

> 在正则的末尾加上一个修饰符"g" ;

**修饰符** : ` g `:全局匹配, ` i ` : 不区分大小写 ` m ` : 多行匹配

> 原理: 加了全局修饰符 g, 正则每一次捕获结束后,我们的lastIndex的值都变为了最新的值,下一次捕获从最新的位置开始查找,这样就可以把所有需要捕获的内容都获取到了

```javascript
var reg = /\d+/g;
var str = "lilei18hanmeimei16";

console.log(reg.lastIndex) // -> 0
console.log(reg.exec(str)); // -> ["18", index: 5, input: "lilei18hanmeimei16", groups: undefined]

console.log(reg.lastIndex) // -> 7
console.log(reg.exec(str)); // -> ["16", index: 16, input: "lilei18hanmeimei16", groups: undefined]

console.log(reg.lastIndex) // -> 18
console.log(reg.exec(str)); // -> null
```

一次性匹配所有符合条件的内容(加 ` g ` 全局匹配)

```javascript
var reg = /\d+/g;
var str = "lilei18hanmeimei16lihua17";
var ary = [];
var res = reg.exec(str);
while(res){
    ary.push(res[0]);
    res = reg.exec(str);
}
console.log(ary); // -> ["18", "16", "17"]
```

##### 如何解决正则的贪婪性? 

> 在量词元字符后面添加一个 ` ? ` 即可

```javascript
var reg = /\d+?/g;
var str = "lilei18hanmeimei16lihua17";
console.log(reg.exec(str)); // -> 2
```

##### ` ? ` 在正则中有很多的作用:
1. 放在普通的额元字符后面代表出现0-1次 ` /\d?/ ` 
2. 放在一个量词的元字符后面代表取消捕获时候的贪婪性 

```javascript
var reg = /\d+?/g;
var str = "lilei18hanmeimei16lihua17";
var ary = [];
var res = reg.exec(str);
while(res){
    ary.push(res[0]);
    res = reg.exec(str);
}
console.log(ary); // -> ["1", "8", "1", "6", "1", "7"]
```

字符串中的match方法 -> 把所有和正则匹配的字符串都获取到 

```javascript
var reg = /\d+?/g;
var str = "lilei18hanmeimei16lihua17";
var ary = str.match(reg);
console.log(ary) // -> ["1", "8", "1", "6", "1", "7"]
```
> 虽然在当前的情况下match比我们的exec更加的简便一些,但是match中存在一些自己处理不了的问题: 在分组捕获的情况下,match只能捕获到大正则匹配的内容,而对于小正则捕获的内容是无法获取的
