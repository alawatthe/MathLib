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
       return Math.abs(x) !== Infinity;
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
  ln: function (x) {
        if (x > 0) {
          return Math.log(x);
        }
        else {
          return MathLib.complex([Math.log(-x), Math.PI]);
        }
      },
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
