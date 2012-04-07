// MathLib.js is a JavaScript Library for mathematical computations.
//
// MathLib is currently in public beta testing phase
// v0.1pre
//
// ##License
// MathLib.js JavaScript Library is dual licensed under the MIT and GPL licenses.
// see (<http://MathLib.de/en/license>)
//
// ## Documentation
// The source code is annotated using [Docco](https://github.com/jashkenas/docco "View Docco on GitHub")
// (with a modified css-file).
// The syntax is more or less the JSDoc syntax.
// A more detailed documentation will be coming soon.
//
//
// ## Code structure
// The code is separated into several modules.
// The first module contains some JavaScript-Polyfills
//
// Then there are some [functions](#Functions "Jump to the functions").
// This module while be rewritten shortly.
//
// The drawing modules:
//
// - [screen](#Screen "Jump to the screen implementation")
// - [canvas](#Canvas "Jump to the canvas implementation")
// - [svg](#SVG "Jump to the svg implementation")
//
// The next module is the [vector](#Vector "Jump to the vector implementation") module, because the Point and the Line module
// depend on it.
//
// And at last the other modules in alphabetic order:
//
// - [circle](#Circle "Jump to the circle implementation")
// - [complex](#Complex "Jump to the complex number implementation")
// - [line](#Line "Jump to the line implementation")
// - [MathML](#MathML "Jump to the MathML implementation")
// - [matrix](#Matrix "Jump to the matrix implementation")
// - [permutation](#Permutation "Jump to the permutation implementation")
// - [point](#Point "Jump to the point implementation")
// - [polynomial](#Polynomial "Jump to the polynomial implementation")
// - [set](#Set "Jump to the set implementation")

// Extending the Array prototype with some ES5 methods,
// if the method isn't already there.
// This are the 'official' snippets from MDN.
if (!Array.prototype.every) {
  Array.prototype.every = function(fun /*, thisp */) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t =  new Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t)) {
        return false;
      }
    }

    return true;
  };
}



if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = new Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t)) {
          res.push(val);
        }
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

    if(typeof accumulator !== "function") { // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
      throw new TypeError("First argument is not callable");
    }

    if(arguments.length < 2) {
      if (l === 0) {
        throw new TypeError("Array length is 0 and no second argument");
      }
      curr = this[0]; // Increase i to start searching the secondly defined element in the array
      i = 1; // start accumulating at the second element
    }
    else {
      curr = arguments[1];
    }

    while (i < l) {
      if(i in this) {
        curr = accumulator.call(undefined, curr, this[i], i, this);
      }
      ++i;
    }

    return curr;
  };
}


if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisp */) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = new Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t)) {
        return true;
      }
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
    func: Object.getPrototypeOf(function (){}),
    array: Object.getPrototypeOf([]),
    object: Object.getPrototypeOf({})
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
// ## <a id="Functions"></a>Functions
// THE FUNCTION IMPLEMENTATION WILL BE REWRITTEN SOON.
// I know it's a mess right now...
//
// The functions are separated into two categories: <br>
// - functions which act on numbers, like sin, log risingFactorial, ...
// - functions which act on sets, like mean, median, ...

var functionList1 = {
  abs: Math.abs,
  arccos: Math.acos,
  arccot: function (x) {
        return MathLib.pi / 2 - Math.atan(x);
      },
  arccsc: function (x) {
        return Math.asin(1 / x);
      },
  arcosh: function (x) {
        return Math.log(x + Math.sqrt(x * x - 1));
      },
  arcoth: function (x) {
        return 0.5 * Math.log((x + 1) / (x - 1));
      },
  arcsch: function (x) {
        return Math.log((1 + Math.sqrt(1 + x * x)) / (x));
      },
  arcsec: function (x) {
        return Math.acos(1 / x);
      },
  arcsin: Math.asin,
  arctan: Math.atan,
  arsech: function (x) {
        return Math.log((1 + Math.sqrt(1 - x * x)) / (x));
      },
  arsinh: function (x) {
        return Math.log(x + Math.sqrt(x * x + 1));
      },
  artanh: function (x) {
        return 0.5 * Math.log((1 + x) / (1 - x));
      },
  binomial: function (n, k) {
        var res = 1, i;

        // or k > n > 0
        if (k < 0 || (n > 0 && k > n)) {
          return 0;
        }

        // Optimizing n and k are integers
        // if (n % 1 === 0 && k % 1 === 0) {
        // TODO: is this formula working if n is not an integer?
          if (n<0) {
            res = Math.pow(-1, k);
            n = k - n - 1;
          }
          if (k > n/2) {
            k = n-k;
          }
          for (i=1; i<=k; i++) {
            res *= (n+1-i)/i;
          }
          return res;
      },
  cbrt: function (x) {
          var a3, a3x, an, a;

          // Handle &plusmn;0, NaN, &plusmn;&infin;
          if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
            return x;
          }
          
          // Get an approximation
          a = MathLib.sgn(x) * Math.pow(Math.abs(x), 1/3);

          // Halley's method
          while (true) {
            a3 = Math.pow(a, 3);
            a3x = a3 + x;
            an = a * (a3x + x) / (a3x + a3);
            if (MathLib.isZero(an - a)) {
              break; 
            }
            a = an;
          }
          return an;
        },
  ceil: Math.ceil,
  conjugate: function (x) {
        return x;
      },
  copy: function (x) {
        return x;
      },
  cos:  Math.cos,
  cosh: Math.cosh || function (x) {
        return (Math.exp(x) + Math.exp(-x)) / 2;
      },
  cot: function (x) {
        return 1 / Math.tan(x);
      },
  coth: function (x) {
        return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
      },
  csc: function (x) {
        return 1 / Math.sin(x);
      },
  csch: function (x) {
        return 2 / (Math.exp(x) - Math.exp(-x));
      },
  degToRad: function (x) {
        return x / 180 * MathLib.pi;
      },
  digitproduct: function (x) {
        var out = 1;
        while (x > 9) {
          out *= x % 10;
          x = Math.floor(x / 10);
        }
        return out * x;
      },
  digitsum: function (x) {
        var out = 0;
        while (x > 9) {
          out += x % 10;
          x = Math.floor(x / 10);
        }
        return out + x;
      },
  divide: function (a, b) {
        return MathLib.times(a, MathLib.inverse(b));
  },
  divisors: function (x) {
        var res = x===1 ? [] : [1],
            i, ii;
        for (i=2, ii=x/2; i<=ii; i++) {
          if (x%i === 0) {
            res.push(i);
          }
        }
        res.push(x);
        return MathLib.set(res);
      },
  exp: Math.exp,
  factor: function (n) {
        var res = [],
            i;
        n = Math.abs(n);
        while (n%2 === 0) {
          n = n/2;
          res.push(2);
        }

        i = 3;
        while(n !== 1) {
          while (n%i === 0) {
            n = n/i;
            res.push(i);
          }
          i += 2;
        }
        return MathLib.set(res, true);
      },
  factorial: function (x) {
        var out = 1, i;
        for (i = 1; i <= x; i = i + 1) {
          out *= i;
        }
        return out;
      },
  fallingFactorial: function (n, m, s) {
        var res = 1, j;
        s = s || 1;

        for (j = 0; j < m; j++) {
          res  *= (n - j * s);
        }
        return res;
      },
  fibonacci: function (n) {
        return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
      },
  floor: Math.floor,
  hypot: function (a, b) {
        var args, x, y;

        if (arguments.length === 1) {
          return Math.abs(a);
        }

        if (arguments.length > 2) {
          args = Array.prototype.slice.call(arguments);
          args.shift();
          b = MathLib.hypot.apply(null, args);
        }

        a = MathLib.abs(a);
        b = MathLib.abs(b);

        // Return Infinity if one value is infinite
        if (a === Infinity || b === Infinity) {
          return Infinity;
        }

        x = Math.max(a, b);
        y = Math.min(a, b);

        return x * Math.sqrt(1 + Math.pow(y/x, 2));
      },
  hypot2: function () {
        var args = Array.prototype.slice.call(arguments);
        // Return Infinity if one value is infinite
        if (args.some(function (x) {
          return x === Infinity || x === -Infinity;
        })) {
          return Infinity;
        }
        return args.reduce(function (old, cur) {
          return old + cur*cur;
        }, 0);
      },
  inverse: function (x) {
        return 1/x;
      },
  isFinite: function (x) {
       return Math.abs(x) < Infinity;
      },
  isInt: function (x) {
        return x % 1 === 0;
      },
  isNaN: function (x) {
        return x !== x;
      },
  isNegZero: function (x) {
        return 1/x === -Infinity;
      },
  isOne: function (a)    {
        return Math.abs(a - 1) < MathLib.epsilon;
      },
  isPosZero: function (x) {
        return 1/x === Infinity;
      },
  isPrime: function (x) {
        var sqrt = Math.sqrt(x), i;
        if (x % 1 === 0 && x > 1) {
          if (x === 2) {
            return true;
          }
          if (x % 2 === 0) {
            return false;
          }
          for (i = 3; i <= sqrt; i += 2) {
            if (x % i === 0) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
  isReal: function (a)    {
        return true;
      },
  isZero: function (x) {
        return Math.abs(x) < MathLib.epsilon;
      },
  lg: function (x) {
        return Math.log(x) / Math.ln10;
      },
  ln: Math.log,
  log: function (base, x) {
        if (arguments.length === 1) {
          x = base;
          base = 10;
        }
        return Math.log(x) / Math.log(base);
      },
  minus: function (a, b) {
        return MathLib.plus(a, MathLib.negative(b));
  },
  mod: function (n, m) {
        var nm = n%m;
        return nm >= 0 ? nm : nm + m;
      },
  negative: function (x) {
        return -x;
      },
  pow: function (a, b) {
        if (a === 1 || (a === -1 && (b === Infinity || b === -Infinity))) {
          return 1;
        }
        return Math.pow(a, b);
      },
  radToDeg: function (x) {
        return x * 180 / Math.PI;
      },
  random: Math.random,
  risingFactorial: function (n, m, s) {
        var res = 1, j;
        s = s || 1;

        for (j = 0; j < m; j++) {
          res  *= (n + j * s);
        }
        return res;
      },
  round: function (x, n) {
          if (arguments.length === 1) {
            return Math.round(x);
          }
          return Math.round(x*Math.pow(10, n)) / Math.pow(10, n);
        },
  root: function (x, root) {
        if (arguments.length === 1) {
          return Math.sqrt(x);
        }
        return Math.pow(x, 1 / root);
      },
  sec: function (x) {
        return 1 / Math.cos(x);
      },
  sech: function (x) {
        return 2 / (Math.exp(x) + Math.exp(-x));
      },
  sgn: function (x) {
        return x > 0 ? 1:x < 0 ? -1 : 0;
      },
  sin: Math.sin,
  sinh: Math.sinh || function (x) {
        return (Math.exp(x) - Math.exp(-x)) / 2;
      },
  sqrt: function (x) {
        if (x === 0) {
          return 0;
        }
        return Math.sqrt(x);
      },
  tan: Math.tan,
  tanh: Math.tanh || function (x) {
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
      },
  trunc: function (x, n) {
        return x.toFixed(n || 0);
      },
  toContentMathML: function (x) {
        return '<cn>' + x + '</cn>';
      },
  toLaTeX: function (x, plus) {
        if (plus) {
          return (x<0 ? '-' : '+') + Math.abs(x);
        }
        else {
          return (x<0 ? '-' : '') + Math.abs(x);
        }
      },
  toMathML: function (x, plus) {
        if (plus) {
          return '<mo>' + (x<0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
        }
        else {
          return (x<0 ? '<mo>-</mo>': '') + '<mn>' + Math.abs(x) + '</mn>';
        }
      },
  toString: function (x, plus) {
        if (plus) {
          return (x<0 ? '-' : '+') + Math.abs(x);
        }
        else {
          return (x<0 ? '-' : '') + Math.abs(x);
        }
      }
};


MathLib.compare = function (a, b) {
  if(MathLib.type(a) !== MathLib.type(b)) {
    return MathLib.sgn(MathLib.type(a).localeCompare(MathLib.type(b)));
  }
  else if(typeof a === 'number') {
    return MathLib.sgn(a-b);
  }
  else if(typeof a === 'string') {
    return a.localeCompare(b);
  }
  return a.compare(b);
};

MathLib.type = function (x) {
  return x.type ? x.type : Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
};

MathLib.is = function (obj, type) {
  return prototypes[type] ? prototypes[type].isPrototypeOf(obj) : typeof obj === type;
  /* return Object.getPrototypeOf(new a.constructor(a)).isPrototypeOf(new b.constructor(b)) */
};


var functionList3 = {
  arithMean: function () {
        return MathLib.plus(this) / this.length;
      },
  gcd: function () {
        var min,
            a = this,
            magic = function (x) {
              return x !== min ? x%min : x;
            },
            isntZero = function (x) {
              return x !== 0;
            };

        // remove zeros and make negative values positive
        a = a.filter(function (x) {
          if (x<0) {
            a.push(-x);
            return false;
          }
          return x !== 0;
        });

        while(a.length > 1) {
          min = MathLib.min(a);
          a = a.map(magic).filter(isntZero);
        }
        return a[0] || min;
      },
  geoMean: function () {
        return MathLib.root(MathLib.times(this), this.length);
      },
  harmonicMean: function () {
        return this.length / MathLib.plus(Array.prototype.map.call(this, MathLib.inverse));
      },
  lcm: function () {
        return MathLib.times(this) / MathLib.gcd(this);
      },
  max: function (n) {
        if (n) {
          return this.sort(MathLib.compare)[this.length-n];
        }
        return Math.max.apply('Array', this);
      },
  min: function (n) {
        if (n) {
          return this.sort(MathLib.compare)[n-1];
        }
        return Math.min.apply('Array', this);
      }
};


var functionList4 = {
  plus: function () {
        return flatten(toArray.apply(arguments)).reduce(function (a, b) {
          if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
          }
          else if (typeof a === 'object') {
            return a.plus(b);
          }
          // We're assuming that the operations are commutative
          else if (typeof b === 'object') {
            return b.plus(a);
          }
        });
      },
  isEqual: function () {
        return flatten(toArray.apply(arguments)).every(function (a, i, arr) {
          if (a === arr[0]) {
            return true;
          }
          else if (typeof a === 'number' && typeof arr[0] === 'number') {
            // MathLib.epsilon is too small...
            return Math.abs(a - arr[0]) <= 3e-15;
          }
          else if (typeof a === 'object') {
            return a.isEqual(arr[0]);
          }
          else if (typeof arr[0] === 'object') {
            return arr[0].isEqual(a);
          }
          return false;
        });
      },
  times: function () {
        return flatten(toArray.apply(arguments)).reduce(function (a, b) {
          if (typeof a === 'number' && typeof b === 'number') {
            return a * b;
          }
          else if (typeof a === 'object') {
            return a.times(b);
          }
          // We're assuming that the operations are commutative
          else if (typeof b === 'object') {
            return b.times(a);
          }
        });
      }
};




var createFunction1 = function (f, name) {
  return function (x) {
    if (typeof x === 'number') {
      return f.apply('', arguments);
    }
    // JavaScript should have this build in!
    else if (typeof x === 'function') {
      return function (y) {return f(x(y));};
    }
    else if (x.type === 'set') {
      return MathLib.set( x.map(f) );
    }
    else if(x.type === 'complex') {
      return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
    }
    else if (Array.isArray(x)) {
      return x.map(f);
    }
    else {
      return x[name]();
    }
  };
};

var createFunction3 = function (f, name) {
  return function () {
    var arg = Array.prototype.slice.call(arguments),
        set = arg.shift();
    return f.apply(set, arg);
  };
};


var createFunction4 = function (f, name) {
  return function () {
    if (arguments.length > 1) {
      return f(Array.prototype.slice.apply(arguments));
    }
    else {
      return f(arguments[0]);
    }
  };
};

// Add the functions to the MathLib object
var func, cur;
for (func in functionList1) {
  if (functionList1.hasOwnProperty(func)) {

    cur = functionList1[func];
    Object.defineProperty(MathLib, func, {
      value: createFunction1(functionList1[func], func)
    });
  }
}

prototypes.set = [];
for (func in functionList3) {
  if (functionList3.hasOwnProperty(func)) {

    cur = functionList3[func];
    Object.defineProperty(MathLib, func, {
      value: createFunction3(functionList3[func], func)
    });

    MathLib.extendPrototype('set', func,
      (function (name) {
        return function (n) {
          return MathLib[name](this, n);
        };
      }(func))
    );
  }
}

for (func in functionList4) {
  if (functionList4.hasOwnProperty(func)) {

    cur = functionList4[func];
    Object.defineProperty(MathLib, func, {
      value: createFunction4(functionList4[func], func)
    });
  }
}
// ## <a id="Screen"></a>Screen
// This module contains the common methods of all drawing modules.
prototypes.screen = {};
MathLib.screen = function (id, options) {
  if (arguments.length === 0) {
    return Object.create(prototypes.screen, {});
  }

  var element = document.getElementById(id),
      screen= Object.create(prototypes.screen),
      contextmenu,
      set = {
        axisType:           'in',
        axisColor:          'black',
        axisLineWidth:      0.05,
        background:         'white',
        down:               -5,
        drag:               false,
        fillColor:          'rgba(0,255,0,0.1)',
        fillLeft:           -5,
        fillRight:          5,
        fontSize:           10,
        gridAngle:          Math.PI/6,
        gridColor:          '#cccccc',
        gridLineWidth:      0.05,
        gridType:           'cartesian',
        height:             element.height.baseVal ? element.height.baseVal.value : element.height,
        label:              true,
        labelColor:         'black',
        labelFont:          'Helvetica',
        labelFontSize:      '16px',
        left:               -5,
        pan:                true,
        plotColor:          'blue',
        plotLineWidth:      0.05,
        right:              5,
        stepSizeX:          1,
        stepSizeY:          1,
        state:              '',
        up:                 5,
        width:              element.width.baseVal ? element.width.baseVal.value : element.width,
        zoom:               true,
        zoomSpeed:          0.2
      };

  // set the options
  for (var opt in options) {
    if(options.hasOwnProperty(opt)) {
      set[opt] = options[opt];
    }
  }

  set.id             = id;
  set.element        = element;
  set.type           = element.localName;


  for (var prop in set) {
    if (set.hasOwnProperty(prop)) {
      Object.defineProperty(screen, prop, {
        value: set[prop],
        enumerable: true,
        writable: true
      });
    }
  }

  var curTransformation = MathLib.matrix([[screen.width/((screen.right-screen.left)*screen.stepSizeX), 0, screen.width/2],[0, -screen.height/((screen.up-screen.down)*screen.stepSizeY), screen.height/2],[0, 0, 1]]);
  Object.defineProperty(screen, 'curTransformation', {
    get: function (){return curTransformation;},
    set: function (x){curTransformation = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origTransformation', {
    value: MathLib.matrix([[screen.width/((screen.right-screen.left)*screen.stepSizeX), 0, screen.width/2],[0, -screen.height/((screen.up-screen.down)*screen.stepSizeY), screen.height/2],[0, 0, 1]])
  });

  Object.defineProperty(screen, 'curTranslateX', {
    get: function (){return screen.curTransformation[0][2];},
    set: function (x){screen.curTransformation[0][2] = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'curTranslateY', {
    get: function (){return screen.curTransformation[1][2];},
    set: function (y){screen.curTransformation[1][2] = y; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origTranslateX', {
    get: function (){return screen.origTransformation[0][2];},
    set: function (x){screen.origTransformation[0][2] = x;}
  });
  Object.defineProperty(screen, 'origTranslateY', {
    get: function (){return screen.origTransformation[1][2];},
    set: function (y){screen.origTransformation[1][2] = y;}
  });

  Object.defineProperty(screen, 'curZoomX', {
    get: function (){return screen.curTransformation[0][0];},
    set: function (x){screen.curTransformation[0][0] = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'curZoomY', {
    get: function (){return screen.curTransformation[1][1];},
    set: function (y){screen.curTransformation[1][1] = y; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origZoomX', {
    get: function (){return screen.origTransformation[0][0];},
    set: function (x){screen.origTransformation[0][0] = x;}
  });
  Object.defineProperty(screen, 'origZoomY', {
    get: function (){return screen.origTransformation[1][1];},
    set: function (y){set.origTransformation[1][1] = y;}
  });


  // Create a div which contains the svg/canvas element and the contextmenu
  screen.screenWrapper = document.createElement('div');
  screen.screenWrapper.className = 'MathLib screenWrapper';
  element.parentNode.insertBefore(screen.screenWrapper, element);
  screen.screenWrapper.appendChild(element);


  // The context menu
  screen.contextmenuWrapper = document.createElement('div');
  screen.contextmenuWrapper.className = 'MathLib contextmenuWrapper';
  screen.screenWrapper.appendChild(screen.contextmenuWrapper);


  contextmenu = document.createElement('ul');
  contextmenu.className = 'MathLib contextmenu';
  screen.contextmenuWrapper.appendChild(contextmenu);

  // The coordinates menu item
  var coordinates = document.createElement('li');
  coordinates.className = 'MathLib menuitem';
  coordinates.innerHTML = '<span>Position</span><span style="float: right; padding-right: 10px">❯</span>';
  coordinates.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(coordinates);

  var coordinatesSubmenu = document.createElement('ul');
  coordinatesSubmenu.className = 'MathLib contextmenu submenu';
  coordinates.appendChild(coordinatesSubmenu);

  var cartesian = document.createElement('li');
  cartesian.className = 'MathLib menuitem';
  cartesian.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  coordinatesSubmenu.appendChild(cartesian);

  var polar = document.createElement('li');
  polar.className = 'MathLib menuitem';
  polar.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  coordinatesSubmenu.appendChild(polar);
  



  // The reset view menu item
  var reset = document.createElement('li');
  reset.className = 'MathLib menuitem';
  reset.innerHTML = 'Reset View';
  reset.onclick = function () {
    screen.resetView();
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(reset);


  // Firefox support will be enabled when FF is supporting the fullscreenchange event
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=724816
  if (document.webkitCancelFullScreen /*|| document.mozCancelFullScreen*/) {
    // The fullscreen menuitem
    // (Only enabled if the browser supports fullscreen mode)
    var fullscreen = document.createElement('li');
    fullscreen.className = 'MathLib menuitem';
    fullscreen.innerHTML = 'View full screen';
    fullscreen.onclick = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        screen.enterFullscreen();
      }
      else {
        screen.exitFullscreen();
      }

      screen.contextmenuWrapper.style.setProperty('display', 'none');
    };
    contextmenu.appendChild(fullscreen);


    // Handle the fullscreenchange event
    var fullscreenchange = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        fullscreen.innerHTML = 'View Fullscreen';
        screen.resize(screen.width, screen.height);
        screen.curTranslateX = screen.origTranslateX;
        screen.curTranslateY = screen.origTranslateY;
        screen.redraw();
      }
      else {
        fullscreen.innerHTML = 'Exit Fullscreen';
        screen.resize(window.outerWidth, window.outerHeight);
        screen.curTranslateX = window.outerWidth/2;
        screen.curTranslateY = window.outerHeight/2;
        screen.redraw();
      }
    };

    if (document.webkitCancelFullScreen) {
      screen.screenWrapper.addEventListener('webkitfullscreenchange', fullscreenchange, false);
    }
    else if (document.mozCancelFullScreen) {
      screen.screenWrapper.addEventListener('mozfullscreenchange', fullscreenchange, false);
    }
  }



  return screen;
};



// ### Screen.prototype.axis()
// Draws axis on the screen
//
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'axis', function (options) {
  var type, i, axisOpt, labelOpt;

  // If no options are supplied, use the default options
  if (arguments.length === 0 || type === true) {
    axisOpt = {
      lineColor: this.axisColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: this.axisLineWidth
    };
    labelOpt = {
      color: this.labelColor,
      layer: 'back',
      font:     this.labelFont,
      fontSize: this.labelFontSize
    };
    type = this.axisType;
  }

  // If the argument is false, remove the axis
  else if (type === false) {
    // TODO: remove the axis
  }

  // Else use the supplied options
  else {
    axisOpt = {
      lineColor: options.color || this.axisColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: options.lineWidth ||this.axisLineWidth
    };
    labelOpt = {
      color: options.textColor || this.labelColor,
      layer: 'back',
      font:     options.font || this.labelFont,
      fontSize: options.font || this.labelFontSize
    };
    type = options.type || this.axisType;

    // Remember the options
    this.axisColor     = axisOpt.lineColor;
    this.axisLineWidth = axisOpt.lineWidth;
    this.axisType      = type;
    this.labelColor    = labelOpt.color;
    this.labelFont     = labelOpt.font;
    this.labelFontSize = labelOpt.fontSize;
  }


  if (type === 'in') {
    var lengthX = 10 / this.curZoomX,
        lengthY = 10 / this.curZoomY;

    this.line([[-50, 0], [50, 0]], axisOpt);
    this.line([[0, -50], [0, 50]], axisOpt);
    for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], axisOpt);
    }
    for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], axisOpt);
    }
    for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], axisOpt);
    }
    for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], axisOpt);
    }

    if (this.label) {
      for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, labelOpt);
      }
      for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, labelOpt);
      }
      for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, labelOpt);
      }
      for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, labelOpt);
      }
    }
    else if(type === 'out') {
      // TODO 
    }
  }

  return this;
});



