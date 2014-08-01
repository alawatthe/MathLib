
/* jshint esnext:true */


import {abs, arccos, arcosh, coerce, coerceTo, copy, cos, cosh, divide, exp, floor, hypot, inverse, isEqual, isNegZero, isPosZero, isZero, ln, minus, negative, plus, pow, sign, sin, sinh, times, type} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {CoercionError} from 'CoercionError';
import {Integer} from 'Integer';
import {Point} from 'Point';


/**
* Complex is the MathLib implementation of complex numbers.
*
* There are two ways of defining complex numbers:
*
* * Two numbers representing the real and the complex part.
* * Complex.polar(abs, arg)
*
* #### Simple example:
* ```
* // Create the complex number 1 + 2i
* var c = new Complex(1, 2);
* ```
*
* @class
* @this {Complex}
*/
var Complex = (function () {
    function Complex(re, im) {
        if (typeof im === "undefined") { im = 0; }
        this.type = 'complex';
        if (isNaN(re) || isNaN(im)) {
            this.re = NaN;
            this.im = NaN;
        } else if (!isFinite(re) || !isFinite(im)) {
            this.re = Infinity;
            this.im = Infinity;
        } else {
            this.re = re;
            this.im = im;
        }
    }
    /**
    * The characteristic of the complex field is 0.
    *
    * @return {Integer}
    */
    Complex.characteristic = function () {
        return new Integer(0);
    };

    /**
    * A content MathML string representation
    *
    * @return {string}
    */
    Complex.toContentMathML = function (options) {
        if (typeof options === "undefined") { options = {}; }
        if (options.strict) {
            return '<csymbol cd="setname1">C</csymbol>';
        }
        return '<complexes/>';
    };

    /**
    * A LaTeX string representation
    *
    * @return {string}
    */
    Complex.toLaTeX = function () {
        return 'Complex Field $\\mathbb{C}$';
    };

    /**
    * A presentation MathML string representation
    *
    * @return {string}
    */
    Complex.toMathML = function () {
        return '<mrow><mtext>Complex Field</mtext><mi mathvariant="double-struck">C</mi></mrow>';
    };

    /**
    * Custom toString function
    *
    * @return {string}
    */
    Complex.toString = function () {
        return 'Complex Field ℂ';
    };

    /**
    * Returns the absolute value of the number.
    *
    * @return {number}
    */
    Complex.prototype.abs = function () {
        return hypot(this.re, this.im);
    };

    /**
    * Returns the inverse cosine of the number.
    *
    * @return {Complex}
    */
    Complex.prototype.arccos = function () {
        return (new Complex(Math.PI / 2, -0)).minus(this.arcsin());
    };

    /**
    * Returns the inverse cotangent of the number.
    *
    * @return {Complex}
    */
    Complex.prototype.arccot = function () {
        if (this.isZero()) {
            return new Complex(sign(1 / this.re) * Math.PI / 2, -this.im);
        }
        return this.inverse().arctan();
    };

    /**
    * Returns the inverse cosecant of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arccsc = function () {
        // arccsc(0) = ComplexInfinity not ComplexNaN
        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return this.inverse().arcsin();
    };

    /**
    * Returns the inverse hyperbolic cosine of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arcosh = function () {
        var arccos;

        if (this.isZero()) {
            return new Complex(0, 1.5707963267948966192);
        }

        arccos = this.arccos();
        arccos = arccos.times(new Complex(0, arccos.im > 0 ? -1 : 1));

        if (isNegZero(this.im) && this.re >= -1) {
            arccos.im = -arccos.im;
        }

        return arccos;
    };

    /**
    * Returns the inverse hyperbolic cotangent of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arcoth = function () {
        var one = new Complex(1, -0);

        if (isZero(this.re)) {
            if (isPosZero(this.im)) {
                return new Complex(this.re, -1.5707963267948966192);
            }
            if (isNegZero(this.im)) {
                return new Complex(this.re, 1.5707963267948966192);
            }
        }

        if (this.re === Infinity) {
            return new Complex(0, 0);
        }

        return times(0.5, this.plus(one).divide(this.minus(one)).ln());
    };

    /**
    * Returns the inverse hyperbolic cosecant of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arcsch = function () {
        return this.inverse().arsinh();
    };

    /**
    * Returns the inverse secant of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arcsec = function () {
        // arcsec(0) = ComplexInfinity not ComplexNaN
        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return this.inverse().arccos();
    };

    /**
    * Returns the inverse sine of the number
    *
    * @return {Complex}
    */
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
            return new Complex(Infinity);
        }

        return new Complex(sgn(a) / 2 * arccos(sqrt - (aa + bb)), sgn(b) / 2 * arcosh(sqrt + (aa + bb)));
    };

    /**
    * Returns the inverse tangent of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arctan = function () {
        var res, one = new Complex(1, -0), iz = new Complex(-this.im, this.re);

        if (this.isZero()) {
            return new Complex(this.re, this.im);
        }

        res = times(new Complex(0, -0.5), plus(one, iz).divide(minus(one, iz)).ln());

        // Correct some values on the axis imaginary axis.
        // TODO: Are this all the wrong values?
        if (isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
            res.re = -res.re;
        }

        return res;
    };

    /**
    * Returns the argument (= the angle) of the complex number
    *
    * @return {number}
    */
    Complex.prototype.arg = function () {
        if (this.re === Infinity) {
            return NaN;
        }
        return Math.atan2(this.im, this.re);
    };

    /**
    * Returns the inverse hyperbolic secant of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arsech = function () {
        if (this.re === Infinity) {
            return new Complex(NaN);
        }
        return this.inverse().arcosh();
    };

    /**
    * Returns the inverse hyperbolic sine of the number
    *
    * @return {Complex}
    */
    Complex.prototype.arsinh = function () {
        var a = this.re, b = this.im, aa = a * a, bb = b * b, sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * aa), sgn = function (x) {
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
            return new Complex(Infinity);
        }

        return new Complex(sgn(a) / 2 * arcosh(sqrt + (aa + bb)), sgn(b) / 2 * arccos(sqrt - (aa + bb)));
    };

    /**
    * Returns the inverse hyperbolic tangent of the number
    *
    * @return {Complex}
    */
    Complex.prototype.artanh = function () {
        var one = new Complex(1, -0);

        if (this.isZero()) {
            return new Complex(this.re, this.im);
        }

        if (this.re === Infinity) {
            return new Complex(NaN);
        }

        return times(0.5, minus(one.plus(this).ln(), one.minus(this).ln()));
    };

    /**
    * Coerces the complex number to some other data type
    *
    * @param {string} type The type to coerce the complex number into
    * @return {Rational|number|Complex}
    */
    Complex.prototype.coerceTo = function (type) {
        if (type === 'complex') {
            return this.copy();
        }

        if (isZero(this.im)) {
            return coerceTo(this.re, type);
        } else {
            if (type === 'integer') {
                throw new CoercionError('Cannot coerce the complex number to an integer, since the imaginary part is not zero.', {
                    method: 'Complex.prototype.coerceTo'
                });
            } else if (type === 'rational') {
                throw new CoercionError('Cannot coerce the complex number to a rational number, since the imaginary part is not zero.', {
                    method: 'Complex.prototype.coerceTo'
                });
            } else if (type === 'number') {
                throw new CoercionError('Cannot coerce the complex number to a number, since the imaginary part is not zero.', {
                    method: 'Complex.prototype.coerceTo'
                });
            } else {
                throw new CoercionError('Cannot coerce the complex number to "' + type + '".', {
                    method: 'Complex.prototype.coerceTo'
                });
            }
        }
    };

    /**
    * Compares two complex numbers
    *
    * @param {Complex} x The complex number to compare the current number to
    * @return {number}
    */
    Complex.prototype.compare = function (x) {
        var a = sign(this.abs() - x.abs());

        if (isNaN(this.re)) {
            if (isNaN(x.re)) {
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

        return a ? a : sign(this.arg() - x.arg());
    };

    /**
    * Calculates the conjugate of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.conjugate = function () {
        return new Complex(this.re, negative(this.im));
    };

    /**
    * Copies the complex number
    *
    * @return {Complex}
    */
    Complex.prototype.copy = function () {
        return new Complex(copy(this.re), copy(this.im));
    };

    /**
    * Calculates the cosine of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.cos = function () {
        return new Complex(cos(this.re) * cosh(this.im), -sin(this.re) * sinh(this.im));
    };

    /*
    * Calculates the hyperbolic cosine of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.cosh = function () {
        return new Complex(cos(this.im) * cosh(this.re), sin(this.im) * sinh(this.re));
    };

    /**
    * Calculates the cotangent of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.cot = function () {
        var aa = 2 * this.re, bb = 2 * this.im, d = cos(aa) - cosh(bb);

        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return new Complex(-sin(aa) / d, sinh(bb) / d);
    };

    /**
    * Calculates the hyperbolic cotangent of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.coth = function () {
        var aa = 2 * this.re, bb = 2 * this.im, d = cosh(aa) - cos(bb);

        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return new Complex(sinh(aa) / d, -sin(bb) / d);
    };

    /**
    * Calculates the cosecant of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.csc = function () {
        var a = this.re, b = this.im, d = cos(2 * a) - cosh(2 * b);

        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return new Complex(-2 * sin(a) * cosh(b) / d, 2 * cos(a) * sinh(b) / d);
    };

    /**
    * Calculates the hyperbolic cosecant of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.csch = function () {
        var a = this.re, b = this.im, d = cosh(2 * a) - cos(2 * b);

        if (this.isZero()) {
            return new Complex(Infinity);
        }

        return new Complex(2 * sinh(a) * cos(b) / d, -2 * cosh(a) * sin(b) / d);
    };

    /**
    * Divides a complex number by an other
    *
    * @param {number|Complex} divisor The divisor
    * @return {Complex}
    */
    Complex.prototype.divide = function (divisor) {
        return this.times(inverse(divisor));
    };

    /**
    * Evaluates the exponential function with a complex argument
    *
    * @return {Complex}
    */
    Complex.prototype.exp = function () {
        return new Complex(exp(this.re) * cos(this.im), exp(this.re) * sin(this.im));
    };

    /**
    * Calculates the inverse of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.inverse = function () {
        var d = plus(pow(this.re, 2), pow(this.im, 2));

        if (this.isZero()) {
            return new Complex(Infinity);
        }

        if (this.re === Infinity) {
            return new Complex(0);
        }

        return new Complex(divide(this.re, d), divide(negative(this.im), d));
    };

    /**
    * Determines if the complex number is equal to another number.
    *
    * @param {Integer|Rational|number|Complex} n The number to be compared
    * @return {boolean}
    */
    Complex.prototype.isEqual = function (n) {
        if (n.type !== 'complex') {
            if (isZero(this.im)) {
                return isEqual.apply(null, coerce(this.re, n));
            } else {
                return false;
            }
        } else {
            return isEqual(this.re, n.re) && isEqual(this.im, n.im);
        }
    };

    /**
    * Determines if the complex number is finite.
    *
    * @return {boolean}
    */
    Complex.prototype.isFinite = function () {
        return isFinite(this.re);
    };

    /**
    * Determines if the complex number is equal to 0.
    *
    * @return {boolean}
    */
    Complex.prototype.isZero = function () {
        return isZero(this.re) && isZero(this.im);
    };

    /*
    * Evaluates the natural logarithm with complex arguments
    *
    * @return {Complex}
    */
    Complex.prototype.ln = function () {
        if (this.re === Infinity) {
            return new Complex(Infinity);
        }
        return new Complex(ln(this.abs()), this.arg());
    };

    /**
    * Calculates the difference of two complex numbers
    *
    * @param {number|Complex} subtrahend The subtrahend
    * @return {Complex}
    */
    Complex.prototype.minus = function (subtrahend) {
        return this.plus(negative(subtrahend));
    };

    /**
    * Calculates the negative of the complex number
    *
    * @return {Complex}
    */
    Complex.prototype.negative = function () {
        return new Complex(negative(this.re), negative(this.im));
    };

    /**
    * Add complex numbers
    *
    * @param {Integer|Rational|number|Complex} summand The number to be added
    * @return {Complex}
    */
    Complex.prototype.plus = function (summand) {
        if (summand.type !== 'complex') {
            return new Complex(plus.apply(null, coerce(this.re, summand)), this.im);
        } else {
            return new Complex(plus(this.re, summand.re), plus(this.im, summand.im));
        }
    };

    /**
    * Calculates the complex number raised to some power
    *
    * @param {numeric} c The power to which the complex number should be raised
    * @return {Complex}
    */
    Complex.prototype.pow = function (c) {
        var re, im, abs, arg;

        if (type(c) === 'complex') {
            re = c.re;
            im = c.im;
            abs = this.abs();
            arg = this.arg();

            // Fixes inf^(2+5i) = inf and 0^(2+5i) = 0
            if ((this.isZero() || this.re === Infinity) && !(c.isZero() || c.re === Infinity || isNaN(c.re))) {
                return new Complex(this.re, this.im);
            }

            return Complex.polar(times(pow(abs, re), exp(negative(times(im, arg)))), plus(times(re, arg), times(im, ln(abs))));
        } else {
            // The naive pow method has some rounding errrors. For example
            // (2+5i)^3 = -142.00000000000006-64.99999999999999i
            // instead of -142-65i which are errors of magnitude around 1e-14.
            // This error increases quickly for increasing exponents.
            // (2+5i)^21 has an error of 5.8 in the real part
            // return Complex.polar(pow(abs, c), times(arg, c));
            // The following algorithm uses a different approach for integer exponents,
            // where it yields exact results.
            // Non integer exponents are evaluated using the naive approach.
            // TODO: Improve the algorithm.
            var i, int = floor(Math.abs(c)), res = new Complex(1), power = this, bin = int.toString(2);

            // If the exponent is not an integer we use the naive approach
            if (c % 1) {
                abs = this.abs();
                arg = this.arg();
                return Complex.polar(pow(abs, c), times(arg, c));
            }

            // The imaginary part of (2+5i)^-0 should be -0 not +0.
            if (isZero(c)) {
                return new Complex(1, c);
            }

            for (i = bin.length - 1; i >= 0; i--) {
                if (bin[i] === '1') {
                    res = times(res, power);
                }
                power = times(power, power);
            }

            if (c < 0) {
                res = res.inverse();
            }

            return res;
        }
    };

    /**
    * Calculates the secant of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sec = function () {
        var a = this.re, b = this.im, d = cos(2 * a) + cosh(2 * b);

        return new Complex(2 * cos(a) * cosh(b) / d, 2 * sin(a) * sinh(b) / d);
    };

    /**
    * Calculates the hyperbolic secant of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sech = function () {
        var a = this.re, b = this.im, d = cosh(2 * a) + cos(2 * b);

        return new Complex(2 * cosh(a) * cos(b) / d, -2 * sinh(a) * sin(b) / d);
    };

    /**
    * Calculates the signum of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sign = function () {
        if (this.isZero() || isNaN(this.re)) {
            return this;
        } else if (this.re === Infinity) {
            return new Complex(NaN);
        }
        return Complex.polar(1, this.arg());
    };

    /**
    * Calculates the sine of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sin = function () {
        return new Complex(sin(this.re) * cosh(this.im), cos(this.re) * sinh(this.im));
    };

    /**
    * Calculates the hyperbolic sine of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sinh = function () {
        return new Complex(cos(this.im) * sinh(this.re), sin(this.im) * cosh(this.re));
    };

    /**
    * Takes the square root of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.sqrt = function () {
        return Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
    };

    /**
    * Calculates the tangent of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.tan = function () {
        var aa = 2 * this.re, bb = 2 * this.im, d = cos(aa) + cosh(bb);

        return new Complex(sin(aa) / d, sinh(bb) / d);
    };

    /**
    * Calculates the hyperbolic tangent of a complex number
    *
    * @return {Complex}
    */
    Complex.prototype.tanh = function () {
        var aa = 2 * this.re, bb = 2 * this.im, d = cosh(aa) + cos(bb);

        return new Complex(sinh(aa) / d, sin(bb) / d);
    };

    /**
    * Multiplies complex numbers
    *
    * @param {Complex|number|Rational} factor The number to be multiplied
    * @return {Complex}
    */
    Complex.prototype.times = function (factor) {
        if (factor.type === 'complex') {
            if (this.re === Infinity) {
                if (factor.isZero() || isNaN(factor.re)) {
                    return new Complex(NaN);
                } else {
                    return new Complex(Infinity);
                }
            }

            if (factor.re === Infinity) {
                if (this.isZero() || isNaN(this.re)) {
                    return new Complex(NaN);
                } else {
                    return new Complex(Infinity);
                }
            }

            return new Complex(minus(times(this.re, factor.re), times(this.im, factor.im)), plus(times(this.re, factor.im), times(this.im, factor.re)));
        } else if (factor.type === 'rational') {
            factor = factor.coerceTo('number');
        }
        if (typeof factor === 'number') {
            return new Complex(times(this.re, factor), times(this.im, factor));
        }
    };

    /**
    * Returns the content MathML representation of the number
    *
    * @return {string}
    */
    Complex.prototype.toContentMathML = function () {
        if (!this.isFinite()) {
            return '<csymbol cd="nums1">' + (this.re === Infinity ? 'infinity' : 'NaN') + '</csymbol>';
        }

        return '<apply><plus />' + toContentMathML(this.re) + '<apply><times />' + toContentMathML(this.im) + '<imaginaryi /></apply></apply>';
    };

    /**
    * Returns the LaTeX representation of the complex number
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Complex.prototype.toLaTeX = function (options) {
        if (typeof options === "undefined") { options = {}; }
        var option, str = '', reFlag = !isZero(this.re), passOptions = {};

        if (!this.isFinite()) {
            return (options.sign ? '+' : '') + '\\text{Complex' + this.re + '}';
        }

        if (!isZero(this.im)) {
            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            passOptions.sign = reFlag || options.sign;

            str += toLaTeX(this.im, passOptions) + 'i';
        }

        if (reFlag || str.length === 0) {
            str = toLaTeX(this.re, options) + str;
        }

        return str;
    };

    /**
    * Returns the (presentation) MathML representation of the number
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Complex.prototype.toMathML = function (options) {
        if (typeof options === "undefined") { options = {}; }
        var str = '', option, reFlag = !isZero(this.re), passOptions = {};

        if (!this.isFinite()) {
            return (options.sign ? '<mo>+</mo>' : '') + '<mi>Complex' + this.re + '</mi>';
        }

        if (!isZero(this.im)) {
            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            if (reFlag || options.sign) {
                passOptions.sign = false;
                str += '<mo>' + toString(this.im, { sign: true }).slice(0, 1) + '</mo><mrow>' + toMathML(abs(this.im), passOptions) + '<mo>&#x2062;</mo><mi>i</mi></mrow>';
            } else {
                str += '<mrow>' + toMathML(this.im, passOptions) + '<mo>&#x2062;</mo><mi>i</mi></mrow>';
            }
        }

        if (reFlag || str.length === 0) {
            str = toMathML(this.re, options) + str;
        }

        return str;
    };

    /**
    * Interprets the complex number as point in the two dimensional plane
    *
    * @return {Point}
    */
    Complex.prototype.toPoint = function () {
        if (this.re === Infinity || isNaN(this.re)) {
            return new Point([0, 0, 0]);
        }

        return new Point([this.re, this.im, 1]);
    };

    /**
    * Custom toString function
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Complex.prototype.toString = function (options) {
        if (typeof options === "undefined") { options = {}; }
        var str = '', option, reFlag = !isZero(this.re), passOptions = {};

        if (!this.isFinite()) {
            return (options.sign ? '+' : '') + 'Complex' + this.re;
        }

        if (!isZero(this.im)) {
            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            passOptions.sign = reFlag || options.sign;

            str += toString(this.im, passOptions) + 'i';
        }

        if (reFlag || str.length === 0) {
            str = toString(this.re, options) + str;
        }

        return str;
    };
    Complex.polar = function (abs, arg) {
        if (abs === Infinity) {
            return new Complex(Infinity);
        }
        return new Complex(abs * Math.cos(arg), abs * Math.sin(arg));
    };
    return Complex;
})();
export default Complex;

