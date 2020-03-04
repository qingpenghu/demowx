// 作用域就是代码的执行环境，全局执行环境就是全局作用域，函数的执行环境就是私有作用域，它们都是栈内存
// 作用域 先找本层的 若本层没有则向上一层寻找    作用域链只能向上访问不能向下访问
// 内部环境可以通过作用域链访问所有外部环境，但外部环境不能访问内部环境的任何变量和函数。


// 作用域，指代码所在的执行环境。
// 代码执行时产生的最先产生的执行环境，称为全局作用域， 如浏览器为 window， node 为 global.
// 作用域内部执行时产生的、新的作用域为局部作用域。由此逐层衍生、逐层嵌套的作用域，称之为作用域
// 特性：
// 1-1 外层作用域无法调用内层作用域的变量和常量
// 1-2 代码执行需要时，优先引用当前所在执行环境中的变量和常量
// 1-3 直至追溯到最外层作用域（如上所说的 window 或 global）仍未定义的引用，即为 not defined.

// es5 非严格模式下，当在局部作用域不声明、赋值一个变量时， 产生的是一个全局变量 即隐式全局变量
var a = 10;
var b=10;
function fn() { 
     b = 20;
    function bar() {
        console.log('bar',b)  // 20 
        console.log(a+b) // a=40 b=20 
    }
    return bar
}

b=60; 
a=40
var x=fn();
// console.log(a)
// x(); // a = 80 还未赋值
a=80  

// 数值操作
var arr = [1,2,3,4,5,6,7], crr,          // arr = [1, 2, 3, 4, 5, 6, 7]
    brr = [1,2,3,4,5,6,7];               // 索引    0  1  2  3  4  5  6
    // arr.push('8')  // [1,2,3,4,5,6,7,'8]  向数组尾部添加数据
    // arr.pop()      // console.log(arr.pop()) = 7  arr =[1,2,3,4,5,6] 移出最后一个元素
    // arr.shift(8)   // console.log(arr.shift()) = 1  arr为[2,3,4,5,6,7] 移出第一个元素
    // arr.unshift(8)  // console.log(arr.unshift(8)) 为数组arr 长度9  arr = [8,1,2,3,4,5,6,7] 向数组头部添加一个元素
    // crr=arr.slice(0,3); //  crr = 1,2,3  arr=1,2,3,4,5,6,7 不删除原数组  arr.slice(start,end) 位置 包括开始不包括结束
    // crr=arr.splice(0,4);  //  crr = 1,2,3,4  arr=5,6,7 删除原数组返回新数组  arr.splice(start,length) 开始位置 截取的长度
    // splice(index,num,item1...itemN) index 从什么位置开始 num 删除几个（可以为0） item1...itemN可选。要添加到数组的新元素
    // crr=arr.concat(brr)   // crr =1,2,3,4,5,6,7,1,2,3,4,5,6,7  a.concat(b) 将数组b添加到a的尾部 
    // crr = brr.join('')  // crr = 1234567  crr=brr.join(',') crr = 1,2,3,4,5,6,7 brr不变
    // console.log(crr)
    // console.log(brr)

 // 新增es6操作方法
    // 1 indexOf()  arr.indexOf(1)
    // 2 forEach()   
    arr.forEach(function(item,index,array){
        // console.log(item,index,array)
        // item 表示每一个数据 index 每一项的下标 array 当前数组
    })
    // 3 map()
    var drr = arr.map(function(item,index,array){
        if(item > 4) {
            return 3
        }
        return 4
    })
    // console.log(drr)
    // 4 filter() 过滤
    var jrr = arr.filter(function(item){
        return item >6
    }) 
    // console.log(jrr)
    // 5 some() 某一个满足返回true
    var f=arr.some(function(item){
        return item > 6
    })
    // console.log(f)
    // 6 every() 用法同上 全部满足返回true

