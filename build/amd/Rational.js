
    // ## <a id="Rational" href="http://mathlib.de/en/docs/Rational">Rational</a>
    // MathLib.Rational is the MathLib implementation of rational numbers.
    //
    //
    // #### Simple use case:
    // ```
    // // Create the rational number 2/3
    // var r = new MathLib.Rational(2, 3);
    // ```
    define(['meta', 'Functn'], function(MathLib) {
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
        // ### [Rational.prototype.compare()](http://mathlib.de/en/docs/Rational/compare)
        // Compares two rational numbers
        //
        // *@param {Rational}* The number to compare
        // *@return {number}*
        Rational.prototype.compare = function (r) {
            return MathLib.sign(this.numerator * r.denominator - this.denominator * r.numerator);
        };

        // ### [Rational.prototype.divide()](http://mathlib.de/en/docs/Rational/divide)
        // Divides rational numbers
        //
        // *@param {Rational|number}* The divisor
        // *@return {Rational}*
        Rational.prototype.divide = function (r) {
            if (r.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
            } else if (typeof r === 'number') {
                return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, r));
            } else {
                return r.inverse().times(this);
            }
        };

        // ### [Rational.prototype.inverse()](http://mathlib.de/en/docs/Rational/inverse)
        // Calculates the inverse of a rational number
        //
        // *@return {Rational}*
        Rational.prototype.inverse = function () {
            if (!MathLib.isZero(this.numerator)) {
                return new MathLib.Rational(this.denominator, this.numerator);
            }
        };

        // ### [Rational.prototype.isEqual()](http://mathlib.de/en/docs/Rational/isEqual)
        // Checks if the rational number is equal to an other number
        //
        // *@return {boolean}*
        Rational.prototype.isEqual = function (r) {
            return MathLib.isEqual(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
        };

        // ### [Rational.prototype.isZero()](http://mathlib.de/en/docs/Rational/isZero)
        // Checks if the rational number is zero
        //
        // *@return {boolean}*
        Rational.prototype.isZero = function () {
            return MathLib.isZero(this.numerator);
        };

        // ### [Rational.prototype.minus()](http://mathlib.de/en/docs/Rational/minus)
        // Subtracts rational numbers
        //
        // *@param {Rational|number}* The number to be subtracted
        // *@return {Rational}*
        Rational.prototype.minus = function (r) {
            var n = this.numerator, d = this.denominator;

            if (r.type === 'rational') {
                return new MathLib.Rational(MathLib.minus(MathLib.times(n, r.denominator), MathLib.times(d, r.numerator)), MathLib.times(d, r.denominator));
            } else if (typeof r === 'number') {
                return new MathLib.Rational(MathLib.minus(n, MathLib.times(r, d)), d);
            } else {
                return r.minus(this).negative();
            }
        };

        // ### [Rational.prototype.negative()](http://mathlib.de/en/docs/Rational/negative)
        // Calculates the negative of a rational number
        //
        // *@return {Rational}*
        Rational.prototype.negative = function () {
            return new MathLib.Rational(-this.numerator, this.denominator);
        };

        // ### [Rational.prototype.plus()](http://mathlib.de/en/docs/Rational/plus)
        // Adds rational numbers
        //
        // *@param {Rational|number}* The number to be added
        // *@return {Rational}*
        Rational.prototype.plus = function (r) {
            var n = this.numerator, d = this.denominator;

            if (r.type === 'rational') {
                return new MathLib.Rational(MathLib.plus(MathLib.times(d, r.numerator), MathLib.times(n, r.denominator)), MathLib.times(d, r.denominator));
            } else if (typeof r === 'number') {
                return new MathLib.Rational(MathLib.plus(n, MathLib.times(r, d)), d);
            } else {
                return r.plus(this);
            }
        };

        // ### [Rational.prototype.reduce()](http://mathlib.de/en/docs/Rational/reduce)
        // Reduces the rational number
        //
        // *@return {Rational}*
        Rational.prototype.reduce = function () {
            var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
            return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
        };

        // ### [Rational.prototype.times()](http://mathlib.de/en/docs/Rational/times)
        // Multiplies rational numbers
        //
        // *@param {Rational|number}* The number to be multiplied
        // *@return {Rational}*
        Rational.prototype.times = function (r) {
            if (r.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, r.numerator), MathLib.times(this.denominator, r.denominator));
            } else if (typeof r === 'number') {
                return new MathLib.Rational(MathLib.times(this.numerator, r), this.denominator);
            } else {
                return r.times(this);
            }
        };

        // ### [Rational.prototype.toContentMathML()](http://mathlib.de/en/docs/Rational/toContentMathML)
        // Returns the Content MathML representation of the rational number
        //
        // *@return {string}*
        Rational.prototype.toContentMathML = function () {
            return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
        };

        // ### [Rational.prototype.toLaTeX()](http://mathlib.de/en/docs/Rational/toLaTeX)
        // Returns the LaTeX representation of the rational number
        //
        // *@return {string}*
        Rational.prototype.toLaTeX = function () {
            return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
        };

        // ### [Rational.prototype.toMathML()](http://mathlib.de/en/docs/Rational/toMathML)
        // Returns the MathML representation of the rational number
        //
        // *@return {string}*
        Rational.prototype.toMathML = function () {
            return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
        };

        // ### [Rational.prototype.toNumber()](http://mathlib.de/en/docs/Rational/toNumber)
        // Returns the number represented by the rational number
        //
        // *@return {number}*
        Rational.prototype.toNumber = function () {
            return this.numerator / this.denominator;
        };

        // ### [Rational.prototype.toString()](http://mathlib.de/en/docs/Rational/toString)
        // Custom toString function
        //
        // *@return {string}*
        Rational.prototype.toString = function () {
            return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
        };
        return Rational;
    })();
    MathLib.Rational = Rational;
return MathLib;
});
