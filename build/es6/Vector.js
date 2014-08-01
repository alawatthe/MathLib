
/* jshint esnext:true */


import {evaluate, hypot, isEqual, isZero, minus, negative, plus, root, sign, times, toContentMathML, toLaTeX, toMathML, toString} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {EvaluationError} from 'EvaluationError';
import {Matrix} from 'Matrix';


/**
* The vector implementation of MathLib makes calculations with vectors of
* arbitrary size possible. The entries of the vector can be numbers and complex
* numbers.
*
* It is as easy as
* `new Vector([1, 2, 3])`
* to create the following vector:
*    ⎛ 1 ⎞
*    ⎜ 2 ⎟
*    ⎝ 3 ⎠
*
* @class
* @this {Vector}
*/
var Vector = (function () {
    function Vector(coords) {
        var _this = this;
        this.type = 'vector';
        Array.prototype.forEach.call(coords, function (x, i) {
            _this[i] = x;
        });
        this.length = coords.length;
    }
    /**
    * Compares two vectors.
    *
    * @param {Vector} v The vector to compare
    * @return {number}
    */
    Vector.prototype.compare = function (v) {
        var i, ii;

        if (this.length !== v.length) {
            return sign(this.length - v.length);
        }

        for (i = 0, ii = this.length; i < ii; i++) {
            if (v[i] - this[i]) {
                return sign(this[i] - v[i]);
            }
        }

        return 0;
    };

    /**
    * Evaluates the entries of the vector
    *
    * @return {Vector}
    */
    Vector.prototype.evaluate = function () {
        return this.map(evaluate);
    };

    /**
    * Works like Array.prototype.every.
    *
    * @param {function} f The function to be applied to all the values
    * @return {boolean}
    */
    Vector.prototype.every = function (f) {
        return Array.prototype.every.call(this, f);
    };

    /**
    * Works like Array.prototype.forEach.
    *
    * @param {function} f The function to be applied to all the values
    */
    Vector.prototype.forEach = function (f) {
        Array.prototype.forEach.call(this, f);
    };

    /**
    * Determines if two vectors are equal
    *
    * @param {Vector} v The vector to compare
    * @return {boolean}
    */
    Vector.prototype.isEqual = function (v) {
        if (this.length !== v.length) {
            return false;
        }

        return this.every(function (x, i) {
            return isEqual(x, v[i]);
        });
    };

    /**
    * Determines if the vector is the zero vector.
    *
    * @return {boolean}
    */
    Vector.prototype.isZero = function () {
        return this.every(isZero);
    };

    /**
    * Works like Array.prototype.map.
    *
    * @param {function} f The function to be applied to all the values
    * @return {Vector}
    */
    Vector.prototype.map = function (f) {
        return new MathLib[this.type.slice(0, 1).toUpperCase() + this.type.slice(1)](Array.prototype.map.call(this, f));
    };

    /**
    * Calculates the difference of two vectors.
    *
    * @param {Vector} v The vector to be subtracted.
    * @return {Vector}
    */
    Vector.prototype.minus = function (v) {
        if (this.length === v.length) {
            return this.plus(v.negative());
        } else {
            throw new EvaluationError('Vector sizes not matching', { method: 'Vector#minus' });
        }
    };

    /**
    * Returns the negative vector.
    *
    * @return {Vector}
    */
    Vector.prototype.negative = function () {
        return this.map(function (entry) {
            return negative(entry);
        });
    };

    /**
    * Calcultes the norm of the vector.
    *
    * @param {number} p The p for the p-norm
    * @return {number}
    */
    Vector.prototype.norm = function (p) {
        if (typeof p === "undefined") { p = 2; }
        if (p === 2) {
            return hypot.apply(null, this.toArray());
        } else if (p === Infinity) {
            return Math.max.apply(null, this.map(Math.abs).toArray());
        } else {
            return root(this.reduce(function (prev, curr) {
                return prev + Math.pow(Math.abs(curr), p);
            }, 0), p);
        }
    };

    /**
    * Calculates the outer product of two vectors.
    *
    * @param {Vector} v The second vector to calculate the outer product with.
    * @return {Matrix}
    */
    Vector.prototype.outerProduct = function (v) {
        return new Matrix(this.map(function (x) {
            return v.map(function (y) {
                return times(x, y);
            });
        }));
    };

    /**
    * Calculates the sum of two vectors.
    *
    * @param {Vector} v The vector to add to the current vector.
    * @return {Vector}
    */
    Vector.prototype.plus = function (v) {
        if (this.length === v.length) {
            return new Vector(this.map(function (x, i) {
                return plus(x, v[i]);
            }));
        } else {
            throw new EvaluationError('Vector sizes not matching', { method: 'Vector#plus' });
        }
    };

    /**
    * Works like Array.prototype.reduce.
    *
    * @return {any}
    */
    Vector.prototype.reduce = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.reduce.apply(this, args);
    };

    /**
    * Calculates the scalar product of two vectors.
    *
    * @param {Vector} v The second vector to calculate the scalar product with.
    * @return {number|Complex}
    */
    Vector.prototype.scalarProduct = function (v) {
        if (this.length === v.length) {
            return this.reduce(function (old, cur, i, w) {
                return plus(old, times(w[i], v[i]));
            }, 0);
        } else {
            throw new EvaluationError('Vector sizes not matching', { method: 'Vector#scalarProduct' });
        }
    };

    /**
    * Works like the Array.prototype.slice function
    *
    * @return {array}
    */
    Vector.prototype.slice = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.slice.apply(this, args);
    };

    /**
    * Multiplies the vector by a (complex) number or a matrix.
    * The vector is multiplied from left to the matrix.
    * If you want to multiply it from the right use
    * matrix.times(vector) instead of vector.times(matrix)
    *
    * @param {number|Complex|Matrix} n The object to multiply to the vector
    * @return {Vector}
    */
    Vector.prototype.times = function (n) {
        var i, ii, colVectors, product = [];
        if (n.type === 'rational') {
            n = n.coerceTo('number');
        }
        if (typeof n === 'number' || n.type === 'complex') {
            return this.map(function (x) {
                return times(n, x);
            });
        }
        if (n.type === 'matrix') {
            if (this.length === n.rows) {
                colVectors = n.toColVectors();
                for (i = 0, ii = colVectors.length; i < ii; i++) {
                    product[i] = this.scalarProduct(colVectors[i]);
                }
                return new Vector(product);
            } else {
                throw EvaluationError('Vector/Matrix sizes not matching', { method: 'Vector.prototype.times' });
            }
        }
    };

    /**
    * Converts the vector to an array.
    *
    * @return {array}
    */
    Vector.prototype.toArray = function () {
        return Array.prototype.slice.call(this);
    };

    /**
    * Returns the content MathML representation of the vector.
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Vector.prototype.toContentMathML = function (options) {
        if (typeof options === "undefined") { options = {}; }
        if (options.strict) {
            return this.reduce(function (old, cur) {
                return old + toContentMathML(cur, options);
            }, '<apply><csymbol cd="linalg2">vector</csymbol>') + '</apply>';
        } else {
            return this.reduce(function (old, cur) {
                return old + toContentMathML(cur, options);
            }, '<vector>') + '</vector>';
        }
    };

    /**
    * Returns a LaTeX representation of the vector.
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Vector.prototype.toLaTeX = function (options) {
        if (typeof options === "undefined") { options = {}; }
        return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
            return old + '\\\\\n\t' + toLaTeX(cur, options);
        }) + '\n\\end{pmatrix}';
    };

    /**
    * Returns the (presentation) MathML representation of the vector.
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Vector.prototype.toMathML = function (options) {
        if (typeof options === "undefined") { options = {}; }
        return this.reduce(function (old, cur) {
            return old + '<mtr><mtd>' + toMathML(cur, options) + '</mtd></mtr>';
        }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
    };

    /**
    * Returns a string representation of the vector.
    *
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    Vector.prototype.toString = function (options) {
        if (typeof options === "undefined") { options = {}; }
        return '(' + this.reduce(function (old, cur) {
            return old + ', ' + toString(cur, options);
        }) + ')';
    };

    /**
    * Calculates the vector product of two vectors.
    *
    * @param {Vector} v The second vector to calculate the vector product with.
    * @return {Vector}
    */
    Vector.prototype.vectorProduct = function (v) {
        /* TODO: Implement vectorproduct for non three-dimensional vectors */
        if (this.length === 3 && v.length === 3) {
            return new Vector([
                minus(times(this[1], v[2]), times(this[2], v[1])),
                minus(times(this[2], v[0]), times(this[0], v[2])),
                minus(times(this[0], v[1]), times(this[1], v[0]))
            ]);
        } else {
            throw new EvaluationError('Vectors are not three-dimensional', { method: 'Vector.prototype.vectorProduct' });
        }
    };
    Vector.areLinearIndependent = function (vectors) {
        var n = vectors.length, m = vectors[0].length;

        if (n > m) {
            return false;
        }

        if (!vectors.every(function (x) {
            return x.length === m;
        })) {
            return undefined;
        }

        return (new Matrix(vectors)).rank() === n;
    };

    Vector.zero = function (n) {
        var vector = [], i;
        for (i = 0; i < n; i++) {
            vector.push(0);
        }
        return new Vector(vector);
    };
    return Vector;
})();
export default Vector;

