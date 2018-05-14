### DOM的节点

> node: 节点,浏览器认为在一个html页面中的所有内容都是节点(包括标签,注释,文字文本等)  
>  
> - 元素节点: html标签
> - 文本节点: 文字内容(高版本浏览器会把空格和换行当做文本节点)  
> - 注释节点: 注释内容  
> - document: 文档节点
> - ...

- **元素节点**

> nodeType: 1  
> nodeName: 大写标签名(在部分浏览器的怪异模式下,我们写的标签名是小写, 它获取的就是小写...)  
> nodeValue: null  
> 
> [curEle].tagName: 获取当前元素的标签名(获取的标签名一般都是大写)  

- **文本节点**

> nodeType: 3    
> nodeName: #text    
> nodeValue: 文本内容  

- **注释节点**

> nodeType: 8  
> nodeName: #comment  
> nodeValue: 注释内容  

- **文档节点**

> nodeType: 9  
> nodeName: #document  
> nodeValue: null  

节点就是用来描述页面中每一个部分之间关系的,只要我可以获取页面中的一个节点,那么我就可以通过相关的属性和方法获取页面中的所有节点;

```html
<div id="box">
	<ul>
		<li>页卡1</li>
		<li>页卡2</li>
		<li>页卡3</li>
	</ul>
	<div>内容1</div>
	<div>内容2</div>
	<div>内容3</div>
</div>
```

- childNodes

> 获取当前元素所有的子节点(节点集合: 类数组)  
> 注: 不仅仅是元素子节点, `文本`, `注释`等都会包含在内;  
> 子节点说明只是在儿子辈分中查找到(孙子及后代不在内)  

```javascript
var box=document.getElementById('box')
console.log(box.childNodes)
// NodeList(9) [text, ul, text, div, text, div, text, div, text]
```

- children

> 获取所有的元素子节点(元素集合)   
> 不包含`文本`/`注释`  
> 在ie6~8下获取的结果和标准浏览器中有区别(ie6~8中会把注释节点当做元素节点获取到)  

```javascript
console.log(box.children)
// HTMLCollection(4) [ul, div, div, div]
```

- parentNode

> 获取当前元素的父节点(元素对象)  

```javascript
console.log(box.parentNode)
// <body>...</body>
```

- previousSibling & nextSibling

> `previousSibling`: 获取当前节点的上一个哥哥节点(不一定是元素节点也可能是文本或者注释)  
> `nextSibling`: 获取当前节点的上一个弟弟节点(不一定是元素节点也可能是文本或者注释)  

- previousElementSibling & nextElementSibling

> `previousElementSibling`: 获取当前节点的上一个哥哥元素节点  
> `nextElementSibling`: 获取当前节点的下一个弟弟元素节点   
> ie6~8下不兼容

- fristChild & lastChild

> `fristChild`: 当前元素所有子节点中的第一个(也不一定是元素节点,可能是文本和注释)  
> `lastChild`: 当前元素所有子节点中的最后一个(也不一定是元素节点,可能是文本和注释)  

- fristElementChild & lastElementChild

>  `fristElementChild`: 当前元素中的第一个元素子节点  
> `lastElementChild`: 当前元素中的最后一个元素子节点  
> ie6~8下不兼容
