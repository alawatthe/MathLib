
// ## <a id="Vector" href="http://mathlib.de/en/docs/Vector">Vector</a>
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `new MathLib.Vector([1, 2, 3])`
// to create the following vector:
//    ⎛ 1 ⎞
//    ⎜ 2 ⎟
//    ⎝ 3 ⎠
import MathLib from './meta.js';
import Functn from './Functn';

var Vector = (function () {
    function Vector(coords) {
        var _this = this;
        this.type = 'vector';
        coords.forEach(function (x, i) {
            _this[i] = x;
        });
        this.length = coords.length;
    }
    // ### [Vector.prototype.compare()](http://mathlib.de/en/docs/Vector/compare)
    // Compares two vectors.
    //
    // *@param {Vector}* The vector to compare
    // *@return {number}*
    Vector.prototype.compare = function (v) {
        var i, ii;

        if (this.length !== v.length) {
            return MathLib.sign(this.length - v.length);
        }

        for (i = 0, ii = this.length; i < ii; i++) {
            if (v[i] - this[i]) {
                return MathLib.sign(this[i] - v[i]);
            }
        }

        return 0;
    };

    // ### [Vector.prototype.every()](http://mathlib.de/en/docs/Vector/every)
    // Works like Array.prototype.every.
    //
    // *@return {boolean}*
    Vector.prototype.every = function (f) {
        return Array.prototype.every.call(this, f);
    };

    // ### [Vector.prototype.forEach()](http://mathlib.de/en/docs/Vector/forEach)
    // Works like Array.prototype.forEach.
    //
    Vector.prototype.forEach = function (f) {
        Array.prototype.forEach.call(this, f);
    };

    // ### [Vector.prototype.isEqual()](http://mathlib.de/en/docs/Vector/isEqual)
    // Determines if two vectors are equal
    //
    // *@param {Vector}* v The vector to compare
    // *@return {boolean}*
    Vector.prototype.isEqual = function (v) {
        if (this.length !== v.length) {
            return false;
        }

        return this.every(function (x, i) {
            return MathLib.isEqual(x, v[i]);
        });
    };

    // ### [Vector.prototype.isZero()](http://mathlib.de/en/docs/Vector/isZero)
    // Determines if the vector is the zero vector.
    //
    // *@return {boolean}*
    Vector.prototype.isZero = function () {
        return this.every(MathLib.isZero);
    };

    // ### [Vector.prototype.map()](http://mathlib.de/en/docs/Vector/map)
    // Works like Array.prototype.map.
    //
    // *@param {function}*
    // *@return {Vector}*
    Vector.prototype.map = function (f) {
        return new this['constructor'](Array.prototype.map.call(this, f));
    };

    // ### [Vector.prototype.minus()](http://mathlib.de/en/docs/Vector/minus)
    // Calculates the difference of two vectors.
    //
    // *@param {Vector}* The vector to be subtracted.
    // *@return {Vector}*
    Vector.prototype.minus = function (v) {
        if (this.length === v.length) {
            return this.plus(v.negative());
        } else {
            MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#minus' });
            return;
        }
    };

    // ### [Vector.prototype.negative()](http://mathlib.de/en/docs/Vector/negative)
    // Returns the negative vector.
    //
    // *@return {Vector}*
    Vector.prototype.negative = function () {
        return this.map(MathLib.negative);
    };

    // ### [Vector.prototype.norm()](http://mathlib.de/en/docs/Vector/norm)
    // Calcultes the norm of the vector.
    //
    // *@param {number}* [default=2] The p for the p-norm
    // *@return {number}*
    Vector.prototype.norm = function (p) {
        if (typeof p === "undefined") { p = 2; }
        if (p === 2) {
            return MathLib.hypot.apply(null, this.toArray());
        } else if (p === Infinity) {
            return Math.max.apply(null, this.map(Math.abs).toArray());
        } else {
            return MathLib.root(this.reduce(function (prev, curr) {
                return prev + Math.pow(Math.abs(curr), p);
            }, 0), p);
        }
    };

    // ### [Vector.prototype.outerProduct()](http://mathlib.de/en/docs/Vector/outerProduct)
    // Calculates the outer product of two vectors.
    //
    // *@param {Vector}*
    // *@return {Matrix}*
    Vector.prototype.outerProduct = function (v) {
        return new MathLib.Matrix(this.map(function (x) {
            return v.map(function (y) {
                return MathLib.times(x, y);
            });
        }));
    };

    // ### [Vector.prototype.plus()](http://mathlib.de/en/docs/Vector/plus)
    // Calculates the sum of two vectors.
    //
    // *@param {Vector}*
    // *@return {Vector}*
    Vector.prototype.plus = function (v) {
        if (this.length === v.length) {
            return new MathLib.Vector(this.map(function (x, i) {
                return MathLib.plus(x, v[i]);
            }));
        } else {
            MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#plus' });
            return;
        }
    };

    // ### [Vector.prototype.reduce()](http://mathlib.de/en/docs/Vector/reduce)
    // Works like Array.prototype.reduce.
    //
    // *@return {any}*
    Vector.prototype.reduce = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.reduce.apply(this, args);
    };

    // ### [Vector.prototype.scalarProduct()](http://mathlib.de/en/docs/Vector/scalarProduct)
    // Calculates the scalar product of two vectors.
    //
    // *@param {Vector}*
    // *@return {number|Complex}*
    Vector.prototype.scalarProduct = function (v) {
        if (this.length === v.length) {
            return this.reduce(function (old, cur, i, w) {
                return MathLib.plus(old, MathLib.times(w[i], v[i]));
            }, 0);
        } else {
            MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#scalarProduct' });
            return;
        }
    };

    // ### [Vector.prototype.slice()](http://mathlib.de/en/docs/Vector/slice)
    // Works like the Array.prototype.slice function
    //
    // *@return {array}*
    Vector.prototype.slice = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.slice.apply(this, args);
    };

    // ### [Vector.prototype.times()](http://mathlib.de/en/docs/Vector/times)
    // Multiplies the vector by a (complex) number or a matrix.
    // The vector is multiplied from left to the matrix.
    // If you want to multiply it from the right use
    // matrix.times(vector) instead of vector.times(matrix)
    //
    // *@param {number|Complex|Matrix}*
    // *@return {Vector}*
    Vector.prototype.times = function (n) {
        var i, ii, colVectors, product = [];
        if (n.type === 'rational') {
            n = n.toNumber();
        }
        if (typeof n === 'number' || n.type === 'complex') {
            return this.map(function (x) {
                return MathLib.times(n, x);
            });
        }
        if (n.type === 'matrix') {
            if (this.length === n.rows) {
                colVectors = n.toColVectors();
                for (i = 0, ii = colVectors.length; i < ii; i++) {
                    product[i] = this.scalarProduct(colVectors[i]);
                }
                return new MathLib.Vector(product);
            } else {
                MathLib.error({ message: 'Vector/Matrix sizes not matching', method: 'Vector#times' });
                return;
            }
        }
    };

    // ### [Vector.prototype.toArray()](http://mathlib.de/en/docs/Vector/toArray)
    // Converts the vector to an array.
    //
    // *@return {array}*
    Vector.prototype.toArray = function () {
        return Array.prototype.slice.call(this);
    };

    // ### [Vector.prototype.toContentMathML()](http://mathlib.de/en/docs/Vector/toContentMathML)
    // Returns the content MathML representation of the vector.
    //
    // *@return {string}*
    Vector.prototype.toContentMathML = function () {
        return this.reduce(function (old, cur) {
            return old + MathLib.toContentMathML(cur);
        }, '<vector>') + '</vector>';
    };

    // ### [Vector.prototype.toLaTeX()](http://mathlib.de/en/docs/Vector/toLaTeX)
    // Returns a LaTeX representation of the vector.
    //
    // *@return {string}*
    Vector.prototype.toLaTeX = function () {
        return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
            return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
        }) + '\n\\end{pmatrix}';
    };

    // ### [Vector.prototype.toMathML()](http://mathlib.de/en/docs/Vector/toMathML)
    // Returns the (presentation) MathML representation of the vector.
    //
    // *@return {string}*
    Vector.prototype.toMathML = function () {
        return this.reduce(function (old, cur) {
            return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
        }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
    };

    // ### [Vector.prototype.toString()](http://mathlib.de/en/docs/Vector/toString)
    // Returns a string representation of the vector.
    //
    // *@return {string}*
    Vector.prototype.toString = function () {
        return '(' + this.reduce(function (old, cur) {
            return old + ', ' + MathLib.toString(cur);
        }) + ')';
    };

    // ### [Vector.prototype.vectorProduct()](http://mathlib.de/en/docs/Vector/vectorProduct)
    // Calculates the vector product of two vectors.
    //
    // *@param {Vector}*
    // *@return {Vector}*
    Vector.prototype.vectorProduct = function (v) {
        /* TODO: Implement vectorproduct for non three-dimensional vectors */
        if (this.length === 3 && v.length === 3) {
            return new MathLib.Vector([
                MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
                MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
                MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
            ]);
        } else {
            MathLib.error({ message: 'Vectors are not three-dimensional', method: 'Vector#vectorProduct' });
            return;
        }
    };
    Vector.areLinearIndependent = function (v) {
        var n = v.length, m = v[0].length;

        if (n > m) {
            return false;
        }

        if (!v.every(function (x) {
            return x.length === m;
        })) {
            return undefined;
        }

        return (new MathLib.Matrix(v)).rank() === n;
    };

    Vector.zero = function (n) {
        var vector = [], i;
        for (i = 0; i < n; i++) {
            vector.push(0);
        }
        return new MathLib.Vector(vector);
    };
    return Vector;
})();
export default = Vector;

