 我们在js中主要研究的都是函数中的this  
 
 js中的this代表的是当前行为执行的主体  
 
 js中的context(上下文)代表的是当前行为执行的环境(区域)  
 
 this是谁和函数在哪定义的和在哪执行的都没有任何的关系  

#### 如何的区分 this

**1.函数执行,首先看函数名前面是否有  " `.` ",有的话" `.` "前面是谁this就是谁;没有的话this就是window;**

```javascript
function fn(){
    console.log(this)
}

var obj = { fn : fn };

fn();   // this -> window

obj.fn()    // this -> obj

function sum(){
    fn();   // this -> window
}
sum() 

var oo = {
    function sum(){
        fn();   //this -> window
    }
}

oo.sum();
```

**2.自执行函数中的this永远是window** 

**3.给元素的某一个事件绑定方法,当事件触发的时候,执行对应的方法**

```html
<div id="div1">点击</div>
<script>
    function fn(){
        console.log(this)
    }
    document.getElementById("div1").onClick = fn; // fn中的this是 #div1
    document.getElementById("div1").onClick = function(){
        fn(); // this -> window
    }
</script>
```

#### 预解释/作用域/内存/this综合练习题  

```javascript
var num = 20;
var obj = {
    num: 30,
    fn: (function(num){
        this.num *= 3;
        num += 15;
        var num = 45;
        return function(){
            this.num *= 4;
            num += 20;
            console.log(num);
        }
    })(num)    // -> 把全局变量num的值20赋值给了自执行函数的形参,而不是obj下的30,如果想是obj下的30,我们需要写obj.num
};
var fn = obj.fn;
fn(); // -> 65
obj.fn(); // -> 85
console.log(window.num, obj.num); // -> 240, 120
```
 

练习: 累加的投票器

```html
<style type="text/css">
	#btn{width: 240px;line-height: 1.8;background:#f1f1f1;font-size: 24px;text-align: center;margin: 200px auto;cursor: pointer;user-select: none;}
	#spanNum{font-weight: 600;color: orange;}
</style>
<div id="btn">请投票: <span id="spanNum">0</span></div>
```

方案一: 利用全局作用域不销毁的原理, 把需要累加的数字定义为全局的变量;

```javascript
var oBtn = document.getElementById('btn'),
	spanNum = document.getElementById('spanNum');

// 方案一
var count = 0
oBtn.onclick = function (){
	count++;
	spanNum.innerHTML = count;
} // 弊端: 在项目中为了防止全局变量之间的冲突,我们一般是禁止或者减少使用全局变量的
```

方案二: 自己形成一个不销毁的私有作用域来保护需要累加的数字

```javascript
// 方案二(1)
var oBtn = document.getElementById('btn'),
	spanNum = document.getElementById('spanNum');
~function(){
    var count = 0
    oBtn.onclick = function (){
    	count++;
    	spanNum.innerHTML = count;
    } 
}()  // 弊端: 有一个不销毁的私有作用域,所以占内存
```
```javascript
// 方案二(2)
var oBtn = document.getElementById('btn'),
	spanNum = document.getElementById('spanNum');
oBtn.onclick = (function(){
    var count = 0
    return function(){
        count++;
        spanNum.innerHTML = count;
    }
})() // 弊端: 有一个不销毁的私有作用域,所以占内存
```

方案三: 利用innerHTML的方式处理: 每一次点击的时候先到页面中获取最新的值,然后累加,最后把累加的结果重新放回去

```javascript
// 方案三
var oBtn = document.getElementById('btn'),
	spanNum = document.getElementById('spanNum');

oBtn.onclick = function(){
    spanNum.innerHTML++;
} // 弊端: 每一次都需要把页面中的内容先转换为字符串然后累加,
  // 累加完再重新添加回去,当重新添加的时候浏览器都要重新渲染一次
```

方案四: 利用自定义属性存储(推荐)

```javascript
oBtn.count = 0;
oBtn.onclick = function(){
    sapnNum.innerHTML = ++this.count
}
```