// ### Screen.prototype.contextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'contextmenu', function (evt) {
  if (evt.preventDefault) {
   evt.preventDefault();
  }
  evt.returnValue = false;
  var x = this.getX(evt),
      y = this.getY(evt);

  var menu = this.contextmenuWrapper.childNodes[0];
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  var wrapper = this.contextmenuWrapper;
  wrapper.style.setProperty('display', 'block');
  wrapper.style.setProperty('width', '100%');
  wrapper.style.setProperty('height', '100%');
  
  menu.childNodes[0].childNodes[2].childNodes[0].innerHTML = 'cartesian: (' + MathLib.round(x, 2) + ', ' + MathLib.round(y, 2) + ')';
  menu.childNodes[0].childNodes[2].childNodes[1].innerHTML = 'polar: (' + MathLib.round(MathLib.hypot(x, y), 2) + ', ' + MathLib.round(Math.atan2(y, x), 2) + ')';

  var screen = this,
      listener = function () {
        screen.contextmenuWrapper.style.setProperty('display', 'none');
        wrapper.style.setProperty('width', '0px');
        wrapper.style.setProperty('height', '0px');
        screen.contextmenuWrapper.removeEventListener('click', listener);
      };
  this.contextmenuWrapper.addEventListener('click', listener);
});



// ### Screen.prototype.enterFullscreen()
// Displays the current plot in fullscreen mode.
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'enterFullscreen', function () {
  var elem = this.screenWrapper;  
  if (elem.requestFullScreen) {  
    elem.requestFullScreen();  
  }
  else if (elem.mozRequestFullScreen) {  
    elem.mozRequestFullScreen();  
  }
  else if (elem.webkitRequestFullScreen) {  
    elem.webkitRequestFullScreen();  
  }

  return this;
});



// ### Screen.prototype.exitFullscreen()
// Exits the fullscreen
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'exitFullscreen', function () {
  if (document.cancelFullScreen) {  
    document.cancelFullScreen();  
  }
  else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen();  
  }
  else if (document.webkitCancelFullScreen) {  
    document.webkitCancelFullScreen();  
  } 

  return this;
});



// ### Screen.prototype.getEventPoint
// Creates a point based on the coordinates of an event.
//
// *@param {event}*  
// *@returns {point}*
MathLib.extendPrototype('screen', 'getEventPoint', function (evt) {
  var x, y;
  if (evt.offsetX) {
    x = evt.offsetX;
    y = evt.offsetY;
  }
  else {
    x = evt.layerX + this.element.offsetTop;
    y = evt.layerY - this.element.offsetLeft;
  }
  return MathLib.point([x, y, 1]);
});



// ### Screen.prototype.getX()
// Returns the x coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
MathLib.extendPrototype('screen', 'getX', function (evt) {
  var osX;
  if (evt.offsetX) {
    osX = evt.offsetX;
  }
  else {
    osX = evt.layerX + this.element.offsetTop;
  }
  return (osX - this.curTranslateX) / this.curZoomX; 
});



// ### Screen.prototype.getY()
// Returns the y coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
MathLib.extendPrototype('screen', 'getY', function (evt) {
  var osY;
  if (evt.offsetY) {
    osY = evt.offsetY;
  }
  else {
    osY = evt.layerY-this.element.offsetLeft;
  }
  return (osY - this.curTranslateY) / this.curZoomY;
});



// ### Screen.prototype.grid()
// Draws the grid on the screen
//
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'grid', function (options) {
  var angle, type, i, gridOpt;

  // If no options are supplied, use the default options
  if (arguments.length === 0 || type === true) {
    gridOpt= {
      lineColor: this.gridColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: this.gridLineWidth
    };
    type = this.gridType;
    angle = this.gridAngle;
  }
  // If the argument is false, remove the grid
  else if (type === false) {
    // TODO: remove the grid
  }
  // Else use the supplied options
  else {
    gridOpt= {
      lineColor: options.color || this.gridColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: options.lineWidth || this.gridLineWidth
    };
    type = options.type || this.gridType;
    angle = options.angle || this.gridAngle;

    // Remember the options
    this.girdColor     = gridOpt.lineColor;
    this.gridLineWidth = gridOpt.lineWidth;
    this.gridType      = type;
    this.gridAngle     = angle;
  }

  if (type === 'cartesian') {
    for (i = -50; i <= 50; i += this.stepSizeX) {
      this.line([[i, -50], [i, 50]], gridOpt);
    }
    for (i = -50; i <= 50; i += this.stepSizeY) {
      this.line([[-50, i], [50, i]], gridOpt);
    }
  }
  else if (type === 'polar') {
    for (i = 0; i < 2*Math.PI; i += angle) {
      this.line([[0, 0], [50*Math.cos(i), 50*Math.sin(i)]], gridOpt);
    }
    for (i = 1; i < 60; i += 1) {
      this.circle(MathLib.circle([0, 0, 1], i), gridOpt);
    }
  }

  return this;
});



// ### Screen.prototype.lineEndPoint()
// Calculates the both endpoints for the line
// for drawing purposes
//
// *@param {line|array}*  
// *@returns {array}* The array has the format [[x1, y1], [x2, y2]]
MathLib.extendPrototype('screen', 'lineEndPoints', function (l) {
  if (l.type === 'line') {
    var right = -(l[2] + l[0]* 50) / l[1],
        up    = -(l[2] + l[1]* 50) / l[0],
        left  = -(l[2] + l[0]*-50) / l[1],
        down  = -(l[2] + l[1]*-50) / l[0],
        res = [];

    if (right<50 && right>-50) {
      res.push([50, right]);
    }
    if (left<50 && left>-50) {
      res.push([-50, left]);
    }
    if (up<50 && up>-50) {
      res.push([up, 50]);
    }
    if (down<50 && down>-50) {
      res.push([down, -50]);
    }
    return res;
  }
  else {
    return l;
  }
});



// ### Screen.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousedown', function (evt) {
  // Only start the action if the left mouse button was clicked
  if (evt.button !== 0) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Pan mode
  // Pan anyway when drag is disabled and the user clicked on an element 
  if(evt.target.tagName === 'canvas' || evt.target.tagName === 'svg' || !this.drag) {
    this.interaction = 'pan';
    this.startPoint = this.getEventPoint(evt);
    this.startTransformation = this.curTransformation.copy();
    // this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
    // this.stateOrigin = this.curTransformation.inverse().times(this.getEventPoint(evt));
  }

  // Drag mode
  // else {
  //   this.interaction = 'drag';
  //   this.stateTarget = evt.target;
  //   this.stateTf = g.getCTM().inverse();
  //   this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
  // }
});



