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
console.log(a)
x(); // a = 80 还未赋值
a=80  


var arr = [1,2,3,4,5,6,7], crr,          // arr = [1, 2, 3, 4, 5, 6, 7]
    brr = [1,2,3,4,5,6,7];               // 索引    0  1  2  3  4  5  6
    // arr.push('8')  // [1,2,3,4,5,6,7,'8]  向数组尾部添加数据
    // arr.pop()      // console.log(arr.pop()) = 7  arr =[1,2,3,4,5,6] 移出最后一个元素
    // arr.shift(8)   // console.log(arr.shift()) = 1  arr为[2,3,4,5,6,7] 移出第一个元素
    // arr.unshift(8)  // console.log(arr.unshift(8)) 为数组arr 长度9  arr = [8,1,2,3,4,5,6,7] 向数组头部添加一个元素
    // crr=arr.slice(0,3); //  crr = 1,2,3  arr=1,2,3,4,5,6,7 不删除原数组  arr.slice(start,end) 位置 包括开始不包括结束
    // crr=arr.splice(0,4);  //  crr = 1,2,3,4  arr=5,6,7 删除原数组  arr.splice(start,length) 开始位置 截取的长度
    // crr=arr.concat(brr)   // crr =1,2,3,4,5,6,7,1,2,3,4,5,6,7  a.concat(b) 将数组b添加到a的尾部 
    // crr = brr.join('')  // crr = 1234567  crr=brr.join(',') crr = 1,2,3,4,5,6,7 brr不变
    // console.log(crr)
    // console.log(brr)
