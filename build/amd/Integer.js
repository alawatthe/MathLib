
    'use strict';

    /*es6
    import {coerce, divide, isEqual, isPosZero, minus, mod, plus, pow, sign, times} from 'Functn';
    import {CoercionError} from 'CoercionError';
    import {Complex} from 'Complex';
    import {Rational} from 'Rational';
    es6*/
    define(['meta', 'Functn', 'CoercionError'], function(MathLib) {
    /**
    * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
    *
    *
    * #### Simple example:
    * ```
    * // Create the integer
    * var int = new MathLib.Integer('123456789');
    * ```
    *
    * @class
    * @this {Integer}
    */
    var Integer = (function () {
        function Integer(integer, options) {
            if (typeof options === "undefined") { options = {}; }
            this.type = 'integer';
            var i, res, factor, blocksize, inputBase = options.base || 10, base = Math.pow(2, 26), data = [], sign = '+';

            if (Array.isArray(integer)) {
                i = integer.length - 1;
                while (integer[i] === 0) {
                    i--;
                }
                data = integer.slice(0, i + 1);
            }

            if (typeof integer === 'number') {
                if (integer === 0) {
                    sign = MathLib.isPosZero(integer) ? '+' : '-';
                    data.push(0);
                } else {
                    if (integer < 0) {
                        sign = '-';
                        integer = -integer;
                    }
                    while (integer) {
                        data.push(integer % base);
                        integer = Math.floor(integer / base);
                    }
                }
            } else if (typeof integer === 'string') {
                if (integer[0] === '+' || integer[0] === '-') {
                    sign = integer[0];
                    integer = integer.slice(1);
                }

                data = [];
                blocksize = Math.floor(Math.log(Math.pow(2, 53)) / Math.log(inputBase));

                while (integer.length > blocksize) {
                    data.push(new MathLib.Integer(parseInt(integer.slice(-blocksize), inputBase)));
                    integer = integer.slice(0, -blocksize);
                }
                data.push(new MathLib.Integer(parseInt(integer, inputBase)));

                res = data[data.length - 1];
                factor = new MathLib.Integer(Math.pow(inputBase, blocksize));
                for (i = data.length - 2; i >= 0; i--) {
                    res = res.times(factor).plus(data[i]);
                }

                data = res.data;
                /*
                data.push(
                Number(
                Array.prototype.reduceRight.call(integer, function (old, cur) {
                if (old.length === blocksize) {
                data.push(Number(cur + old));
                return '';
                }
                return cur + old;
                })
                )
                )
                */
            }

            if ('sign' in options) {
                sign = options.sign;
            }

            this.data = data;
            this.sign = sign;
        }
        /**
        * The characteristic of the ring of integers is 0.
        *
        * @return {Integer}
        */
        Integer.characteristic = function () {
            return new MathLib.Integer(0);
        };

        /**
        * Returns a random element of the ring of integers
        * in the intervall [start, end] (both endpoits included).
        * If the second argument is not provided, the intervall is
        * [start, 0] (if start is negative) or [0, start] (if start is positive).
        * Again, both endpoits are included.
        *
        * @param {start} Integer - the integer starting the intervall
        * @param {end} Integer - the integer ending the intervall
        * @return {Integer}
        */
        Integer.randomElement = function (start, end) {
            var i, endMinusStart, arr = [], base = Math.pow(2, 26);

            if (arguments.length === 1) {
                endMinusStart = start;
            } else {
                endMinusStart = end.minus(start);
            }

            for (i = 1; i < endMinusStart.data.length; i++) {
                arr.push(Math.floor(Math.random() * base));
            }

            arr.push(Math.floor(Math.random() * (endMinusStart.data[endMinusStart.data.length - 1] + 1)));

            if (arguments.length === 1) {
                return (new MathLib.Integer(arr, { sign: start.sign }));
            } else {
                return (new MathLib.Integer(arr)).plus(start);
            }
        };

        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Integer.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return '<csymbol cd="setname1">Z</csymbol>';
            }
            return '<integers/>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Integer.toLaTeX = function () {
            return 'Integer Ring $\\mathbb{Z}$';
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Integer.toMathML = function () {
            return '<mrow><mtext>Integer Ring</mtext><mi mathvariant="double-struck">Z</mi></mrow>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Integer.toString = function () {
            return 'Integer Ring ℤ';
        };

        /**
        * Calculates the absolute value of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.abs = function () {
            return new MathLib.Integer(this.data, { sign: '+' });
        };

        /**
        * Calculates the ceil of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.ceil = function () {
            return this.copy();
        };

        /**
        * Coerces the integer to some other data type
        *
        * @param {string} type The type to coerce the integer into
        * @return {Integer|Rational|number|Complex}
        */
        Integer.prototype.coerceTo = function (type) {
            var num;

            if (type === 'integer') {
                return this.copy();
            } else if (type === 'rational') {
                return new MathLib.Rational(this, 1);
            } else if (type === 'complex') {
                return new MathLib.Complex(this, 0);
            } else if (type === 'number') {
                // TODO: Warn when the number is bigger that 2^53
                num = this.data.reduce(function (old, cur, i) {
                    return old + cur * Math.pow(1e7, i);
                }, 0);

                if (this.sign === '-') {
                    num = -num;
                }

                return num;
            } else {
                throw new MathLib.CoercionError('Cannot coerce the integer to "' + type + '".', {
                    method: 'Integer.prototype.coerceTo'
                });
            }
        };

        /**
        * Compares the integer
        *
        * @return {Integer}
        */
        Integer.prototype.compare = function (n) {
            var i;
            if (this.sign !== n.sign) {
                if (this.isZero() && n.isZero()) {
                    return 0;
                }
                if (this.sign === '+') {
                    return 1;
                }
                return -1;
            }

            if (this.data.length !== n.data.length) {
                if (this.sign === '+') {
                    return MathLib.sign(this.data.length - n.data.length);
                } else {
                    return MathLib.sign(n.data.length - this.data.length);
                }
            } else {
                for (i = this.data.length - 1; i >= 0; i--) {
                    if (this.data[i] !== n.data[i]) {
                        if (this.sign === '+') {
                            return MathLib.sign(this.data[i] - n.data[i]);
                        } else {
                            return MathLib.sign(n.data[i] - this.data[i]);
                        }
                    }
                }
                return 0;
            }
        };

        /**
        * Calculates the complex conjugate of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.conjugate = function () {
            return this.copy();
        };

        /**
        * Copy the integer
        *
        * @return {Integer}
        */
        Integer.prototype.copy = function () {
            return new MathLib.Integer(this.data, { sign: this.sign });
        };

        /**
        * Calculates the digit sum to a given base
        *
        * @param {number} [base=10] - The base
        * @return {Integer}
        */
        Integer.prototype.digitSum = function (base) {
            if (typeof base === "undefined") { base = 10; }
            return new MathLib.Integer(this.digits(base).reduce(function (x, y) {
                return x + y;
            }));
        };

        /**
        * Returns the digits of the integer in a given base
        *
        * @param {number} [base=10] - The base
        * @return {number[]}
        */
        Integer.prototype.digits = function (base) {
            if (typeof base === "undefined") { base = 10; }
            var div, rem, temp, factor = new MathLib.Integer(base), n = this.abs(), digits = [];

            if (n.isZero()) {
                return [0];
            } else {
                while (!n.isZero()) {
                    temp = n.divrem(factor);
                    div = temp[0];
                    rem = temp[1];

                    digits.unshift(rem.data[0]);
                    n = div;
                }
            }

            return digits;
        };

        /**
        * Divides the integer by some other number.
        *
        * @param {Integer|Rational|number|Complex} divisor - The divisor
        * @return {Integer|Rational|number|Complex}
        */
        Integer.prototype.divide = function (divisor) {
            var divrem;

            if (divisor.type !== 'integer') {
                return MathLib.divide.apply(null, MathLib.coerce(this, divisor));
            } else {
                divrem = this.divrem(divisor);

                if (divrem[1].isZero()) {
                    return divrem[0];
                }

                return new MathLib.Rational(this, divisor);
            }
        };

        /**
        * Returns an array containing the quotient and the remainder of the division.
        *
        * Based on the "Schoolbook Division" in
        * Karl Hasselström's "Fast Division of Large Integers"
        * http://www.treskal.com/kalle/exjobb/original-report.pdf
        *
        * @param {Integer} divisor - The divisor
        * @return {Integer[]}
        */
        Integer.prototype.divrem = function (divisor) {
            var main, subroutine, quot, mult, temp, rem, base = Math.pow(2, 26);

            // Algorithm 3.1 Schoolbook division subroutine
            subroutine = function (A, B) {
                var q, T, temp, B1, n = A.data.length - 1;

                // Step 1
                if (A.data[n] >= B.data[n - 1]) {
                    B1 = B.copy();
                    B1.data.unshift(0);
                    temp = subroutine(A.minus(B1), B);
                    return [temp[0].plus(new MathLib.Integer(base)), temp[1]];
                }

                // Step 2
                // nothing to do
                // Step 3
                q = new MathLib.Integer(Math.min(Math.floor((A.data[n] * base + A.data[n - 1]) / B.data[n - 1]), base - 1));

                // Step 4
                T = B.times(q);

                // Step 5
                if (T.compare(A) === 1) {
                    q = q.minus(new MathLib.Integer(1));
                    T = T.minus(B);
                }

                // Step 6
                if (T.compare(A) === 1) {
                    q = q.minus(new MathLib.Integer(1));
                    T = T.minus(B);
                }

                // Step 7
                return [q, A.minus(T)];
            };

            // Algorithm 3.2 Schoolbook division
            main = function (A, B) {
                var q, r, q1, r1, temp, A1, s, m = A.data.length - 1, n = B.data.length - 1;

                // Step 1
                if (m < n) {
                    return [new MathLib.Integer(0), A.copy()];
                }

                // Step 2
                if (m === n) {
                    if (A.compare(B) === -1) {
                        return [new MathLib.Integer(0), A.copy()];
                    } else {
                        return [new MathLib.Integer(1), A.minus(B)];
                    }
                }

                // Step 3
                if (m === n + 1) {
                    return subroutine(A, B);
                }

                // Step 4
                // A1 = floor(A / base^(m-n-1))
                A1 = new MathLib.Integer(A.data.slice(m - n - 1));
                s = new MathLib.Integer(A.data.slice(0, m - n - 1));

                // Step 5
                temp = subroutine(A1, B);
                q1 = temp[0];
                r1 = temp[1];

                // Step 6
                temp = main(new MathLib.Integer(s.data.concat(r1.data)), B);
                q = temp[0];
                r = temp[1];

                // Step 7
                return [new MathLib.Integer(q.data.concat(q1.data)), r];
            };

            if (this.isZero()) {
                return [new MathLib.Integer(0), new MathLib.Integer(0)];
            }

            if (divisor.data[divisor.data.length - 1] < base / 2) {
                mult = new MathLib.Integer(Math.ceil(base / (2 * divisor.data[divisor.data.length - 1])));
                temp = main(this.abs().times(mult), divisor.abs().times(mult));
                quot = temp[0];
                rem = new MathLib.Integer(temp[1].data[0] / mult.data[0]);
            } else {
                temp = main(this.abs(), divisor.abs());
                quot = temp[0];
                rem = temp[1];
            }

            if (this.sign === '-' && !rem.isZero()) {
                quot = quot.plus(new MathLib.Integer(1));
                rem = divisor.abs().minus(rem);
            }

            if (this.sign !== divisor.sign) {
                quot = quot.negative();
            }

            return [quot, rem];
        };

        /**
        * Calculates the factorial of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.factorial = function () {
            if (this.isZero()) {
                return new MathLib.Integer('1');
            }

            if (this.sign === '-') {
                return new MathLib.Complex(Infinity);
            }

            var factorial = this, n = this.minus(new MathLib.Integer('1'));

            while (!n.isZero()) {
                factorial = factorial.times(n);
                n = n.minus(new MathLib.Integer('1'));
            }

            return factorial;
        };

        /**
        * Calculates the floor of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.floor = function () {
            return this.copy();
        };

        /**
        * Checks if the current integer is equal to some other number
        *
        * @param {any} n The number to check
        * @return {boolean}
        */
        Integer.prototype.isEqual = function (n) {
            var i, ii;

            if (n.type !== 'integer') {
                return MathLib.isEqual(MathLib.coerce(this, n));
            } else {
                if (this.sign !== n.sign) {
                    if (this.isZero() && n.isZero()) {
                        return true;
                    }
                    return false;
                }

                if (this.data.length !== n.data.length) {
                    return false;
                }

                for (i = 0, ii = this.data.length; i < ii; i++) {
                    if (this.data[i] !== n.data[i]) {
                        return false;
                    }
                }

                return true;
            }
        };

        /**
        * All integers are finite
        *
        * @return {boolean}
        */
        Integer.prototype.isFinite = function () {
            return true;
        };

        /**
        * No Integer is NaN
        *
        * @return {boolean}
        */
        Integer.prototype.isNaN = function () {
            return false;
        };

        /**
        * Checks if the integer is a unit in the ring of integers or not
        *
        * @return {boolean}
        */
        Integer.prototype.isUnit = function () {
            var i, ii;

            for (i = 1, ii = this.data.length; i < ii; i++) {
                if (this.data[i] !== 0) {
                    return false;
                }
            }

            if (this.data[0] === 1) {
                return true;
            }

            return false;
        };

        /**
        * Checks if the integer is zero or not
        *
        * @return {boolean}
        */
        Integer.prototype.isZero = function () {
            return this.data.every(function (x) {
                return x === 0;
            });
        };

        /**
        * Calculates the floor of the square root of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.isqrt = function () {
            var y, two = new MathLib.Integer('2'), numberofbits = ((this.data.length - 1) * 25 + 1 + Math.log(this.data[this.data.length - 1]) / Math.log(2)), x = (new MathLib.Integer(2)).pow(new MathLib.Integer(Math.ceil(numberofbits / 2)));

            while (true) {
                y = x.plus(this.divrem(x)[0]).divrem(two)[0];

                if (y.minus(x).isZero()) {
                    return x;
                }
                x = y;
            }
        };

        /**
        * Subtracts a number from the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to subtract
        * @return {Integer}
        */
        Integer.prototype.minus = function (n) {
            var i, ii, temp, resPos, A, B, data = [], carry = 0, sign = '+', base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.minus.apply(null, MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '-') {
                        return n.negative().minus(this.negative());
                    } else {
                        temp = this.negative().plus(n);
                        temp.sign = '-';
                        return temp;
                    }
                } else {
                    if (n.sign === '-') {
                        return this.plus(n.negative());
                    }
                }

                if (this.data.length !== n.data.length) {
                    resPos = this.data.length > n.data.length;

                    while (this.data.length < n.data.length) {
                        this.data.push(0);
                    }
                    while (this.data.length > n.data.length) {
                        n.data.push(0);
                    }
                } else {
                    for (i = this.data.length - 1; i >= 0; i--) {
                        if (this.data[i] !== n.data[i]) {
                            resPos = this.data[i] > n.data[i];
                            break;
                        }
                    }
                    if (typeof resPos === 'undefined') {
                        return new MathLib.Integer(0);
                    }
                }

                if (resPos) {
                    A = this;
                    B = n;
                    sign = '+';
                } else {
                    A = n;
                    B = this;
                    sign = '-';
                }

                for (i = 0, ii = A.data.length; i < ii; i++) {
                    temp = A.data[i] - B.data[i] + carry;
                    carry = Math.floor(temp / base);
                    data[i] = MathLib.mod(temp, base);
                }

                return new MathLib.Integer(data, { sign: sign });
            }
        };

        /**
        * Reduces the integer modulo an other number.
        *
        * @param {Integer|number} n - The number with which the current integer should be reduced
        * @return {Integer|number}
        */
        Integer.prototype.mod = function (n) {
            if (n.type !== 'integer') {
                return MathLib.mod.apply(null, MathLib.coerce(this, n));
            } else {
                return this.divrem(n)[1];
            }
        };

        /**
        * Calculates the negative integer
        *
        * @return {Integer}
        */
        Integer.prototype.negative = function () {
            return new MathLib.Integer(this.data, { sign: this.sign === '-' ? '+' : '-' });
        };

        /**
        * Adds a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to add
        * @return {Integer}
        */
        Integer.prototype.plus = function (n) {
            var i, ii, temp, data = [], carry = 0, base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.plus(MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '+') {
                        return n.minus(this.negative());
                    }
                } else if (n.sign === '-') {
                    return this.minus(n.negative());
                }

                if (this.data.length !== n.data.length) {
                    while (this.data.length < n.data.length) {
                        this.data.push(0);
                    }
                    while (this.data.length > n.data.length) {
                        n.data.push(0);
                    }
                }

                for (i = 0, ii = this.data.length; i < ii; i++) {
                    temp = this.data[i] + n.data[i] + carry;

                    data[i] = temp % base;
                    carry = Math.floor(temp / base);
                }

                if (carry !== 0) {
                    data[i] = carry;
                }

                return new MathLib.Integer(data, { sign: this.sign });
            }
        };

        /**
        * Raises the integer to a certain power.
        *
        * @param {Integer|Rational|number|Complex} exponent - The exponent
        * @return {Integer|Rational}
        */
        Integer.prototype.pow = function (exponent) {
            var powInt, result;

            if (exponent.type !== 'integer') {
                return MathLib.pow.apply(null, MathLib.coerce(this, exponent));
            } else {
                powInt = function (b, e) {
                    var res, i, half = [], carry = 0;

                    if (e.data.length === 1 && e.data[0] === 1) {
                        return b;
                    }

                    for (i = e.data.length - 1; i >= 0; i--) {
                        half[i] = Math.floor(e.data[i] / 2) + carry;

                        if (e.data[i] % 2) {
                            carry = 5e6;
                        } else {
                            carry = 0;
                        }
                    }

                    res = powInt(b, new MathLib.Integer(half));
                    res = res.times(res);

                    if (e.data[0] % 2) {
                        res = res.times(b);
                    }

                    return res;
                };

                if (exponent.isZero()) {
                    return new MathLib.Integer(1);
                }

                result = powInt(this, exponent);

                if (exponent.sign === '-') {
                    return new MathLib.Rational(new MathLib.Integer('1'), result);
                }

                return result;
            }
        };

        /**
        * Multiplies a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to multiply
        * @return {Integer}
        */
        Integer.prototype.times = function (n) {
            var i, ii, j, jj, temp, data = [], carry = 0, base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.times(MathLib.coerce(this, n));
            } else {
                for (i = 0, ii = this.data.length; i < ii; i++) {
                    for (j = 0, jj = n.data.length; j < jj; j++) {
                        if (data[i + j] === undefined) {
                            data[i + j] = this.data[i] * n.data[j];
                        } else {
                            data[i + j] += this.data[i] * n.data[j];
                        }
                    }
                }

                for (i = 0, ii = this.data.length + n.data.length - 1; i < ii; i++) {
                    temp = data[i] + carry;
                    carry = Math.floor(temp / base);
                    data[i] = temp % base;
                }
                data[i] = carry;

                return new MathLib.Integer(data, { sign: this.sign === n.sign ? '+' : '-' });
            }
        };

        /**
        * A content MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var base = options.base || 10;

            // In section 4.2.1.3 in the MathML 3 specification
            // under "Rewrite: cn based_integer" it says
            // "A base attribute with value 10 is simply removed"
            if (base === 10) {
                return '<cn type="integer">' + this.toString() + '</cn>';
            } else if (options.strict) {
                return '<apply><csymbol cd="nums1">based_integer</csymbol><cn>' + base + '</cn><cs>' + this.toString({ base: base }) + '</cs></apply>';
            } else {
                return '<cn type="integer" base="' + base + '">' + this.toString({ base: base }) + '</cn>';
            }
        };

        /**
        * A LaTeX string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var option, str, base = options.base || 10, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
                    passOptions[option] = options[option];
                }
            }

            str = this.toString(passOptions);

            if (options.baseSubscript) {
                str += '_{' + base + '}';
            }

            return str;
        };

        /**
        * A presentation MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var str, option, base = options.base || 10, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
                    passOptions[option] = options[option];
                }
            }

            str = '<mn>' + this.toString(passOptions) + '</mn>';

            if (options.baseSubscript) {
                str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
            }

            return str;
        };

        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var div, rem, temp, base = options.base || 10, blocksize = Math.floor(Math.log(Math.pow(2, 26) - 1) / Math.log(base)), factor = new MathLib.Integer(Math.pow(base, blocksize)), n = this.abs(), str = '';

            if (n.isZero()) {
                str = '0';
            } else {
                while (!n.isZero()) {
                    temp = n.divrem(factor);
                    div = temp[0];
                    rem = temp[1];

                    str = ('000000' + rem.data[0].toString(base)).slice(-blocksize) + str;
                    n = div;
                }

                str = str.replace(/^0+/, '');

                if (this.sign === '-') {
                    str = '-' + str;
                }
            }

            if (options.sign && (this.sign === '+' || this.isZero())) {
                str = '+' + str;
            }

            if (options.baseSubscript) {
                if (base > 9) {
                    str += '&#x208' + Math.floor(base / 10) + ';';
                }
                str += '&#x208' + (base % 10) + ';';
            }

            return str;
        };
        return Integer;
    })();
    MathLib.Integer = Integer;
return MathLib;
});