// ### Screen.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousemove', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  var svgDoc = evt.target.ownerDocument,
      g = this.ctx,
      p, m, transform;

  // Pan mode
  if(this.interaction === 'pan' && this.pan) {
    // p = this.stateTf.times(this.stateTf.inverse().times(this.getEventPoint(evt)).minus(this.stateOrigin));
    p = this.getEventPoint(evt).minus(this.startPoint);
    this.curTranslateX = this.startTransformation[0][2] + p[0];
    this.curTranslateY = this.startTransformation[1][2] + p[1];
    this.redraw();
  }

  // Drag mode
  // else if(this.state === 'drag' && this.drag) {
  //   p = this.getEventPoint(evt).matrixTransform(g.getCTM().inverse());
  //   this.setCTM(this.stateTarget, this.element.createSVGMatrix().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y).multiply(g.getCTM().inverse()).multiply(this.stateTarget.getCTM()));
  //   this.stateOrigin = p;
  // }
});



// ### Screen.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmouseup', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Go back to normal mode
  if(this.interaction === 'pan' || this.interaction === 'drag') {
    this.interaction = '';
  }

});



// ### Screen.prototype.onmousewheel()
// Handles the mousewheel event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousewheel', function (evt) {
  var delta, k, p, z;

  if (!this.zoom) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Chrome/Safari
  if (evt.wheelDelta) {
    delta = evt.wheelDelta / 360;
  }
  // Firefox
  else {
    delta = evt.detail / -9;
  }

  z = Math.pow(1 + this.zoomSpeed, delta);
  p = this.curTransformation.inverse().times(this.getEventPoint(evt));

  // Compute new scale matrix in current mouse position
  k = MathLib.matrix([[z, 0, p[0] - p[0]*z], [0, z, p[1] - p[1]*z ], [0, 0, 1]]);

  this.curTransformation = this.curTransformation.times(k);
  this.redraw();

  if (typeof this.startTransformation === "undefined") {
    this.startTransformation = this.curTransformation.inverse();
  }

  this.startTransformation = this.startTransformation.times(k.inverse());
});
// ## <a id="Canvas"></a>Canvas
// The module for drawing plots on a canvas.
// A new canvas can be initialised by the following code:
// ```
// MathLib.canvas('canvasId')
// ```
prototypes.canvas = MathLib.screen();
MathLib.canvas = function (canvasId) {
  var canvas = MathLib.screen(canvasId);
  canvas[proto] = prototypes.canvas;
  Object.defineProperty(canvas, 'drawingStack', {value: []});

  // Wrapper
  var wrapperDiv = document.createElement('div');
  wrapperDiv.style.setProperty('width', '100%');
  wrapperDiv.style.setProperty('height', '100%');
  wrapperDiv.style.setProperty('position', 'relative');
  canvas.element.parentNode.insertBefore(wrapperDiv, canvas.element.wrapperDiv);
  
  // The back layer
  var backLayer = document.createElement('canvas');
  backLayer.setAttribute('width', canvas.width + 'px');
  backLayer.setAttribute('height', canvas.height + 'px');
  backLayer.classList.add('MathLib-backLayer');
  backLayer.classList.add('MathLib-canvas');
  canvas.backLayer = {
    ctx: backLayer.getContext('2d'),
    element: backLayer
  };
  wrapperDiv.appendChild(backLayer);

  // The main layer
  canvas.mainLayer = {
    ctx: document.getElementById(canvasId).getContext('2d'),
    element: document.getElementById(canvasId)
  };
  wrapperDiv.appendChild(canvas.mainLayer.element);

  // The front layer
  var frontLayer = document.createElement('canvas');
  frontLayer.setAttribute('width', canvas.width + 'px');
  frontLayer.setAttribute('height', canvas.height + 'px');
  frontLayer.classList.add('MathLib-frontLayer');
  frontLayer.classList.add('MathLib-canvas');
  canvas.frontLayer = {
    ctx: frontLayer.getContext('2d'),
    element: frontLayer
  };
  wrapperDiv.appendChild(frontLayer);


  var layers = [canvas.mainLayer, canvas.backLayer, canvas.frontLayer];
  

  layers.forEach(function (l) {
    // Transform the canvases
    l.ctx.save();
    l.ctx.transform(canvas.curZoomX, 0, 0, canvas.curZoomY, canvas.curTranslateX, canvas.curTranslateY);

    // Placing the layers on top of each other
    l.element.style.setProperty('position', 'absolute');
    l.element.style.setProperty('left', '0px');
    l.element.style.setProperty('top', '0px');
  });



  // Chrome tries desperately to select some text
  canvas.frontLayer.element.onselectstart = function(){ return false; };
  canvas.frontLayer.element.onmousedown = function (evt) {
    canvas.onmousedown(evt);
  };
  canvas.frontLayer.element.oncontextmenu = function (evt) {
    canvas.oncontextmenu(evt);
  };
  canvas.frontLayer.element.onmousemove = function (evt) {
    canvas.onmousemove(evt);
  };
  canvas.frontLayer.element.onmouseup = function (evt) {
    canvas.onmouseup(evt);
  };
  if('onmousewheel' in canvas.frontLayer.element) {
    canvas.frontLayer.element.onmousewheel = function (evt) {
       canvas.onmousewheel(evt);
    };
  }
  else {  // Firefox names it a bit different
    canvas.frontLayer.element.DOMMouseScroll = function (evt) {
       canvas.onmousewheel(evt);
    };
  }


  return canvas;
};



// ### Canvas.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'applyTransformation', function () {
  this.clearLayer('back', 'main', 'front');
  var m = this.curTransformation;
  this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

  return this;
});



// ### Canvas.prototype.circle
// Draws a circle on the screen.
//
// *@param {canvas}* The canvas to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'circle', function (circle, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 255, 0.05)',
        lineColor:  'rgba(0, 0, 255, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  // Draw the line
  ctx.beginPath();
  ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Push the circle onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: circle,
      options: opt,
      type: 'circle'
    });
  }

  return this;
});



// ### Canvas.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'clearLayer', function () {
  var canvas = this,
      p1 = this.curTransformation.inverse().times(MathLib.point(this.width, 0)),
      p2 = this.curTransformation.inverse().times(MathLib.point(0, this.height));
  Array.prototype.forEach.call(arguments, function (layer) {
    canvas[layer + 'Layer'].ctx.clearRect(p1[0], p1[1], p2[0]-p1[0], p2[1]-p1[1]);
  });
  return this;
});



// ### Canvas.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'line', function (line, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 0)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
      points  = this.lineEndPoints(line),
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.lineTo(points[1][0], points[1][1]);
  ctx.stroke();
  ctx.closePath();

  // Push the line onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: line,
      options: opt,
      type: 'line'
    });
  }

  return this;
});



// ### Canvas.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('canvas', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});



// ### Canvas.prototype.normalizeOptions
// Converts the options to the internal format
//
// *@param {object}* default options  
// *@param {object}* user options  
// *@returns {object}* the normalized options
MathLib.extendPrototype('canvas', 'normalizeOptions', function (defaultOpt, userOpt) {
  return {
    fillStyle:            userOpt.fillColor  || userOpt.color          || defaultOpt.fillColor || defaultOpt.color,
    lineWidth:            userOpt.lineWidth  || defaultOpt.lineWidth, 
    font:                 userOpt.font       || defaultOpt.font,
    fontSize:             userOpt.fontSize   || defaultOpt.fontSize,
    size:                 userOpt.size       || defaultOpt.size,
    mozDash:              userOpt.dash       || defaultOpt.dash,   
    mozDashOffset:        userOpt.dashOffset || defaultOpt.dashOffset, 
    strokeStyle:          userOpt.lineColor  || userOpt.color          || defaultOpt.lineColor || defaultOpt.color,
    webkitLineDash:       userOpt.dash       || defaultOpt.dash,   
    webkitLineDashOffset: userOpt.dashOffset || defaultOpt.dashOffset
  };
});



// ### Canvas.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'path', function (path, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 0)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  // Draw the path
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  path.forEach(function (x) {
    ctx.lineTo(x[0], x[1]);
  });
  ctx.stroke();
  ctx.closePath();

  // Push the path onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: path,
      options: opt,
      type: 'path'
    });
  }

  return this;
});



// ### Canvas.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'point', function (point, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 1)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  // Draw the path
  ctx.beginPath();
  ctx.arc(point[0]/point[2], point[1]/point[2], 0.05, 0, 2*Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Push the point onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: point,
      options: opt,
      type: 'point'
    });
  }

  return this;
});



// ### Canvas.prototype.redraw()
// Redraws the canvas
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'redraw', function () {
  var canvas = this;

  this.clearLayer('back', 'main', 'front');

  // redraw the background
  this.grid();
  this.axis();

  // redraw the main layer
  this.drawingStack.forEach(function(x, i) {
    canvas[x.type](x.object, x.options); 
  });

  return this;
});



// ### Canvas.prototype.resetView
// Resets the view to the default values.
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resetView', function () {
  this.clearLayer('back', 'main', 'front');
  var m = this.origTransformation;
  this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.redraw();
  return this;
});



// ### Canvas.prototype.resize()
// Resizes the canvas
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resize', function (x, y) {
  [this.backLayer, this.mainLayer, this.frontLayer].forEach(function (l) {
    l.element.setAttribute('width',   x + 'px');
    l.element.setAttribute('height',  y + 'px');
  });
  return this;
});



// ### Canvas.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'text', function (str, x, y, userOpt) {
  var defaultOpt = {
        font:       'Helvetica',
        fontSize:   '16px',
        fillColor:  'rgba(0, 0, 0, 1)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0,
        size:       0.4
      },
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  ctx.font = opt.fontSize + ' ' + opt.font;

  // Draw the path
  ctx.save();
  ctx.transform(
    1 / this.curZoomX,  0,  // The first coordinate must only be zoomed.
    0, 1 / this.curZoomY,  // The second coordinate must point in the opposite direction. 
    -this.left * this.stepSizeX / this.curZoomX,
     this.up   * this.stepSizeY / this.curZoomY
  );
  ctx.fillText(str, x * this.curZoomX, -y * this.curZoomY);
  ctx.restore();

  // Push the text onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: str,
      options: opt,
      type: 'text'
    });
  }

  return this;
});
// ## <a id="SVG"></a>SVG
// The module for drawing plots on SVG elements.
// A new MathLib svg element can be initialised by the following code:
// ```
// MathLib.svg('svgId')
// ```
//
// Panning, dragging and zooming are based on Andrea Leofreddi's SVGPan.js (v 1.2.2)
// <http://code.google.com/p/svgpan/>

prototypes.svg = MathLib.screen();
MathLib.svg = function (svgId) {
  var svgElement = document.getElementById(svgId),
      svg = MathLib.screen(svgId);

  svg[proto] = prototypes.svg;

  var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  ctx.setAttributeNS(null, 'transform', 'matrix(' + svg.curZoomX + ',0, 0,' + svg.curZoomY + ', ' + svg.width/2 + ', ' + svg.height/2 + ')');
  svgElement.appendChild(ctx);
  svg.ctx = ctx;

  var backLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  backLayer.className.baseVal += ' MathLib-backLayer ';
  ctx.appendChild(backLayer);
  svg.backLayer = {
    element: backLayer
  };

  var mainLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  mainLayer.className.baseVal += ' MathLib-mainLayer ';
  ctx.appendChild(mainLayer);
  svg.mainLayer = {
    element: mainLayer
  };

  var frontLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  frontLayer.className.baseVal += ' MathLib-frontLayer ';
  ctx.appendChild(frontLayer);
  svg.frontLayer = {
    element: frontLayer
  };


  // Chrome tries desperately to select some text
  svgElement.onselectstart = function(){ return false; };
  svgElement.onmousedown = function (evt) {
    svg.onmousedown(evt);
  };
  svgElement.oncontextmenu = function (evt) {
    svg.oncontextmenu(evt);
  };
  svgElement.onmousemove = function (evt) {
    svg.onmousemove(evt);
  };
  svgElement.onmouseup = function (evt) {
    svg.onmouseup(evt);
  };
  if('onmousewheel' in svgElement) {
    svgElement.onmousewheel = function (evt) {
       svg.onmousewheel(evt);
    };
  }
  else {  // Firefox names it a bit different
    svgElement.DOMMouseScroll = function (evt) {
       svg.onmousewheel(evt);
    };
  }

  return svg;
};



// ### SVG.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'applyTransformation', function () {
  var m = this.curTransformation;
  this.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
  return this;
});


// ### SVG.prototype.circle
// Draws a circle on the screen.
//
// *@param {circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'circle', function (circle, userOpt) {
  var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 255, 0.05)',
        lineColor: 'rgba(0, 0, 255, 1)',
        lineWidth: '0.05'
      },
      layer, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgCircle.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgCircle.setAttributeNS(null, 'cx', circle.center[0] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'cy', circle.center[1] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'r',  circle.radius);

  // Draw the circle
  layer.element.appendChild(svgCircle);

  return this;
});



// ### SVG.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'clearLayer', function () {
  var svg = this;
  Array.prototype.forEach.call(arguments, function (layer) {
    layer = svg[layer + 'Layer'].element;
    while (layer.hasChildNodes()) {
      layer.removeChild(layer.firstChild);
    }
  });
  return this;
});



// ### SVG.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'line', function (line, userOpt) {
  var svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line'),
      points  = this.lineEndPoints(line),
      defaultOpt = {
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: '0.05'
      },
      layer, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgLine.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgLine.setAttributeNS(null, 'x1', points[0][0]);
  svgLine.setAttributeNS(null, 'y1', points[0][1]);
  svgLine.setAttributeNS(null, 'x2', points[1][0]);
  svgLine.setAttributeNS(null, 'y2', points[1][1]);

  // Draw the line
  layer.element.appendChild(svgLine);

  return this;
});



// ### SVG.prototype.normalizeOptions
// Converts the options to the internal format
//
// *@param {object}* default options  
// *@param {object}* user options  
// *@returns {object}* the normalized options
MathLib.extendPrototype('svg', 'normalizeOptions', function (defaultOpt, userOpt) {
  return {
    fill:                userOpt.fillColor  || userOpt.color          || defaultOpt.fillColor || defaultOpt.color,
    'font-family':       userOpt.font       || defaultOpt.font,
    'font-size':         userOpt.fontSize   || defaultOpt.fontSize,
    size:                userOpt.size       || defaultOpt.size,
    stroke:              userOpt.lineColor  || userOpt.color          || defaultOpt.lineColor || defaultOpt.color,
    'stroke-dasharray':  userOpt.dash       || defaultOpt.dash,
    'stroke-dashoffset': userOpt.dashOffset || defaultOpt.dashOffset,
    'stroke-width':      userOpt.lineWidth  || defaultOpt.lineWidth
  };
});



// ### SVG.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('svg', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});



// ### SVG.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'path', function (path, userOpt) {
  var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      pathString = 'M' + path.reduce(function(prev, cur) {
        return prev + ' L' + cur.join(' ');
      }).slice(1, -1),
      defaultOpt = {
        fillColor: 'rgba(255, 255, 255, 0)',
        lineColor: 'rgba(0, 0, 255, 1)',
        lineWidth: '0.05'
      },
      layer, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgPath.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgPath.setAttributeNS(null, 'd', pathString);

  // Draw the path
  layer.element.appendChild(svgPath);

  return this;
});



// ### SVG.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'point', function (point, userOpt) {
  var svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 0, 1)',
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: '0.05'
      },
      layer, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgPoint.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgPoint.setAttributeNS(null, 'cx', point[0]/point[2]);
  svgPoint.setAttributeNS(null, 'cy', point[1]/point[2]);
  svgPoint.setAttributeNS(null, 'r',  0.1);

  // Draw the path
  layer.element.appendChild(svgPoint);

  return this;
});



// ### SVG.prototype.redraw
// This method is necessary because we want to generalize
// some methods and canvas needs the redraw method.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'redraw', function () {
  return this;
});



// ### SVG.prototype.resetView
// Resets the view to the default values.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resetView', function () {
  this.ctx.setAttribute('transform', 'matrix(' + this.origZoomX + ', 0, 0, ' + this.origZoomY + ', ' + this.origTranslateX + ', ' + this.origTranslateY + ')');
  return this;
});



