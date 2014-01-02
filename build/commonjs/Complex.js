
    // ## <a id="Complex"></a>Complex
    // MathLib.Complex is the MathLib implementation of complex numbers.
    //
    // There are two ways of defining complex numbers:
    //
    // * Two numbers representing the real and the complex part.
    // * MathLib.Complex.polar(abs, arg)
    //
    // #### Simple example:
    // ```
    // // Create the complex number 1 + 2i
    // var c = new MathLib.Complex(1, 2);
    // ```
    var MathLib = require('./meta.js'),
		Functn = require('./Functn'),
		Point = require('./Point');

    var Complex = (function () {
        function Complex(re, im) {
            if (typeof im === "undefined") { im = 0; }
            this.type = 'complex';
            if (MathLib.isNaN(re) || MathLib.isNaN(im)) {
                this.re = NaN;
                this.im = NaN;
            } else if (!MathLib.isFinite(re) || !MathLib.isFinite(im)) {
                this.re = Infinity;
                this.im = Infinity;
            } else {
                this.re = re;
                this.im = im;
            }
        }
        // ### [Complex.prototype.abs()](http://mathlib.de/en/docs/Complex/abs)
        // Returns the absolute value of the number.
        //
        // *@return {number}*
        Complex.prototype.abs = function () {
            return MathLib.hypot(this.re, this.im);
        };

        // ### [Complex.prototype.arccos()](http://mathlib.de/en/docs/Complex/arccos)
        // Returns the inverse cosine of the number.
        //
        // *@return {Complex}*
        Complex.prototype.arccos = function () {
            return MathLib.minus(Math.PI / 2, this.arcsin());
        };

        // ### [Complex.prototype.arccot()](http://mathlib.de/en/docs/Complex/arccot)
        // Returns the inverse cotangent of the number.
        //
        // *@return {Complex}*
        Complex.prototype.arccot = function () {
            if (this.isZero()) {
                return new MathLib.Complex(MathLib.sign(1 / this.re) * Math.PI / 2, -this.im);
            }
            return this.inverse().arctan();
            //var c = this.arctan();
            //console.log(c.toString());
            //return new MathLib.Complex(Math.PI / 2 - c.re, c.im);
            //return MathLib.minus(Math.PI / 2, this.arctan());
        };

        // ### [Complex.prototype.arccsc()](http://mathlib.de/en/docs/Complex/arccsc)
        // Returns the inverse cosecant of the number
        //
        // *@return {Complex}*
        Complex.prototype.arccsc = function () {
            // arccsc(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arcsin();
        };

        // ### [Complex.prototype.arcsec()](http://mathlib.de/en/docs/Complex/arcsec)
        // Returns the inverse secant of the number
        //
        // *@return {Complex}*
        Complex.prototype.arcsec = function () {
            // arcsec(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arccos();
        };

        // ### [Complex.prototype.arcsin()](http://mathlib.de/en/docs/Complex/arcsin)
        // Returns the inverse sine of the number
        //
        // *@return {Complex}*
        Complex.prototype.arcsin = function () {
            var a = this.re, b = this.im, aa = a * a, bb = b * b, sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb), sgn = function (x) {
                if (x > 0) {
                    return 1;
                }
                if (x < 0) {
                    return -1;
                }
                if (1 / x === Infinity) {
                    return 1;
                }
                if (1 / x === -Infinity) {
                    return -1;
                }
            };

            if (a === Infinity) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(sgn(a) / 2 * MathLib.arccos(sqrt - (aa + bb)), sgn(b) / 2 * MathLib.arcosh(sqrt + (aa + bb)));
        };

        // ### [Complex.prototype.arctan()](http://mathlib.de/en/docs/Complex/arctan)
        // Returns the inverse tangent of the number
        //
        // *@return {Complex}*
        Complex.prototype.arctan = function () {
            var res, iz = new MathLib.Complex(-this.im, this.re);

            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            res = MathLib.times(new MathLib.Complex(0, -0.5), MathLib.plus(1, iz).divide(MathLib.minus(1, iz)).ln());

            // Correct some values on the axis imaginary axis.
            // TODO: Are this all the wrong values?
            if (MathLib.isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
                res.re = -res.re;
            }

            return res;
        };

        // ### [Complex.prototype.arg()](http://mathlib.de/en/docs/Complex/arg)
        // Returns the argument (= the angle) of the complex number
        //
        // *@return {number}*
        Complex.prototype.arg = function () {
            if (this.re === Infinity) {
                return NaN;
            }
            return Math.atan2(this.im, this.re);
        };

        // ### Complex.prototype.artanh()
        // Returns the inverse hyperbolic tangent of the number
        //
        // *@return {Complex}*
        Complex.prototype.artanh = function () {
            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }

            return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
        };

        // ### [Complex.prototype.compare()](http://mathlib.de/en/docs/Complex/compare)
        // Compares two complex numbers
        //
        // *@return {number}*
        Complex.prototype.compare = function (x) {
            var a = MathLib.sign(this.abs() - x.abs());

            if (MathLib.isNaN(this.re)) {
                if (MathLib.isNaN(x.re)) {
                    return 0;
                }
                return -1;
            }

            if (this.re === Infinity) {
                if (x.re === Infinity) {
                    return 0;
                }
                return 1;
            }

            return a ? a : MathLib.sign(this.arg() - x.arg());
        };

        // ### [Complex.prototype.conjugate()](http://mathlib.de/en/docs/Complex/conjugate)
        // Calculates the conjugate of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.conjugate = function () {
            return new MathLib.Complex(this.re, MathLib.negative(this.im));
        };

        // ### [Complex.prototype.copy()](http://mathlib.de/en/docs/Complex/copy)
        // Copies the complex number
        //
        // *@return {Complex}*
        Complex.prototype.copy = function () {
            return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
        };

        // ### [Complex.prototype.cos()](http://mathlib.de/en/docs/Complex/cos)
        // Calculates the cosine of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.cos = function () {
            return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
        };

        // ### [Complex.prototype.cosh()](http://mathlib.de/en/docs/Complex/cosh)
        // Calculates the hyperbolic cosine of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.cosh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
        };

        // ### [Complex.prototype.cot()](http://mathlib.de/en/docs/Complex/cot)
        // Calculates the cotangent of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.cot = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) - MathLib.cosh(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        // ### [Complex.prototype.coth()](http://mathlib.de/en/docs/Complex/coth)
        // Calculates the hyperbolic cotangent of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.coth = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) - MathLib.cos(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(MathLib.sinh(aa) / d, -MathLib.sin(bb) / d);
        };

        // ### [Complex.prototype.csc()](http://mathlib.de/en/docs/Complex/csc)
        // Calculates the cosecant of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.csc = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) - MathLib.cosh(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-2 * MathLib.sin(a) * MathLib.cosh(b) / d, 2 * MathLib.cos(a) * MathLib.sinh(b) / d);
        };

        // ### [Complex.prototype.csch()](http://mathlib.de/en/docs/Complex/csch)
        // Calculates the hyperbolic cosecant of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.csch = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) - MathLib.cos(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(2 * MathLib.sinh(a) * MathLib.cos(b) / d, -2 * MathLib.cosh(a) * MathLib.sin(b) / d);
        };

        // ### [Complex.prototype.divide()](http://mathlib.de/en/docs/Complex/divide)
        // Divides a complex number by an other
        //
        // *@param {number|Complex}* The divisor
        // *@return {Complex}*
        Complex.prototype.divide = function (c) {
            return this.times(MathLib.inverse(c));
        };

        // ### [Complex.prototype.exp()](http://mathlib.de/en/docs/Complex/exp)
        // Evaluates the exponential function with a complex argument
        //
        // *@return {Complex}*
        Complex.prototype.exp = function () {
            return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
        };

        // ### [Complex.prototype.inverse()](http://mathlib.de/en/docs/Complex/inverse)
        // Calculates the inverse of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.inverse = function () {
            var d = MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2));

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(0);
            }

            return new MathLib.Complex(MathLib.divide(this.re, d), MathLib.divide(MathLib.negative(this.im), d));
        };

        // ### [Complex.prototype.isEqual()](http://mathlib.de/en/docs/Complex/isEqual)
        // Determines if the complex number is equal to another number.
        //
        // *@param {Complex|number|Rational}* The number to be compared
        // *@return {boolean}*
        Complex.prototype.isEqual = function (n) {
            if (typeof n === 'number') {
                return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
            }
            if (n.type === 'complex') {
                return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
            }
            return false;
        };

        // ### [Complex.prototype.isFinite()](http://mathlib.de/en/docs/Complex/isFinite)
        // Determines if the complex number is finite.
        //
        // *@return {boolean}*
        Complex.prototype.isFinite = function () {
            return MathLib.isFinite(this.re);
        };

        // ### [Complex.prototype.isZero()](http://mathlib.de/en/docs/Complex/isZero)
        // Determines if the complex number is equal to 0.
        //
        // *@return {boolean}*
        Complex.prototype.isZero = function () {
            return MathLib.isZero(this.re) && MathLib.isZero(this.im);
        };

        // ### [Complex.prototype.ln()](http://mathlib.de/en/docs/Complex/ln)
        // Evaluates the natural logarithm with complex arguments
        //
        // *@return {Complex}*
        Complex.prototype.ln = function () {
            if (this.re === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
        };

        // ### [Complex.prototype.minus()](http://mathlib.de/en/docs/Complex/minus)
        // Calculates the difference of two complex numbers
        //
        // *@param {number|Complex}* The subtrahend
        // *@return {Complex}*
        Complex.prototype.minus = function (c) {
            return this.plus(MathLib.negative(c));
        };

        // ### [Complex.prototype.negative()](http://mathlib.de/en/docs/Complex/negative)
        // Calculates the negative of the complex number
        //
        // *@return {Complex}*
        Complex.prototype.negative = function () {
            return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
        };

        // ### [Complex.prototype.plus()](http://mathlib.de/en/docs/Complex/plus)
        // Add complex numbers
        //
        // *@param {Complex|number|Rational}* The number to be added
        // *@return {Complex}*
        Complex.prototype.plus = function (c) {
            if (c.type === 'complex') {
                return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
            } else if (c.type === 'rational') {
                c = c.toNumber();
            }
            if (typeof c === 'number') {
                return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
            }
        };

        // ### [Complex.prototype.pow()](http://mathlib.de/en/docs/Complex/pow)
        // Calculates the complex number raised to some power
        //
        // *@param {numeric}* The power to which the complex number should be raised
        // *@return {Complex}*
        Complex.prototype.pow = function (c) {
            var re, im, abs, arg;

            if (MathLib.type(c) === 'complex') {
                re = c.re;
                im = c.im;
                abs = this.abs();
                arg = this.arg();

                // Fixes inf^(2+5i) = inf and 0^(2+5i) = 0
                if ((this.isZero() || this.re === Infinity) && !(c.isZero() || c.re === Infinity || MathLib.isNaN(c.re))) {
                    return new MathLib.Complex(this.re, this.im);
                }

                return MathLib.Complex.polar(MathLib.times(MathLib.pow(abs, re), MathLib.exp(MathLib.negative(MathLib.times(im, arg)))), MathLib.plus(MathLib.times(re, arg), MathLib.times(im, MathLib.ln(abs))));
            } else {
                // The naive pow method has some rounding errrors. For example
                // (2+5i)^3 = -142.00000000000006-64.99999999999999i
                // instead of -142-65i which are errors of magnitude around 1e-14.
                // This error increases quickly for increasing exponents.
                // (2+5i)^21 has an error of 5.8 in the real part
                /*
                return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                */
                // The following algorithm uses a sifferent approach for integer exponents,
                // where it yields exact results.
                // Non integer exponents are evaluated using the naive approach.
                // TODO: Improve the algorithm.
                var i, int = MathLib.floor(Math.abs(c)), res = new MathLib.Complex(1), power = this, bin = int.toString(2);

                // If the exponent is not an integer we use the naive approach
                if (c % 1) {
                    abs = this.abs();
                    arg = this.arg();
                    return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                }

                // The imaginary part of (2+5i)^-0 should be -0 not +0.
                if (MathLib.isZero(c)) {
                    return new MathLib.Complex(1, c);
                }

                for (i = bin.length - 1; i >= 0; i--) {
                    if (bin[i] === '1') {
                        res = MathLib.times(res, power);
                    }
                    power = MathLib.times(power, power);
                }

                if (c < 0) {
                    res = res.inverse();
                }

                return res;
            }
        };

        // ### [Complex.prototype.sec()](http://mathlib.de/en/docs/Complex/sec)
        // Calculates the secant of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sec = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) + MathLib.cosh(2 * b);

            return new MathLib.Complex(2 * MathLib.cos(a) * MathLib.cosh(b) / d, 2 * MathLib.sin(a) * MathLib.sinh(b) / d);
        };

        // ### [Complex.prototype.sech()](http://mathlib.de/en/docs/Complex/sech)
        // Calculates the hyperbolic secant of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sech = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) + MathLib.cos(2 * b);

            return new MathLib.Complex(2 * MathLib.cosh(a) * MathLib.cos(b) / d, -2 * MathLib.sinh(a) * MathLib.sin(b) / d);
        };

        // ### [Complex.prototype.sign()](http://mathlib.de/en/docs/Complex/sign)
        // Calculates the signum of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sign = function () {
            if (this.isZero() || MathLib.isNaN(this.re)) {
                return this;
            } else if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }
            return MathLib.Complex.polar(1, this.arg());
        };

        // ### [Complex.prototype.sin()](http://mathlib.de/en/docs/Complex/sin)
        // Calculates the sine of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sin = function () {
            return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
        };

        // ### [Complex.prototype.sinh()](http://mathlib.de/en/docs/Complex/sinh)
        // Calculates the hyperbolic sine of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sinh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
        };

        // ### [Complex.prototype.sqrt()](http://mathlib.de/en/docs/Complex/sqrt)
        // Takes the square root of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.sqrt = function () {
            return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
        };

        // ### [Complex.prototype.tan()](http://mathlib.de/en/docs/Complex/tan)
        // Calculates the tangent of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.tan = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) + MathLib.cosh(bb);

            return new MathLib.Complex(MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        // ### [Complex.prototype.tanh()](http://mathlib.de/en/docs/Complex/tanh)
        // Calculates the hyperbolic tangent of a complex number
        //
        // *@return {Complex}*
        Complex.prototype.tanh = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) + MathLib.cos(bb);

            return new MathLib.Complex(MathLib.sinh(aa) / d, MathLib.sin(bb) / d);
        };

        // ### [Complex.prototype.times()](http://mathlib.de/en/docs/Complex/times)
        // Multiplies complex numbers
        //
        // *@param {Complex|number|Rational}* The number to be multiplied
        // *@return {Complex}*
        Complex.prototype.times = function (c) {
            if (c.type === 'complex') {
                if (this.re === Infinity) {
                    if (c.isZero() || MathLib.isNaN(c.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                if (c.re === Infinity) {
                    if (this.isZero() || MathLib.isNaN(this.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)), MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
            } else if (c.type === 'rational') {
                c = c.toNumber();
            }
            if (typeof c === 'number') {
                return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
            }
        };

        // ### [Complex.prototype.toContentMathML()](http://mathlib.de/en/docs/Complex/toContentMathML)
        // Returns the content MathML representation of the number
        //
        // *@return {string}*
        Complex.prototype.toContentMathML = function () {
            if (!this.isFinite()) {
                return '<csymbol cd="nums1">' + (this.re === Infinity ? 'infinity' : 'NaN') + '</csymbol>';
            }

            return '<apply><plus />' + MathLib.toContentMathML(this.re) + '<apply><times />' + MathLib.toContentMathML(this.im) + '<imaginaryi /></apply></apply>';
        };

        // ### [Complex.prototype.toLaTeX()](http://mathlib.de/en/docs/Complex/toLaTeX)
        // Returns the LaTeX representation of the complex number
        //
        // *@return {string}*
        Complex.prototype.toLaTeX = function () {
            var str = '', reFlag = false;

            if (!this.isFinite()) {
                return '\\text{Complex' + this.re + '}';
            }

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
        };

        // ### [Complex.prototype.toMathML()](http://mathlib.de/en/docs/Complex/toMathML)
        // Returns the (presentation) MathML representation of the number
        //
        // *@return {string}*
        Complex.prototype.toMathML = function () {
            var str = '', reFlag = false;

            if (!this.isFinite()) {
                return '<mi>Complex' + this.re + '</mi>';
            }

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
        };

        // ### [Complex.prototype.toPoint()](http://mathlib.de/en/docs/Complex/toPoint)
        // Interprets the complex number as point in the two dimensional plane
        //
        // *@return {Point}*
        Complex.prototype.toPoint = function () {
            if (this.re == Infinity || MathLib.isNaN(this.re)) {
                return new MathLib.Point([0, 0, 0]);
            }

            return new MathLib.Point([this.re, this.im, 1]);
        };

        // ### [Complex.prototype.toString()](http://mathlib.de/en/docs/Complex/toString)
        // Custom toString function
        //
        // *@return {string}*
        Complex.prototype.toString = function () {
            var str = '';

            if (!this.isFinite()) {
                return 'Complex' + this.re;
            }

            if (!MathLib.isZero(this.re)) {
                str = MathLib.toString(this.re);
            }
            if (!MathLib.isZero(this.im)) {
                str += (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
            }
            if (str.length === 0) {
                str = '0';
            }
            return str;
        };
        Complex.polar = function (abs, arg) {
            if (abs === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
        };
        return Complex;
    })();
    module.exports = MathLib.Complex = Complex;

