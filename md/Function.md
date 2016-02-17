# bind 
### _bind(function,object,*arguments*)
> 绑定函数function到object上，也就是无论何时调用函数，函数里的this都指向object，arguments可以传递给function，可以填充函数所需要的参数，这也被称为partial application。

```js
var _ = require('underscore');

var func = function(greeting){return greeting +': '+ this.name};
func = _.bind(func,{name:'Zan'},'hi');
console.log(func());
```
=> hi: Zan

```js
var module = {
  x:81,
  getX:function(){return this.x;}
};

var callme = function(cb){
  console.log(cb());
}

callme(module.getX);

var retrieveX = module.getX;
var boundGetX = retrieveX.bind(module);

callme(retrieveX.bind(module));
```
=> undefined
   81
---

来看underscore（1.8.3）是如何优雅的实现bind的
```js
  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };
```

注释：创建一个函数绑定到object上，函数中的this指向这个object，arguments可选。
代码：首先看是否支持Function.prototype.bind()。

**Function.prototype.bind()**
> fun.bind(thisArg[,arg1[,arg2[,...]]])

bind()方法创建一个新函数，称为绑定函数，当调用这个函数时thisArg传入作为this，后面的参数将绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。






