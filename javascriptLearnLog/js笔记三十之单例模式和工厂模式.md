
### 单例模式

##### 对象数据类型的作用:
> 把描述同一个实物(同一个对象)的属性和方法放在一个内存空间下,起到了分组的作用,这样不同事物之间的属性即使属性名相同, 相互也不会发生冲突  
> --- 这种分组编写代码的模式叫做: **单例模式**  

>  在单例模式中我们把person1或person2叫做"命名空间"

```javascript
var person1 = {
    name:"lilei",
    age:18
}
var person2 = {
    name:"hanmeimei",
    age:16
}
```

单例模式是一种项目中经常使用的模式, 因为项目中可以使用单例模式来进行"**模块化开发**"

**模块化开发**: 对于一个相对来说比较大的项目, 需要多人协作的开发的, 我们一般情况下会根据当前项目的需求划分成几个功能板块, 每个人负责一部分, 同时开发, 最后把每个人的代码进行合并

```javascript
var utils = {
    select: function(){
        
    }
}
var tabRender = {
    change: function(){
        utils.select(); // 在自己的命名空间下调用其他命名空间的方法
    }
}
var searchRender = {
    change: function(){
        searchRender.clickEven(); // 在自己的命名空间下调用自己命名空间的方法
        // this.clickEven()
    }
    clickEven: function(){
        
    }
}
```

### 工厂模式

```javascript
// 单例模式
var jsPerson1 = {
    name:'lilei',
    age:18,
    writeJs: function(){
        console.log("my name is " + this.name + ",I can write JS!")
    }
}
jsPerson1.writeJs();

var jsPerson2 = {
    name:'hanmeimei',
    age:16,
    writeJs: function(){
        console.log("my name is " + this.name + ",I can write JS!")
    }
}
jsPerson2.writeJs();

//  ...
```

> `单例模式`虽然解决了分组的作用,但是不能实现批量的生产,属于手工作业模式, 引出-> "`工厂模式`"  
> 把实现同一件事情的相同的代码放到一个函数中, 以后如果再想实现这个功能, 不需要重新的编写这些代码了, -> "`函数的封装`"   
> --> `低耦合高内聚`:  减少页面中的冗余代码,提高代码的重复利用率

```javascript
function createJsPerson(name,age){
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.writeJs = function(){
        console.log("my name is "+ this.name +", I can write JS!");
    }
    return obj;
}
var p1 = createJsPerson('lilei',18);
p1.writeJs();

var p2 = createJsPerson('hanmeimei',16);
p1.writeJs();
```
> js是一门轻量级的脚本"编程语言"(html+css不属于编程语言,属于标记语言)  
> 所有的编程语言都是面向对象开发的 -> 类的继承, 封装, 多态  
> `继承`: 子类继承父类中的属性和方法  
> `多态`: 当前方法的多种形态(在后台语言中: 多态包含`重载`和`重写`)  
> `重载`: js中不存在重载, 方法名一样的话, 后面的会把前面的覆盖掉,最后只保留一个;(js中有一个操作类似重载但不是重载:我们可以根据传递的参数不一样,实现不同的功能)  

```javascript
function sum(num){
    if(typeof num === "undefined"){
        return 0;
    }
    return num;
}
sum(100);
sum();
```

> `重写`: 子类重写父类的方法
