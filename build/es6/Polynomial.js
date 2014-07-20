
/* jshint esnext:true */


import {fallingFactorial, is, isEqual, isZero, negative, plus, sign, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {Expression} from 'Expression';
import {Functn} from 'Functn';
import {Matrix} from 'Matrix';


/**
* The polynomial implementation of MathLib makes calculations with polynomials.
* Both the coefficients and the arguments of a polynomial can be numbers,
* complex numbers and matrices.
*
* It is as easy as
* ```
* new Polynomial([1, 2, 3])
* ```
* to create the polynomial 1 + 2x + 3x²
* The polynomial x¹⁰⁰ can be created with the following statement:
* ```
* new Polynomial(100)
* ```
*
* @class
* @this {Polynomial}
*/
var Polynomial = (function () {
    function Polynomial(polynomial) {
        var _this = this;
        this.type = 'polynomial';
        var coefficients = [];

        if (polynomial === undefined || polynomial.length === 0) {
            polynomial = [0];
        } else if (typeof polynomial === 'number') {
            while (polynomial--) {
                coefficients.push(0);
            }
            coefficients.push(1);
            polynomial = coefficients;
        }

        polynomial.forEach(function (x, i) {
            _this[i] = x;
        });
        this.length = polynomial.length;
        this.deg = polynomial.length - 1;
        this.subdeg = (function (a) {
            var i = 0;
            if (a.length > 1 || a[0]) {
                while (i < a.length && isZero(a[i])) {
                    i++;
                }
                return i;
            }
            return Infinity;
        }(polynomial));
    }
    /**
    * Interpolates points.
    *
    * @return {Polynomial}
    */
    Polynomial.interpolation = function (a, b) {
        var basisPolynomial, interpolant = new Polynomial([0]), n = a.length, i, j;

        if (arguments.length === 2) {
            a = a.map(function (x, i) {
                return [x, b[i]];
            });
        }

        for (i = 0; i < n; i++) {
            basisPolynomial = new Polynomial([1]);
            for (j = 0; j < n; j++) {
                if (i !== j) {
                    basisPolynomial = basisPolynomial.times(new Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
                }
            }
            interpolant = interpolant.plus(basisPolynomial.times(a[i][1]));
        }
        return interpolant;
    };

    /**
    * Calculates the regression line for some points
    *
    * @param {array} x The x values
    * @param {array} y The y values
    * @return {Polynomial}
    */
    Polynomial.regression = function (x, y) {
        var length = x.length, xy = 0, xi = 0, yi = 0, x2 = 0, m, c, i;

        if (arguments.length === 2) {
            for (i = 0; i < length; i++) {
                xy += x[i] * y[i];
                xi += x[i];
                yi += y[i];
                x2 += x[i] * x[i];
            }
        } else {
            for (i = 0; i < length; i++) {
                xy += x[i][0] * x[i][1];
                xi += x[i][0];
                yi += x[i][1];
                x2 += x[i][0] * x[i][0];
            }
        }

        m = (length * xy - xi * yi) / (length * x2 - xi * xi);
        c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
        return new Polynomial([c, m]);
    };

    /**
    * Returns a polynomial with the specified roots
    *
    * @param {array|Set} zeros The wished zeros.
    * @return {Polynomial}
    */
    Polynomial.roots = function (zeros) {
        var elemSymPoly, i, ii, coef = [];

        if (type(zeros) === 'array') {
            zeros = new Set(zeros);
        }

        elemSymPoly = zeros.powerset();
        for (i = 0, ii = zeros.card; i < ii; i++) {
            coef[i] = 0;
        }

        // Vieta's theorem
        elemSymPoly.slice(1).forEach(function (x) {
            coef[ii - x.card] = plus(coef[ii - x.card], x.times());
        });

        coef = coef.map(function (x, i) {
            if ((ii - i) % 2) {
                return negative(x);
            }
            return x;
        });

        coef.push(1);
        return new Polynomial(coef);
    };

    /**
    * Compares two polynomials.
    *
    * @param {Polynomial} p The polynomial to compare
    * @return {number}
    */
    Polynomial.prototype.compare = function (p) {
        var i, ii;

        if (this.length !== p.length) {
            return sign(this.length - p.length);
        }

        for (i = 0, ii = this.length; i < ii; i++) {
            if (p[i] - this[i]) {
                return sign(this[i] - p[i]);
            }
        }

        return 0;
    };

    /**
    * Differentiates the polynomial
    *
    * @param {number} n the number of times to differentiate the polynomial.
    * @return {Polynomial}
    */
    Polynomial.prototype.differentiate = function (n) {
        if (typeof n === "undefined") { n = 1; }
        var i, ii, derivative = [];

        if (n === 0) {
            return this;
        }

        for (i = 0, ii = this.deg - n; i <= ii; i++) {
            derivative[i] = times(this[i + n], fallingFactorial(i + n, n));
        }
        return new Polynomial(derivative);
    };

    /**
    * Draws the polynomial on the screen
    *
    * @param {Screen} screen The screen to draw the polynomial onto.
    * @param {object} options Optional drawing options.
    * @return {Polynomial} Returns the polynomial for chaining
    */
    Polynomial.prototype.draw = function (screen, options) {
        if (typeof options === "undefined") { options = {}; }
        return this.toFunctn().draw(screen, options);
    };

    /**
    * Works like Array.prototype.every.
    *
    * @param {function} f The function to be applied to all the values
    * @return {boolean}
    */
    Polynomial.prototype.every = function (f) {
        return Array.prototype.every.call(this, f);
    };

    /**
    * Works like the Array.prototype.forEach function
    */
    Polynomial.prototype.forEach = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        Array.prototype.forEach.apply(this, args);
    };

    /**
    * Integrates the polynomial
    *
    * @param {number} n The number of times to integrate the polynomial.
    * @return {Polynomial}
    */
    Polynomial.prototype.integrate = function (n) {
        if (typeof n === "undefined") { n = 1; }
        var i, ii, antiderivative = [];

        if (isZero(n)) {
            return this;
        }

        for (i = 0; i < n; i++) {
            antiderivative.push(0);
        }

        for (i = 0, ii = this.deg; i <= ii; i++) {
            antiderivative[i + n] = this[i] / fallingFactorial(i + n, n);
        }
        return new Polynomial(antiderivative);
    };

    /**
    * Decides if two polynomials are equal.
    *
    * @param {Polynomial} p The polynomial to compare.
    * @return {boolean}
    */
    Polynomial.prototype.isEqual = function (p) {
        var i, ii;
        if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
            return false;
        }
        for (i = 0, ii = this.deg; i <= ii; i++) {
            if (!isEqual(this[i], p[i])) {
                return false;
            }
        }
        return true;
    };

    /**
    * Works like the Array.prototype.map function
    *
    * @param {function} f The function to be applied to all the values
    * @return {Polynomial}
    */
    Polynomial.prototype.map = function (f) {
        return new Polynomial(Array.prototype.map.call(this, f));
    };

    /**
    * Returns the negative polynomial
    *
    * @return {Polynomial}
    */
    Polynomial.prototype.negative = function () {
        return new Polynomial(this.map(function (entry) {
            return negative(entry);
        }));
    };

    /**
    * Adds a number or a polynomial
    *
    * @param {number|Polynomial} a The number or polynomial to add to the current polynomial
    * @return {Polynomial}
    */
    Polynomial.prototype.plus = function (a) {
        var plus = [], i;
        if (typeof a === 'number') {
            plus = this.slice();
            plus[0] = plus(plus[0], a);
        } else if (a.type === 'polynomial') {
            for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
                plus[i] = plus(this[i], a[i]);
            }
            plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
        }
        return new Polynomial(plus);
    };

    /**
    * Works like the Array.prototype.slice function
    *
    * @return {array}
    */
    Polynomial.prototype.slice = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.slice.apply(this, args);
    };

    /**
    * Multiplies the polynomial by a number or an other polynomial
    *
    * @param {number|Polynomial} a The multiplicator
    * @return {Polynomial}
    */
    Polynomial.prototype.times = function (a) {
        var i, ii, j, jj, product = [];

        if (a.type === 'polynomial') {
            for (i = 0, ii = this.deg; i <= ii; i++) {
                for (j = 0, jj = a.deg; j <= jj; j++) {
                    product[i + j] = plus((product[i + j] ? product[i + j] : 0), times(this[i], a[j]));
                }
            }
            return new Polynomial(product);
        } else if (a.type === 'rational') {
            a = a.coerceTo('number');
        }

        // we we multiply it to every coefficient
        return this.map(function (b) {
            return times(a, b);
        });
    };

    /**
    * Returns a content MathML representation of the polynomial
    *
    * @return {string}
    */
    Polynomial.prototype.toContentMathML = function () {
        var str = '<apply><csymbol cd="arith1">plus</csymbol>', i;
        for (i = this.deg; i >= 0; i--) {
            if (!isZero(this[i])) {
                if (i === 0) {
                    str += toContentMathML(this[i]);
                } else {
                    str += '<apply><csymbol cd="arith1">times</csymbol>' + toContentMathML(this[i], true);
                }

                if (i > 1) {
                    str += '<apply><csymbol cd="arith1">power</csymbol><ci>x</ci>' + toContentMathML(i) + '</apply></apply>';
                } else if (i === 1) {
                    str += '<ci>x</ci></apply>';
                }
            }
        }

        str += '</apply>';

        return str;
    };

    /**
    * Custom toExpression function
    *
    * @return {Expression}
    */
    Polynomial.prototype.toExpression = function () {
        var content = [], sum, i;

        for (i = this.deg; i >= 0; i--) {
            if (!isZero(this[i])) {
                if (i > 1) {
                    content.push(new Expression({
                        subtype: 'naryOperator',
                        value: '^',
                        name: 'pow',
                        content: [
                            new Expression({
                                subtype: 'naryOperator',
                                content: [
                                    new Expression({
                                        subtype: 'number',
                                        value: this[i].toString()
                                    }),
                                    new Expression({
                                        subtype: 'variable',
                                        value: 'x'
                                    })
                                ],
                                value: '*',
                                name: 'times'
                            }),
                            new Expression({
                                subtype: 'number',
                                value: i.toString()
                            })
                        ]
                    }));
                } else if (i === 1) {
                    content.push(new Expression({
                        subtype: 'naryOperator',
                        content: [
                            new Expression({
                                subtype: 'number',
                                value: this[i].toString()
                            }),
                            new Expression({
                                subtype: 'variable',
                                value: 'x'
                            })
                        ],
                        value: '*',
                        name: 'times'
                    }));
                } else if (i === 0) {
                    content.push(new Expression({
                        subtype: 'number',
                        value: this[i].toString()
                    }));
                }
            }
        }

        sum = new Expression({
            content: content,
            subtype: 'naryOperator',
            value: '+',
            name: 'plus'
        });

        return new Expression({
            subtype: 'functionDefinition',
            args: ['x'],
            content: [sum]
        });
    };

    /**
    * Converts the polynomial to a functn
    *
    * @return {Functn}
    */
    Polynomial.prototype.toFunctn = function () {
        var str = '', i, ii;
        for (i = 0, ii = this.deg; i <= ii; i++) {
            if (!isZero(this[i])) {
                if (i === 0) {
                    str += toString(this[i]);
                } else {
                    str += toString(this[i], { sign: true });
                }

                if (i > 1) {
                    str += ' * Math.pow(x, ' + toString(i) + ')';
                } else if (i === 1) {
                    str += ' * x';
                }
            }
        }

        return Functn(new Function('x', 'return ' + str), {
            expression: this.toExpression()
        });
    };

    /**
    * Returns a LaTeX representation of the polynomial
    *
    * @return {string}
    */
    Polynomial.prototype.toLaTeX = function () {
        var str = toString(this[this.deg]) + 'x^{' + this.deg + '}', i;

        for (i = this.deg - 1; i >= 0; i--) {
            if (!isZero(this[i])) {
                // if (i === 0) {
                //   str += toLaTeX(this[i]);
                // }
                // else {
                str += toLaTeX(this[i], { sign: true });

                // }
                if (i > 1) {
                    str += 'x^{' + toLaTeX(i) + '}';
                } else if (i === 1) {
                    str += 'x';
                }
            }
        }
        return str;
    };

    /**
    * Returns a MathML representation of the polynomial
    *
    * @return {string}
    */
    Polynomial.prototype.toMathML = function () {
        var str = '<mrow>' + toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + toMathML(this.deg) + '</msup>', i;
        for (i = this.deg - 1; i >= 0; i--) {
            if (!isZero(this[i])) {
                // if (i === 0) {
                //   str += toMathML(this[i]);
                // }
                // else {
                str += toMathML(this[i], { sign: true });

                // }
                if (i > 1) {
                    str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + toMathML(i).slice(6, -7) + '</msup>';
                } else if (i === 1) {
                    str += '<mo>&#x2062;</mo><mi>x</mi>';
                }
            }
        }

        str += '</mrow>';

        return str;
    };

    /**
    * Custom toString function
    *
    * @return {string}
    */
    Polynomial.prototype.toString = function () {
        var i, str = toString(this[this.deg]) + '*x^' + this.deg;

        for (i = this.deg - 1; i >= 0; i--) {
            if (!isZero(this[i])) {
                str += toString(this[i], { sign: true });

                if (i > 1) {
                    str += '*x^' + toString(i);
                } else if (i === 1) {
                    str += '*x';
                }
            }
        }
        return str;
    };

    /**
    * Evaluates the polynomial at a given point
    *
    * @param {number|Complex|Matrix} x The value to evaluate the polynomial at.
    * @return {number|Complex|Matrix}
    */
    Polynomial.prototype.valueAt = function (x) {
        // TODO: warn if x is non square matrix
        var pot = is(x, 'matrix') ? Matrix.identity(x.rows) : 1, value = is(x, 'matrix') ? Matrix.zero(x.rows, x.cols) : 0, i, ii;

        for (i = 0, ii = this.deg; i <= ii; i++) {
            value = plus(value, times(this[i], pot));
            pot = times(pot, x);
        }
        return value;
    };
    Polynomial.one = new Polynomial([1]);

    Polynomial.zero = new Polynomial([0]);
    return Polynomial;
})();
export default Polynomial;

