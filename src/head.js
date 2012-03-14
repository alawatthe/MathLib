// Extending the Array prototype with some ES5 methods,
// if the method isn't already there.
// This are the 'official' snippets from MDN.
if (!Array.prototype.every)  
{  
  Array.prototype.every = function(fun /*, thisp */)  
  {  
    "use strict";  
  
    if (this == null)  
      throw new TypeError();  
  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (typeof fun != "function")  
      throw new TypeError();  
  
    var thisp = arguments[1];  
    for (var i = 0; i < len; i++)  
    {  
      if (i in t && !fun.call(thisp, t[i], i, t))  
        return false;  
    }  
  
    return true;  
  };  
}  



if (!Array.prototype.filter)  
{  
  Array.prototype.filter = function(fun /*, thisp */)  
  {  
    "use strict";  
  
    if (this == null)  
      throw new TypeError();  
  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (typeof fun != "function")  
      throw new TypeError();  
  
    var res = [];  
    var thisp = arguments[1];  
    for (var i = 0; i < len; i++)  
    {  
      if (i in t)  
      {  
        var val = t[i]; // in case fun mutates this  
        if (fun.call(thisp, val, i, t))  
          res.push(val);  
      }  
    }  
  
    return res;  
  };  
}  


if ( !Array.prototype.forEach ) {  
  Array.prototype.forEach = function( callback, thisArg ) {  
    var T, k;  
    if ( this == null ) {  
      throw new TypeError( " this is null or not defined" );  
    }  
    var O = Object(this);  
    var len = O.length >>> 0;
    if ( {}.toString.call(callback) != "[object Function]" ) {  
      throw new TypeError( callback + " is not a function" );  
    }  
    if ( thisArg ) {  
      T = thisArg;  
    }  
    k = 0;  
    while( k < len ) {  
      var kValue;  
      if ( k in O ) {  
        kValue = O[ k ];  
        callback.call( T, kValue, k, O );  
      }  
      k++;  
    }  
  };  
}  


if (!Array.prototype.map) {  
  Array.prototype.map = function(callback, thisArg) {  
    var T, A, k;  
    if (this == null) {  
      throw new TypeError(" this is null or not defined");  
    }  
    var O = Object(this);  
    var len = O.length >>> 0;  
    if ({}.toString.call(callback) != "[object Function]") {  
      throw new TypeError(callback + " is not a function");  
    }  
    if (thisArg) {  
      T = thisArg;  
    }  
    A = new Array(len);  
    k = 0;  
    while(k < len) {  
      var kValue, mappedValue;  
      if (k in O) {  
        kValue = O[ k ];  
        mappedValue = callback.call(T, kValue, k, O);  
        A[ k ] = mappedValue;  
      }  
      k++;  
    }  
    return A;  
  };        
}  


if (!Array.prototype.reduce) {  
  Array.prototype.reduce = function reduce(accumulator){  
    var i = 0, l = this.length >> 0, curr;  
  
    if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."  
      throw new TypeError("First argument is not callable");  
  
    if(arguments.length < 2) {  
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");  
      curr = this[0]; // Increase i to start searching the secondly defined element in the array  
      i = 1; // start accumulating at the second element  
    }  
    else  
      curr = arguments[1];  
  
    while (i < l) {  
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);  
      ++i;  
    }  
  
    return curr;  
  };  
}  


if (!Array.prototype.some)  
{  
  Array.prototype.some = function(fun /*, thisp */)  
  {  
    "use strict";  
  
    if (this == null)  
      throw new TypeError();  
  
    var t = Object(this);  
    var len = t.length >>> 0;  
    if (typeof fun != "function")  
      throw new TypeError();  
  
    var thisp = arguments[1];  
    for (var i = 0; i < len; i++)  
    {  
      if (i in t && fun.call(thisp, t[i], i, t))  
        return true;  
    }  
  
    return false;  
  };  
}  


// ## The main function
// This is the beginning of the main function
(function (document) {

  var name = 'MathLib',
      global = this,
      oldMathLib = global.MathLib,
      oldN = global[name],
      MathLib,
      proto = '__proto__',
      prototypes,
      // Works only for "double" Arrays
      flatten = function (a) {
        return a.reduce(function(a,b){
          return a.concat(b);
        });
      },
      toArray = Array.prototype.slice;



  MathLib = {
    version:          0.1,
    apery:            1.2020569031595942,
    e:                Math.E,
    // Number.EPSILON is probably coming in ES6 see
    // <http://wiki.ecmascript.org/doku.php?id=strawman:number_epsilon>
    epsilon: Number.EPSILON || (function () {
        var next, result;
        for (next = 1; 1 + next !== 1; next = next / 2) {
          result = next;
        }
        return result;
      }()),
    eulerMascheroni:  0.5772156649015329,
    goldenRatio:      1.618033988749895,
    pi:               Math.PI
  };

  prototypes = {
    func: new Function(),
    array: [].__proto__,
    object: {}.__proto__
  };

  MathLib.prototypes = prototypes;

// ### MathLib.extend
// Extends a MathLib object with custom properties or methods
//
// *@param {string}* obj The name of the object be extended  
// *@param {string}* name The name of the new property of function  
// *@param {function|...}* prop The new function or property  
// *@param {object}* [options]  
// TODO: allow get & set
  MathLib.extend = function (obj, name, prop, options) {
    options = options || {enumerable: true};

    Object.defineProperty(MathLib[obj], name, {
      value: prop,
      writable: options.writable,
      enumerable: options.enumerable,
      configurable: options.configurable
    });
  };


// ### MathLib.extendPrototype
// Extends the prototype of a MathLib object with custom properties or methods
//
// *@param {string}* obj The name of the object be extended  
// *@param {string}* name The name of the new property of function  
// *@param {function|...}* prop The new function or property  
// *@param {object}* [options]  
// TODO: allow get & set
  MathLib.extendPrototype = function (obj, name, prop, options) {
    options = options || {enumerable: true};

    Object.defineProperty(prototypes[obj], name, {
      value: prop,
      writable: options.writable,
      enumerable: options.enumerable,
      configurable: options.configurable
    });

  };
