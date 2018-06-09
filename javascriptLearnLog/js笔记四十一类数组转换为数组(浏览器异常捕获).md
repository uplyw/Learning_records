#### 类数组转换为数组

```html
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<script type="text/javascript">
	var oLis = document.getElementsByTagName("div");
	console.dir(oLis); // -> HTMLCollection 元素集合类的一个实例,它也是一个类数组集合

	var oBox = document.getElementsByName("box");
	console.dir(oBox); // -> HTMLCollection 节点集合类的一个实例,它也是一个类数组集合
</script>
```

```html
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<div name="box"></div>
<script type="text/javascript">
    // 现代浏览器(ie6~8会报错)
	var oLis = document.getElementsByTagName("div");
	var ary = Array.prototype.slice.call(oLis);
	console.log(ary) // -> [div, div, div, div, div]
	
	// ie6~8
	for(var i=0;i<oLis.length; i++){
	    ary[ary.length] = oLis[i]
	}
	
	// -> 在 ie6~8浏览器中, 不支持借用数组的slice实现将元素集合的类数组转换为数组
	// -> 但是对于arguments借用数组的方法是不存在任何兼容性问题的 
</script>
```

#### 浏览器异常信息捕获

> js中使用try catch进行浏览器的异常信息捕获

```javascript
console.log(num) // -> Uncaught ReferenceError: num is not defined
// 在浏览器中本行信息报错,后面的代码都不再执行了
console.log("ok")
```
```javascript
try{
    // <js code>
}catch(e){
    // 如果代码报错执行catch中的代码
}finally{
    //一般不用: 不管try中的代码是否报错,都要执行finally中的代码
}
```

- 第二行代码报错,如果用try/catch捕获了异常信息,不影响下面的代码继续执行; 如果try中的代码执行出错了,会默认的执行catch中的代码

```javascript
try{
    console.log(num)
}catch(e){ // -> 形参必须要写,我们一般起名为e
    console.log(e.message) // -> num is not defined  
    // 收集代码报错信息
}
console.log("ok") // ok
```
> 有时候既想捕获到错误的信息, 又想不让下面的代码继续执行 

```javascript
try{
    console.log(num)
}catch(e){
    // console.log(e.message); -> 可以得到错误的信息,把其进行统计
    
    // 手动抛出一条错误信息, 终止代码执行
    throw new Error("当前网络繁忙,请稍后再试...")
}
console.log("ok")
```
- new Error -> 错误实例
- new TypeError -> 引用错误
- new ReferenceError -> 类型错误
- new RangeError -> 范围错误


```javascript
var utils = {
    listToArray: function(likeAry){
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
}
```
