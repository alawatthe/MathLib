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
