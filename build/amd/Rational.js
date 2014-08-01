
    'use strict';

    /*es6
    import {abs, coerce, copy, isEqual, isZero, minus, negative, plus, sign, times} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Complex} from 'Complex';
    import {CoercionError} from 'CoercionError';
    import {EvaluationError} from 'EvaluationError';
    import {Integer} from 'Integer';
    es6*/
    define(['meta', 'Functn'], function(MathLib) {
    /**
    * MathLib.Rational is the MathLib implementation of rational numbers.
    *
    * #### Simple use case:
    * ```
    * // Create the rational number 2/3
    * var r = new MathLib.Rational(2, 3);
    * ```
    *
    * @class
    * @this {Rational}
    */
    var Rational = (function () {
        function Rational(numerator, denominator) {
            if (typeof denominator === "undefined") { denominator = 1; }
            this.type = 'rational';
            if (MathLib.isZero(denominator)) {
                throw new MathLib.EvaluationError('The denominator of a rational number cannot be zero.', {
                    method: 'Rational.constructor'
                });
            }
            if (MathLib.isNaN(numerator)) {
                throw new MathLib.EvaluationError('The numerator of a rational number cannot be NaN.', {
                    method: 'Rational.constructor'
                });
            }
            if (MathLib.isNaN(denominator)) {
                throw new MathLib.EvaluationError('The denominator of a rational number cannot be NaN.', {
                    method: 'Rational.constructor'
                });
            }

            if ((typeof denominator === 'number' && denominator < 0) || (denominator.type === 'integer' && denominator.sign === '-')) {
                numerator = MathLib.negative(numerator);
                denominator = MathLib.negative(denominator);
            }

            this.numerator = numerator;
            this.denominator = denominator;
        }
        /**
        * The characteristic of the rational field is 0.
        *
        * @return {Integer}
        */
        Rational.characteristic = function () {
            return new MathLib.Integer(0);
        };

        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Rational.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return '<csymbol cd="setname1">Q</csymbol>';
            }
            return '<rationals/>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Rational.toLaTeX = function () {
            return 'Rational Field $\\mathbb{Q}$';
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Rational.toMathML = function () {
            return '<mrow><mtext>Rational Field</mtext><mi mathvariant="double-struck">Q</mi></mrow>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Rational.toString = function () {
            return 'Rational Field ℚ';
        };

        /**
        * Coerces the rational number to some other data type
        *
        * @param {string} type The type to coerce the rational number into
        * @return {Integer|Rational|number|Complex}
        */
        Rational.prototype.coerceTo = function (type) {
            if (type === 'integer') {
                if (this.denominator === 1) {
                    return new MathLib.Integer(this.numerator);
                }
                throw new MathLib.CoercionError('Cannot coerce the rational number to an integer, since the denominator is not 1.', {
                    method: 'Rational.prototype.coerceTo'
                });
            } else if (type === 'rational') {
                return this.copy();
            } else if (type === 'complex') {
                // return new MathLib.Complex(this, new MathLib.Rational(0));
                return new MathLib.Complex(this, 0);
            } else if (type === 'number') {
                return this.numerator / this.denominator;
            } else {
                throw new MathLib.CoercionError('Cannot coerce the rational number to "' + type + '".', {
                    method: 'Rational.prototype.coerceTo'
                });
            }
        };

        /**
        * Compares two rational numbers
        *
        * @param {Rational} rational The number to compare
        * @return {number}
        */
        Rational.prototype.compare = function (rational) {
            return MathLib.sign(this.numerator * rational.denominator - this.denominator * rational.numerator);
        };

        /**
        * Copy the rational number
        *
        * @return {Rational}
        */
        Rational.prototype.copy = function () {
            return new MathLib.Rational(MathLib.copy(this.numerator), MathLib.copy(this.denominator));
        };

        /**
        * Divides rational numbers
        *
        * @param {Rational|number} divisor The divisor
        * @return {Rational}
        */
        Rational.prototype.divide = function (divisor) {
            if (divisor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, divisor.denominator), MathLib.times(this.denominator, divisor.numerator));
            } else if (typeof divisor === 'number') {
                return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, divisor));
            } else {
                return divisor.inverse().times(this);
            }
        };

        /**
        * Calculates the inverse of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.inverse = function () {
            if (!MathLib.isZero(this.numerator)) {
                return new MathLib.Rational(this.denominator, this.numerator);
            }
        };

        /**
        * Checks if the rational number is equal to an other number
        *
        * @param {Integer|Rational|number|Complex} n The number to compare
        * @return {boolean}
        */
        Rational.prototype.isEqual = function (n) {
            if (n.type !== 'rational') {
                return MathLib.isEqual.apply(null, MathLib.coerce(this, n));
            } else {
                return MathLib.isEqual(MathLib.times(this.numerator, n.denominator), MathLib.times(this.denominator, n.numerator));
            }
        };

        /**
        * Checks if the rational number is zero
        *
        * @return {boolean}
        */
        Rational.prototype.isZero = function () {
            return MathLib.isZero(this.numerator);
        };

        /**
        * Subtracts rational numbers
        *
        * @param {Rational|number} subtrahend The number to be subtracted
        * @return {Rational}
        */
        Rational.prototype.minus = function (subtrahend) {
            if (subtrahend.type !== 'rational') {
                return MathLib.minus.apply(null, MathLib.coerce(this, subtrahend));
            } else {
                return new MathLib.Rational(MathLib.minus(MathLib.times(this.numerator, subtrahend.denominator), MathLib.times(this.denominator, subtrahend.numerator)), MathLib.times(this.denominator, subtrahend.denominator));
            }
        };

        /**
        * Calculates the negative of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.negative = function () {
            return new MathLib.Rational(-this.numerator, this.denominator);
        };

        /**
        * Adds rational numbers
        *
        * @param {Integer|Rational|number|Complex} summand The number to be added
        * @return {Rational|number|Complex}
        */
        Rational.prototype.plus = function (summand) {
            if (summand.type !== 'rational') {
                return MathLib.plus.apply(null, MathLib.coerce(this, summand));
            } else {
                return new MathLib.Rational(MathLib.plus(MathLib.times(this.denominator, summand.numerator), MathLib.times(this.numerator, summand.denominator)), MathLib.times(this.denominator, summand.denominator));
            }
        };

        /**
        * Reduces the rational number
        *
        * @return {Rational}
        */
        Rational.prototype.reduce = function () {
            var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
            return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
        };

        /**
        * Multiplies rational numbers
        *
        * @param {Rational|number} factor The number to be multiplied
        * @return {Rational}
        */
        Rational.prototype.times = function (factor) {
            if (factor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor.numerator), MathLib.times(this.denominator, factor.denominator));
            } else if (typeof factor === 'number') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor), this.denominator);
            } else {
                return factor.times(this);
            }
        };

        /**
        * Returns the Content MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var base;

            if (options.strict) {
                return '<apply><csymbol cd="nums1">rational</csymbol>' + MathLib.toContentMathML(this.numerator, options) + MathLib.toContentMathML(this.denominator, options) + '</apply>';
            } else {
                base = (options.base || 10);
                return '<cn type="rational"' + ((base !== 10) ? ' base="' + base + '"' : '') + '>' + MathLib.toString(this.numerator, { base: base }) + '<sep/>' + MathLib.toString(this.denominator, { base: base }) + '</cn>';
            }
        };

        /**
        * Returns the LaTeX representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var numerator, option, str = '', passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            if (options.sign) {
                str = MathLib.toString(this.numerator, { sign: true }).slice(0, 1);
                numerator = MathLib.toLaTeX(MathLib.abs(this.numerator), passOptions);
            } else {
                numerator = MathLib.toLaTeX(this.numerator, passOptions);
            }

            return str + '\\frac{' + numerator + '}{' + MathLib.toLaTeX(this.denominator, passOptions) + '}';
        };

        /**
        * Returns the MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var numerator, option, str = '', passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            if (options.sign) {
                str = '<mo>' + MathLib.toString(this.numerator, { sign: true }).slice(0, 1) + '</mo>';
                numerator = MathLib.toMathML(MathLib.abs(this.numerator), passOptions);
            } else {
                numerator = MathLib.toMathML(this.numerator, passOptions);
            }

            return str + '<mfrac>' + numerator + MathLib.toMathML(this.denominator, passOptions) + '</mfrac>';
        };

        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var option, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            return MathLib.toString(this.numerator, options) + '/' + MathLib.toString(this.denominator, passOptions);
        };
        return Rational;
    })();
    MathLib.Rational = Rational;
return MathLib;
});
