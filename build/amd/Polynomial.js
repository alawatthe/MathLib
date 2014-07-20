
    'use strict';

    /*es6
    import {fallingFactorial, is, isEqual, isZero, negative, plus, sign, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Expression} from 'Expression';
    import {Functn} from 'Functn';
    import {Matrix} from 'Matrix';
    es6*/
    define(['meta', 'Functn'], function(MathLib) {
    /**
    * The polynomial implementation of MathLib makes calculations with polynomials.
    * Both the coefficients and the arguments of a polynomial can be numbers,
    * complex numbers and matrices.
    *
    * It is as easy as
    * ```
    * new MathLib.Polynomial([1, 2, 3])
    * ```
    * to create the polynomial 1 + 2x + 3x²
    * The polynomial x¹⁰⁰ can be created with the following statement:
    * ```
    * new MathLib.Polynomial(100)
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
                    while (i < a.length && MathLib.isZero(a[i])) {
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
            var basisPolynomial, interpolant = new MathLib.Polynomial([0]), n = a.length, i, j;

            if (arguments.length === 2) {
                a = a.map(function (x, i) {
                    return [x, b[i]];
                });
            }

            for (i = 0; i < n; i++) {
                basisPolynomial = new MathLib.Polynomial([1]);
                for (j = 0; j < n; j++) {
                    if (i !== j) {
                        basisPolynomial = basisPolynomial.times(new MathLib.Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
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
            return new MathLib.Polynomial([c, m]);
        };

        /**
        * Returns a polynomial with the specified roots
        *
        * @param {array|Set} zeros The wished zeros.
        * @return {Polynomial}
        */
        Polynomial.roots = function (zeros) {
            var elemSymPoly, i, ii, coef = [];

            if (MathLib.type(zeros) === 'array') {
                zeros = new MathLib.Set(zeros);
            }

            elemSymPoly = zeros.powerset();
            for (i = 0, ii = zeros.card; i < ii; i++) {
                coef[i] = 0;
            }

            // Vieta's theorem
            elemSymPoly.slice(1).forEach(function (x) {
                coef[ii - x.card] = MathLib.plus(coef[ii - x.card], x.times());
            });

            coef = coef.map(function (x, i) {
                if ((ii - i) % 2) {
                    return MathLib.negative(x);
                }
                return x;
            });

            coef.push(1);
            return new MathLib.Polynomial(coef);
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
                return MathLib.sign(this.length - p.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (p[i] - this[i]) {
                    return MathLib.sign(this[i] - p[i]);
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
                derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
            }
            return new MathLib.Polynomial(derivative);
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

            if (MathLib.isZero(n)) {
                return this;
            }

            for (i = 0; i < n; i++) {
                antiderivative.push(0);
            }

            for (i = 0, ii = this.deg; i <= ii; i++) {
                antiderivative[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
            }
            return new MathLib.Polynomial(antiderivative);
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
                if (!MathLib.isEqual(this[i], p[i])) {
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
            return new MathLib.Polynomial(Array.prototype.map.call(this, f));
        };

        /**
        * Returns the negative polynomial
        *
        * @return {Polynomial}
        */
        Polynomial.prototype.negative = function () {
            return new MathLib.Polynomial(this.map(function (entry) {
                return MathLib.negative(entry);
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
                plus[0] = MathLib.plus(plus[0], a);
            } else if (a.type === 'polynomial') {
                for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
                    plus[i] = MathLib.plus(this[i], a[i]);
                }
                plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
            }
            return new MathLib.Polynomial(plus);
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
                        product[i + j] = MathLib.plus((product[i + j] ? product[i + j] : 0), MathLib.times(this[i], a[j]));
                    }
                }
                return new MathLib.Polynomial(product);
            } else if (a.type === 'rational') {
                a = a.coerceTo('number');
            }

            // we we multiply it to every coefficient
            return this.map(function (b) {
                return MathLib.times(a, b);
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
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toContentMathML(this[i]);
                    } else {
                        str += '<apply><csymbol cd="arith1">times</csymbol>' + MathLib.toContentMathML(this[i], true);
                    }

                    if (i > 1) {
                        str += '<apply><csymbol cd="arith1">power</csymbol><ci>x</ci>' + MathLib.toContentMathML(i) + '</apply></apply>';
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
                if (!MathLib.isZero(this[i])) {
                    if (i > 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            value: '^',
                            name: 'pow',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'naryOperator',
                                    content: [
                                        new MathLib.Expression({
                                            subtype: 'number',
                                            value: this[i].toString()
                                        }),
                                        new MathLib.Expression({
                                            subtype: 'variable',
                                            value: 'x'
                                        })
                                    ],
                                    value: '*',
                                    name: 'times'
                                }),
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: i.toString()
                                })
                            ]
                        }));
                    } else if (i === 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: this[i].toString()
                                }),
                                new MathLib.Expression({
                                    subtype: 'variable',
                                    value: 'x'
                                })
                            ],
                            value: '*',
                            name: 'times'
                        }));
                    } else if (i === 0) {
                        content.push(new MathLib.Expression({
                            subtype: 'number',
                            value: this[i].toString()
                        }));
                    }
                }
            }

            sum = new MathLib.Expression({
                content: content,
                subtype: 'naryOperator',
                value: '+',
                name: 'plus'
            });

            return new MathLib.Expression({
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
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toString(this[i]);
                    } else {
                        str += MathLib.toString(this[i], { sign: true });
                    }

                    if (i > 1) {
                        str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
                    } else if (i === 1) {
                        str += ' * x';
                    }
                }
            }

            return MathLib.Functn(new Function('x', 'return ' + str), {
                expression: this.toExpression()
            });
        };

        /**
        * Returns a LaTeX representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toLaTeX = function () {
            var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}', i;

            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toLaTeX(this[i]);
                    // }
                    // else {
                    str += MathLib.toLaTeX(this[i], { sign: true });

                    // }
                    if (i > 1) {
                        str += 'x^{' + MathLib.toLaTeX(i) + '}';
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
            var str = '<mrow>' + MathLib.toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>', i;
            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toMathML(this[i]);
                    // }
                    // else {
                    str += MathLib.toMathML(this[i], { sign: true });

                    // }
                    if (i > 1) {
                        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i).slice(6, -7) + '</msup>';
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
            var i, str = MathLib.toString(this[this.deg]) + '*x^' + this.deg;

            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    str += MathLib.toString(this[i], { sign: true });

                    if (i > 1) {
                        str += '*x^' + MathLib.toString(i);
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
            var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows) : 1, value = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0, i, ii;

            for (i = 0, ii = this.deg; i <= ii; i++) {
                value = MathLib.plus(value, MathLib.times(this[i], pot));
                pot = MathLib.times(pot, x);
            }
            return value;
        };
        Polynomial.one = new Polynomial([1]);

        Polynomial.zero = new Polynomial([0]);
        return Polynomial;
    })();
    MathLib.Polynomial = Polynomial;
return MathLib;
});
