// ## <a id="Functions"></a>Functions
//
// Because 'function' is a reserved word in JavaScript the module is called 
// 'functn'.  
// More improvements to the module coming soon.


prototypes.functn = function(){};
MathLib.functn = function (f, options) {
  var functn = function (x) {
    if (typeof x === 'number') {
      return f.apply('', arguments);
    }
    else if (x.type === 'functn') {
      var outerVar = functn.MathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerVar = x.MathML.childNodes[0].childNodes[0].childNodes[0].outerMathML,
          innerStr = x.MathML.childNodes[0].childNodes[2].outerMathML.replace('<bvar>' + innerVar + '</bvar>', ''), 
          outerStr = functn.MathML.childNodes[0].childNodes[2].outerMathML.replace(outerVar, innerStr),
          res = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' + innerVar + '</bvar><domainofapplication><complexes/></domainofapplication>' + outerStr + '</lambda></math>';
      return MathLib.functn(function (y) {return f(x(y));}, {MathMLString: res});
    }
    else if (typeof x === 'function') {
      return function (y) {return f(x(y));};
    }
    else if (x.type === 'set') {
      return MathLib.set( x.map(f) );
    }
    else if(x.type === 'complex') {
      return x[f.name].apply(x, Array.prototype.slice.call(arguments, 1));
    }
    else if (Array.isArray(x)) {
      return x.map(f);
    }
    else {
      return x[name]();
    }
  };

  functn[proto] = prototypes.functn;
  options = options || {};
  var MathML = options.MathMLString || '';
  
  Object.defineProperties(functn, {
    id: { value: f.name},
    MathML: { value: MathLib.MathML(MathML) }
  });

  return functn;
};

// Setting the .constructor property to MathLib.functn
MathLib.extendPrototype('functn', 'constructor', MathLib.functn);

// Setting the .type property to 'functn'
MathLib.extendPrototype('functn', 'type', 'functn');



// ### Functn.prototype.draw()
// Draws the function on the screen
//
// *@param {screen}* The screen to draw the function onto.  
// *@param {object}* [options] Optional drawing options.  
// *@returns {functn}*
MathLib.extendPrototype('functn', 'draw', function (screen, options) {
  var path = [], i;

  for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
    path.push([i, this(i)]);
  }
  if (Array.isArray(screen)) {
    screen.forEach(function (x) {
      x.path(path, options);
    });
  }
  else {
    screen.path(path, options);
  }

  return this;
});



// ### Functn.prototype.toContentMathML()
// Returns a content MathML representation of the function
//
// *@returns {MathML}*
MathLib.extendPrototype('functn', 'toContentMathML', function () {
  return this.MathML.outerMathML;
});



// ### Functn.prototype.toMathML()
// Returns a MathML representation of the function
//
// *@returns {MathML}*
MathLib.extendPrototype('functn', 'toMathML', function () {
  return this.MathML.toMathML();
});



// ### Functn.prototype.toString()
// Returns a string representation of the function
//
// *@returns {string}*
MathLib.extendPrototype('functn', 'toString', function () {
  return this.MathML.toString();
});



var mathStart = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><',
    mathEnd   = '/><ci>x</ci></apply></lambda></math>';


// ## Elementary functions
// Some functions for the functn prototype
var functionList = {
  abs: function abs(x) {
    return Math.abs(x);
  },
  arccos: function arccos(x){
    return Math.acos(x);
  },
  arccot: function arccot(x){
    return MathLib.pi / 2 - Math.atan(x);
  },
  arccsc: function arccsc(x){
    return Math.asin(1 / x);
  },
  arcosh: function arcosh(x){
    return Math.log(x + Math.sqrt(x * x - 1));
  },  
  arcoth: function arcoth(x){
    return 0.5 * Math.log((x + 1) / (x - 1));
  },
  arcsch: function arcsch(x){
    return Math.log((1 + Math.sqrt(1 + x * x)) / (x));
  },
  arcsec: function arcsec(x){
    return Math.acos(1 / x);
  },
  arcsin: function arcsin(x){
    return Math.asin(x);
  },
  arctan: function arctan(x){
    return Math.atan(x);
  },
  arsech: function arsech(x){
    return Math.log((1 + Math.sqrt(1 - x * x)) / (x));
  },
  arsinh: function arsinh(x){
    return Math.log(x + Math.sqrt(x * x + 1));
  },
  artanh: function artanh(x){
    return 0.5 * Math.log((1 + x) / (1 - x));
  },
  ceil: function ceil(x) {
    return Math.ceil(x);
  },
  floor: function floor(x) {
    return Math.floor(x);
  },
  cos: function cos(x){
    return Math.cos(x);
  },
  cosh: function cosh(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
  },
  cot: function cot(x) {
    return 1 / Math.tan(x);
  },
  coth: function coth(x) {
    return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
  },
  csc: function csc(x) {
    return 1 / Math.sin(x);
  },
  csch: function csch(x) {
    return 2 / (Math.exp(x) - Math.exp(-x));
  },
  exp: function exp(x){
    return Math.exp(x);
  },
  inverse: function inverse(x){
    return 1/x;
  },
  sec: function (x) {
    return 1 / Math.cos(x);
  },
  sech: function (x) {
    return 2 / (Math.exp(x) + Math.exp(-x));
  },
  sin: function sin(x){
    return Math.sin(x);
  },
  sinh: function sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
  },
  tan: function (x) {
    return Math.tan(x);
  },
  tanh: Math.tanh || function (x) {
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
  }
};


