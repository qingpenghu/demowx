
/**
 * 柯里化 
 * 
 * https://www.jianshu.com/p/2975c25e4d71
 * https://blog.csdn.net/weixin_34206899/article/details/88931333
 */
// function add() {
//     var _args = Array.prototype.slice.call(arguments)
//     var _adder = function () {
//         _args.push(...arguments)
//         return _adder
//     }
//     _adder.toString = function () {
//         return _args.reduce(function (a,b) {
//             return a+b
//         })
//     }
//     return _adder

// }
// var result1 = add(1)
// var result2 = add(1)(2)(3)
// var result3 = add(1,2)(3,4)
// console.log(result1)

var obj = [{"id":"17","caption":"颜色","types":["黑","棕"]},
{"id":"23","caption":"材质","types":["牛皮"]},
{"id":"24","caption":"尺码","types":["40","41","42"]}]


// [{"17":"黑","23":"牛皮","24":"40"},
// {"17":"黑","23":"牛皮","24":"41"},
// {"17":"黑","23":"牛皮","24":"42"},
// {"17":"棕","23":"牛皮","24":"40"},
// {"17":"棕","23":"牛皮","24":"41"},
// {"17":"棕","23":"牛皮","24":"42"}]

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
var kk =  generateItems(obj)
console.log(kk)
function doCombination(arr) {
    console.log(arr)
        var count = arr.length - 1; //数组长度(从0开始)
        var tmp = [];
        var totalArr = [];// 总数组
        return doCombinationCallback(arr, 0);//从第一个开始
        //js 没有静态数据，为了避免和外部数据混淆，需要使用闭包的形式
        function doCombinationCallback(arr, curr_index) {
            for(val of arr[curr_index]) {
                tmp[curr_index] = val;//以curr_index为索引，加入数组
                //当前循环下标小于数组总长度，则需要继续调用方法
                if(curr_index < count) {
                    doCombinationCallback(arr, curr_index + 1);//继续调用
                }else{
                    totalArr.push(tmp);//(直接给push进去，push进去的不是值，而是值的地址)
                }
    
                //js  对象都是 地址引用(引用关系)，每次都需要重新初始化，否则 totalArr的数据都会是最后一次的 tmp 数据；
                oldTmp = tmp;
                tmp = [];
                for(index of oldTmp) {
                    tmp.push(index);
                }
                }
                return totalArr;
        }
    }
//     //测试数组
//     var arr = [
//         [1,2,3,4,5],
//         ['a','b','c','d'],
//         ['成功', '失败']
//     ];
// // console.log(arr)
// console.log(doCombination(arr))

// function sort (xbrr) {
    //     var count = xbrr.length - 1;
    //     var tmp = [];
    //     var resultArr = [];
    //     return sortCallback( xbrr , 0 )
    //     function sortCallback(xbrr,curr_index) {
    //         for( val of xbrr[curr_index] ) {
    //             tmp[curr_index] = val;
    //             console.log(val)
    //             if( curr_index < count ) {
    //                 sortCallback(xbrr,curr_index+1)
    //             }else{
    //                 resultArr.push(tmp) 
    //             }
    //             oldTmp = tmp;
    //             tmp = [];
    //             for(index of oldTmp) {
    //                 tmp.push(index);
    //             }
    //           }
    //           return resultArr;
    //         }
    //     }