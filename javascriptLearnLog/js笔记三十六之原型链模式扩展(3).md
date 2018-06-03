
> for in 循环在遍历的时候, 默认的话可以吧自己的私有的和在它所属类原型上扩展的属性和方法都可以遍历到, 但是一般情况下, 我们遍历一个对象只需要遍历私有的即可, 我们可以使用一下的判断进行处理  

```javascript
Object.prototype.aaa = function(){};

var obj = {name:"lilei",age:18}
for(var key in obj){
    // if(obj.propertyIsEnumerable(key)){
    //     console.log(key)
    // }
    
    if(obj.hasOwnProperty(key)){
        console.log(key)
    }
}
```

> Object.create()方法创建一个拥有指定原型和若干个指定属性的对象

```javascript
Object.create()

var obj = {
    constructor: Fn,
    getX: function(){
        
    }
};
function Fn(){
    
}
Fn.prototype = obj;
Fn.prototype.sum = function(){
    
}
```
> Object.create()创建一个新的对象, 但是还要把proObj作为这个对象的原型(ie6~8不支持[ECMAscript5])

```javascript
var obj = {
    getX : function (){
        
    }
};
var obj2 = Object.create(obj)
// obj2:
// __proto__:
//  getX:function...
//  __proto__:Object.prototype
obj2.getX();
obj.getY = function (){
    console.log("ok");
}
obj2.getY() // -> ok
```

```javascript
function object(obj){
    function Fn(){
        
    }
    Fn.prototype = obj;
    return new Fn;
}
```

#### 原型继承

```javascript
// #div1.__proto__ -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype

function myObject(){
    
}
myObject.prototype = {
    constructor: myObject,
    hasOwnproperty: function(){
        
    }
};
function myEventTarget(){
    
}
myEventTarget.prototype = new myObject();
myEventTarget.prototype.addEventListener=function(){
    
}
function myNode(){
    
};
myNode.prototype=new myEventTarget;
myNode.prototype.createElement=function(){
    
}
var n =new myNode;
```

```javascript
function A(){
    this.x=100;
}
A.prototype.getX=function(){
    console.log(this.x);
}
function B(){
    this.y=200;
}
B.prototype=new A;
```
> `原型继承`是js中最常用的一种继承方式  
> 子类B想要继承父类A中的所有的属性和方法(私有和公有),只需要让B.prototype=new A;即可  
> 原型继承的特点: 它是把父类中的私有的+公有的都继承到了子类原型上(子类公有的)  
> ->核心: 原型继承并不是把父类中的属性和方法克隆一份一模一样的给B,而是让B和A之间增加了原型链的连接,以后B的实例n想要用A中的的getX方法,需要一级级的向上查找来使用  

#### call继承

```javascript
function A(){
    this.x = 100;
}
A.prototype.getX = function(){
    console.log(this.x);
};

function B(){
    // this -> n
    A.call(this);  // -> A.call(n) 把A执行让A中的this变为了n
}
var n = new B;
console.log(n.x) // 100
```

> `call继承`: 把父类私有的属性和方法 克隆一份一模一样的作为子类私有的属性;

#### 冒充对象继承

```javascript
function A(){
    this.x = 100;
}
A.prototype.getX = function(){
    console.log(this.x);
};

function B(){
    // this -> n
    var temp = new A; // 创建A对象的实例
    for(var key in temp){
        // console.log()
        this[key] = temp[key];
    }
    tamp = null
}
var n = new B;
console.log(n.x) // 100
```

> `冒充对象继承`: 把父类私有的+公有的克隆一份一模一样的给子类私有的  

#### 混合模式继承

```javascript
function A(){
    this.x = 100;
}
A.prototype.getX = function(){
    console.log(this.x);
};

function B(){
    A.call(this); // -> n.x = 100;
}

B.prototype = new A; // -> B.prototype: x= 100  getX...
B.prototype.constructor = B;
var n = new B;
console.log(n.x) // 100
```

> `混合模式继承`: 原型继承 + call继承

#### 寄生组合式继承

```javascript
function A(){
    this.x = 100;
}
A.prototype.getX = function(){
    console.log(this.x);
};

function B(){
    A.call(this);
}

// B.prototype = Object.create(A.prototype);
B.prototype = objectCreate(A.prototype);
B.prototype.constructor = B;
var n = new B;
console.dir(n);

function objectCreate(o){
    function fn(){
    
    }
    fn.prototype = o;
}
```

#### 中间类继承法(不兼容)

```javascript
// 求平均数

function avgFn(){
    Array.prototype.sort.call(arguments,function(a,b){
        return a-b;
    });
    Array.prototype.pop.call(arguments);
    Array.prototype.shift.call(arguments);
    return (eval(Array.prototype.join.call(arguments,"+")) / arguments.length).toFixed(2);
}
console.log(avgFn(1,2,21,3,43,12,563,2,54))
```

```javascript
// 求平均数

function avgFn(){
    arguments.__proto__ = Array.prototype;
    arguments.sort(function(a,b){
        return a-b;
    });
    arguments.pop();
    arguments.shift();
    return (eval(arguments.join("+")) / arguments.length).toFixed(2);
}
console.log(avgFn(1,2,21,3,43,12,563,2,54))
```
