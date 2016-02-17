// Function.js
var _ = require('underscore');

var func = function(greeting){
	console.log([].slice.call(arguments,0)); 
	return greeting +': '+ this.name
};
func1 = _.bind(func,{name:'Zan'},'hi');
console.log(func1());

var module = {
	x:81,
	getX:function(){return this.x;}
};

var callme = function(cb){
	console.log(cb());
}

console.log(module.getX());
callme(module.getX);

var retrieveX = module.getX;
var boundGetX = retrieveX.bind(module);

callme(retrieveX.bind(module));


// var oo = {
// 	sss:null
// }

// oo.sss = function(){
// 	a = function(){
// 		return this;
// 	}
// 	return a;
// }

// console.log(oo.sss()());