// ### SVG.prototype.resize()
// Resizes the SVG element
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resize', function (x, y) {
  this.element.setAttribute('width', x + 'px');
  this.element.setAttribute('height', y + 'px');
  return this;
});



// ### SVG.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'text', function (str, x, y, userOpt) {
  var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      defaultOpt = {
        font:      'Helvetica',
        fontSize:  '16px',
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: 0.05
      },
      layer, prop, opt, size;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  size = 1 / (3*parseFloat(opt['font-size']));

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop) && prop !== 'size') {
      svgText.setAttributeNS(null, prop, opt[prop]);
    }
  }
  svgText.setAttributeNS(null, 'transform',  'scale(' + size + ', -' + size + ')');

  // Set the geometry
  svgText.textContent = str;
  svgText.setAttributeNS(null, 'x', 1 / size * x);
  svgText.setAttributeNS(null, 'y', 1 / size * y);

  // Draw the line
  layer.element.appendChild(svgText);

  return this;
});
// ## <a id="Vector"></a>Vector
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `MathLib.vector([1, 2, 3])`
// to create the following vector:  
//    ⎛ 1 ⎞  
//    ⎜ 2 ⎟  
//    ⎝ 3 ⎠

prototypes.vector = [];
MathLib.vector = function (vector) {
  var arr, res, i;

  if (typeof vector === "string") {
    arr = vector.split(":").map(parseFloat);
    if (arr.length === 2) {
      arr = arr.splice(1, 0, 1);
    }
    vector = [];
    for (i = arr[0]; i <= arr[2]; i += arr[1]) {
      vector.push(i);
    }
  }


  vector[proto] = prototypes.vector;
  /*Object.defineProperties(vector, {});*/
  return vector;
};


// Setting the .constructor property to MathLib.vector
MathLib.extendPrototype('vector', 'constructor', MathLib.vector);

// Setting the .type property to 'vector'
MathLib.extendPrototype('vector', 'type', 'vector');



// ### Vector.prototype.conjugate()
// Calculates the conjugate of a vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'conjugate', function () {
  return MathLib.vector(this.map(MathLib.conjugate));
});



// ### Vector.prototype.dyadicProduct()
// Calculates the dyadic product of two vectors.
//
// *@param {vector}*  
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'dyadicProduct', function (v) {
  return MathLib.matrix(this.map(function (x) {
    return v.map(function (y) {
      return MathLib.times(x, y);
    });
  }));
});



// ### Vector.prototype.isEqual()
// Determines if two vectors are equal
//
// *@param {vector}* v The vector to compare  
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'isEqual', function (v) {
  if(this.length !== v.length) {
    return false;
  }

  return this.every(function (x, i) {
    return MathLib.isEqual(x, v[i]);
  });
});



// ### Vector.prototype.isZero()
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'isZero', function (v) {
  return this.every(MathLib.isZero);
});



// ### Vector.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});



// ### Vector.prototype.minus()
// Calculates the difference of two vectors
//
// *@param {vector}* The vector to be subtracted.  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'minus', function (m) {
  return this.plus(m.negative());
});



// ### Vector.prototype.negative()
// Returns the negative vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'negative', function () {
  return this.map(MathLib.negative);
});



// ### Vector.prototype.normalize()
// Normalizes the vector to have length one
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'normalize', function () {
  return this.times(1 / this.size);
});



// ### Vector.prototype.plus()
// Calculates the sum of two vectors
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'plus', function (v) {
  if (this.length === v.length) {
    return MathLib.vector(this.map(function (x, i) {
      return MathLib.plus(x, v[i]);
    }));
  }
});



// ### Vector.prototype.scalarproduct()
// Calculates the scalarproduct of two vectors
//
// *@param {vector}*  
// *@returns {number|complex}*
MathLib.extendPrototype('vector', 'scalarproduct', function (v) {
  var res = 0, i, ii;
  for (i = 0, ii = this.length; i < ii; i++) {
    res = MathLib.plus(res, MathLib.times(this[i], v[i]));
  }
  return res;
});



// ### Vector.prototype.size()
// Determines the length of the vector.
// Named size, as length is already used by JavaScript.
//
// *@returns {number}*
MathLib.extendPrototype('vector', 'size', function () {
  return Math.sqrt(this.conjugate().scalarproduct(this));
});



// ### Vector.prototype.times()
// Multiplies the vector by a (complex) number or a matrix.
// The vector is multiplied from left to the matrix. 
// If you want to multiply it from the right use
// matrix.times(vector) instead of vector.times(matrix)
//
// *@param {number|complex|matrix}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'times', function (n) {
  var res = [], i, ii;
  if (typeof n === "number" || n.type === "complex") {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
  if (n.type === "matrix") {
    res = n.toColVectors();
    for (i = 0, ii = res.length; i < ii; i++) {
      res[i] = this.scalarproduct(res[i]);
    }
    return MathLib.vector(res);
  }
});



// ### Vector.prototype.toArray()
// Converts the vector to an Array
//
// *@returns {array}*
MathLib.extendPrototype('vector', 'toArray', function () {
  return this.slice();
});



// ### Vector.prototype.toContentMathML()
// Returns the content MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toContentMathML', function () {
  return this.reduce(function (old, cur) {
    return old + MathLib.toContentMathML(cur);
  }, '<vector>') + '</vector>';
});



// ### Vector.prototype.toLaTeX()
// Returns a LaTeX representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toLaTeX', function () {
  return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
    return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
  }) + '\n\\end{pmatrix}';
});



// ### Vector.prototype.toMathML()
// Returns the (presentation) MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toMathML', function () {
  return this.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
});



// ### Vector.prototype.toString()
// Returns a string representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toString', function () {
  return '(' + this.reduce(function (old, cur) {
    return old + ', ' + MathLib.toLaTeX(cur);
  }) + ')';
});



// ### Vector.prototype.vectorproduct()
// Calculates the vectorproduct of two vectors
//
// *@param {vector}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'vectorproduct', function (v) {
  var res = [];
  /* TODO: Extend vectorproduct for non three-dimensional vectors */
  if (this.length === 3 && v.length === 3) {
    res.push(MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])));
    res.push(MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])));
    res.push(MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0])));
  }
  return MathLib.vector(res);
});



// ### Vector.zero()
// Returns a zero vector of given size
//
// *@param {number}* The number of entries in the vector.  
// *@returns {vector}*
MathLib.extend('vector', 'zero', function (n) {
  var res = [], i;
  for (i=0; i<n; i++) {
    res.push(0); 
  }
  return MathLib.vector(res);
});
// ## <a id="Circle"></a>Circle
// MathLib.circle expects two arguments.
// First the center in the form of an Array or a MathLib.point.
// The second argument should be the radius of the circle.
//
// #### Simple use case:  
// ```
// // Create a circle with center (1, 2) and radius 3.  
// var c = MathLib.circle([1, 2], 3);  
// c.center                   // The center of the circle (point)  
// c.radius                   // returns the radius of the circle
// ```

prototypes.circle = {};
MathLib.circle = function (c, r) {
  if (c.type === undefined) {
    c = MathLib.point(c.concat(1));
  }
  return Object.create(prototypes.circle, {
    radius: {
      value: r,
      writable: true
    },
    center: {
      value: c,
      writable: true
    }
  });
};


// Set the constructor property to MathLib.circle.
MathLib.extendPrototype('circle', 'constructor', MathLib.circle);


// Set the type property to 'circle'.
MathLib.extendPrototype('circle', 'type', 'circle');


// ### Circle.prototype.area()
// Calculates the area of the circle.
//
// *@param {number}* The area of the circle
MathLib.extendPrototype('circle', 'area', function () {
  return this.radius * this.radius * MathLib.pi;
});


// ### Circle.prototype.circumference()
// Calculates the circumference of the circle.
//
// *@param {number}* The circumference of the circle
MathLib.extendPrototype('circle', 'circumference', function () {
  return 2 * this.radius * MathLib.pi;
});


// ### Circle.prototype.draw()
// Draw the circle onto the screen.
//
// *@param {screen}* The screen to draw onto.  
// *@param {options}* Optional drawing options  
// *@return {circle}* Returns the circle for chaining
MathLib.extendPrototype('circle', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var circle = this;
    screen.forEach(function (x) {
      x.circle(circle, options);
    });
  }
  else {
    screen.circle(this, options);
  }
  return this;
});


// ### Circle.prototype.isContaining()
// Determine if a circle is containing an other point.
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isContaining', function (a) {
  if (a.type === "point" && a.dim === 2) {
    return a.distanceTo(this.center) < this.radius;
  }
});


// ### Circle.prototype.isEqual()
// Checks if two circles are equal
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isEqual', function (c) {
  return MathLib.isEqual(this.radius, c.radius)  && this.center.isEqual(c.center);
});


// ### Circle.prototype.reflectAt()
// Reflect the circle at a point or line
//
// *@return {circle}*
MathLib.extendPrototype('circle', 'reflectAt', function (a) {
  return MathLib.circle(this.center.reflectAt(a), this.radius);
});


// ### Circle.prototype.toMatrix()
// Converts the circle to the corresponding matrix.
//
// *@return {matrix}* 
MathLib.extendPrototype('circle', 'toMatrix', function () {
  var x = this.center.get(0),
      y = this.center.get(1),
      r = this.radius;
  return MathLib.matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x*x + y*y - r*r]]);
});
// ## <a id="Complex"></a>Complex
// MathLib.complex is the MathLib implementation of complex numbers.
//
// There are two ways of defining complex numbers:
//
// * An Array containing the real and the complex part.
// * Two numbers representing the absolute value and the argument of the
// complex number (polar representation)
//
// #### Simple use case:
// ```
// // Create the complex number 1 + 2i  
// var c = MathLib.complex([1, 2]);  
// ```

prototypes.complex = {};
MathLib.complex = function () {
  var z, re, im;
  if (arguments.length === 1 && Array.isArray(arguments[0]) && arguments[0].length === 2) {
    z = arguments[0];
    re = arguments[0][0];
    im = arguments[0][1];
  }
  else if (arguments.length === 2) {
    re = arguments[0] * Math.cos(arguments[1]);
    im = arguments[0] * Math.sin(arguments[1]);
    z = [re, im];
  }

  return Object.create(prototypes.complex, {
    re: {
      value: re,
      enumerable: true
    },
    im: {
      value: im,
      enumerable: true
    },
    z: {
      value: z,
      enumerable: true
    }
  });
};


// Set the constructor property to MathLib.complex
MathLib.extendPrototype('complex', 'constructor', MathLib.complex);


// Set the type property to 'complex'.
MathLib.extendPrototype('complex', 'type', 'complex');


// Returns the argument (= the angle) of the complex number
MathLib.extendPrototype('complex', 'argument', function (x) {
    return (Math.atan2(this.im, this.re) + 2 * Math.PI) % (2*Math.PI);
});


// Returns the absolute value of the number
MathLib.extendPrototype('complex', 'abs', function (x) {
  return MathLib.hypot(this.re, this.im);
});


// Returns the inverse cosine of the number
MathLib.extendPrototype('complex', 'arccos', function () {
  return MathLib.minus(Math.PI/2, this.arcsin());
});


// Returns the inverse cotangent of the number
MathLib.extendPrototype('complex', 'arccot', function () {
  return MathLib.minus(Math.PI/2, this.arctan());
});


// Returns the inverse cosecant of the number
MathLib.extendPrototype('complex', 'arccsc', function () {
  return MathLib.times(MathLib.complex([0, 1]), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))) , MathLib.divide(MathLib.complex([0, 1]), this))));
});


// Returns the inverse sine of the number
MathLib.extendPrototype('complex', 'arcsin', function () {
  var a = this.re, b = this.im;
  return MathLib.complex([
     MathLib.sgn(a)/2 * MathLib.arccos(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) - (a*a + b*b)),
     MathLib.sgn(b)/2 * MathLib.arcosh(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) + (a*a + b*b))
    ]);
});


// Returns the inverse cotangent of the number
MathLib.extendPrototype('complex', 'arctan', function () {
  var z = MathLib.complex(-this.im, this.re);
  return MathLib.times(MathLib.complex([0, 0.5]), MathLib.ln(MathLib.divide( MathLib.plus(1, z), MathLib.minus(1, z))));
});


// Returns the inverse hyperbolic tangent of the number
MathLib.extendPrototype('complex', 'artanh', function () {
  return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
});


// Compares two complex numbers
MathLib.extendPrototype('complex', 'compare', function (x) {
  var a = MathLib.sgn(this.abs() - x.abs());
  return a ? a : MathLib.sgn(this.argument() - x.argument());
});


// Calculates the conjugate of a complex number
MathLib.extendPrototype('complex', 'conjugate', function () {
  return MathLib.complex([this.re, MathLib.negative(this.im)]);
});


// Copies the complex number
MathLib.extendPrototype('complex', 'copy', function () {
  return MathLib.complex([MathLib.copy(this.re), MathLib.copy(this.im)]);
});


// Calculates the cosine of a complex number
MathLib.extendPrototype('complex', 'cos', function () {
  return MathLib.complex([MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re)*MathLib.sinh(this.im)]);
});


// Calculates the hyperbolic cosine of a complex number
MathLib.extendPrototype('complex', 'cosh', function () {
  return MathLib.complex([MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im)*MathLib.sinh(this.re)]);
});


// ### Complex.prototype.divide()
// Divides a complex number by an other
//
// *@param {number|complex}* The divisor  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'divide', function (c) {
  return this.times(MathLib.inverse(c));
});


// ### Complex.prototype.exp()
// Evaluates the exponential function with complex argument
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'exp', function () {
  return MathLib.complex([MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re)*MathLib.sin(this.im)]);
});


// ### Complex.prototype.inverse()
// Calculates the inverse of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'inverse', function () {
  return MathLib.complex([MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))),
    MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2)))]);
});


// ### Complex.prototype.isEqual()
// Determines if the complex number is equal to another number.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isEqual', function (n) {
  if (typeof n === "number") {
    return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
  }
  if (n.type === "complex") {
    return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
  }
  return false;
});


// ### Complex.prototype.isFinite()
// Determines if the complex number is finite.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isFinite', function () {
  return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
});


// ### Complex.prototype.isOne()
// Determines if the complex number is equal to 1.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isOne', function () {
  return MathLib.isOne(this.re) && MathLib.isZero(this.im);
});


// ### Complex.prototype.isReal()
// Determines if the complex number is real.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isReal', function () {
  return MathLib.isZero(this.im);
});


// ### Complex.prototype.isZero()
// Determines if the complex number is equal to 0.
//
// *@returns {boolean}*
MathLib.extendPrototype('complex', 'isZero', function () {
  return MathLib.isZero(this.re) && MathLib.isZero(this.im);
});


// ### Complex.prototype.ln()
// Evaluates the natural logarithm with complex arguments
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'ln', function () {
  return MathLib.complex([MathLib.ln(this.abs()), this.argument()]);
});


// ### Complex.prototype.minus()
// Calculates the difference of two complex numbers
//
// *@param {number|complex}* The subtrahend  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'minus', function (c) {
  return this.plus(MathLib.negative(c));
});


// ### Complex.prototype.mod()
// Reduces the real and imaginary part mod a number
//
// *@param {number}*  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'mod', function (m) {
  return MathLib.complex([MathLib.mod(this.re, m), MathLib.mod(this.im, m)]);
});


// ### Complex.prototype.negative()
// Calculates the negative of the complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'negative', function () {
  return MathLib.complex([MathLib.negative(this.re), MathLib.negative(this.im)]);
});


// ### Complex.prototype.plus()
// Add complex numbers
//
// *@param {complex}* The number to be added  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'plus', function (c) {
  if (c.type === "complex") {
    return MathLib.complex([MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im)]);
  }
  else if (typeof c === "number") {
    return MathLib.complex([MathLib.plus(this.re, c), this.im]);
  }
});


// ### Complex.prototype.pow()
// Calculates the n-th pow of the complex number
//
// *@param {number}* The pow to which the complex number should be raised   
// *@returns {complex}*
MathLib.extendPrototype('complex', 'pow', function (n) {
  return MathLib.complex(Math.pow(this.abs(), n), n * this.argument());
});


