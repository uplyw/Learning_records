### DOM基础

> DOM: document object model 文档对象模型,  
> 提供一些属性和方法可以让我们去操作DOM元素

#### 获取DOM元素的方法

- `document,getElementById()`  获取一个元素
- `[context].getElementsByTagName()`  获取元素集合
- `[content].getElementsByClassName()` 获取元素集合
- `document.getElementsByName()` 获取节点集合
- `document.documentElement` 获取整个HTML对象
- `document.body` 获取真个body对象
- `document.head` 获取整个head对象
- `[context].querySelector` 获取一个元素对象
- `[content].querySelectorAll` 获取元素集合
- ...

——
- **getElementById**

> 此方法的上下文只能是document  
> 一个html页面中元素的id理论上是不能重复的  

> 1. 如果页面中的id重复了,我们只获得页面中的一个元素且是第一个元素  
> 2. 在ie7及更低版本浏览器中,会把表单元素的name值当做id来识别使用(项目中尽量 *不要让表单的name和其他元素的id相同* )

```html
<input type="text" name="box1">
<div id="box1"></div>
<div id="box2"></div>
<div id="box1"></div>
<script>
	console.log(document.getElementById('box1'))
	// -> <div id="box1"></div>
	// -> ie7及以下浏览器会获得的元素为input
</script>
```
> 3. 如果我们把js放在结构下面,我们可以直接使用id值来获取这个元素(不需要通过getElementById获取),而且这种方式会把页面中所有id是它的元素都获取到(元素对象/元素集合) -> `不推荐`

```html
<div id="box1"></div>
<div id="box2"></div>
<div id="box1"></div>
<script>
	console.log(box1)
	// -> [div#box1, div#box1, box1: div#box1]
</script>
```
```html
<div id="box1"></div>
<div id="box2"></div>
<div id="box1"></div>
<script>
// -> 获取当前页面中所有id叫做box1的元素
var allList = document.getElementsByTagName('*'),
	result = [];
for (var i = 0; i < allList.length; i++) {
	var item = allList[i];
	if(item.id === 'box1'){
		result.push(item);
	}
}
console.log(result) // -> [div#box1, div#box1]
</script>
```

- **getElementByTagName**

> 上下文是可以自己来指定  
> 获取到的结果是一个元素集合(类数组集合)  
>  
> 1. 获取的结果是集合,哪怕集合中只有一项,我们想要操作这一项(元素对象), 需要先从集合中获取出来, 然后再操作  
> 2. 在指定的上下文中,获取所有子子孙孙元素中标签名叫做这个的`后代筛选`

```html
<body>
    <div></div>
    <div></div>
    <div></div>
</body>
<script>
    var bodyBox = document.getElementsByTagName('body');
    
    // bodyBox.getElementsByTagName('div') 
    // -> Uncaught TypeError: bodyBox.getElementsByTagName is not a function
    // -> 此时的bodyBox是一个类数组集合, 我们需要使用的是其中的第一项, 而不是整个集合
    
    console.log(bodyBox[0].getElementsByTagName('div'))
    // -> [div, div, div]
</script>
```

- **getElementsByClassName**

> 上下文也可以随意指定  
> 获取的结果也是一个元素集合(类数组集合)  
>  
> 1. 真实项目中我们经常会通过样式类名来获取元素,getElementsByClassName这个方法在ie6~8浏览器中是不兼容的

- **getElementsName**

> 通过元素的name属性值获取一组元素(类数组: 节点集合NodeList)  
> 它的上下文也只能是document  
>  
> 1. ie浏览器中只能识别表单元素的name属性值,所以我们这个方法一般都是用来操作表单元素的

- **document.documentElement / document.body**

> 获取html或者body (一个元素对象)

```javascript
document.documentElement.clienWidth || document.body.clienWidth
// -> 获取当前浏览器可视区域的宽度(当前页面一屏幕的宽度)
// -> clienHeight: 获取高度
```

- **querySelector / querySelectorAll**

> 在ie6~8下不兼容,而且也没有什么特别好办法处理它的兼容,所以这两个方法一般多用于移动端开发使用  
>  
> querySelector: 获取一个元素对象  
> querySelectorAll: 获取的是一个元素集合  
>  
> 支持大部分css选择器

```html
<div id="box1" class="box mark"></div>
<div id="box2" class="mark"></div>
<div id="box1" class="box"></div>
<script>
	console.log(document.querySelector("#box1"))
    // -> <div id="box1"></div>
    
    console.log(document.querySelectorAll("#box1"))
    // -> [div#box1.box.mark, div#box1.box]
    
    console.log(document.querySelectorAll(".box"))
    
    console.log(document.querySelectorAll("div"))
    
    console.log(document.querySelectorAll("body>div"))
</script>
```