// Create the elementary functions
for (var elemfn in functionList) {
  if (functionList.hasOwnProperty(elemfn)) {
    MathLib.extend('', elemfn, MathLib.functn(functionList[elemfn], {MathMLString: mathStart + elemfn + mathEnd}));
  }
}


MathLib.identity = MathLib.functn(function identity(x){
    return x;
  }, {MathMLString: mathStart + 'ident' + mathEnd}
);



// These functions will be added to the functn prototype soon.
var functionList1 = {
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
  conjugate: function (x) {
        return x;
      },
  copy: function (x) {
        return x;
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
  pow: function (x, y) {
        if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
          return 1;
        }
        return Math.pow(x, y);
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
  sgn: function (x) {
        return x > 0 ? 1:x < 0 ? -1 : 0;
      },
  sqrt: function (x) {
        if (x === 0) {
          return 0;
        }
        return Math.sqrt(x);
      },
  trunc: function (x, n) {
        return x.toFixed(n || 0);
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

MathLib.toContentMathML = function (x) {
  if (typeof x === 'number'){
    return '<cn>' + x + '</cn>';
  }
  else {
    return x.toContentMathML();
  }
};





// ### MathLib.and()
// Returns true iff all arguments are true.
// 
// *@param {boolean}* Expects an arbitrary number of boolean arguments  
// *@returns {boolean}*
MathLib.and = function () {
  return Array.prototype.slice.call(arguments).every(function (x) {return !!x;});
};


// ### MathLib.or()
// Returns true iff at least one argument is true.
// 
// *@param {boolean}* Expects an arbitrary number of boolean arguments  
// *@returns {boolean}*
MathLib.or = function () {
  return Array.prototype.slice.call(arguments).some(function (x) {return !!x;});
};


// ### MathLib.xor()
// Returns true iff an odd number of the arguments is true.
// 
// *@param {boolean}* Expects an arbitrary number of boolean arguments  
// *@returns {boolean}*
MathLib.xor = function () {
  return Array.prototype.slice.call(arguments).reduce(function (x, y) {return x + y;}) % 2 !== 0;
};


// ### MathLib.not()
// Negates the argument.
// 
// *@param {boolean}* Expects one boolean argument  
// *@returns {boolean}*
MathLib.not = function (x) {
  return !x;
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
        return MathLib.plus.apply(null, this) / this.length;
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
        return MathLib.root(MathLib.times.apply(null, this), this.length);
      },
  harmonicMean: function () {
        return this.length / MathLib.plus.apply(null, Array.prototype.map.call(this, MathLib.inverse));
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



// ### MathLib.plus()
// Returns the sum of all arguments.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@returns {number, MathLib object}*
MathLib.plus = function () {
  return Array.prototype.slice.apply(arguments).reduce(function (a, b) {
    var f1, f2, astr, bstr;
    if (typeof a === 'number' && typeof b === 'number') {
      return a + b;
    }
    else if (a.type === 'functn' || b.type === 'functn') {
      astr = a.type === 'functn' ? a.MathML.childNodes[0].apply.outerMathML : MathLib.toContentMathML(a);
      bstr = b.type === 'functn' ? b.MathML.childNodes[0].apply.outerMathML : MathLib.toContentMathML(b);
      f1 = a;
      f2 = b;
      if (a.type !== 'functn') {
        f1 = function () {
          return a;
        };
      }
      else if(b.type !== 'functn') {
        f2 = function () {
          return b;
        };
      }
      var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/>' + astr + bstr + '</apply></lambda></math>';
      return MathLib.functn(function (x) {
        return MathLib.plus(f1(x), f2(x));
      }, {
        MathMLString: MathML
      });
    }
    else if (typeof a === 'object') {
      return a.plus(b);
    }
    // We're assuming that the operations are commutative
    else if (typeof b === 'object') {
      return b.plus(a);
    }
  });
};



// ### MathLib.isEqual()
// Determines if all arguments are equal.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@returns {boolean}*
MathLib.isEqual = function () {
  return flatten(toArray.apply(arguments)).every(function (a, i, arr) {
    if (a === arr[0]) {
      return true;
    }
    else if (typeof a === 'number' && typeof arr[0] === 'number') {
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
};



// ### MathLib.times()
// Returns the product of all arguments.
// 
// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
// *@returns {boolean}*
MathLib.times = function () {
  return Array.prototype.slice.apply(arguments).reduce(function (a, b) {
    var f1, f2, astr, bstr;
    if (typeof a === 'number' && typeof b === 'number') {
      return a * b;
    }
    else if (a.type === 'functn' || b.type === 'functn') {
      astr = a.type === 'functn' ? a.MathML.childNodes[0].apply.outerMathML : MathLib.toContentMathML(a);
      bstr = b.type === 'functn' ? b.MathML.childNodes[0].apply.outerMathML : MathLib.toContentMathML(b);
      f1 = a;
      f2 = b;
      if (a.type !== 'functn') {
        f1 = function () {
          return a;
        };
      }
      else if(b.type !== 'functn') {
        f2 = function () {
          return b;
        };
      }
      var MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><times/>' + astr + bstr + '</apply></lambda></math>';
      return MathLib.functn(function (x) {
        return MathLib.times(f1(x), f2(x));
      }, {
        MathMLString: MathML
      });
    }
    else if (typeof a === 'object') {
      return a.times(b);
    }
    // We're assuming that the operations are commutative
    else if (typeof b === 'object') {
      return b.times(a);
    }
  });
};



var createFunction1 = function (f, name) {
  return function (x) {
    if (typeof x === 'number') {
      return f.apply('', arguments);
    }
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
