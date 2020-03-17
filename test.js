var obj = [{"id":"17","caption":"颜色","types":["黑","棕"]},
{"id":"23","caption":"材质","types":["牛皮"]},
{"id":"24","caption":"尺码","types":["40","41","42"]}]

function generateItems(specs) {
    var newArr = [],brr=[];
    var arr = specs;
    var len = arr.length;
    for(var i=0;i<len;i++){
       var crr = []
       var typeLen = arr[i].types.length;
       arr[i].types.map((item) => {
           var item = {
               [`${arr[i].id}`] : item
           }
           crr.push(item)
        })
       brr.push(crr)
    }
    return sort (brr)
    function sort (xbrr) {
        var count = xbrr.length - 1;
        var tmp = {};
        var resultArr = [];
        return sortCallback( xbrr , 0 )
        function sortCallback(xbrr,curr_index) {
            for( val of xbrr[curr_index] ) {
                Object.assign(tmp,val)
                if( curr_index < count ) {
                    sortCallback(xbrr,curr_index+1)
                }else{
                    resultArr.push(tmp) 
                }
              }
              return resultArr;
            }
        }
}
/** 问题二 */


// function fn() {
//     2     return new Promise((resolve, reject) => {
//     3         setTimeout(() => {
//     4             reject('some error.');
//     5         }, 1000);
//     6     })
//     7 }
//     8 
//     9 const foo = async () => {
//    10     try {
//    11         await fn();
//    12     } catch (e) {
//    13         console.log(e);  // some error
//    14     }
//    15 }
//    16 
//    17 foo();

function test (person) {
    person.age = 26;
    person = {
        name:'aaa',
        age:'30'
    }
    return person
}
var p1 = {
    name:'bbb',
    age:'25'
}
// var p2 = test(p1)
// console.log(p1,p2)

var name = {
    a:'ww'
}

// console.log('1'==name)
// console.log([] == ![])

// for (var i=0;i<5;i++) {
//     (function(j){
//         setTimeout(function(){
//             console.log(j)
//         },j*2000)
//     })(i)
// }

// ^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$

// var reg = /^[-.a-zA-Z0-9_\u4e00-\u9fa5]+$/
// var aa = "dafkj'das"
// var de = reg.test(aa)
// console.log(de)

/** 手写apply call bind */

Function.prototype.myCall = function (context) {
    if ( typeof this !== "Function"  ) {
        throw new TypeError('error')
    }
    context = context || window;
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

let arr = [1,2,3,4]
// let res = Math.max.myCall(null,arr)
// console.log(res)

/** 
 * 实现apply
 */

 Function.prototype.MyApply = function (context) {
     if( typeof this !== 'function' ) {
         throw TypeError("error")
     }
     context = context || window;
     context.fn = this
     let result;
     if( arguments[1] ) {
         result = context.fn(...arguments[1])
     }else{
        result = context.fn()
     }
     delete context.fn
     return result
 }
/**
 * 实现call函数
 */
Function.prototype.MyCall = function (context) {
    if( typeof this !== 'function' ) {
        throw TypeError("error")
    }
    context = context || window
    context.fn = this
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn
    return result
}
/** 
 * 实现bind 函数
*/

Function.prototype.Mybind = function (context) {
    if( typeof this !== 'function' ) {
        throw TypeError('error')
    }
    const _this = this;
    const args = [...arguments].slice(1)
    return function F() {
        if( _this instanceof F ) {
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args.concat(...arguments))
    }
}

/**
 * new 实现
 */

 function creat() {
     let obj = {}; // 创建空对象
     let Constructor = [].shift.call(arguments) // 获取构造函数
     obj._proto_ = Constructor.prototype; // 设置空对象原型
     let result = Constructor.apply(obj,arguments) // 绑定this并执行构造函数
     result instanceof "Object" ? result : obj // 确保返回的是对象
 }
/**
 * instanceof 实现
 */

 function myInstanceof (left,right) {
    let R = right.prototype;
    console.log(R)
    let L = left._proto_;
    console.log(L)
    while(true) {
        if(  L === null || L === undefined ) {
            return false
        }
        if( L === R ) {
            return true
        }
        L = L._proto
    }
 }
 function Person(){};
var p =new Person()
//  console.log([1,2]._proto_,"qq")
 console.log( myInstanceof(p,Person)    )
// console.log( arr instanceof Array )


