### 浏览器(Browser)
#### 内核
1. `webkit内核 [v8引擎]`: (google chrome/safari/opera/大部分国产浏览器)  
2. `gecko内核`: (Mozilla Firefix)  
3. `Trident排版引擎`: (Internet Explorer)
4. `Presto内核`: 
5. `KHTML排版引擎`: 

### W3C 万维网联盟
 `制定编程语言的规范与标准`  
 开发者按照规范编写代码,浏览器开发商也会开发一套按照规范把代码渲染成页面的东西(这个东西就是内核或引擎)


### JS的三种引入方式
```html

<!-- 第一种方式  行内 -->
<div onclick="alert("hello world")"> 点击 </div>

<!-- 第二种方式  内嵌 -->
<script>
    alert("hello world");
</script>

<!-- 第三种方式  外链 -->
<script src="helloWorld.js"></script>

```

### JavaScript

> ECMAScript(ES): 规定了js的一些基础核心的知识(变量/数据类型/语法规范/操作语句等)  
> 
> DOM: document object model 文档对象模型,里面提供了一些属性和方法,可以让我们操作页面中的元素  
> 
> BOM: browser object model 浏览器对象模型,里面提供了一些属性和方法,可以让我们操作浏览器  

### 变量和常量
> 变量: 值是可以变的  
> 常量: 值是不可变的

```javascript
// 变量

// -> js中定义变量的方式
// var 变量名 = 值; (ES6中定义变量使用 let )
var num = 12;
var str = "hello world";

// -> Java等后台语言定义变量比较严谨,js比较松散
// int num = 12;
// float num = 12.5;
// double num = 3.1415;

console.log(num) // -> 12 变量其实只是一个无意义的名字,它所代表的意义都是其存储的那个值

num = 13;
console.log(num) // -> 13

```

```javascript
// 常量

// -> 任何一个具体的数据值都是常量,例如: 12就是一个常量

// -> 和变量类似,我们设置一个常量(也是一个名字),给其储存一个值,但是这个存储的值不能修改

const num = 12; // -> 定义一个常量num,给他存储了12
num = 13; // -> Uncaught TypeError: Assignment to constant variable. 常量分配的值是不能修改的

```

### JS的命名规范

1. js中严格区分大小写

```javascript
var name = "lilei";
var Name = "hanmeimei";
console.log(name) // -> lilei
// -> name和Name是两个不同的变量
```

2. 遵循国际命名规则,`驼峰命名法`  `下划线命名法`

> 第一个单词首字母小写,其余每个有意义的单词首字母大写;  
> 以下划线分割两个单词;  
>  数字字母下划线$都可以用于命名,但不能以数字开头  
> 关键字/保留字不能作为变量名;

```javascript
var firstName;
var first_name;

add / insert / create : 增加创建插入
remove / rm / clear / del : 删除清空
update : 修改升级
get / query / select : 查询获取
```
