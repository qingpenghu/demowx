
/**
 * 柯里化 
 * 
 * https://www.jianshu.com/p/2975c25e4d71
 * https://blog.csdn.net/weixin_34206899/article/details/88931333
 */
function add() {
    var _args = Array.prototype.slice.call(arguments)
    var _adder = function () {
        _args.push(...arguments)
        return _adder
    }
    _adder.toString = function () {
        return _args.reduce(function (a,b) {
            return a+b
        })
    }
    return _adder

}
var result1 = add(1)
var result2 = add(1)(2)(3)
var result3 = add(1,2)(3,4)
console.log(result1)