### Date日期操作基础讲解

> Date是日期类，通过它可以对时间进行处理  

```javascript
var time = new Date();  
// -> 获取当前客户端本机时间(当前获取的时间不能作为重要的参考依据)
// -> 获取的结果是一个日期格式的对象: 
// -> Thu May 10 2018 14:14:29 GMT+0800 (中国标准时间)

typeOf new Date() // -> "object"

time.getFullYear() // -> 获取四位整数年
time.getMonth() // -> 获取的月 0~11,代表1~12月
time.getDate() // -> 获取日 1~31
time.getDay() // -> 获取星期(0~6代表周日到周六)
time.getHours() // -> 获取小时
time.getMinutes() // -> 获取分钟
time.getSeconds() // -> 获取秒
time.getMilliseconds() // -> 获取毫秒
time.getTime() // -> 获取当前日期距离 '1970-01-01 00:00:00' 的毫秒差
```

```javascript
var time = new Date('2018-05-09'); 
// -> 当new Date中传递一个时间的字符串,相当于把这个字符串转换为标准时间对象格式(转换完成后,就可以调取上面那些方法了)

// -> 时间格式的字符串
// -> '2018-05-09' (ie下识别不了)
// -> '2018/05/09'
// -> '2018/05/09 21:12:13'
// -> 1525933730685 (如果传递的是距离1970年的毫秒差,也可以识别转换,但是只能是数字不能是字符串)
// -> ...
```

```html
<style>
    .box{width:420px;height:60px;margin:100px auto;border:2px solid #aaa;text-align:center;line-height:60px;font-size: 24px;}
    .box span{color:orange;}
    
</style>
<div class='box'>距离汶川地震十周年:<span id='timeBox'>00:00:00</span>
</div>
<script>
	var timeBox = document.getElementById('timeBox');
	function compute(){
		var nowTime = new Date(),
			targetTime = new Date('2018/05/12 14:28:00');
		var spanTime = targetTime - nowTime ;// -> 获取的结果是两个时间之间的毫秒差
		// -> 已经到达默哀时间,提示: 默哀三分钟
		if(spanTime <= 0){
			timeBox.innerHTML = '开始默哀';
			window.clearInterval(timer)
			return;
		}

		// -> 还没有到达默哀时间;在总毫秒差中计算出还有多少小时,分钟,秒
		var hour = Math.floor(spanTime / (1000*60*60));
		spanTime -= hour*60*60*1000; // -> 把小时占据的毫秒数抛出掉
		var minute = Math.floor(spanTime / (1000*60));
		spanTime -= minute*60*1000; // -> 把分钟占据的毫秒数抛出掉
		var second = Math.floor(spanTime / 1000);
		// console.log(hour);
		// -> 如果时钟,分钟,秒钟小于10,补零
		hour<10?hour = "0"+hour:null;
		minute<10?minute="0"+minute:null;
		second<10?second="0"+second:null;
		// -> 替换span中的内容显示为倒计时
		timeBox.innerHTML = hour + ":" + minute + ":" + second;
	}
	compute();

	// -> 每隔一秒钟重新执行compute()
	var timer = window.setInterval(compute, 1000)
</script>
```
