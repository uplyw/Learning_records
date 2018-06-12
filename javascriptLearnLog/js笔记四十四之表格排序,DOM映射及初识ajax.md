#### 表格排序

```html
<style type="text/css">
	li{
		list-style: none;
	}
	#ul1{
		width: 150px;
		margin: 20px auto;
	}
	#ul1 li{
		border-bottom: 1px solid #aaa;
	}
</style>
<ul id="ul1">
	<li>67</li>
	<li>64</li>
	<li>61</li>
	<li>69</li>
	<li>65</li>
</ul>
<script type="text/javascript" src="utils.js"></script>
<script type="text/javascript">
	var oUl = document.getElementById("ul1");
	var oLis = oUl.getElementsByTagName("li");
	// 1. 先把元素集合类数组转换为数组
	var ary = utils.listToArray(oLis);
	// 2. 给数组进行排序: 按照每一个li中的内容大小进行排序 
	ary.sort(function(a,b){
		return parseFloat(a.innerHTML) - parseFloat(b.innerHTML);
	})
	// 3. 按照ary中存储的最新顺序依次的把对应的li添加到页面中
	var frg = document.createDocumentFragment();
	for (var i = 0; i < ary.length; i++) {
		frg.appendChild(ary[i])
	}
	oUl.appendChild(frg);
	frg = null;
</script>
```

#### DOM映射机制

- 页面中的标签和js中获取到的元素对象(元素集合)是紧紧地绑定在一起的,页面中的HTML结构改变,js中不需要重新获取,集合里面的内容也会跟着自动改变


#### 初识AJAX

```html
<table id="tab">
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
<script>
    // 想要操作谁,先要获取谁(table的获取方式)
    var oTab = document.getElementById("tab");
    
    // 获取表格中的头(表格头唯一)
    var tHead = oTab.tHead;
    
    // tHead.rows[0] -> 获取表格中头一行
    // tHead.rows[0].cells -> 获取表格头一行中的一列
    var oThs = tHead.rows[0].cells;
    
    // 获取表格中内容(表格体,表格体不唯一)[bodies: body的复数形式]
    var tBody = oTab.tBodies[0]
    
    // 获取表格中的每一行
    var oRows = tBody.rows
</script>
```

```javascript
// 1. 首先创建一个Ajax对象
var xhr = new XMLHttpRequest();

// 2. 打开需要请求数据的那个文件地址
xhr.open("get", "data.txt", true) // true 异步请求

// 3. 监听请求状态
xhr.onreadystatechange = function (){
	if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
		var val = xhr.responseText;
		console.log(val)
	}
}

// 4. 发送请求
xhr.send(null);
```
