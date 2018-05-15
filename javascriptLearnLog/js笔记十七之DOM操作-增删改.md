### DOM的赠删改

#### 增

> 真是项目中, 我们会在js中动态创建一些html标签, 然后把其增加到页面中  

- document.createElement

> 在js中动态创建一个html标签  

- appendChild

> 容器.appendChild(新元素)  
> 把当前创建的新元素添加到容器的末尾位置  

- insertBefore

> 容器.insertBefore(新元素,老元素)   
> 把当前容器中, 把新元素增加到老元素之前  

```html
<body>
    <div id="box2" class="box">2</div>
    <style>
        .box{width:100px;height:100px;border:2px solid #999;}
    </style>
    <script>
        // -> 创建元素
        var oDiv = document.createElement('div'),
        	oBody = document.getElementsByTagName('body');
        oDiv.id = "box";
        oDiv.className = "box";
        Odiv.innerHTML = "1"
        
        // -> 添加到页面
        // oBody[0].appendChild(oDiv);
        document.body.insertBefore(oDIv,box2);
    </script>
</body>
```
```javascript
// -> 真实项目中很多需求都是通过动态常见元素来完成的,其中有一个需求; 解析一个URL地址每一部分的信息(包含问号传递的参数值)
// -> 1. 纯字符串拆分截取;
// -> 2. 编写强大的正则,捕获到需要的结果;
// -> 3. 通过动态创建一个a标签, 利用a标签的一些内置属性来分别获取每一部分的内容;
// -> ...

var link = document.createElement('a');
link.href = 'http://www.example.com/school/?name=lilei&age=18&sex=0#student';  // -> 此处地址就是我们需要解析的url
console.dir(link);
// -> hash: 存储了哈希值 '#student'
// -> hostname: 域名 'www.example.com'
// -> pathname: 路径 '/school/'
// -> protocol: 协议 'http:'
// -> search: 问号传递参数值没有传递是空字符串 '?name=lilei&age=18&sex=0'
```
```javascript
function queryURLParameter(url){
    var link = document.createElement('a');
    link.href = url;
    var search = link.search,
        obj = {};
    if(search.length === 0) return;
    search = search.substr(1).split(/&|=/g);
    for(var i=0;i<search.length;i+=2){
        var key = search[i],
            value = search[i+1];
        obj[key] = value;
    }
    link = null;
    return obj;
    
}
console.log(queryURLParameter('http://www.example.com/school/?name=lilei&age=18&sex=0#student'))
// -> {name: "lilei", age: "18", sex: "0"}
```

#### 删 改

- removeChild

> 容器.removeChild(元素)  
> 在当前容器中把某一个元素移除掉  

- replaceChild

> 容器.replaceChild(新元素,老元素)  
> 在当前容器中, 拿新元素替换老元素  

- cloneNode

> 元素.cloneNode(false/true)  
> 把原有的元素克隆一份一模一样的  
> false: 只克隆当前元素本身  
> true: 深度克隆, 把当前元素本身以及元素的所有后代都进行克隆  

```html
<style>
	.box{
		width: 100px;
		height: 100px;
		background: #f50;
		margin-top: 10px;
	}
</style>
<div class="box" id="box1">1</div>
<div class="box" id="box2"><span>1</span>2</div>
<script>
	var box1 = document.getElementById('box1'),
		box2 = document.getElementById('box2');
	document.body.removeChild(box1);	// -> 删除元素,移除盒子
	document.body.appendChild(box2.cloneNode())	// -> 克隆盒子并添加到body末尾,但不克隆子元素及内容
	document.body.appendChild(box2.cloneNode(true)) // -> 克隆元素并添加到body末尾,克隆子元素及内容(即使是深度克隆也只是克隆内容和结构,并不会克隆盒子上发生的事件)
</script>
```

- [set/get/remove]Attribute

> 给当前元素设置/获取/移除 属性的(一般操作的都是他的自定义属性)  
> box.setAttribute('myIndex',0)  
> box.getAttribute('myIndex')  
> box.removeAttribute('myIndex')  
>  
> 使用 `xxx.index=0` 和 `xxx.setAttribute('index',0)` 这两种设置自定义属性的区别?  
> xxx.index: 是把当前操作的元素当做一个普通对象,为其设置一个属性名(和页面中的html标签没什么关系)  
> xxx.setAttribute: 把元素当做特殊的元素对象来处理,设置的自定义属性是和页面结构中的DOM元素映射在一起的

```html
<div id="box"></div>
<script>
    var box = document.getElementById('box');
    box.index = 0; // 与html无关的普通对象
    console.log(box.index) // -> 0
    box.setAttribute('index',100) // 与html存在映射关系的元素对象
    console.log(box.index) //-> 100
</script>
```

> - js中获取的元素对象,我们可以把它理解为两种角色  
> 1. 与页面html结构无关的普通对象  
> 2. 与页面html结构存在映射关系的元素对象  
>  
> - 元素对象中的内置属性,大部分都和页面的标签存在映射关系:  
>  xxx.style.backgroundColor = 'xxx';此时不仅把js对象对应的属性值改变了,而且也会映射到页面的html标签上(标签中有一个style行内样式, 元素的样式改变了)  
>  xxx.className = 'xxx': 此时不仅是把js对象中的属性值改变了,而且页面中的标签增加了class样式类(可以看见的)  
>  
> - 元素对象中的自定义属性:   
> xxx.index=0: 仅仅是把js对象中增加了一个属性名(自定义的),和页面中的html没啥关系(在结构上看不见)  
> xxx.setAttribute: 通过这种方式设置的自定义属性和之前提到的内置属性差不多,都是和html结构存在映射关系的(设置的自定义属性可以呈现在结构上)  

```javascript
// -> 获取当前元素的上一个哥哥元素节点(兼容所有浏览器)
// -> curEle: current element

// 思路:
// 首先获取当前元素的上一个哥哥节点,判断当前获取的节点是否为元素节点(nodeType === 1),如果不是,基于当前获取的节点,找他的上一个哥哥节点...一直到找到的节点为元素节点为止
// 如果在查找过程中,发现没有上一个哥哥节点了,则不在继续查找

// while(条件){循环体}

function prev(curEle){
	// 获取当前元素的上一个节点
	var p = curEle.previousSibling;
	// 如果存在上一个节点并且该节点不是元素节点
	while(p && p.nodeType !== 1){
		// 就再往上一个节点继续查找
		p = p.previousSibling;
	}
	// 直到找到返回
	return p;
}

// 扩展:
// next: 获取下一个弟弟元素节点
// prevAll: 获取所有的哥哥元素节点
// nextAll: 获取所有的弟弟元素节点
// siblings: 获取所有的兄弟元素节点
// index: 获取当前元素在兄弟元素节点中的索引
// ...
```
