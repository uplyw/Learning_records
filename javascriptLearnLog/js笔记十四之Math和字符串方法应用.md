### 案例分析

- **字符串**

> 获取地址栏中URL地址问号传递的参数值  
> https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1  
>  
> 目标: 把问号传递的参数值分别的解析出来  
> obj={wd:'javascript',rsv_spt:1,issp:1}

```javascript
var str = "https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1";
// -> 目标: {wd:'javascript',rsv_spt:1,issp:1}

// -> 方案一: 
var questionIndex = str.indexOf('?');
str = str.substring(questionIndex + 1) // -> "wd=javascript&rsv_spt=1&issp=1"
var ary = str.split('&') // -> ["wd=javascript", "rsv_spt=1", "issp=1"]
var obj = {};
for(var i=0;i<ary.length;i++){
    var cur = ary[i],
    // console.log(cur)
        curAry = cur.split("="),
        key = curAry[0],
        value = curAry[1];
        obj[key] = value;
}
console.log(obj)  // -> {wd: "javascript", rsv_spt: "1", issp: "1"}
```

```javascript
var str = "https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1";
// -> 目标: {wd:'javascript',rsv_spt:1,issp:1}

// -> 方案二: 
function  queryURLParameter(url){
    // -> 传递的参数(我们当前要解析的url地址) 
    var questionIndex = url.indexOf('?'),
        obj = {};
    if(questionIndex === -1){
        // -> url中没有问号传参: 直接返回空对象
        return obj;
    }
    url = url.substring(questionIndex+1),
        ary = url.split("&");
    for(var i=0;i<ary.length;i++){
        var curAry = ary[i].split('=');
        obj[curAry[0]] = curAry[1];
    }
    return obj;
}
console.log(queryURLParameter("https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1"))
// -> {wd: "javascript", rsv_spt: "1", issp: "1"}

console.log(queryURLParameter("https://www.baidu.com/s?wd=node&rsv_spt=1&issp=1"))
// -> {wd: "node", rsv_spt: "1", issp: "1"}

console.log(queryURLParameter("https://www.baidu.com/s?wd=前端"))
// -> {wd: "前端"}
```

```javascript
var str = "https://www.baidu.com/s?wd=javascript&rsv_spt=1&issp=1";
// -> 目标: {wd:'javascript',rsv_spt:1,issp:1}

// -> 方案三: 
String.prototype.myQueryURLParameter = function myQueryURLParameter(){
    var obj = {},
        reg = /([^?&=]+)=([^?&=]+)/g;
    this.replace(reg,function(){
        var arg = arguments;
        obj[arg[1]] = arg[2];
    });
    return obj;
} 
console.log(str.myQueryURLParameter())
```
- **Math及字符串**

*随机验证码*

> 真实项目中的验证码:  
> - 真实项目中验证码一般都是后台处理的,后台返回给客户端展示的是一个图片(图片中包含了验证码)  
> 
> 验证码形式: 
> 1. 数字字母  
> 2. 问答  
> 3. 图片选择  
> 4. 文字顺序  
> 5. 拖拽

*HTML/CSS*
```html
<style type="text/css">
	#codeBox{width: 300px;height: 50px;line-height: 50px;font-size: 28px;text-align: center;border: 2px solid #ddd;margin: 200px auto;user-select: none;}
</style>
<div id="codeBox">qwer</div>
```
*JavaScript*
```javascript
// 简单实现
var codeBox = document.getElementById("codeBox");
var areaStr = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
var result = "";
for(var i=0;i<4;i++){
    // 随机获取一个0-61之间的随机整数: 作为接下来获取字符的索引
    var ran = Math.round(Math.random()*61);
    // -> 根据索引获取一个随机字符
    var str1 = areaStr.charAt(ran)
    // -> 把每一次循环获取的字符存放在最后结果中
    result += str1
}
codeBox.innerHTML = result
```

```javascript
// 点击切换
var codeBox = document.getElementById('codeBox');
function getCode(){
	var result = '',
		areaStr = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	for (var i = 0; i < 4; i++) {
		var ran = Math.round(Math.random()*61);
		result += areaStr.charAt(ran);
	}
	codeBox.innerHTML = result;
}

// -> 加载页面是需要执行一次这个方法: 生成四位验证码
getCode();
// -> 点击盒子重新生成验证码(此处不加小括号,这块只是再把函数绑定给点击事件)
codeBox.onclick = getCode;

```
```javascript
// 四位不重复的验证码
var codeBox = document.getElementById("codeBox");
function getCode(){
	var result = "",
		str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
	for (var i = 0; i < 4; i++) {
		var	ran = Math.round(Math.random()*61),
			cur = str.charAt(ran);
			// -> 验证一下新获取的char字符是否已经在 result 中存在了
			// -> 如果存在了我们不存储,重新再获取一遍,反之才累加到 result 中
			if (result.indexOf(cur)>-1) {
				i--;
				continue;
			}
		result += cur;
	}
	codeBox.innerHTML = result;
}
getCode()
codeBox.onclick = getCode;
```
```javascript
// 四位大小写不重复的验证码
var codeBox = document.getElementById("codeBox");
function getCode(){
	var result = "",
		str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
	for (var i = 0; i < 4; i++) {
		var	ran = Math.round(Math.random()*61),
			cur = str.charAt(ran);
			// -> 验证一下新获取的char字符是否已经在 result 中存在了
			// -> 如果存在了我们不存储,重新再获取一遍,反之才累加到 result 中
			if (result.toUpperCase().indexOf(cur.toUpperCase())>-1) {
				i--;
				continue;
			}
		result += cur;
	}
	codeBox.innerHTML = result;
}
getCode()
codeBox.onclick = getCode;
```
