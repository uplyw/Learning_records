#### json介绍

- 后台 -> 提供一个数据请求的接口,前端通过接口地址可以请求到后台的数据  
- 前端 -> 前端得到数据后,需要进行数据解析, 把数据绑定在html页面上 -> "数据绑定"

```
sequenceDiagram
前端->>后台: 发送请求获取数据
后台->>前端: 把准备好的数据返回给前端
后台-->>前端: (后台给前端返回的数据一般都是json格式的)
```

- json不是一个单独的数据类型,它只是一种特殊的数据格式 -> 它是对象数据类型的

```javascript
var obj = {name:"lilei", age: 18}; // 普通格式对象
var jsonObl = {"name":"lilei","age":17}; // json格式对象  
// 相对于普通的格式来说,只是把属性名用双引号包起来了(只能是双引号)
```
- 在window浏览器对象中,提供了一个叫json的属性, 它这里面提供了两个方法:  
    1. JSON.parse -> 把JSON格式的字符串转换为JSON格式的对象  
    2. JSON.stringify -> 把JSON格式的对象转换为JSON格式的字符串  

```javascript
var jsonObj = {"name":"lilei","age":17};
var jsonStr = JSON.stringify(jsonObj);
console.log(jsonStr) // '{"name":"lilei","age":17}'
console.log(JSON.parse(jsonStr))// {name: "lilei", age: 17}
```

> 在ie6~7浏览器中,我们的window下没有JSON对象,刚才的parse和stringify都不存在了

```javascript
// 把JSON格式的对象转换为JSON格式的字符串
var str = '{"name":"lilei","age":17}';
JSON.parse(str);
eval("(" + str + ")"); // 使用eval,不要忘记手动的加一个小括号
```

#### json数据绑定

- json.html

```html
<style type="text/css">
	*{
		padding: 0;
		margin: 0;
	}
	li{
		list-style: none;
	}
	#ul1{
		width: 150px;
		margin: 30px auto;
		padding: 12px;
		border: 1px solid green;
	}
	#ul1 li{
		/*超出文本的自动裁切*/
		text-overflow: ellipsis; /*超出文本的以 ... 显示*/
		white-space: nowrap; /*强制不换行*/
		overflow: hidden; /*溢出隐藏*/
	}
	#ul1 li span{
		display: inline-block;
		width: 28px;
		height: 28px;
		background: red;
		border-radius: 50%;
		line-height: 28px; 
		text-align: center;
		color: #fff;
		margin: 12px 10px 0 0;
	}
</style>
<ul id="ul1">
	<li><span class="bg">01</span>aaaaaaaaaaaaa</li>
	<li><span class="bg">02</span>bbbbbbbbbbbbb</li>
	<li><span class="bg">03</span>ccccccccccccc</li>
</ul>
<script type="text/javascript" src="json.js"></script>
```

- json.js

```javascript
var jsonObj = [
	{
		"title":"qqqqqqqqqqqqqq",
		"desc":"q1q1q1q1q1q1q1q1q1q1q1"
	},
	{
		"title":"wwwwwwwwwwwwww",
		"desc":"w2w2w2w2w2w2w2w2w2w2w2"
	},
	{
		"title":"eeeeeeeeeeeeee",
		"desc":"e1e1e1e1e1e1e1e1e1e1e1"
	},
	{
		"title":"rrrrrrrrrrrrrr",
		"desc":"r1r1r1r1r1r1r1r1r1r1r1"
	},
	{
		"title":"tttttttttttttt",
		"desc":"t1t1t1t1t1t1t1t1t1t1t1"
	},
	{
		"title":"yyyyyyyyyyyyyy",
		"desc":"y1y1y1y1y1y1y1y1y1y1y1"
	},
	{
		"title":"uuuuuuuuuuuuuu",
		"desc":"u1u1u1u1u1u1u1u1u1u1u1"
	},
	{
		"title":"iiiiiiiiiiiiii",
		"desc":"i1i1i1i1i1i1i1i1i1i1i1"
	}
]
```

```javascript
var oUl = document.getElementById("ul1");
var oLis = oUl.getElementsByTagName("li");

// 鼠标移入移出,背景变色
for (var i = 0; i < oLis.length; i++) {
	oLis[i].onmouseover = function (){
		this.style.backgroundColor = 'pink';
	}
	oLis[i].onmouseout = function (){
		this.style.backgroundColor = '';
	}
}
```
1. 利用动态创建元素节点和把它追加到页面中的方式来实现数据绑定  
优势: 把需要动态绑定的内容一个个追加到页面中,对原来的元素没有任何影响  
弊端: 浏览器每创建一个li, 就添加到页面中,引发一次DOM回流,最后引发会留的次数过多, 影响我们的性能  

```javascript
for (var i = 0; i < jsonObj.length; i++) {
	var cur = jsonObj[i];
	var oLi = document.createElement("li");
	var num = i+4
	if(num<10){
		num = "0" + num
	}
	oLi.innerHTML = "<span>" + num + "</span>" + cur.title;
	oUl.appendChild(oLi)
}
```

2. 字符串拼接的方式: 首先循环需要绑定的数据, 然后把需要动态绑定的标签以字符串的方式拼接到一起,拼接完成后, 最后统一添加到页面中 ("字符串拼接绑定数据是工作中最常用的一种绑定数据的方式" -> 模板引擎数据绑定 )  
优势: 事先把内容拼接好, 最后添加到页面中, 只引发一次回流  
弊端: 把新拼接的字符串添加到 #ul1 中,原有的三个li的鼠标滑过效果都消失了(原来标签绑定的时间都消失了)  

```javascript
var str = "";
for (var i = 0; i < jsonObj.length; i++) {
	var cur = jsonObj[i];
	var num = i+4
	if(num<10){
		num = "0" + num
	}
	str += "<li>";
	str += "<span>" + num + "</span>";
	str += cur.title;
	str += "</li>"
}
// console.log(str);
oUl.innerHTML += str; // -> oUl.innerHTML = oUl.innerHTML + str;
// (把之前的三个 li 以字符串的方式获取到)+str ; 
// (拼接完成的整体还是字符串, 最后再把字符串统一的添加到页面中, 浏览器还需要把字符串渲染成对应的标签)
```

3. 文档碎片 

```javascript
var frg = document.createDocumentFragment();
// 创建一个文档碎片, 相当于临时创建一个容器

for (var i = 0; i < jsonObj.length; i++) {
	var cur = jsonObj[i];
	var oLi = document.createElement("li");
	var num = i+4
	if(num<10){
		num = "0" + num
	}
	oLi.innerHTML = "<span>" + num + "</span>" + cur.title;
	frg.appendChild(oLi)
}
oUl.appendChild(frg)
frg = null;
```


#### js中DOM深入知识: 

-> 回流(重排 reflow): 当页面中的结构发生改变(增加/删除元素, 位置发生改变...), 浏览器都需要重新的计算一遍最新的DOM结构, 重新的进行渲染  
-> 重绘:某一个元素的部分样式发生改变了, 浏览器只需要重新的渲染当前元素即可  