// ### Complex.prototype.sin()
// Calculates the sine of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sin', function () {
  return MathLib.complex([MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re)*MathLib.sinh(this.im)]);
});


// ### Complex.prototype.sinh()
// Calculates the hyperbolic sine of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sinh', function () {
  return MathLib.complex([MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im)*MathLib.cosh(this.re)]);
});


// ### Complex.prototype.sgn()
// Calculates the signum of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sgn', function () {
  return MathLib.complex(1, this.argument());
});


// ### Complex.prototype.times()
// Multiplies complex numbers
//
// *@param {complex}* The number to be added  
// *@returns {complex}*
MathLib.extendPrototype('complex', 'times', function (c) {
  if (c.type === "complex") {
    return MathLib.complex([MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)),
        MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re))]);
  }
  else if (typeof c === "number") {
    return MathLib.complex([MathLib.times(this.re, c), MathLib.times(this.im, c)]);
  }
});


// ### Complex.prototype.toContentMathML()
// Returns the content MathML representation of the number
//
// *@returns {string}*
MathLib.extendPrototype('complex', 'toContentMathML', function () {
  return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
});


// ### Complex.prototype.toLaTeX()
// Returns the LaTeX representation of the complex number
//
// *@returns {string}*
MathLib.extendPrototype('complex', 'toLaTeX', function () {
  var str = '',
      reFlag = false;

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toLaTeX(this.re);
    reFlag = true;
  }
  if (!MathLib.isZero(this.im)) {
    str += MathLib.toLaTeX(this.im, reFlag) + 'i';
  }
  if (str.length === 0) {
    str = '0';
  }
  return str;
});


// ### Complex.prototype.toMathML()
// Returns the (presentation) MathML representation of the number
//
// *@returns {string}*
MathLib.extendPrototype('complex', 'toMathML', function () {
  var str = '', reFlag = false;

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toMathML(this.re);
    reFlag = true;
  }
  if (!MathLib.isZero(this.im)) {
    str += MathLib.toMathML(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
  }
  if (str.length === 0) {
    str = '<mn>0</mn>';
  }
  return str;
});


// ### Complex.prototype.toMatrix()
// Transforms the complex number to a 2x2 matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('complex', 'toMatrix', function () {
  return MathLib.matrix([[this.re, MathLib.negative(this.im)], [this.im, this.re]]);
});


// ### Complex.prototype.toPoint()
// Interprets the complex number as point in the two dimensional plane
//
// *@returns {point}*
MathLib.extendPrototype('complex', 'toPoint', function () {
  return MathLib.point(this.z.concat(1));
});


// ### Complex.prototype.toString()
// Custom toString function
//
// *@returns {string}*
MathLib.extendPrototype('complex', 'toString', function () {
  var str = '';

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toString(this.re);
  }
  if (!MathLib.isZero(this.im)) {
    str +=  (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
  }
  if (str.length === 0) {
    str = '0';
  }
  return str;
});




// ### Complex.one()
// Complex representation of 1.
//
// *@returns {complex}*
MathLib.extend('complex', 'one', MathLib.complex([1, 0]));


// ### Complex.zero()
// Complex representation of 0.
//
// *@returns {complex}*
MathLib.extend('complex', 'zero', MathLib.complex([0, 0]));
// ## <a id="Line"></a>Line
// The vector implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)
prototypes.line = MathLib.vector([]);
MathLib.line = function (line) {

  line[proto] = prototypes.line;
  Object.defineProperties(line, {
    dim: {
      value: line.length - 1
    }
  });
  return line;
};

// Setting the .constructor property to MathLib.line
MathLib.extendPrototype('line', 'constructor', MathLib.line);

// Setting the .type property to 'line'
MathLib.extendPrototype('line', 'type', 'line');


// ### Line.prototype.draw()
// Draws the line on one or more screens
//
// *@param {screen}* The screen to draw onto.  
// *@param {object}* [options] Drawing options  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var line = this;
    screen.forEach(function (x) {
      x.line(line, options);
    });
  }
  else {
    screen.line(this, options);
  }
  return this;
});


// ### Line.prototype.isEqual()
// Determines if two lines are equal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isEqual', function (q) {
  var p = this.normalize();
      q = q.normalize();

  if(this.dim !== q.dim) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
});


// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});


// ### Line.prototype.isOrthogonalTo()
// Determines if two lines are orthogonal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isOrthogonalTo', function (l) {
  return MathLib.isEqual(MathLib.point([0,0,1]).crossRatio(this.meet(MathLib.line.infinteLine), l.meet(MathLib.line.infinteLine), MathLib.point.I, MathLib.point.J), -1);
});


// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isParallelTo', function (l) {
  return this.every(function (x, i) {
    return MathLib.isEqual(x, l[i]) || i === l.length - 1;
  });
});


// ### Line.prototype.meet()
// Calculates the meet off two points
//
// *@param {line}*  
// *@returns {point}*
MathLib.extendPrototype('line', 'meet', function (l) {
  return MathLib.point([this[1]*l[2]-this[2]*l[1], l[0]*this[2]-this[0]*l[2], this[0]*l[1]-this[1]*l[0]]);
});


// ### Line.prototype.normalize()
// Normalizes the line.
// (Making the last component 1)
//
// *@returns {line}*
MathLib.extendPrototype('line', 'normalize', function (q) {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
});


// ### Line.prototype.toContentMathML()
// Returns content MathML representation of the line
//
// *@returns {string}*
/* MathLib.extendPrototype('line', 'toContentMathML', function (opt) { */
/* }); */


MathLib.extend('line', 'infiniteLine', MathLib.line([0,0,1]));
// ## <a id="MathML"></a>MathML
// The MathML implementation parses Content MathML.
prototypes.MathML = {};
MathLib.MathML = function (MathMLString) {
  var tokenizer = new DOMParser(),
      MathML;

  // Remove the Linebreaks ...
  MathMLString = MathMLString.replace(/\n/g, ''); 

  // and the unnecessary whitespace
  MathMLString = MathMLString.replace(/>\s*<(\w)/g, '><$1');
  MathMLString = MathMLString.replace(/<\/(\w+)>\s*<\/(\w)/g, '</$1></$2');

  // Gives an error in Firefox
  /* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); */
  MathML = tokenizer.parseFromString(MathMLString, 'application/xml');

  MathML[proto] = prototypes.MathML;
  Object.defineProperties(MathML, {
    // Setting the constructor this way fails in Safari
    constructor: {
      value: MathLib.MathML
    }
  });
  return MathML;
};


// Setting the .constructor property to MathLib.MathML  
// Setting it this way fails in all browsers except Chrome
/* MathLib.extendPrototype('MathML', 'constructor', MathLib.MathML); */

// Setting the .type property to 'MathML'
MathLib.extendPrototype('MathML', 'type', 'MathML');


// ### MathML.prototype.parse()
// Parses the MathML.
//
// *@return{number|a MathLib object}*  The result of the parsing
MathLib.extendPrototype('MathML', 'parse', function (math) {
  var createTreeWalker, apply, matrixrow, matrix, number, parser, set, vector;

  createTreeWalker = function (node) {
    return document.createTreeWalker(
      node,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) {return NodeFilter.FILTER_ACCEPT; } },
      false
    );
  };

  parser = function (start) {
    var treeWalker = createTreeWalker(start);

    do {
      var node = treeWalker.currentNode,
          name = node.nodeName;

      if (name === 'cn') {
        return number(node);
      }
      else if (name === 'apply') {
        return apply(node);
      }
      else if (name === 'cs') {
        return node.textContent;
      }
      else if (name === 'matrix') {
        return matrix(node);
      }
      else if (name === 'set') {
        return set(node);
      }
      else if (name === 'vector') {
        return vector(node);
      }
      // For the first node
      else if (name === '#document') {
        if (node.childNodes.length === 1) {
          return parser(node.childNodes[0]);
        }
        else {
          return Array.prototype.slice.call(node.childNodes).map(parser);
        }
      }
    }
    while (treeWalker.nextNode() !== null);
  };

  apply = function (node) {
    var children = Array.prototype.slice.call(node.childNodes),
        funcName = children.shift().nodeName,
        names = {
          power: 'pow',
          rem: 'mod',
          union: 'or',
          intersection: 'and',
          setdifference: 'without' 
        };

    if (funcName in names) {
      funcName = names[funcName];
    }

    if(funcName in MathLib) {
      if (children.length === 1) {
        return MathLib[funcName](parser(children[0]));
      }
      else {
        return MathLib[funcName](children.map(parser));
      }
    }
    else {
      var child = parser(children.shift());
      if (children.length === 1) {
        return child[funcName](parser(children[0]));
      }
      else {
        return child[funcName](children.map(parser));
      }
    }
  };

  matrix = function (node) {
    return MathLib.matrix(Array.prototype.slice.call(node.childNodes).map(matrixrow));
  };

  matrixrow = function (node) {
    return Array.prototype.slice.call(node.childNodes).map(parser);
  };

  number = function (node) {
    var type = node.getAttribute('type') !== null ? node.getAttribute('type') : 'number';

    if(type === 'number') {
      /* TODO: base conversions
      var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10'; */
      return +node.textContent;
    }
    else if (type === 'complex-cartesian') {
      return MathLib.complex([+node.childNodes[0].textContent, +node.childNodes[2].textContent]);
    }
    else if (type === 'complex-polar') {
      return MathLib.complex(+node.childNodes[0].textContent, +node.childNodes[2].textContent);
    }
  };

  set = function (node) {
    var type = node.getAttribute('type') !== null && node.getAttribute('type') === 'multiset' ? true : false;
    return MathLib.set(Array.prototype.slice.call(node.childNodes).map(parser), type);
  };

  vector = function (node) {
    return MathLib.vector(Array.prototype.slice.apply(node.childNodes).map(parser));
  };

  return parser(this);
});


// ### MathML.isSupported()
// Checks if MathML is supported by the browser.  
// Code stolen from Modernizr (http://www.modernizr.com/)
//
// *@return {boolean}*
MathLib.extend('MathML', 'isSupported', function () {
  var hasMathML = false,
      ns, div, mfrac;
  if ( document.createElementNS ) {
    ns = 'http://www.w3.org/1998/Math/MathML';
    div = document.createElement('div');
    div.style.position = 'absolute';
    mfrac = div.appendChild(document.createElementNS(ns,'math'))
                 .appendChild(document.createElementNS(ns,'mfrac'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('xx'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('yy'));
    document.body.appendChild(div);
    hasMathML = div.offsetHeight > div.offsetWidth;
    document.body.removeChild(div);
  }
  return hasMathML;
});


// ### MathML.loadMathJax()
// Loads MathJax dynamically.
//
// *@param{string}* [config] Optional config options
MathLib.extend('MathML', 'loadMathJax', function (config) {
  var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

    config = config || 'MathJax.Hub.Config({' +
                         'config: ["MMLorHTML.js"],' +
                         'jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],' +
                         'extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],' +
                         'TeX: {' +
                           'extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]' +
                         '}' +
                       '});';

    if (window.opera) {
      script.innerHTML = config;
    }
    else {
      script.text = config;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
});


// ### MathML.write()
// Writes MathML to an element.
//
// *@param{id}* The id of the element in which the MathML should be inserted.  
// *@param{math}* The MathML to be inserted.
MathLib.extend('MathML', 'write', function (id, math) {
  var formula;
  document.getElementById(id).innerHTML = '<math>' + math + '</math>';
  if (typeof MathJax !== 'undefined') {
    formula = MathJax.Hub.getAllJax(id)[0];
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
});
// ## <a id="Matrix"></a>Matrix
// The matrix implementation of MathLib makes calculations with matrices of
// arbitrary size possible. The entries of a matrix can be numbers and complex
// numbers.
//
// It is as easy as
// ```
// MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
// ```
// to create the following matrix:  
//    ⎛ 1 2 3 ⎞  
//    ⎜ 4 5 6 ⎟  
//    ⎝ 7 8 9 ⎠

prototypes.matrix = [];
MathLib.matrix = function (matrix) {
  if (typeof matrix === 'string') {
    // If there is a < in the string we assume it's MathML
    if (matrix.indexOf('<') > -1) {
      return MathLib.MathML(matrix).parse();
    }
    // else we assume it's MatLab notation
    else {
      matrix = matrix.trim().replace(/;?\n/g, '],[');
      matrix = JSON.parse('[[' + matrix + ']]');
    }
  }

  matrix[proto] = prototypes.matrix;
  Object.defineProperties(matrix, {
    cols: {
      value: matrix[0].length
    },
    rows: {
      value: matrix.length
    }
  });

  return matrix;
};

// Setting the .constructor property to MathLib.matrix
MathLib.extendPrototype('matrix', 'constructor', MathLib.matrix);

// Setting the .type property to 'matrix'
MathLib.extendPrototype('matrix', 'type', 'matrix');


// ### Matrix.prototype.adjugate()
// Calculates the adjugate matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjugate', function (n) {
  return this.map(function (x, r, c, m) {
    return MathLib.times(m.remove(c, r).determinant(), 1 - ((r+c)%2) * 2);
  });
});


// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjoint', function (n) {
  return this.map(MathLib.conjugate).transpose();
});


// ### Matrix.prototype.cholesky()
// The cholesky decomposition of a matrix
// using the Cholesky–Banachiewicz algorithm.
// Does not change the current matrix, but returns a new one.
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'cholesky', function () {
  var r, rr, cholesky = [], k, kk, sum, c;

  for (r = 0, rr = this.rows; r < rr; r++) {
    cholesky.push([]);
  }

  for (r = 0, rr = this.rows; r < rr; r++) {
    for (c=0; c<r; c++) {
      sum = 0;
      for (k = 0, kk = c; k < kk; k++) {
        sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[c][k]));
      }
      cholesky[r][c] = (this[r][c] - sum)/cholesky[c][c];
    }

    sum = 0;
    for (k = 0, kk = c; k < kk; k++) {
      sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[r][k]));
    }
    cholesky[r][c] = Math.sqrt(this[c][c] - sum);

    for (c++; c < this.cols; c++) {
      cholesky[r][c] = 0;
    }

  }
  cholesky = MathLib.matrix(cholesky);

  this.cholesky = function () {
    return cholesky;
  };
  return cholesky;
});



// ### Matrix.prototype.copy()
// Copies the matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'copy', function (n) {
  return this.map(MathLib.copy);
});



// ### Matrix.prototype.determinant()
// Calculates the determinant of the matrix via the LU decomposition.
// The result is cached.
//
// *@returns {number|complex}*
MathLib.extendPrototype('matrix', 'determinant', function () {
  if (this.isSquare()) {
    var arr, determinant;
    if(this.rank() < this.rows) {
      determinant = 0;
    }
    else {
      arr = this.LU();
      determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times(arr.diag()));
    }

    this.determinant = function () {
      return determinant;
    };
    return determinant;
  }
});


// ### Matrix.prototype.diag()
// Returns the entries on the diagonal in an array
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'diag', function () {
  var arr = [], i, ii;
  for (i = 0, ii = Math.min(this.rows, this.cols); i<ii; i++) {
    arr.push(this[i][i]);
  }
  return arr;
});


// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'divide', function (n) {
  return this.times(MathLib.inverse(n));
});