/***
 * 字符串操作
 * codeAt()  str.codeAt(index) 指定下标处的字符
 * charCodeAt() str.charCodeAt(index) 指定下标处的字符编码
 * fromCharCode() String.fromCharCode(unicode编码)  根据相应的编码得到对应的字符
 * substr(start,length) 截取指定位置到指定长度的字符
 * substring(str,end) 截取指定位置开始到指定位置结束的字符 不包括end[str,end)
 * indexOf() str.indexOf(字符) 含有返回第一次出现的位置 不含有返回-1
 * lastIndexOf()
 * split 将字符串转换成数组 str = 'A B CD' var res = str.split('') res=["A","B","CD"]
 * typeOf() object string boolean number undefine function
 * replace 替换字符  str.replace(原字符串，新字符串)
 * trim 去掉首尾空白
 * toLowerCase() 转小写
 * toUpperCase() 转大写 
 */
/**
 * 数学对象 Math
 * 
 * Math.pow(m,n) m的n次幂
 * Math.sqrt(m) m的开平方
 * Math.abs(m) m 的绝对值
 * Math.floor(m) 向下取整
 * Math.ceil(m) 向上取整
 * Math.round(m) 四舍五入
 * Math.max(多个参数) 找最大值
 * Math.min() 找最小值
 * Math.random() 获取0-1的任意数值
 * 
 * 封装获取任意区间的任意数值的公式
 * 
 * function getRand (min,max) {
 *    return Math.floor(Math.random()*(max-min+1)+min)
 * }
 * 
 */

 // Object.defineProperty(obj,prop,descriptor)  
 // 此方法直接在一个对象上定义一个属性，或者修改一个对象的现有属性，并返回这个对象。
 // obj 要定义的对象  
 // prop 要定义的或修改的属性的名称
 // descriptor  被定义或修改属性的描述符。
 // 返回值 为被传递函数的对象
 // 该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（for...in 或 Object.keys 方法），
 // 这些属性的值可以被改变，也可以被删除。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的
 // 数据描述符和存取描述符均具有以下可选键值(默认值是在使用Object.defineProperty()定义属性的情况下)
 // 1 configurable  为true该属性描述符可以改变 同时该属性也能删除. 默认false
 // 2 enumberable 为true 该属性才能出现在对象的枚举属性中. 默认false
 // 数据描述符同时具有以下可选键值：
 // 3 value 该属性的值。默认underfine
 // 4 writable 为true时 value可以改变。默认false
 // 存取描述符同时具有以下可选键值.默认underfine
 // 5 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）
 // 6 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
 var obj = {} // 创建一个对象
 // 在对象中添加一个属性与数据描述符的示例
 Object.defineProperty(obj,"a",{
     value:11,
     writable:true, // 是否可改写值
     enumerable:true, // 该属性是否能出现在对象的枚举属性中
     configurable: false // 对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改
 })
 // 对象obj拥有了属性a 值为11
 // Object.keys(obj) // ['a'] 枚举对象属性
 // delete obj.a // 删除 obj.a 属性
// 在对象中添加一个属性与存取描述符的示例
 var bValue;
 Object.defineProperty(obj,"b",{
     get:function () {
        return bValue
     },
     set:function (newValue) {
        bValue = newValue;
     },
     enumerable:true,
     configurable:true,
 })
 obj.b=22
 Object.defineProperty(obj,"c",{
    value:11,
    writable:true, // 是否可改写值
    enumerable:false, // 该属性是否能出现在对象的枚举属性中
    configurable: false // 对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改
})
 // 注意 数据描述符与存取描述符不能混合使用
 delete obj.a // nothing happen
//  console.log(Object.keys(obj)) // ['a','b']
/** 
 * 定时器
 * setInterval(function(){},1000) 循环定时器
 * clearInterval(定时器名称) 停止定时器 
 * setTimeout(function(){},1000) 一次定时器
 * clearTimeout(定时器名称)
 * 
 * 
 * 
*/
var i=0,timer,timer2;
function fn() {
   if(i<5){
       i++;
    //    console.log(i)
   }else{
    //    clearInterval(timer)
       clearTimeout(timer)
    //    console.log(timer2)
   }
}
// timer = setInterval(fn,100)
// setTimeOut 模拟 setInterval
// timer2 = setTimeout(function(){
//     fn()
//     setTimeout(arguments.callee,100)
// },100)


