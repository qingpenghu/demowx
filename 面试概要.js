/**
 * 《1原始类型》
 * js中6种原始值 null undefined number string boolean symbol
 * 
 * null == undefined  true
 * null 表示没有对象，此处不应该有值。用法：
 * 1作为函数的参数，表示该参数不是对象
 * 2作为对象原型链的终点
 * 
 * 《2对象类型Object》
 * 
 * 对象类型与原始类型的不同：  对象类型存储的是地址（指针），原始类型存储的是值
 * 
 * 《3typeof VS instanceof》
 * 
 * typeof 除了null以为都能显示正确的类型
 * typeof 对于对象来说,除了函数其他都显示object typeof [] {} 为 object typeof console.log() 为function
 * 
 * 判断对象类型 用instanceof
 * 
 * var str = 'hello' str instanceof String  false
 * var str = new String('hello') str instanceof String  true
 * 
 * 《4类型转换 》 
 * 转 boolean  number  string
 * 
 * 转boolean  除了 null undefined false '' 0 -0 NaN  都为true
 * 
 * 《5四则运算 》
 * 
 * 加法运算 特点:
 * 1 运算中的其中一方为字符串，那么就会把另一方转换为支付串
 * 2 如果一方不是字符串或数字，那么会将它转换为数字或字符串
 * 4+[1,2,3] => "41,23" [1,2,3] => '1,2,3'
 * 'a'++'b' => 'aNaN'  +b => NaN
 * 
 * 比较运算符  
 * 1 如果是对象 就通过toPrimitive转换为对象
 * 2 如果是字符串，就通过unicode字符索引比较
 * 
 *《6 this 指向》
 * 
 * function foo() {
    console.log(this.a)
    }
    var a = 1
    foo()
    const obj = {
    a: 2,
    foo: foo
    }
    obj.foo()
    const c = new foo()
    let a = {}
    let fn = function () { console.log(this) }
    fn.bind().bind(a)() // => ? window
 * 
 * 1 箭头函数其实是没有this的 ，它的this指向为包裹箭头函数的第一个普通函数的this
 * 箭头函数使用bind无效
 * 2 谁调用this指向谁 obj.foo() this为obj  foo() 的this为window
 * 3 对于 new 的方式来说 this 被绑定在c上 不会被改变 
 * 4 对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
 * 5 不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定
 * 6 不同的规则之间会根据优先级最高的来决定 this 最终指向哪里
 * 首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，
 * 最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。
 * 
 * 《7 == 与 === 》
 * == 若双方类型不一样的话会进行类型转换
 * === 判断两者的类型和值
 * 
 * 《8 闭包》
 *  函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包
 * 用处： 1 读取函数内部的变量
 *        2 这些变量的值始终保持在内存中，不会再外层函数调用后自动清除
 * 优点： 1 变量长期驻扎在内存中
 *        2 避免全局变量的污染
 *        3 私有成员的存在
 * 特性： 1 函数嵌套函数
 *        2 内部函数直接使用外部函数的局部变量或参数
 *        3 变量或参数不会被垃圾回收机制回收
 * 缺点： 1 常驻内存 会增大内存的使用量 使用不当会造成内存泄露
 * 
 * 《9 浅拷贝与深拷贝》
 * 浅拷贝
 * Object.assign 
 * * var a = {
 *  age:'1',
 *  job:{
 *      first:'web'
 *  }
 * }
 * 展开运算符
 * var b = Object.assign({},a);
 * var b = {...a}
 * 
 * 深拷贝
 * 1 利用JSON.parse 和 JSON.stringify
 * JSON.parse(JSON.stringify(object))
 * var b = JSON.parse(JSON.stringify(a))
 * 缺点：会忽略undefined,symbol  不能序列化函数  不能循环引用对象
 * 2 使用 lodash 库进行深拷贝
 *  该函数库也有提供 _.cloneDeep 用来做 Deep Copy。
  * 
  * var _ = require('lodash');
    var obj1 = {
        a: 1,
        b: { f: { g: 1 } },
        c: [1, 2, 3]
    };
    var obj2 = _.cloneDeep(obj1);
    console.log(obj1.b.f === obj2.b.f); // false
 * 3 手写函数实现深拷贝
 * 
 * function cloneDeep(obj) {
 *      function isObject(o) {
 *        return (typeof o === 'object' || typeof o === 'function' ) && o !== null
 *       }
 *       if(!isOBject(obj)) {
 *         throw new Error("非对象")
 *        }
 *          let isArray = Array.isArray(obj)
 *          let newOBj = isArray ? [...obj]:{...obj}
 *          Reflet.ownKeys(newObj).forEach(key => {
 *              newObj[key] = isObject(obj[key])? deepClone(obj[key]):obj[key]
 *          })
 *          return newObj
 * }
 * 
 * 《10 原型与原型链》
 * 
 * 每个对象都有_proto_属性，这和属性指向了原型
 * 原型的constructor属性指向构造函数，构造函数又通过prototype属性指回原型
 * 原型链就是多个对象通过_proto_的方式连接了起来
 * 总结：
 *  1 Object是所有对象的爸爸，所有对象都可以通过_proto_找到它
 *  2 Function 是所有函数的爸爸，所有函数都可以通过_proto_找到它
 *  3 函数的prototype是一个对象
 *  4 对象的_proto_指向原型，_proto_将对象和原型连接起来组成了原型链
 * 
 * 《11 var let const 区别？ 提升？ 暂时性死区？》
 * console.log(a)
 * var a=10
 * 从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，
 * 这种情况就叫做提升，并且提升的是声明。
 * 看作 var a
 *      console.log(a)
 *      a=10
 * var 声明的变量会发生提升的情况，其实不仅变量会提升函数也会被提升
 * 函数会被提升，并且优先于变量提升。使用 var 声明的变量会被提升到作用域的顶部
 * let const 定义后不能再被定义
 * let 定义后可以更改值 
 * const 不能更改但可以定义对象更改属性
 * 
 * 总结：
 * 1函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
 * 2var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
 * 3var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
 * 4let 和 const 作用基本一致，但是后者声明的变量不能再次赋值
 * 
 * 《12 原型继承 class继承》
 * 
 * 组合继承 是最常见的继承方式
 * function Parent(value) {
    this.val = value
    }
    Parent.prototype.getValue = function() {
    console.log(this.val)
    }
    function Child(value) {
    Parent.call(this, value)
    }
    Child.prototype = new Parent()

    const child = new Child(1)

    child.getValue() // 1
    child instanceof Parent // true
    以上继承的方式核心是在子类的构造函数中通过 Parent.call(this) 继承父类的属性，
    然后改变子类的原型为 new Parent() 来继承父类的函数。

    这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，
    可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类
    构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费
 * 
 * 寄生组合继承
 * 
 * function Parent(value) {
    this.val = value
    }
    Parent.prototype.getValue = function() {
    console.log(this.val)
    }

    function Child(value) {
    Parent.call(this, value)
    }
    Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configurable: true
    }
    })

    const child = new Child(1)

    child.getValue() // 1
    child instanceof Parent // true
    以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，
    这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。
 * 
 * class 继承
 * 
 * class Parent {
    constructor(value) {
        this.val = value
    }
    getValue() {
        console.log(this.val)
    }
    }
    class Child extends Parent {
    constructor(value) {
        super(value)
        this.val = value
    }
    }
    let child = new Child(1)
    child.getValue() // 1
    child instanceof Parent // true
    class 实现继承的核心在于使用 extends 表明继承自哪个父类，
    并且在子类构造函数中必须调用 super，因为这段代码可以看成 Parent.call(this, value)
 * 
 * 《13 模块化》
 * 优点：
 * 1解决命名冲突
 * 2提供复用性
 * 3提高代码的可维护性
 * 
 * AMD CMD commonJs 
 * 
 * 以后补充<===================>
 * <===================>
 * <===================>
 * <===================>
 * <===================>
 * 《13 Proxy》
 * proxy 可以实现什么功能
 * 
 * vue3.0 用proxy代替Object.defineProperty来实现数据响应式
 * Proxy是ES6新增的功能，他可以用来自定义对象的操作。
 * 
 * 异步编程及常考面试题
 * 《 14 并发和并行的区别》
 * 并发是宏观概念，我分别有任务 A 和任务 B，
 * 在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发
 * 
 * 并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。
 * 同时完成多个任务的情况就可以称之为并行
 * 
 * 《15 回调函数》
 * 
 * 回调函数致命弱点 回调地狱
 * 回调地狱根本问题：
 * 1 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身。
 * 2 嵌套函数一多就很难处理错误
 * 
 * 回调函数其他缺点：不能用 try catch 捕获错误，不能直接return.
 * 
 * Generator 
 * 
 * Generator最大的特点是可以控制函数的执行。
 * Geberator 可以解决回调地狱的问题
 * 
 * 《14 promise》
 * 很好的解决回调地狱的问题
 * Promise 三种状态  pending等待中 resolved完成 rejected拒绝了
 * 等待状态一旦成为其他状态就不能更改状态。
 * 
 * Promise实现链式调用，也就是说每次调用then之后的返回的都是一个Promise
 * 并且是一个全新的Promise,原因也是因为状态不可变。如果你在then中使用了
 * return，那么return的值会被Promise.resove()包装
 * 
 * 缺点：无法取消Promise,错误需要回调函数捕获。
 * 
 * 《15 async 及 await》
 * 
 * 一个函数如果加上async，那么函数就会返回一个Promise.
 * async 就是将函数返回值使用 Promise.resolve() 包裹了下，
 * 和 then 中处理返回值一样，并且 await 只能配套 async 使用
 * 
 * async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，
 * 优势在于处理 then 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，
 * 并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 await 将异步代码改造成了同步代码，
 * 如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