// ### Matrix.prototype.every()
// This function works like the Array.prototype.every function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'every', function (f) {
  return Array.prototype.every.call(this, function (x, i) {
    return Array.prototype.every.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.forEach()
// This function works like the Array.prototype.forEach function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument
MathLib.extendPrototype('matrix', 'forEach', function (f) {
  Array.prototype.forEach.call(this, function (x, i) {
    return Array.prototype.forEach.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.inverse()
// Calculates the inverse matrix.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'inverse', function () {
  if (!this.isSquare() && this.determinant()) {
    return;
  }
  return this.adjugate().divide(this.determinant());
});


// ### Matrix.prototype.isDiag()
// Determines if the matrix is a diagonal matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isDiag', function () {
  var i, j, ii, jj;
  if ((this.hasOwnProperty('isUpper') && this.isUpper()) + (+(this.hasOwnProperty('isLower') && this.isLower())) + (+(this.hasOwnProperty('isLower') && this.isLower())) > 1) {
    return true;
  }
  for (i = 0, ii = this.rows; i < ii; i++) {
    for (j = 0, jj = this.cols; j < jj; j++) {
      if (i !== j && this[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
});


// ### Matrix.prototype.isEqual()
// Determines if the matrix is equal to an other matrix.
//
// *@param {matrix}* the matrix to compare with  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isEqual', function (x) {
  var i, j, ii, jj;
  if (this === x) {
    return true;
  }
  if (this.rows === x.rows && this.cols === x.cols) {
    for (i = 0, ii = this.rows; i < ii; i++) {
      for (j = 0, jj = this.cols; j < jj; j++) {
        if (!MathLib.isEqual(this[i][j], x[i][j])) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
});


// ### Matrix.prototype.isIdentity()
// Determines if the matrix is a identity matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isIdentity', function () {
  if (!this.isSquare()) {
    return false;
  }

  var isIdentity = this.every(function (x, r, c) {
    return r===c ? MathLib.isOne(x) : MathLib.isZero(x);
  });

  this.isIdentity = function () {
    return isIdentity;
  };
  return isIdentity;
});


// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isInvertible', function () {
  return this.isSquare() && this.rank() === this.rows;
});


// ### Matrix.prototype.isLower()
// Determines if the matrix is a lower triangular matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isLower', function () {
  return this.slice(0, -1).every(function (x, i) {
    return x.slice(i+1).every(MathLib.isZero);
  });
});


// ### Matrix.prototype.isNegDefinite()
// Determines if the matrix is negative definite
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isNegDefinite', function () {
  if (!this.isSquare()) {
    return;
  }
  if (this.rows === 1) {
    return this[0][0] < 0;
  }
  // Sylvester's criterion
  if (this.rows % 2 === 0) {
    return this.determinant() > 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
  else {
    return this.determinant() < 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
});


// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isOrthogonal', function () {
  return this.transpose().times(this).isIdentity();
});


// ### Matrix.prototype.isPermutation()
// Determines if the matrix is a permutation matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isPermutation', function () {
  var rows = [],
      cols = [];

  return this.every(function (x, r, c) {
    if (MathLib.isOne(x)) {
      if (rows[r] || cols[c]) {
        return false;
      }
      else {
        rows[r] = true;
        cols[c] = true;
        return true;
      }
    }
    else if(MathLib.isZero(x)) {
      return true;
    }
    return false;
  }) && rows.length === this.rows && cols.length === this.cols;
});


// ### Matrix.prototype.isPosDefinite()
// Determines if the matrix is positive definite
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isPosDefinite', function () {
  if (!this.isSquare()) {
    return;
  }
  if (this.rows === 1) {
    return this[0][0] > 0;
  }
  // Sylvester's criterion
  return this.determinant() > 0 && this.remove(this.rows-1, this.cols-1).isPosDefinite();
});


// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isReal', function () {
  return this.every(MathLib.isReal);
});

// ### Matrix.prototype.isScalar()
// Determines if the matrix is a scalar matrix
// (that is a multiple of the scalar matrix)
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isScalar', function () {
  var n = this.rows,
      diag = this.diag,
      i;
  if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
    if (this.isIdentity() || this.isZero()) {
      return true;
    }
    else {
      return false;
    }
  }
  if (this.isDiag()) {
    for (i = 1; i < n; i++) {
      if (!MathLib.isEqual(diag[0], diag[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
});


// ### Matrix.prototype.isSquare()
// Determines if the matrix is a square matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSquare', function () {
  return this.cols === this.rows;
});


// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is symmetric
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSymmetric', function () {
  var i, j, bool = true;
  if (!this.isSquare()) {
    bool = false;
  }
  else {
lp: for (i = 0; i < this.rows; i++) {
      for (j = i + 1; j < this.cols; j++) {
        if (!MathLib.isEqual(this[i][j], this[j][i])) {
          bool = false;
          break lp;
        }
      }
    }
  }

  this.isSymmetric = function () {
    return bool;
  };
  return bool;
});


// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is a upper triangular matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isUpper', function () {
  return this.slice(1).every(function (x, i) {
    return x.slice(0, i+1).every(MathLib.isZero);
  });
});


// ### Matrix.prototype.isVector()
// Determines if the matrix is a vector
// (only one row or one column)
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isVector',  function () {
  return (this.rows === 1) || (this.cols === 1);
});


// ### Matrix.prototype.isZero()
// Determines if the matrix the zero matrix
// The result is cached.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isZero', function () {
  var isZero = this.every(MathLib.isZero);

  this.isZero = function () {
    return isZero;
  };
  return isZero;
});


// ### Matrix.prototype.LU()
// Calculates the LU decomposition of a matrix
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'LU', function (dontSwapPivot) {
  var i, j, k, t, p,
      LU = this.toArray(),
      m = this.rows,
      n = this.cols,
      permutation = [];

  for (k = 0; k < n; k++) {
    // Find the pivot
    if (!dontSwapPivot) {
      p = k;
      for (i = k+1; i < m; i++) {
        if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
          p = i;
        }
      }
      // Exchange if necessary
      if (p !== k) {
        permutation.unshift([p, k]);
        t = LU[p]; LU[p] = LU[k]; LU[k] = t;
      }
    }

    // The elimination
    if (LU[k][k] !== 0) {
      for (i = k+1; i < m; i++) {
        LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
        for (j = k+1; j < n; j++) {
          LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
        }
      }
    }
  }
  LU = MathLib.matrix(LU);
  this.LU = function () {
    return LU;
  };
  this.LUpermutation = MathLib.permutation(permutation);
  return LU;
});


// ### Matrix.prototype.map()
// This function works like the Array.prototype.map function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'map', function (f) {
  var m = this;
  return MathLib.matrix(
    Array.prototype.map.call(this, function (x, i) {
      return Array.prototype.map.call(x, function (y, j) {
        return f(y, i, j, m);
      });
    })
  );
});


// ### Matrix.prototype.minor()
// Calculates a minor
//
// *@param {number}* The row to be removed.  
// *@param {number}* The column to be removed.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'minor', function (r, c) {
  return this.remove(r, c).determinant();
});


// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {matrix}* The matrix to be subtracted.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'minus', function (m) {
  return this.plus(m.negative());
});


// ### Matrix.prototype.negative()
// Returns the negative matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'negative', function () {
  var res = [],
      i, ii;

  for (i = 0, ii = this.rows; i < ii; i++) {
    res.push(this[i].map(MathLib.negative));
  }
  return MathLib.matrix(res);
});


// ### Matrix.prototype.plus()
// This function adds a matrix to the current matrix
// and returns the result as a new matrix.
//
// *@param {matrix}* The matrix to be added.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'plus', function (m) {
  var res = [],
      r = this.rows,
      c = this.cols,
      i, j;

  for (i = 0; i < r; i++) {
    res[i] = [];
    for (j = 0; j < c; j++) {
      res[i][j] = MathLib.plus(this[i][j], m[i][j]);
    }
  }
  return MathLib.matrix(res);
});


// ### Matrix.prototype.rank()
// Determines the rank of the matrix
//
// *@returns {number}*
MathLib.extendPrototype('matrix', 'rank', function () {
  var rank = 0, mat, i, ii, j;
  mat = this.rref();

  label: for (i = Math.min(this.rows, this.cols)-1; i>=0; i--) {
    for (j=this.cols-1; j>=i; j--) {
      if (!MathLib.isZero(mat[i][j])) {
        rank = i + 1;
        break label;
      }
    }
  }

  this.rank = function () {
    return rank;
  };
  return rank;
});


// ### Matrix.prototype.remove()
// This function removes the specified rows and/or columns for the matrix.
//
// *@param {number|array}* The row(s) to be removed.  
// *@param {number|array}* The column(s) to be removed.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'remove', function (row, col) {
  var res = this.toArray();

  if (row || row === 0) {
    if (typeof row === 'number') {
      row = [row];
    }
    res = res.filter(function (x, i, arr) {
      return row.indexOf(i) === -1;
    });
  }

  if (col || col === 0) {
    if (typeof col === 'number') {
      col = [col];
    }
    col = col.sort().reverse();
    col.forEach(function (n) {
      res = res.map(function (x) {
        x.splice(n, 1);
        return x;
      });
    });
  }

  return MathLib.matrix(res);
});


// ### Matrix.prototype.rref()
// Calculate the reduced row echelon form (rref) of a matrix.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'rref', function () {
  var lead = 0, rref = this.toArray(),
      i, j, r, temp, val;
  for (r = 0; r < this.rows; r++) {
    if (this.cols <= lead) {
      return MathLib.matrix(rref);
    }
    i = r;
    while (rref[i][lead] === 0) {
      i++;
      if (this.rows === i) {
        i = r;
        lead++;
        if (this.cols === lead) {
          return MathLib.matrix(rref);
        }
      }
    }

    // Switch the lines
    var tmp = rref[i];
    rref[i] = rref[r];
    rref[r] = tmp;

    val = rref[r][lead];
    for (j = 0; j < this.cols; j++) {
      rref[r][j] /= val;
    }

    for (i = 0; i < this.rows; i++) {
      if (i === r) {
        continue;
      }
      val = rref[i][lead];
      for (j = 0; j < this.cols; j++) {
        rref[i][j] = MathLib.minus(rref[i][j], MathLib.times(val, rref[r][j]));
      }
    }
    lead++;
  }
  return MathLib.matrix(rref);
});



// ### Matrix.prototype.solve()
// Solves the system of linear equations Ax = b
// given by the matrix A and a vector or point b.
//
// *@param {vector|point}* The b in Ax = b  
// *@returns {vector|point}*
MathLib.extendPrototype('matrix', 'solve', function (b) {
  // Ax = b -> LUx = b. Then y is defined to be Ux
  var LU = this.LU(),
      i, j,
      n = b.length,
      x = [],
      y = [];

  // Permutate b according to the LU decomposition
  b = this.LUpermutation.applyTo(b);


  // Forward solve Ly = b
  for (i = 0; i < n; i++) {
    y[i] = b[i];
    for (j = 0; j < i; j++) {
      y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
    }
  }

  // Backward solve Ux = y
  for (i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (j = i + 1; j < n; j++) {
      x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
    }
    x[i] = MathLib.divide(x[i], LU[i][i]);
  }

  return b.constructor(x);
});


// ### Matrix.prototype.some()
// This function works like the Array.prototype.some function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'some', function (f) {
  return Array.prototype.some.call(this, function (x, i) {
    return Array.prototype.some.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.times()
// Multiplies the current matrix with a number, a matrix, a point or a vector.
//
// *@param {number|matrix|point|vector}*  
// *@returns {matrix|point|vector}*
MathLib.extendPrototype('matrix', 'times', function (a) {
  var res = [], temp, i, j, k;
  if (typeof a === 'number' || a.type === 'complex') {
    return this.map(function(x) {
      return MathLib.times(x, a);
    });
  }

  else if (a.type === "matrix") {
    if (this.cols === a.rows) {
      for (i = 0; i < this.rows; i++) {
        res[i] = [];
        for (j = 0; j < a.cols; j++) {
          temp = 0;

          for (k = 0; k < this.cols; k++) {
            temp = MathLib.plus(temp, MathLib.times(this[i][k], a[k][j]));
          }
          res[i][j] = temp;
        }
      }
      return MathLib.matrix(res);
    }
  }

  else if (a.type === 'point' || a.type === 'vector') {
    if (this.cols === a.length) {
      for (j = 0; j < this.rows; j++) {
        temp = 0;
        for (k = 0; k < this.cols; k++) {
          temp = MathLib.plus(temp, MathLib.times(this[j][k], a[k]));
        }
        res.push(temp);
      }
      return a.constructor(res);
    }
  }
});


// ### Matrix.prototype.toArray()
// Converts the matrix to a two-dimensional array
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toArray', function () {
    return Array.prototype.map.call(this, function (x) {
      return Array.prototype.map.call(x, function (y) {
        return MathLib.copy(y);
      });
    });
});


// ### Matrix.prototype.toColVectors()
// Converts the columns of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toColVectors', function () {
  return this.transpose().toRowVectors();
});


// ### Matrix.prototype.toComplex()
// Transforms a 2x2 matrix into the corresponding complex number
// (if the entries allow the transformation)
//
// *@returns {complex}*
MathLib.extendPrototype('matrix', 'toComplex', function () {
  if (this.rows !== 2 || this.cols !== 2 || this[0][0] !== this[1][1] || this[0][1] !== MathLib.negative(this[1][0])) {
    return;
  }
  return MathLib.complex([this[0][0], this[1][0]]);
});


// ### Matrix.prototype.toContentMathML()
// converting the matrix to content MathML
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toContentMathML', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + MathLib.toContentMathML(cur);
    }, '<matrixrow>') + '</matrixrow>';
  }, '<matrix>') + '</matrix>';
});


// ### Matrix.prototype.toLaTeX()
// Converting the matrix to LaTeX
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toLaTeX', function () {
  return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + ' & ' + MathLib.toLaTeX(cur);
    }) + '\\\n';
  }, '').slice(0, -2) + '\n\\end{pmatrix}';
});


// ### Matrix.prototype.toMathML()
// converting the matrix to (presentation) MathML
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toMathML', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
    }, '<mtr>') + '</mtr>';
  }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
});


// ### Matrix.prototype.toRowVectors()
// Converts the rows of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toRowVectors', function () {
  return this.toArray().map(MathLib.vector);
});


// ### Matrix.prototype.toString()
// Creating a custom .toString() function
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toString', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '\t' + MathLib.toString(cur);
    }) + '\n';
  }, '').slice(0, -1);
});


// ### Matrix.prototype.trace()
// Calculating the trace of the matrix
//
// *@returns {number|complex}*
MathLib.extendPrototype('matrix', 'trace', function () {
  var trace = MathLib.plus(this.diag());

  this.trace = function () {
    return trace;
  };
  return trace;
});


// ### Matrix.prototype.transpose()
// Calculating the transpose of the matrix
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'transpose', function () {
  var transpose = [],
      help,
      i, j, ii, jj;

  for (i = 0, ii = this.cols; i<ii; i++) {
    help = [];
    for (j = 0, jj = this.rows; j<jj; j++) {
      help.push(this[j][i]);
    }
    transpose.push(help);
  }

  transpose = MathLib.matrix(transpose);
  this.transpose = function () {
    return transpose;
  };
  return transpose;
});




// ### Matrix.identity
// Returns the identity matrix.
//
// *@param {number}* The number of rows and columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'identity', function (n) {
  var temp = [], arr = [],
      i, ii;
  n = n || 1;

  for (i=0, ii=n-1; i<ii; i++) {
    temp.push(0);
  }
  temp.push(1);
  temp = temp.concat(temp);
  temp = temp.slice(0, -1);

  for (i=0, ii=n; i<ii; i++) {
    arr.push(temp.slice(n-i-1, 2*n-i- 1));
  }

  return MathLib.matrix(arr);
});


// ### Matrix.givensMatrix()
// This function returns a givens matrix
//
// *@param {number}* The size of the matrix.  
// *@param {number}* The first row/column.  
// *@param {number}* The second row/column.  
// *@param {number}* The angle (in radians).  
// *@returns {matrix}*
MathLib.extend('matrix', 'givensMatrix', function (n, i, k, phi) {
  var givens = MathLib.matrix.identity(n);
  givens[k][k] = givens[i][i]=Math.cos(phi);
  givens[i][k] = Math.sin(phi);
  givens[k][i] = -givens[i][k];
  return givens;
});


// ### Matrix.numbers()
// Returns a matrix consisting completely of a given number
//
// *@param {number}* The number.  
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'numbers', function (n, r, c) {
  var help = [], res = [],
      i, ii;
  for (i = 0, ii = c || r || 1; i < ii; i++) {
    help.push(n);
  }
  for (i = 0, ii = r || 1; i < ii ; i++) {
    res.push(help.slice());
  }
  return MathLib.matrix(res);
});


