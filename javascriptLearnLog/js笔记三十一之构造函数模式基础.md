
#### 构造函数基础

```javascript
// 工厂模式
function createJsPerson(name,age){
    var obj = {}
    obj.name = name;
    obj.age = age;
    obj.writeJs = function(){
        console.log("my name is " + this.name + ",I can write js!")
    }
    return obj;
}
var p1 = createJsPerson("lilei",18);
p1.writeJs();
```

> 构造函数模式的目的就是为了创建一个自定义类, 并且创建这个类的实例  
>   
> 构造函数模式和工厂模式的区别:  
> 1. 执行的时候:   
>   普通函数执行 -> createJsPerson()  
>   构造函数执行 -> new createJsPerson() 通过new执行后, createJsPerson就是一个类了  
>   而函数执行的返回值(p1)就是CreateJsPerson这个类的一个实例  
> 2. 在函数代码执行的时候:  
>   相同: 都是形成一个私有的作用域, 然后形参赋值 -> 预解释 -> 代码从上到下执行(类和普通函数一项,  它也有普通函数的一面)  
>   不同: 在代码执行之前, 不用再手动创建obj对象了, 浏览器会默认的创建一个对象数据类型的值(这个对象其实就是当前类的一个实例);  
>   接下来代码从上到下执行, 以当前的实例为执行的主体(this代表的就是当前的实例), 然后分别的把属性名和属性值赋值给当前的实例  
>   浏览器会默认的实例返回

```javascript
function CreateJsPerson(name,age){
    // 浏览器默认创建的对象就是实例 p1
    this.name = name; // -> p1.name = name
    this.age = age; // -> p1.age = age
    this.writeJs = function(){
        console.log("my name is " + this.name + ",I can write js!")
    }
    // 浏览器会把创建的实例默认的进行返回
}
// 因为内置类首字母大写,所以我们约定自己创建的类首字母也大写
var p1 = new CreateJsPerson("lilei",18); 
p1.writeJs();
var p2 = new CreateJsPerson("hanmeimei",16); 
p2.writeJs(); 

res = CreateJsPerson("liyanwei",26);
// 这样写不是构造函数模式执行,而是普通的函数执行, 由于没有写return, 所以 res=undefined 并且CreateJsPerson这个办法中的this是window
console.log(res) // undefined
```

> 创建一个数组

```javascript
var ary = []; // 字面量方式
var ary = new Array(); // 实例创建的方式 -> 构造函数模式执行的方式

// 不管哪种方式,ary都是Array这个类的一个实例
```

> js中所有的类都是函数数据类型的, 它通过new执行变成了一个类, 但是它本身也是一个普通的函数  
> js中所有的实例都是对象数据类型的  

> 在构造函数模式中,类中(函数体中)出现的 this . xxx = xxx中的this是当前类的一个实例  

> p1和p2都是CreateJSPerson这个类的实例, 所以都拥有writeJS这个方法, 但是不同实例之间的方法是不一样的  
> 在类中给实例增加的属性( this.xxx = xxx)属于当前实例的私有的属性, 实例和实例之间是单独的个体, 所以私有的属性之间是不相等的

```javascript
console.log(p1.writeJs === p2.writeJs); // -> false
```
