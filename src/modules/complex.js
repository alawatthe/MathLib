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
  if (arguments.length === 1) {
    // Array of form [re, im]
    if (Array.isArray(arguments[0]) && arguments[0].length === 2) {
      z = arguments[0];
      re = arguments[0][0];
      im = arguments[0][1];
    }
    // single numbers n convert to n + 0*i
    else {
      z = [arguments[0], 0];
      re = arguments[0];
      im = 0;
    }
  }
  // two numbers are interpreted as absolute value and argument.
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
     MathLib.sign(a)/2 * MathLib.arccos(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) - (a*a + b*b)),
     MathLib.sign(b)/2 * MathLib.arcosh(Math.sqrt(Math.pow(a*a + b*b - 1, 2) +4*b*b) + (a*a + b*b))
    ]);
});


// Returns the inverse cotangent of the number
MathLib.extendPrototype('complex', 'arctan', function () {
  var z = MathLib.complex(-this.im, this.re);
  return MathLib.times(MathLib.complex([0, 0.5]), MathLib.ln(MathLib.divide( MathLib.plus(1, z), MathLib.minus(1, z))));
});


// Returns the argument (= the angle) of the complex number
MathLib.extendPrototype('complex', 'arg', function () {
    return Math.atan2(this.im, this.re);
});


// Returns the inverse hyperbolic tangent of the number
MathLib.extendPrototype('complex', 'artanh', function () {
  return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
});


// Compares two complex numbers
MathLib.extendPrototype('complex', 'compare', function (x) {
  var a = MathLib.sign(this.abs() - x.abs());
  return a ? a : MathLib.sign(this.arg() - x.arg());
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
  return MathLib.complex([MathLib.ln(this.abs()), this.arg()]);
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


// ### Complex.prototype.sign()
// Calculates the signum of a complex number
//
// *@returns {complex}*
MathLib.extendPrototype('complex', 'sign', function () {
  return MathLib.complex(1, this.arg());
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
MathLib.extendPrototype('complex', 'toContentMathMLString', function () {
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
MathLib.extendPrototype('complex', 'toMathMLString', function () {
  var str = '', reFlag = false;

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toMathMLString(this.re);
    reFlag = true;
  }
  if (!MathLib.isZero(this.im)) {
    str += MathLib.toMathMLString(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
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
