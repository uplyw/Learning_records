
### 练习

**隔行变色(css3实现)**

*HTML*

```html
<ul class="numList" id="numList">
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
	<li>6</li>
	<li>7</li>
	<li>8</li>
	<li>9</li>
	<li>10</li>
</ul>
```
*CSS*
```css
*{
	padding: 0;
	margin: 0;
}
.numList{
	width: 500px;
	margin: 100px auto;
	border: 1px solid #ddd;
}
.numList li{
	height: 36px;
	line-height: 36px;
	text-align: center;
	font-size: 20px;
	list-style: none;
}
/*单数行*/
.numList li:nth-child(odd){
	background: #00a1d6;
}
/*双数行*/
.numList li:nth-child(even){
	background: #ffafc9
}
```
**隔行变色(js实现)**  

*HTML同上*  

*JS*

```javascript
// 三行变色
var numList = document.getElementsByTagName('li');
for(var i =0;i < numList.length;i++){
	if(i%3 === 0){
		numList[i].style.background = '#ff0000';
	}else if (i%3 === 1) {
		numList[i].style.background = '#00ff00';
	}else{
		numList[i].style.background = '#0000ff';
	}
}
```

---

**选项卡**

*HTML*

```html
<div id="tabBox">
	<ul>
		<li class="active">新闻</li>
		<li>电影</li>
		<li>综艺</li>
	</ul>
	<div class="active">朝韩领导人会见</div>
	<div>复仇者联盟3</div>
	<div>奔跑吧兄弟</div>
</div>
```
*CSS*
```css
*{padding: 0;margin: 0;font-family: sans-serif;}
#tabBox{width: 800px;margin: 50px auto;position: relative;}
ul{position: absolute;z-index: 999}
ul:after{display: block;content: "";visibility: hidden;height: 0;clear: both;}
li{width: 100px;height: 36px;line-height: 36px;background: #eee;text-align: center;float: left;list-style: none;margin-right: 12px;border: 1px solid #999; border-bottom: none;cursor: pointer;}
li.active{background: #fff;height: 37px}
#tabBox div{width: 798px;height: 400px;border: 1px solid #999;display: none;position: absolute;top: 37px;}
#tabBox div.active{display: block;line-height: 400px;text-align: center;font-size: 24px;}
```
*JS(方法一)*
```javascript
var tabbox = document.getElementById('tabBox');
var oLi = tabbox.getElementsByTagName('li');
var oDiv = tabbox.getElementsByTagName('div');
function change(index) {
	for (var i = 0; i < oLi.length; i++) {
		oLi[i].className = "";
		oDiv[i].className = "";
	}
	oLi[index].className = 'active';
	oDiv[index].className = 'active';
}
for (var i = 0; i < oLi.length; i++) {
	oLi[i].myIndex = i;
	oLi[i].onclick = function(){
		change(this.myIndex)
	}
}
```
---
*JS(方法二)*

```javascript
for (var i = 0; i < oLi.length; i++) {
	~function(i){
		oLi[i].onclick = function(){
			change(i)
		}
	}(i)
}
```
---
*JS(方法三)*

```javascript
for (let i = 0; i < oLi.length; i++) {
	oLi[i].onclick = function(){
		change(i)
	}
}
```
---
*JS(方法四)*

```javascript
for (var i = 0; i < oLi.length; i++) {
	oLi[i].myIndex = i;
	oLi[i].onclick = function(index){
		for (var j = 0; j < oLi.length; j++) {
			oLi[j].className = oDiv[j].className = "";
		}
		this.className = oDiv[this.myIndex].className = "active"
	}
}
```
---
*JS(方法五)*

```javascript
var tabbox = document.getElementById('tabBox');
var oLi = tabbox.getElementsByTagName('li');
var oDiv = tabbox.getElementsByTagName('div');

// 记录上一个选中li的索引
var previousIndex = 0;

for (var i = 0; i < oLi.length; i++) {
    // 分别给每一个li设置一个自定义属性记录当前li索引
	oLi[i].currentIndex = i;
	
	oLi[i].onclick = function(){
	    // 如果点击的li和当前li相同则不执行
		if(this.currentIndex === previousIndex){
			return;
		}
		// 清空上一个li的样式
		oLi[previousIndex].className = oDiv[previousIndex].className = null;
		// 给点击的里设置样式
		this.className = oDiv[this.currentIndex].className = "active";
		// 把上一个li的索引更新到当前li
		previousIndex = this.currentIndex;
	}
}
```