// ### Matrix.one()
// Returns a matrix consisting completely of ones.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'one', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(1, r, c);
});


// ### Matrix.random()
// Returns a matrix consisting completely of random numbers between 0 and 1
//
// *@param {number}* The number of rows.
// *@param {number}* The number of columns.
// *@returns {matrix}*
MathLib.extend('matrix', 'random', function (r, c) {
  var temp, arr = [],
      i, j, ii, jj;
  for (i = 0, ii = r || 1; i < ii; i++) {
    temp = [];
    for (j = 0, jj = c || r || 1; j < jj; j++) {
      temp.push(Math.random());
    }
    arr.push(temp);
  }
  return MathLib.matrix(arr);
});


// ### Matrix.zero()
// Returns a matrix consisting completely of zeros.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'zero', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(0, r, c);
});
// ## <a id="Permutation"></a>Permutation
prototypes.permutation = [];
MathLib.permutation = function (p) {
  var cycle, permutation, max;

  if (Array.isArray(p[0])) {
    cycle = p;
    permutation = MathLib.permutation.cycleToList(cycle);
  }
  else {
    permutation = p;
    cycle = MathLib.permutation.listToCycle(permutation);
  }

  permutation[proto] = prototypes.permutation;
  Object.defineProperties(permutation, {
    cycle: {
      value: cycle
    },
    max: {
      value: permutation.length-1
    }
  });
  return permutation;

};

//Setting the .constructor property to MathLib.matrix
MathLib.extendPrototype('permutation', 'constructor', MathLib.permutation);

//Setting the .type property to 'permutation'
MathLib.extendPrototype('permutation', 'type', 'permutation');


// ### Permutation.prototype.applyTo()
// Applies the permutation to a number or a array/matrix/point/vector
//
// *@param {number|array|matrix|point|vector}*  
// *@returns {number|array|matrix|point|vector}*
MathLib.extendPrototype('permutation', 'applyTo', function (n) {
  var p, res;
  if (typeof n === 'number') {
    if (n >= this.length) {
      return n;
    }
    return this[n];
  }
  else {
    p = this;
    res = n.map(function (x, i) {
      return n[p.applyTo(i)];
    });

    return (n.type === undefined ? res : n.constructor(res));
  }
});


// ### Permutation.prototype.inverse()
// Calculates the inverse of the permutation
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'inverse', function () {
  var cycle = this.cycle.slice();
  cycle.reverse().forEach(function (e) {
    e.reverse();
  });
  return MathLib.permutation(cycle);
});


// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});


// ### Permutation.prototype.sgn()
// Calculates the signum of the permutation
//
// *@returns {number}*
MathLib.extendPrototype('permutation', 'sgn', function () {
  var count = 0, i;
  for (i = 0; i < this.cycle.length; i++) {
    count += this.cycle[i].length;
  }
  count += this.cycle.length;
  return -2 * (count % 2) + 1;
});


// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@returns {permutation}*
MathLib.extendPrototype('permutation', 'times', function (p) {
  var a = this;
  return p.map(function (x) {
    return a[x];
  });
});


// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@param{number}* [size] The size of the matrix  
// *@returns {matrix}*
MathLib.extendPrototype('permutation', 'toMatrix', function (n) {
  var arr = [],
      res = [],
      temp, i, ii;
      n = n || this.length;

  for (i = 0, ii = n - 1; i < ii; i++) {
    arr.push(0);
  }
  arr = arr.concat([1]).concat(arr);
  for (i = 0, ii = n; i < ii; i++) {
    temp = n - this.applyTo(i) - 1;
    res.push(arr.slice(temp, temp + n));
  }
  return MathLib.matrix(res);
});


// ### Permutation.prototype.toString()
// String representation of the permutation. 
//
// *@returns {string}*
MathLib.extendPrototype('permutation', 'toString', function () {
  var str = '';
  this.cycle.forEach(function (elem) {
    str += '(' + elem.toString() + ')';
  });
  return str;
});


// ### Permutation.cycleToList()
// Converts a cycle representation to a list representation
// 
// *@param{array}* cycle The cycle to be converted  
// *@returns {array}*
MathLib.extend('permutation', 'cycleToList', function (cycle) {
  var index, res = [],
      i, ii, j, jj, max;

  max = cycle.map(function (b) {
    return Math.max.apply(null, b);
  });
  max = Math.max.apply(null, max);

  for (i=0, ii=max; i<=ii; i++) {
    cur = i;
    for (j = 0, jj = cycle.length; j < jj; j++) {
      index = cycle[j].indexOf(cur);
      if (++index) {
        cur = cycle[j][index % cycle[j].length];
      }
    }
    res.push(cur);
  }
  return res;
});


// ### Permutation.id()
// The id permutation
// 
// *@returns {permutation}*
MathLib.extend('permutation', 'id', MathLib.permutation([[]]));


// ### Permutation.listToCycle()
// Converts a list representation to a cycle representation
// 
// *@param{array}* list The list to be converted  
// *@returns {array}*
MathLib.extend('permutation', 'listToCycle', function (list) {
  var finished = [],
      cur, i, ii, temp, res = [];

  for (i=0, ii=list.length; i<ii; i++) {
    cur = i;
    temp = [];
    while(!finished[cur]) {
      finished[cur] = true;
      temp.push(cur);
      cur = list[cur];
    }
    if (temp.length) {
      res.push(temp);
    }
  }
  return res;
});
// ## <a id="Point"></a>Point
// The point implementation of MathLib makes calculations with point in
// arbitrary dimensions possible.
//
// MathLib uses the homogeneous form of a point for calculations and storage.
//
// To create the point (4, 2) on the two dimensional plane use
// `MathLib.point([4, 2, 1])`
// Alternatively you can use
// `MathLib.point(4, 2)`
// The 1 will be added for you.



prototypes.point = MathLib.vector([]);
MathLib.point = function (point) {

  if (arguments.length > 1) {
    point = Array.prototype.slice.call(arguments).concat(1);
  }

  point[proto] = prototypes.point;
  Object.defineProperties(point, {
    dim: {
      value: point.length - 1
    }
  });
  return point;

};


// Setting the .constructor property to MathLib.point
MathLib.extendPrototype('point', 'constructor', MathLib.point);


// Setting the .type property to 'point'
MathLib.extendPrototype('point', 'type', 'point');


// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {point}* a The point A  
// *@param {point}* b The point B  
// *@param {point}* c The point C  
// *@param {point}* d The point D  
// *@returns {number}*
MathLib.extendPrototype('point', 'crossRatio', function (a, b, c, d) {
  var x  = this.toArray(),
      m1 = MathLib.matrix([x,a,c]),
      m2 = MathLib.matrix([x,b,d]),
      m3 = MathLib.matrix([x,a,d]),
      m4 = MathLib.matrix([x,b,c]);

  return (m1.det() * m2.det()) / (m3.det() * m4.det());
});


// ### Point.prototype.distanceTo()
// Calculates the distance to an other point.
// If no other point is provided, it calculates the distance to the origin.
//
// *@param {point}* [point] The point to calculate the distance to  
// *@returns {number}*
MathLib.extendPrototype('point', 'distanceTo', function (point) {
  var res = 0,
      i;

  if (arguments.length === 0) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i], 2);
    }
    return Math.sqrt(res);
  }

  if (point.type === 'point' && this.dim === point.dim) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i] - point[i], 2);
    }
  }
  return Math.sqrt(res);
});


// ### Point.prototype.draw()
// Draws the point on a canvas or svg element.
//
// *@param {MathLib.screen object}* screen The screen to draw onto  
// *@param {object}* [options] Drawing options  
// *@returns {point}* The current point
MathLib.extendPrototype('point', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var point = this;
    screen.forEach(function (x) {
      x.point(point, options);
    });
  }
  else {
    screen.point(this, options);
  }

  return this;
});


// ### Point.prototype.isEqual()
// Determines if the point has the same coordinates as an other point
//
// *@param {point}* The point to compare
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isEqual', function (q) {
  var p = this.normalize();
      q = q.normalize();

  if(this.dim !== q.dim) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
});


// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});

 
// ### Point.prototype.isInside()
// Determines wether a point is inside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isInside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) < a.radius;
  }
});


// ### Point.prototype.isOn()
// Determines wether a point is on a line or circle
//
// *@param {line|point}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isOn', function (a) {
  if (a.type === 'line') {
    return this.distanceTo(a.center) === a.radius;
  }
  else if (a.type === 'circle') {
    return this.distanceTo(a.center) === a.radius;
  }
});


// ### Point.prototype.isOutside()
// Determines wether a point is outside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isOutside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) > a.radius;
  }
});


// ### Point.prototype.lineTo()
// Calculates a line connecting two points
//
// *@param {point}* The point to calculate the line to
// *@returns {line}*
MathLib.extendPrototype('point', 'lineTo', function (q) {
  if (this.dim === 2 && q.dim === 2) {
    return MathLib.line(this, q);
  }
});


// ### Point.prototype.normalize()
// Normalizes the point.
// (Making the last component 1)
//
// *@returns {point}*
MathLib.extendPrototype('point', 'normalize', function (q) {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
});


// ### Point.prototype.reflectAt()
// Reflects the point at an other point
//
// *@returns {point}*
MathLib.extendPrototype('point', 'reflectAt', function (a) {
  if (a.type === 'point') {
    if (this.dim === a.dim) {
      var arr = [], i,
          p = this.normalize();
      a = a.normalize();
      for (i = 0; i < this.dim; i++) {
        arr.push(2 * a[i] - p[i]);
      }
      arr.push(1);
      return MathLib.point(arr);
    }
  }
});


// ### Point.prototype.toArray()
// Converts he Point to a real array
//
// *@returns {array}*
MathLib.extendPrototype('point', 'toArray', function () {
  var res = [], i, ii;
  for (i = 0, ii=this.dim; i <= ii; i++) {
    res.push(this[i]);
  }
  return res;
});


// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@returns {complex}*
MathLib.extendPrototype('point', 'toComplex', function () {
  if (this.dim === 2) {
    return MathLib.complex(this[0]/this[2], this[1]/this[2]);
  }
});


// ### Point.prototype.toContentMathML()
// Returns content MathML representation of the point
//
// *@returns {string}*
/* MathLib.extendPrototype('point', 'toContentMathML', function (opt) { */
/* }); */


// ### Point.prototype.toLaTeX()
// Returns LaTeX representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toLaTeX', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '\\begin{pmatrix}\n\t' + p.reduce(function (old, cur) {
    return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
  }) + '\n\\end{pmatrix}';
});


// ### Point.prototype.toMathML()
// Returns (presentation) MathML representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toMathML', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return p.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
});


// ### Point.prototype.toString()
// Returns string representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toString', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '(' + p.reduce(function (old, cur) {
    return old + ', ' + MathLib.toString(cur);
  }) + ')';
});



// ### Point.I
// The Point I = (-i, 0, 1).
// This is NOT the complex number i.
//
// *@returns {point}*
MathLib.extend('point', 'I', (function () {
  var i = MathLib.complex(0, -1);
  return MathLib.point([i, 0, 1]);
}()));


// ### Point.J
// The Point J = (i, 0, 1).
//
// *@returns {point}*
MathLib.extend('point', 'J', (function () {
  var i = MathLib.complex(0, 1);
  return MathLib.point([i, 0, 1]);
}()));
// ## <a id="Polynomial"></a>Polynomial
// The polynomial implementation of MathLib makes calculations with polynomials.
// Both the coefficients and the arguments of a polynomial can be numbers,
// complex numbers and matrices.
//
// It is as easy as
// ```
// MathLib.polynomial([1, 2, 3])
// ```
// to create the polynomial 1 + 2x + 3x²  
// The polynomial x¹⁰⁰ can be created with the following statement:
// ```
// MathLib.polynomial(100)
// ```

prototypes.polynomial = [];
MathLib.polynomial = function (polynomial) {
  var temp = [];

  if (polynomial === undefined || polynomial.length === 0) {
    polynomial = [0];
  }

  else if (typeof polynomial === 'number') {
    while (polynomial--) {
      temp.push(0);
    }
    temp.push(1);
    polynomial = temp;
  }

  polynomial[proto] = prototypes.polynomial;
  Object.defineProperties(polynomial, {
    deg: {
      value: polynomial.length - 1
    },
    subdeg: {
      value: (function (a) {
        var i = 0;
        if (a.length > 1 || a[0]) {
          while(i < a.length && MathLib.isZero(a[i])) {
            i++;
          }
          return i;
        }
        return Infinity;
      }(polynomial))
    }
  });
  return polynomial;
};

// Setting the .constructor property to MathLib.polynomial
MathLib.extendPrototype('polynomial', 'constructor', MathLib.polynomial);

// Setting the .type property to 'type'
MathLib.extendPrototype('polynomial', 'type', 'polynomial');


// ### Polynomial.prototype.content()
// Returns the content of the polynomial.
//
// *@returns {number|complex}*
MathLib.extendPrototype('polynomial', 'content', function () {
  return MathLib.gcd(this);
});


// ### Polynomial.prototype.differentiate()
// Differentiates the polynomial
//
// *@param {number}* [n] the number of times to differentiate the polynomial.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'differentiate', function (n) {
  if (n === 0) {
    return this;
  }
  if (n < 0) {
    return this.integrate(-n);
  }
  var temparr = [],
      i;
  n = n || 1;
  for (i = 0; i <= this.deg - n; i++) {
    temparr[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
  }
  return MathLib.polynomial(temparr);
});


// ### Polynomial.prototype.draw()
// Draws the polynomial on the screen
//
// *@param {screen}* The screen to draw the polynomial onto.  
// *@param {object}* [options] Optional drawing options.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'draw', function (screen, options) {
  var path = [], i,
      line = this;

  if (this.deg < 2) {
    if (Array.isArray(screen)) {
      screen.forEach(function (x) {
        x.line([[-50, line.valueAt(-50)], [50, line.valueAt(50)]], options);
      });
    }
    else {
      screen.line([[-50, this.valueAt(-50)], [50, this.valueAt(50)]], options);
    }
  }

  else {
    for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
      path.push([i, Math.round(this.valueAt(i)*100) / 100]);
    }
    if (Array.isArray(screen)) {
      screen.forEach(function (x) {
        x.path(path, options);
      });
    }
    else {
      screen.path(path, options);
    }
  }

  return this;
});


// ### Polynomial.prototype.integrate()
// Integrates the polynomial
//
// *@param {number}* [n] the number of times to integrate the polynomial.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'integrate', function (n) {
  var temparr = [],
      i;
  n = n || 1;

  if (MathLib.isZero(n)) {
    return this;
  }
  if (n < 0) {
    return this.differentiate(-n);
  }

  for (i = 0; i < n; i++) {
    temparr.push(0);
  }

  for (i = 0; i <= this.deg; i++) {
    temparr[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
  }
  return MathLib.polynomial(temparr);
});


// ### Polynomial.prototype.isEqual()
// Decides if two polynomials are equal.
//
// *@param {polynomial}*  
// *@returns {boolean}*
MathLib.extendPrototype('polynomial', 'isEqual', function (p) {
  var i, ii;
  if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
    return false;
  }
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isEqual(this[i], p[i])) {
      return false;
    }
  }
  return true;
});


// ### Polynomial.prototype.isPrimitive()
// Decides if the polynomial is primitive
//
// *@returns {boolean}*
MathLib.extendPrototype('polynomial', 'isPrimitive', function () {
  return MathLib.gcd(this) === 1;
});


// ### Polynomial.prototype.isReal()
// Checks wether the coefficients are real numbers
//
// *@returns {boolean}*
MathLib.extendPrototype('polynomial', 'isReal', function () {
  return this.every(MathLib.isReal);
});


// ### Polynomial.prototype.map()
// Works like the Array.prototype.map function
//
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'map', function (f) {
  return MathLib.polynomial(Array.prototype.map.call(this, f));
});


// ### Polynomial.prototype.mod()
// Reduces the coefficients mod a number
//
// *@param {number}*  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'mod', function (m) {
  return this.map(function (x) {
    return MathLib.mod(x, m);
  });
});


