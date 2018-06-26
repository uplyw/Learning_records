#### js盒子模型

CSS盒子模型  ,margin - border - padding - content 

JS盒子模型指的是通过js中提供的一系列属性和方法,获取页面中元素的样式信息值

```html
<div id="box">这是一个盒子</div>
<script>
    var box = document.getElementById("box");
    console.dir(box)
</script>
```
> 内容的高度和宽度: 我们设置的width/height这两个样式就是内容的宽和高; 如果没有设置height值,容器的高度会根据里面内容自己进行适应,这样获取的值就是真是内容的高;如果设置固定的高度了,不管内容是多了还是少了,其实我们内容的高度指的都是设定的那个值;  
> 真是内容的高度和宽度: 这个代指的是实际内容的宽高(和设置的height没有必然的关系),例如:设置高度为200px,如果内容有益处,那么真实内容的高度是把移除内容的高度也加进来

1. client系列(当前元素的几个私有属性)

> clientWidth/clientHeight: 内容的高度/宽度+左右/上下填充(和内容溢出来没有关系)  
> clientTop/clientBottom/clientLeft/clientRight: 上/下/左/右边框的的宽度

2. offset系列

> offsetWidth/offsetHeight: clientWidth/clientHeight+左右/上下边框(和内容溢出来没有关系)  
> offsetParent: 当前元素的父级参照物  
> offsetTop/offsetBottom/offsetLeft/offsetRight 当前元素的外边框距离父级参照物的内边框的偏移量  

3. scroll系列

> scrollWidth/scrollHeight: 和我们的clientWidth/clientHeight一模一样(前提是容器中的内容没有溢出的情况下)  
> 如果容器内容有溢出,我们获取的结果是如下规则:  
> scrollWidth: 真实内容的宽度(包含溢出)+左填充  
> scrollHeight: 真实内容的高度(包含溢出)+上填充  
> 获取的结果都是约等于值:  
> 因为在同一个浏览器中是否设置了`overflow="hidden"`对于最终的结果是有影响的; 在不同的浏览器中我们获取到的结果也是不同的  
> scrollLeft/scrollTop: 滚动条卷去的宽度/高度

##### 关于js盒子模型属性取值的问题

> 通过这13个属性值获取的结果永远不可能出现小数,都是整数;浏览器获取结果的时候,在原来真实的结果上自动四舍五入  

##### 关于浏览器本身的盒子模型信息

> clientWidth/clientHeight 是当前浏览器可是窗口的(一屏幕的)宽度/高度  
> scrollWidth/scrollHeight 是当前页面的额真实宽度和高度(所有屏加起来的宽度和高度)但是是一个约等于的值  
> 不管哪些属性,也不管是什么浏览器,也不管是获取还是设置,想要都兼容的话,需要写两套  

```javascript
// 获取
document.documentElement[attr]||document.body[attr]
// 设置
document.documentElement.scrollTop = 0;
document.document.scrollTop = 0;

// 封装一个关于浏览器盒子模型的方法  
// 如果只传递了attr没有传递value,默认的意思是获取样式值  
// 如果两个参数都传递了,意思是设置某一样式属性的值  
// 不严谨的来说这就是有关于"类的重载":同一个方法,通过传递参数的不同实现了不同的功能
function win(attr, value){
    if(typeof value === "undefined"){
        // 没有传递value值 -> "获取"
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
}
win("scrollTop")  // -> 获取
win("scrollTop",10)  // -> 设置
```