var t =true
setTimeout(() => {
    t=false
    console.log('222')
}, 1000);
// while(t){console.log("111")}
// console.log("end") console.log("不会执行")

/**
 * apply call bind
 * 1、都是用来改变函数的this对象的指向的。
   2、第一个参数都是this要指向的对象。
   3、都可以利用后续参数传参。
 * call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
 var xw = {
            name : "小王",
            gender : "男",
            age : 24,
            say : function(school,grade) {
                    alert(this.name + " , " + this.gender + " ,今年" + this.age + " ,在" + school + "上" + grade);                                
            }
    }
    var xh = {
            name : "小红",
            gender : "女",
            age : 18
    }
    对于call来说是这样的  xw.say.call(xh,"实验小学","六年级");
    而对于apply来说是这样的  xw.say.apply(xh,["实验小学","六年级郑州牛皮癣医院"]);
    那么bind怎么传参呢？它可以像call那样传参。 xw.say.bind(xh,"实验小学","六年级")();
    但是由于bind返回的仍然是一个函数，所以我们还可以在调用的时候再进行传参。
    xw.say.bind(xh)("实验小学","六年级");

    call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 obj.myFun.call(db,'成都', ... ,'string' )。

    apply 的所有参数都必须放在一个数组里面传进去 obj.myFun.apply(db,['成都', ..., 'string' ])。

    bind 除了返回是函数以外，它 的参数和 call 一样。
 * 
 */


 var obj ={
     name:'小明',
     age:'18'
 }
 var obj1 = Object.assign({},obj)
 obj.age = 2
 // console.log(obj,obj1) // obj2.age = 18 obj.age = 2
 var  b = {...obj}
 console.log(b)

 //深拷贝
  let arr = [1, 3, {
    username: ' kobe'
    }];
    let arr4 = JSON.parse(JSON.stringify(arr));
    arr4[2].username = 'duncan';
    console.log(arr, arr4)
 /**
  * 浅拷贝与深拷贝
  * 
  * 浅拷贝 Object.assign()
  *  var obj1 = Object.assign({},obj)
  *  var b = {...obj}
  * 
  * 深拷贝
  * 
  * JSON.parse(JSON.stringify()) 不能处理function error
  * 
  * 原理： 用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。
  * 
  * 手写递归方法实现深拷贝
  * 
  * 函数库 lodash
  * 该函数库也有提供 _.cloneDeep 用来做 Deep Copy。
  * 
  * var _ = require('lodash');
    var obj1 = {
        a: 1,
        b: { f: { g: 1 } },
        c: [1, 2, 3]
    };
    var obj2 = _.cloneDeep(obj1);
    console.log(obj1.b.f === obj2.b.f); // false
  * 
  */

    // 定义检测数据类型的功能函数
    function checkedType(target) {
        return Object.prototype.toString.call(target).slice(8, -1)
    }
      // 实现深度克隆---对象/数组
      function clone(target) {
        // 判断拷贝的数据类型
        // 初始化变量result 成为最终克隆的数据
        let result, targetType = checkedType(target)
        if (targetType === 'object') {
          result = {}
        } else if (targetType === 'Array') {
          result = []
        } else {
          return target
        }
        // 遍历目标数据
        for (let i in target) {
          // 获取遍历数据结构的每一项值。
          let value = target[i]
          // 判断目标结构里的每一值是否存在对象/数组
          if (checkedType(value) === 'Object' || checkedType(value) === 'Array') { //对象/数组里嵌套了对象/数组
            // 继续遍历获取到value值
            result[i] = clone(value)
          } else { 
           // 获取到value值是基本的数据类型或者是函数。
            result[i] = value;
          }
        }
        return result
      }
   
      
      
        