// ### Polynomial.prototype.negative()
// Returns the negative polynomial
//
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'negative', function () {
  return MathLib.polynomial(this.map(MathLib.negative));
});


// ### Polynomial.prototype.plus()
// Adds a number or a polynomial
//
// *@param {boolean}* [all] If the value is true, the number is added to all 
// coefficients.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'plus', function (a, all) {
  var temparr = [],
      i;
  if (typeof a === 'number') {
    if (all) {
      return this.map(function (b) {
        return MathLib.plus(a, b);
      });
    }
    else {
      temparr = this.slice();
      temparr[0] = MathLib.plus(temparr[0], a);
    }
  }
  else if (a.type === 'polynomial') {
    for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
      temparr[i] = MathLib.plus(this[i],	a[i]);
    }
    temparr = temparr.concat((this.deg > a.deg ? this : a).slice(i));
  }
  return MathLib.polynomial(temparr);
});



// ### Polynomial.prototype.tangent()
// Returns the tangent to the polynomial at a given point
//
// *@param{number}* The x-value of the point.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'tangent', function (p) {
  var value = this.valueat(p),
      slope = this.differentiate().valueAt(p);
  return MathLib.polynomial([value - slope * p, slope]);
});


MathLib.extendPrototype('polynomial', 'times', function (a) {
  var temparr = [],
      i,
      j;
  if (a.type === 'polynomial') {
    for (i = 0; i <= this.deg; i++) {
      for (j = 0; j <= a.deg; j++) {
        temparr[i + j] = MathLib.plus((temparr[i + j] ? temparr[i + j] : 0), MathLib.times(this[i], a[j]));
      }
    }
  }
  else {  // we we multiply it to every coefficient
    temparr = this.map(function (b) {
                              return MathLib.times(a, b);
                            });
  }
  return MathLib.polynomial(temparr);
});


// ### Polynomial.prototype.toMathML()
// Returns a MathML representation of the polynomial
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toContentMathML', function () {
  var str = '<apply><plus/>', i, ii;
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toContentMathML(this[i]);
      }
      else {
        str += '<apply><times/>' + MathLib.toContentMathML(this[i], true);
      }

      if (i > 1) {
        str += '<apply><power/><ci>x</ci>' + MathLib.toContentMathML(i) + '</apply></apply>';
      }
      else if (i === 1) {
        str += '<ci>x</ci></apply>';
      }
    }
  }
  return str + '</apply>';
});


// ### Polynomial.prototype.toLaTeX()
// Returns a LaTeX representation of the polynomial
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toLaTeX', function () {
  var str = '', i, ii;
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toLaTeX(this[i]);
      }
      else {
        str += MathLib.toLaTeX(this[i], true);
      }

      if (i > 1) {
        str += 'x^{' + MathLib.toLaTeX(i) + '}';
      }
      else if (i === 1) {
        str += 'x';
      }
    }
  }
  return str;
});


// ### Polynomial.prototype.toMathML()
// Returns a MathML representation of the polynomial
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toMathML', function () {
  var str = '<mrow>', i, ii;
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toMathML(this[i]);
      }
      else {
        str += MathLib.toMathML(this[i], true);
      }

      if (i > 1) {
        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i) + '</msup>';
      }
      else if (i === 1) {
        str += '<mo>&#x2062;</mo><mi>x</mi>';
      }
    }
  }
  return str + '</mrow>';
});


// ### Polynomial.prototype.toString()
// Custom toString function
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toString', function (opt) {
  var str = '', i, ii;
  for (i=0, ii=this.deg; i<=ii; i++) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toString(this[i]);
      }
      else {
        str += MathLib.toString(this[i], true);
      }

      if (i > 1) {
        str += '*x^' + MathLib.toString(i);
      }
      else if (i === 1) {
        str += '*x';
      }
    }
  }
  return str;
});


// ### Polynomial.prototype.valueAt()
// Evaluates the polynomial at a given point 
//
// *@param {number|complex|matrix}*  
// *@returns {number|complex]matrix}*
MathLib.extendPrototype('polynomial', 'valueAt', function (x) {
  var pot = MathLib.is(x, 'matrix') ? MathLib.matrix.identity(x.rows, x.cols) : 1,
      res = MathLib.is(x, 'matrix') ? MathLib.matrix.zero(x.rows, x.cols) : 0,
      i, ii;
  
  for (i=0, ii=this.deg; i<=ii; i++) {
    res = MathLib.plus(res, MathLib.times(this[i], pot));
    pot = MathLib.times(pot, x);
  }
  return res;
});




// ### Polynomial.regression
// Calculates the regression line for some points
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'regression', function (x, y) {
  var length = x.length,
      xy = 0,
      xi = 0,
      yi = 0,
      x2 = 0,
      m, c, i;

  if (arguments.length === 2) {
    for (i = 0; i < length; i++) {
      xy += x[i] * y[i];
      xi += x[i];
      yi += y[i];
      x2 += x[i] * x[i];
    }
  }
  else {
    for (i = 0; i < length; i++) {
      xy += x[i][0] * x[i][1];
      xi += x[i][0];
      yi += x[i][1];
      x2 += x[i][0] * x[i][0];
    }
  }

  m = (length * xy - xi * yi) / (length * x2 - xi * xi);
  c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
  return MathLib.polynomial([c, m]);
});


// ### Polynomial.interpolation
// Interpolates points.
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'interpolation', function (a, b) {
  var temp,
      res = MathLib.polynomial([0]),
      n = a.length,
      i, j, x, y;

  if(arguments.length === 2) {
    a = a.map(function (x, i) {
      return [x, b[i]];
    });
  }

  for (i = 0; i < n; i++) {
    temp = MathLib.polynomial([1]);
    for (j = 0; j < n; j++) {
      if (i !== j) {
        temp = temp.times(MathLib.polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
      }
    }
    res = res.plus(temp.times(a[i][1]));
  }
  return res;
});


// ### Polynomial.one
// Returns the one polynomial
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'one', MathLib.polynomial([1]));


// ### Polynomial.roots
// Returns a polynomial with the specified roots
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'roots', function (roots) {
  var temp, coef = [], i, ii;
  if (MathLib.type(roots) === 'array') {
    roots = MathLib.set(roots, true);
  }

  temp = roots.powerset();
  for (i=0, ii=roots.card; i<ii; i++) {
    coef[i] = 0; 
  }

  // Vieta's theorem
  temp.slice(1).forEach(function (x, i) {
    coef[ii-x.card] = MathLib.plus(coef[ii-x.card], x.times());
  });

  coef = coef.map(function (x, i) {
    if((ii-i)%2) {
      return MathLib.negative(x);
    }
    return x;
  });

  coef.push(1);
  return MathLib.polynomial(coef);
});


// ### Polynomial.zero
// Returns the zero polynomial
//
// *@returns {polynomial}*
MathLib.extend('polynomial', 'zero', MathLib.polynomial([0]));
// ## <a id="Set"></a>Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// MathLib.set([1, 2, 3, 4, 5])
// ```
// Multisets are also possible:
// ```
// MathLib.set([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], true)
// ```
// Creates the multiset {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}

MathLib.set =	function (elements, multiset) {

  if (!elements) {
    elements = [];
  }
  elements = elements.sort(MathLib.compare);

  // eliminate the duplicates
  if (!multiset) {
    elements = elements.filter(function (x, i, a) {
      return x !== a[i + 1];
    });
  }


  elements[proto] = prototypes.set;
  Object.defineProperties(elements, {
    card: {
      get: function () {
        return this.length;
      }
    },
    multiset: {
      value: !!multiset
    }
  });
  return elements;

};


// Setting the .constructor property to MathLib.set
MathLib.extendPrototype('set', 'constructor', MathLib.set);


// Setting the .type property to 'set'
MathLib.extendPrototype('set', 'type', 'set');


// ### Set.prototype.compare()
// Compare function for sets
//
// *@returns {number}*
MathLib.extendPrototype('set', 'compare', function (x) {
  if (this.card !== x.card) {
    return MathLib.sgn(this.card - x.card);
  }
  else {
    var res = 0, stop = false;
    this.forEach(function (y, i) {
      if(!stop) {
        var a = MathLib.compare(y, x[i]);
        if(a !== 0) {
          res = a;
          stop = true;
        }
      }
    });
    return res;
  }
});


// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@param {function}* The filtering function  
// *@returns {set}*
MathLib.extendPrototype('set', 'filter', function (f) {
  return MathLib.set(Array.prototype.filter.call(this, f));
});


// ### Set.prototype.insert()
// Inserts an element into the set.
//
// *@returns {set}* Returns the current set
MathLib.extendPrototype('set', 'insert', function (x) {
  var i = this.locate(x);
  if (this[i] !== x || this.multiset) {
    this.splice(i, 0, x);
  }
  return this;
});


// ### Set.prototype.isEmpty()
// Determines if the set is empty.
//
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEmpty', function () {
  return this.card === 0;
});


// ### Set.prototype.isEqual()
// Determines if the set is equal to an other set.
//
// *@param {set}* The set to compare  
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEqual', function (x) {
  if (this.card !== x.card) {
    return false;
  }
  else {
    return this.every(function (y, i) {
      return MathLib.isEqual(y, x[i]);
    });
  }
});


// ### Set.prototype.isSubsetOf()
// Determines if the set is a subset of an other set.
//
// *@param {set}* The potential superset  
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isSubsetOf', function (a) {
  return this.every(function (x) {
    return a.indexOf(x) !== -1;
  });
});


// ### Set.prototype.locate()
// Array.prototype.indexOf() returns only the position of an element in the
// array and not the position where one should be inserted.
//
// *@param {set}* The element to locate  
// *@returns {boolean}*
MathLib.extendPrototype('set', 'locate', function (x) {

  var left = 0,
      right = this.card - 1,
      middle,
      i = this.indexOf(x);

  if (i !== -1) {
    return i;
  }

  while (left <= right) {
    middle = left + Math.floor((right - left) / 2);
    if (this[middle] < x) {
        left = middle + 1;
    } else if (this[middle] > x) {
        right = middle - 1;
    } else {
        return middle;
    }
  }
  return left;
});


// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@returns {set}*
MathLib.extendPrototype('set', 'map', function (f) {
  return MathLib.set(Array.prototype.map.call(this, f));
});


/*
Set.prototype.mean = function (p) {
  var res = 0,
      i;

  if (typeof p === "undefined" || p === 1) {
    return this.arithMean();
  }
  if (p === 0) {
    return this.geoMean();
  }
  if (p === -1) {
    return this.harMean();
  }

  for (i = 0; i < this.card; i++) {
    res += Math.pow(this.elements[i], p);
  }
  return MathLib.pow(res / this.card, 1 / p);
};

Set.prototype.median = function (a) {
  if (this.card % 2 === 0) {
    if (a === "min") {
      return this.elements[this.card / 2 - 1];
    }
    if (a === "max") {
      return this.elements[this.card / 2];
    }
    return (this.elements[this.card / 2] + this.elements[this.card / 2 + 1]) / 2;
  }
  else {
    return this.elements[(this.card - 1) / 2];
  }
};
*/


MathLib.extendPrototype('set', 'plus', function (n) {
  var res = [];
  if (!arguments.length) {
    return MathLib.plus(this);
  }
  else if (Array.isArray(n)) {
    this.forEach(function (x) {
        n.forEach(function (y) {
          res.push(MathLib.plus(x, y));
        });
      });

    return MathLib.set(res);
  }
  else {
    return this.map(function (x) {
      return MathLib.plus(x, n);
    });
  }
});


// ### Set.prototype.powerset()
// Returns the powerset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'powerset', function (a) {
  var res = [], arr, temp, i, ii, j, jj;
  for (i=0, ii=Math.pow(2, this.card); i<ii; i++) {
    arr = i.toString(2).split('').reverse();
    temp = [];
    for (j=0, jj=this.card; j<jj; j++) {
      if(arr[j] === '1') {
        temp.push(this[j]);
      }
    }
    res.push(MathLib.set(temp));
  }
  return MathLib.set(res);
});


// ### Set.prototype.remove()
// Removes a element from a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'remove', function (a) {
  var i = this.indexOf(a);
  if (i !== -1) {
    this.splice(i, 1);
  }
  return this;
});


// ### Set.prototype.times()
// Multiplies all elements in the set if no argument is passed.
// Multiplies all elements by a argument if one is passed.
//
// *@param {number|MathLib object}*  
// *@returns {set}*
MathLib.extendPrototype('set', 'times', function (n) {
  if (!arguments.length) {
    return MathLib.times(this);
  }
  else {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
});


// ### Set.prototype.toArray()
// Converts the set to an array
//
// *@returns {array}*
MathLib.extendPrototype('set', 'toArray', function () {
  return this.slice();
});


// ### Set.prototype.toLaTeX()
// Returns the LaTeX representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toLaTeX', function () {
  if (this.isEmpty()) {
    return '\\emptyset';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toLaTeX(cur) + ', ';
    }, '\\{').slice(0, -2) + '\\}';
  }
});


// ### Set.prototype.toContentMathML()
// Returns the content MathML representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toContentMathML', function () {
  if (this.isEmpty()) {
    return '<emptyset/>';
  }
  else {
    return this.reduce(function(old, cur) {
      return old + MathLib.toContentMathML(cur);
    }, '<set>') + '</set>';
  }
});


// ### Set.prototype.toMathML()
// Returns the (presentation) MathML representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toMathML', function () {
  if (this.isEmpty()) {
    return '<mi>&#x2205;</mi>';
  }
  else {
    return this.reduce(function(old, cur) {
      return old +  MathLib.toMathML(cur) + '<mo>,</mo>';
    }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
  }
});


// ### Set.prototype.toMultiset()
// Converts a set to a multiset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toMultiset', function () {
  return MathLib.set(this.toArray(), true);
});


// ### Set.prototype.toSet()
// Converts a multiset to a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'toSet', function () {
  return MathLib.set(this.toArray());
});


// ### Set.prototype.toString()
// Returns a string representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toString', function () {
  if (this.isEmpty()) {
    return '∅';
  }
  return '(' + this.join(', ') +  ')';
});


(function () {
  var createSetOperation = function(left, both, right) {
    return function (a) {
      var res = [],
          i = 0,
          j = 0,
          tl = this.card,
          al = a.card;

      while (i < tl && j < al) {
        if (this[i] < a[j]) {
          if (left) {
            res.push(this[i]);
          }
          i++;
          continue;
        }
        if (this[i] > a[j]) {
          if (right) {
            res.push(a[j]);
          }
          j++;
          continue;
        }
        if (this[i] === a[j]) {
          if (both) {
            res.push(this[i]);
          }
          i++;
          j++;
          continue;
        }
      }
      if (left && j === al) {
        res = res.concat(this.slice(i));
      }
      else if (right && i === tl) {
        res = res.concat(a.slice(j));
      }
      return MathLib.set(res, true);
    };
  };

  MathLib.extendPrototype('set', 'or', createSetOperation(true, true, true));
  MathLib.extendPrototype('set', 'and', createSetOperation(false, true, false));
  MathLib.extendPrototype('set', 'without', createSetOperation(true, false, false));
  MathLib.extendPrototype('set', 'xor', createSetOperation(true, false, true));
}());




// ### Set.prototype.fromTo()
// Creates a set containing the numbers from a start value to a end value.
//
// *@param {number}* The number to start from  
// *@param {number}* The number to end with  
// *@param {number}* The stepsize (default = 1)  
// *@returns {set}*
MathLib.extend('set', 'fromTo', function (f, t, s) {
  var i, arr = [];
  s = s || 1;
  if (f <= t) {
    for (i = f; i <= t; i += s) {
      arr.push(i);
    }
    return MathLib.set(arr);
  }
});
  // ## Epilog

  // Add MathLib to the global namespace
  global.MathLib = MathLib;

  // ### MathLib.noConflict
  // Restores the original value of MathLib in the global namespace
  //
  // *@returns {object}* Returns a reference to this Mathlib library
  MathLib.noConflict = function () {
    global.MathLib = oldMathLib;
    return MathLib;
  };

}(document));
