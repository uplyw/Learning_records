#### 冒泡排序

> 原理: 让数组中的当前项和后一项进行比较, 如果当前项大于后一项,我们让两者交换位置(小 -> 大)

```javascript
var ary = [12,13,23,14,16,11]

// 第一轮比较: 
//      12 13 [12,13,23,14,16,11]
//      13 23 [12,13,23,14,16,11]
//      23 14 [12,13,14,23,16,11]
//      23 16 [12,13,14,16,23,11]
//      23 11 [12,13,14,16,11,23]
// 第二轮比较: 
//      12 13 [12,13,14,16,11,23]
//      13 14 [12,13,14,16,11,23]
//      14 16 [12,13,14,16,11,23]
//      16 11 [12,13,14,11,16,23]
// ...

// 每一轮从前到后两两比较,虽然不一定实现最后的排序效果,但是可以把当前最大的放到末尾
// 具体比较轮数: ary.length-1; 数组有多长,我们只需把总长度-1个数分别放在末尾,即可实现最后的排序

// 第一轮比较5次: 一共6个,不需要和自己比较
// 第二轮比较4次: 一共6个,不用和自己比较,也不用和第一轮放在末尾的那个最大值比较
// 第三轮比较3次: 
// ...

// 每一轮比较的次数:
//ary.length-1(不用和自己比较) - 当前已经执行的轮数(执行一轮向末尾放一个最大值,这些值不需要再比较)

// a = 12;
// b = 13;
// a和b交换值

// 借用第三个变量先存储一个值,然后替换
// c = a;
// a = b;
// b = c;

// 不借用三个变量
// a = a+b; // -> 25
// b = a-b; // -> 12 -> b = 12;
// a = a-b; // -> 13 -> a = 13;

// bubble: 冒泡排序
//  @parameter
//      ary: [array]需要实现排序的数组
//  @return
//      [array]排序后的数组(升序)
//  by team on 2018/05/16

// 升序
function bubble(ary){
	// 外层循环控制的是比较的轮数
	for (var i = 0; i < ary.length-1; i++) {
		// 内层循环控制每一轮比较的次数
		for (var j = 0; j < ary.length-1-i; j++) {
			// ary[j]: 当前本次拿出来的这一项
			// ary[j+1]: 当前项的后一项
			if (ary[j] > ary[j+1]) {
				// 当前项这一项比后一项还要大,我们让两项交换位置
				var temp = ary[j];
				ary[j] = ary[j+1];
				ary[j + 1] = temp;
			}
		}
	}
	return ary;
}
console.log(bubble(ary))

// 降序
function bubble(ary){
	for (var i = 0; i < ary.length-1; i++) {
		for (var j = 0; j < ary.length-1-i; j++) {
			if (ary[j] < ary[j+1]) {
				var temp = ary[j];
				ary[j] = ary[j+1];
				ary[j + 1] = temp;
			}
		}
	}
	return ary;
}
console.log(bubble(ary))
```

#### 递归排序

> 自己调用自己

```javascript
// 死递归
function fn(num){
    console.log(num)
    fn()
}
fn(10)


function fn(num){
    console.log(num)
    if(mun === 1){
        return
    }
    fn(num - 1)
}
fn(10)
```
- 面试题: 1-100之间, 把所有能被3整除并且能被5整除的获取到,然后累加求和

```javascript
// 方案一:
var total = null;
for(var i=1;i< 100;i++){
    if(i%3 === 0 && i%5 === 0){
        console.log(i)
        total += i;
    }
}
console.log(total)
```
```javascript
// 方案二
function fn(num){
    if(num>100){
        return 0;
    }
    if(num%15 === 0){
        return num + fn(num + 1);
    }
    return fn(num+1)
}
console.log(fn(1))
```
```javascript
function fn(num){
    if(num<1){
        return 1;
    }
    if(num%2 === 0){
        return num * fn(num -1);
    }
    return fn(num -1)
}
var result = fn(10);
console.log(result)
```

#### 快速排序

> 先找中间这一项  
> 把剩余项的每一个值和中间项进行比较,比他小的放在左边,比他大的放在右边(新数组)  
> ...

```javascript
var ary = [12,15,14,13,16,11];
function quick(ary){
	// 如果传递进来的数组只有一项或者是空的,我们则不再继续取中间项拆分
	if(ary.length <= 1){
		return ary;
	}
	// 获取中间项的索引: 把中间项的值获取到,在原有数组中删除中间项
	var centerIndex = Math.floor(ary.length/2),
		// splice返回的是个数组,数组中包含了删除的那个内容
		centerValue = ary.splice(centerIndex,1)[0];

	// 用剩余数组中的每一项和中间项比较,比中间项大的放在右边,比中奖项小的放在左边(左右两边都是新数组)
	var aryLeft = [],
		aryRight = [];
	for (var i = 0; i < ary.length; i++) {
		var cur = ary[i];
		cur < centerValue?aryLeft.push(cur):aryRight.push(cur);
	}
	return quick(aryLeft).concat(centerValue, quick(aryRight));
}
console.log(quick(ary))
```

#### 插入排序

```javascript
var ary = [12,15,14,13,16,11];
function insert(ary){
	// 先抓一张牌(一般都抓第一张)
	var handAry = []; // 存储的是手里已经抓取的牌
	handAry.push(ary[0]);

	// 一次循环抓取后面的牌
	for (var i = 1; i < ary.length; i++) {
		var item = ary[i]; // 本次新抓的这张牌

		//  拿新抓的牌和手里现有的牌比较
		for (var j = handAry.length-1; j >= 0; j--) {
			// handAry[j]: 当前比较的手里的这张牌
			// 新抓的牌比当前比较的这张牌大了,我们把新抓的牌放在他的后面
			if(item>handAry[j]){
				handAry.splice(j+1,0,item);
				break;
			}
			if(j === 0){
				// 新传的牌是最小的,把新抓的牌放在最开始的位置
				handAry.unshift(item);
			}
		}
	}
	return handAry;
}
console.log(insert(ary))
```
