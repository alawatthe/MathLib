
    define(['meta', 'Functn'], function(MathLib) {
    /**
    * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
    *
    *
    * #### Simple example:
    * ```
    * // Create the integer
    * var c = new MathLib.Complex(1, 2);
    * ```
    *
    * @class
    * @this {Integer}
    */
    var Integer = (function () {
        function Integer(integer, options) {
            if (typeof options === "undefined") { options = {}; }
            this.type = 'integer';
            var i, blocksize = 7, base = 10, data = [], sign = '+';

            if (Array.isArray(integer)) {
                i = integer.length - 1;
                while (integer[i] === 0) {
                    i--;
                }
                data = integer.slice(0, i + 1);
            }

            if (typeof integer === 'number') {
                if (integer < 0) {
                    sign = '-';
                    integer = -integer;
                }
                while (integer) {
                    data.push(integer % Math.pow(base, blocksize));
                    integer = Math.floor(integer / Math.pow(base, blocksize));
                }
            } else if (typeof integer === 'string') {
                if (integer[0] === '+' || integer[0] === '-') {
                    sign = integer[0];
                    integer = integer.slice(1);
                }

                data.push(Number(Array.prototype.reduceRight.call(integer, function (old, cur) {
                    if (old.length === blocksize - 1) {
                        data.push(Number(cur + old));
                        return '';
                    }
                    return cur + old;
                })));
            }

            if ('sign' in options) {
                sign = options.sign;
            }

            this.data = data;
            this.sign = sign;
        }
        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Integer.toContentMathML = function () {
            return '<csymbol cd="setname1">Z</csymbol>';
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
        * Coerces the integer to some other data type
        *
        * @return {Integer|Rational|number|Complex}
        */
        Integer.prototype.coerceTo = function (type) {
            var num;

            if (type === 'integer') {
                return this.copy();
            }

            if (type === 'rational') {
                return new MathLib.Rational(this, 1);
            }

            if (type === 'number') {
                //TODO Warn when the number is bigger that 2^53
                num = this.data.reduce(function (old, cur, i) {
                    return old + cur * Math.pow(1e7, i);
                }, 0);

                if (this.sign === '-') {
                    num = -num;
                }

                return num;
            }

            if (type === 'complex') {
                return new MathLib.Complex(this, 0);
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
        * Adds a number to the current integer
        *
        * @return {Integer}
        */
        Integer.prototype.minus = function (n) {
            var i, ii, temp, resPos, A, B, data = [], carry = 0, sign = '+', base = 1e7;

            if (n.type !== 'integer') {
                return MathLib.minus.apply(null, MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '-') {
                        n.sign = '+';
                        this.sign = '+';
                        return n.minus(this);
                    } else {
                        this.sign = '+';
                        temp = this.plus(n);
                        temp.sign = '-';
                        return temp;
                    }
                } else {
                    if (n.sign === '-') {
                        n.sign = '+';
                        return this.plus(n);
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
                        return new MathLib.Integer('0');
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
        * @return {Integer}
        */
        Integer.prototype.plus = function (n) {
            var i, ii, temp, data = [], carry = 0, base = 1e7;

            if (n.type !== 'integer') {
                return MathLib.plus(MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '+') {
                        this.sign = '+';
                        return n.minus(this);
                    }
                } else if (n.sign === '-') {
                    n.sign = '+';
                    return this.minus(n);
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
        * Multiplies a number to the current integer
        *
        * @return {Integer}
        */
        Integer.prototype.times = function (n) {
            var i, ii, j, jj, temp, data = [], carry = 0, base = 1e7;

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
        * @return {string}
        */
        Integer.prototype.toContentMathML = function () {
            return '<cn type="integer" base="10">' + this.toString() + '</cn>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Integer.prototype.toLaTeX = function () {
            return this.toString();
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Integer.prototype.toMathML = function () {
            return '<mn>' + this.toString() + '</mn>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Integer.prototype.toString = function () {
            var i, ii, str = '';

            for (i = 0, ii = this.data.length - 1; i < ii; i++) {
                str = ('000000' + this.data[i]).slice(-7) + str;
            }

            str = this.data[i] + str;

            if (this.sign === '-') {
                str = '-' + str;
            }

            return str;
        };
        return Integer;
    })();
    MathLib.Integer = Integer;
return MathLib;
});
