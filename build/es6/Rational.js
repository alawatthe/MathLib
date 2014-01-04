
import MathLib from './meta.js';
import Functn from './Functn';

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
            MathLib.error({ message: 'The denominator cannot be zero.', method: 'Rational.constructor' });
            throw 'The denominator cannot be zero.';
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }
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
    * @param {Rational} number The number to compare
    * @return {boolean}
    */
    Rational.prototype.isEqual = function (number) {
        return MathLib.isEqual(MathLib.times(this.numerator, number.denominator), MathLib.times(this.denominator, number.numerator));
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
        var n = this.numerator, d = this.denominator;

        if (subtrahend.type === 'rational') {
            return new MathLib.Rational(MathLib.minus(MathLib.times(n, subtrahend.denominator), MathLib.times(d, subtrahend.numerator)), MathLib.times(d, subtrahend.denominator));
        } else if (typeof subtrahend === 'number') {
            return new MathLib.Rational(MathLib.minus(n, MathLib.times(subtrahend, d)), d);
        } else {
            return subtrahend.minus(this).negative();
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
    * @param {Rational|number} summand The number to be added
    * @return {Rational}
    */
    Rational.prototype.plus = function (summand) {
        var n = this.numerator, d = this.denominator;

        if (summand.type === 'rational') {
            return new MathLib.Rational(MathLib.plus(MathLib.times(d, summand.numerator), MathLib.times(n, summand.denominator)), MathLib.times(d, summand.denominator));
        } else if (typeof summand === 'number') {
            return new MathLib.Rational(MathLib.plus(n, MathLib.times(summand, d)), d);
        } else {
            return summand.plus(this);
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
    * @return {string}
    */
    Rational.prototype.toContentMathML = function () {
        return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
    };

    /**
    * Returns the LaTeX representation of the rational number
    *
    * @return {string}
    */
    Rational.prototype.toLaTeX = function () {
        return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
    };

    /**
    * Returns the MathML representation of the rational number
    *
    * @return {string}
    */
    Rational.prototype.toMathML = function () {
        return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
    };

    /**
    * Returns the number represented by the rational number
    *
    * @return {number}
    */
    Rational.prototype.toNumber = function () {
        return this.numerator / this.denominator;
    };

    /**
    * Custom toString function
    *
    * @return {string}
    */
    Rational.prototype.toString = function () {
        return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
    };
    return Rational;
})();
export default = Rational;

