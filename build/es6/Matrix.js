
// ## <a id="Matrix"></a>Matrix
// The matrix implementation of MathLib makes calculations with matrices of
// arbitrary size possible. The entries of a matrix can be numbers and complex
// numbers.
//
// It is as easy as
// ```
// new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
// ```
// to create the following matrix:
//    ⎛ 1 2 3 ⎞
//    ⎜ 4 5 6 ⎟
//    ⎝ 7 8 9 ⎠
import MathLib from './meta.js';
import Functn from './Functn';
import Permutation from './Permutation';

var Matrix = (function () {
    function Matrix(matrix) {
        var _this = this;
        this.type = 'matrix';
        if (typeof matrix === 'string') {
            // If there is a < in the string we assume it's MathML
            if (matrix.indexOf('<') > -1) {
                return MathLib.Expression.parseContentMathML(matrix).evaluate();
            } else {
                matrix = matrix.trim().replace(/;?\n/g, '],[');
                matrix = JSON.parse('[[' + matrix + ']]');
            }
        }
        matrix.forEach(function (x, i) {
            _this[i] = x;
        });
        this.length = matrix.length;
        this.cols = matrix[0].length;
        this.rows = matrix.length;
    }
    // ### Matrix.prototype.LU()
    // Calculates the LU decomposition of a matrix
    // The result is cached.
    //
    // *@return {Matrix}*
    Matrix.prototype.LU = function () {
        var i, j, k, t, p, LU = this.toArray(), m = this.rows, n = this.cols, permutation = [];

        for (k = 0; k < n; k++) {
            // Find the pivot
            p = k;
            for (i = k + 1; i < m; i++) {
                if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
                    p = i;
                }
            }

            // Exchange if necessary
            if (p !== k) {
                permutation.unshift([p, k]);
                t = LU[p];
                LU[p] = LU[k];
                LU[k] = t;
            }

            // The elimination
            if (LU[k][k] !== 0) {
                for (i = k + 1; i < m; i++) {
                    LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
                    for (j = k + 1; j < n; j++) {
                        LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
                    }
                }
            }
        }
        LU = new MathLib.Matrix(LU);
        this.LU = function () {
            return LU;
        };
        this.LUpermutation = new MathLib.Permutation(permutation);
        return LU;
    };

    // ### Matrix.prototype.adjoint()
    // Calculates the adjoint matrix
    //
    // *@return {Matrix}*
    Matrix.prototype.adjoint = function () {
        return this.map(MathLib.conjugate).transpose();
    };

    // ### Matrix.prototype.adjugate()
    // Calculates the adjugate matrix
    //
    // *@return {Matrix}*
    Matrix.prototype.adjugate = function () {
        return this.map(function (x, r, c, m) {
            return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
        });
    };

    // ### Matrix.prototype.cholesky()
    // The cholesky decomposition of a matrix
    // using the Cholesky–Banachiewicz algorithm.
    // Does not change the current matrix, but returns a new one.
    // The result is cached.
    //
    // *@return {Matrix}*
    Matrix.prototype.cholesky = function () {
        var i, ii, j, jj, k, kk, sum, choleskyMatrix, cholesky = [];

        for (i = 0, ii = this.rows; i < ii; i++) {
            cholesky.push([]);
        }

        for (i = 0, ii = this.rows; i < ii; i++) {
            for (j = 0; j < i; j++) {
                sum = 0;
                for (k = 0, kk = j; k < kk; k++) {
                    sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[j][k]));
                }
                cholesky[i][j] = (this[i][j] - sum) / cholesky[j][j];
            }

            sum = 0;
            for (k = 0, kk = j; k < kk; k++) {
                sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[i][k]));
            }
            cholesky[i][j] = Math.sqrt(this[j][j] - sum);

            for (j++, jj = this.cols; j < jj; j++) {
                cholesky[i][j] = 0;
            }
        }
        choleskyMatrix = new MathLib.Matrix(cholesky);

        this.cholesky = function () {
            return choleskyMatrix;
        };
        return choleskyMatrix;
    };

    // ### Matrix.prototype.compare()
    // Compares the matrix to an other matrix.
    //
    // *@param {Matrix}* The matrix to compare.
    // *@return {number}*
    Matrix.prototype.compare = function (m) {
        var i, ii, j, jj;

        if (this.rows !== m.rows) {
            return MathLib.sign(this.rows - m.rows);
        }

        if (this.cols !== m.cols) {
            return MathLib.sign(this.cols - m.cols);
        }

        for (i = 0, ii = this.rows; i < ii; i++) {
            for (j = 0, jj = this.cols; j < jj; j++) {
                if (this[i][j] - m[i][j]) {
                    return MathLib.sign(this[i][j] - m[i][j]);
                }
            }
        }

        return 0;
    };

    // ### Matrix.prototype.copy()
    // Copies the matrix
    //
    // *@return {Matrix}*
    Matrix.prototype.copy = function () {
        return this.map(MathLib.copy);
    };

    // ### Matrix.prototype.determinant()
    // Calculates the determinant of the matrix via the LU decomposition.
    // The result is cached.
    //
    // *@return {number|Complex}*
    Matrix.prototype.determinant = function () {
        var LU, determinant;

        if (!this.isSquare()) {
            MathLib.error({ message: 'Determinant of non square matrix', method: 'Matrix#determinant' });
            return;
        }

        if (this.rank() < this.rows) {
            determinant = 0;
        } else {
            LU = this.LU();
            determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, LU.diag()));
        }

        this.determinant = function () {
            return determinant;
        };
        return determinant;
    };

    // ### Matrix.prototype.diag()
    // Returns the entries on the diagonal in an array
    //
    // *@return {array}*
    Matrix.prototype.diag = function () {
        var diagonal = [], i, ii;
        for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
            diagonal.push(this[i][i]);
        }
        return diagonal;
    };

    // ### Matrix.prototype.divide()
    // Multiplies the matrix by the inverse of a number or a matrix
    //
    // *@return {Matrix}*
    Matrix.prototype.divide = function (n) {
        return this.times(MathLib.inverse(n));
    };

    // ### Matrix.prototype.every()
    // This function works like the Array.prototype.every function.
    // The matrix is processed row by row.
    // The function is called with the following arguments:
    // the entry at the current position, the number of the row,
    // the number of the column and the complete matrix
    //
    // *@param {function}* The function which is called on every argument
    // *@return {boolean}*
    Matrix.prototype.every = function (f) {
        return Array.prototype.every.call(this, function (x, i) {
            return Array.prototype.every.call(x, function (y, j) {
                return f(y, i, j, this);
            });
        });
    };

    // ### Matrix.prototype.forEach()
    // This function works like the Array.prototype.forEach function.
    // The matrix is processed row by row.
    // The function is called with the following arguments:
    // the entry at the current position, the number of the row,
    // the number of the column and the complete matrix
    //
    // *@param {function}* The function which is called on every argument
    Matrix.prototype.forEach = function (f) {
        Array.prototype.forEach.call(this, function (x, i) {
            return Array.prototype.forEach.call(x, function (y, j) {
                return f(y, i, j, this);
            });
        });
    };

    // ### Matrix.prototype.gershgorin()
    // Returns the Gershgorin circles of the matrix.
    //
    // *@return {array}* Returns an array of circles
    Matrix.prototype.gershgorin = function () {
        var c = [], rc = [], rr = [], circles = [], i, ii;

        for (i = 0, ii = this.rows; i < ii; i++) {
            rc.push(0);
            rr.push(0);
        }

        this.forEach(function (x, i, j) {
            if (i === j) {
                if (MathLib.is(x, 'complex')) {
                    c.push(x.toPoint());
                } else {
                    c.push(new MathLib.Point([x, 0, 1]));
                }
            } else {
                rc[j] += MathLib.abs(x);
                rr[i] += MathLib.abs(x);
            }
        });

        for (i = 0, ii = this.rows; i < ii; i++) {
            circles.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
        }

        return circles;
    };

    // ### Matrix.prototype.givens()
    // QR decomposition with the givens method.
    //
    // *@return {[Matrix, Matrix]}*
    Matrix.prototype.givens = function () {
        var rows = this.rows, cols = this.cols, R = this.copy(), Q = MathLib.Matrix.identity(rows), c, s, rho, i, j, k, ri, rj, qi, qj;

        for (i = 0; i < cols; i++) {
            for (j = i + 1; j < rows; j++) {
                if (!MathLib.isZero(R[j][i])) {
                    // We can't use the sign function here, because we want the factor
                    // to be 1 if A[i][i] is zero.
                    rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i], R[j][i]);
                    c = R[i][i] / rho;
                    s = R[j][i] / rho;

                    // Apply the rotation
                    ri = [];
                    rj = [];
                    qi = [];
                    qj = [];

                    for (k = 0; k < cols; k++) {
                        ri.push(R[i][k]);
                        rj.push(R[j][k]);
                    }
                    for (k = 0; k < cols; k++) {
                        R[i][k] = rj[k] * s + ri[k] * c;
                        R[j][k] = rj[k] * c - ri[k] * s;
                    }

                    for (k = 0; k < rows; k++) {
                        qi.push(Q[k][i]);
                        qj.push(Q[k][j]);
                    }
                    for (k = 0; k < rows; k++) {
                        Q[k][i] = qi[k] * c + qj[k] * s;
                        Q[k][j] = -qi[k] * s + qj[k] * c;
                    }
                }
            }
        }

        return [Q, R];
    };

    // ### Matrix.prototype.inverse()
    // Calculates the inverse matrix.
    //
    // *@return {Matrix}*
    Matrix.prototype.inverse = function () {
        var i, ii, res, inverse, col = [], matrix = [], n = this.rows;

        if (!this.isSquare()) {
            MathLib.error({ message: 'Inverse of non square matrix', method: 'Matrix#inverse' });
            return;
        }

        for (i = 0, ii = n - 1; i < ii; i++) {
            matrix.push([]);
            col.push(0);
        }

        matrix.push([]);

        col.push(1);
        col = col.concat(col).slice(0, -1);

        for (i = 0, ii = n; i < ii; i++) {
            res = this.solve(col.slice(n - i - 1, 2 * n - i - 1));

            if (res === undefined) {
                return;
            }

            res.forEach(function (x, i) {
                matrix[i].push(x);
            });
        }

        inverse = new MathLib.Matrix(matrix);
        this.inverse = function () {
            return inverse;
        };
        return inverse;
    };

    // ### Matrix.prototype.isBandMatrix()
    // Determines if the matrix is a band matrix.
    //
    // *@param {number}*
    // *@param {number}*
    // *@return {boolean}*
    Matrix.prototype.isBandMatrix = function (l, u) {
        // var i, j, ii, jj;
        if (arguments.length === 1) {
            u = l;
        }

        return this.every(function (x, i, j) {
            return (i - l <= j && i + u >= j) || MathLib.isZero(x);
        });
        // for (i = 0, ii = this.rows; i < ii; i++) {
        //   for (j = 0, jj = this.cols; j < jj; j++) {
        //     if (i - j < l && this[i][j] !== 0) {
        //       return false;
        //     }
        //   }
        // }
        // return true;
    };

    // ### Matrix.prototype.isDiag()
    // Determines if the matrix is a diagonal matrix.
    //
    // *@return {boolean}*
    Matrix.prototype.isDiag = function () {
        var i, j, ii, jj;
        if (Number(this.hasOwnProperty('isUpper') && this.isUpper()) + Number(this.hasOwnProperty('isLower') && this.isLower()) + Number(this.hasOwnProperty('isSymmetric') && this.isSymmetric()) > 1) {
            return true;
        }
        for (i = 0, ii = this.rows; i < ii; i++) {
            for (j = 0, jj = this.cols; j < jj; j++) {
                if (i !== j && !MathLib.isZero(this[i][j])) {
                    return false;
                }
            }
        }
        return true;
    };

    // ### Matrix.prototype.isEqual()
    // Determines if the matrix is equal to an other matrix.
    //
    // *@param {Matrix}* the matrix to compare with
    // *@return {boolean}*
    Matrix.prototype.isEqual = function (x) {
        var i, j, ii, jj;
        if (this === x) {
            return true;
        }
        if (this.rows === x.rows && this.cols === x.cols) {
            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0, jj = this.cols; j < jj; j++) {
                    if (!MathLib.isEqual(this[i][j], x[i][j])) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    };

    // ### Matrix.prototype.isIdentity()
    // Determines if the matrix is a identity matrix.
    //
    // *@return {boolean}*
    Matrix.prototype.isIdentity = function () {
        if (!this.isSquare()) {
            return false;
        }

        var isIdentity = this.every(function (x, r, c) {
            return r === c ? MathLib.isOne(x) : MathLib.isZero(x);
        });

        this.isIdentity = function () {
            return isIdentity;
        };
        return isIdentity;
    };

    // ### Matrix.prototype.isInvertible()
    // Determines if the matrix is invertible.
    //
    // *@return {boolean}*
    Matrix.prototype.isInvertible = function () {
        return this.isSquare() && this.rank() === this.rows;
    };

    // ### Matrix.prototype.isLower()
    // Determines if the matrix is a lower triangular matrix.
    //
    // *@return {boolean}*
    Matrix.prototype.isLower = function () {
        return this.slice(0, -1).every(function (x, i) {
            return x.slice(i + 1).every(MathLib.isZero);
        });
    };

    // ### Matrix.prototype.isNegDefinite()
    // Determines if the matrix is negative definite
    //
    // *@return {boolean}*
    Matrix.prototype.isNegDefinite = function () {
        if (!this.isSquare()) {
            return;
        }
        if (this.rows === 1) {
            return this[0][0] < 0;
        }

        // Sylvester's criterion
        if (this.rows % 2 === 0) {
            return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
        } else {
            return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
        }
    };

    // ### Matrix.prototype.isOrthogonal()
    // Determines if the matrix is a orthogonal.
    //
    // *@return {boolean}*
    Matrix.prototype.isOrthogonal = function () {
        return this.transpose().times(this).isIdentity();
    };

    // ### Matrix.prototype.isPermutation()
    // Determines if the matrix is a permutation matrix
    //
    // *@return {boolean}*
    Matrix.prototype.isPermutation = function () {
        var rows = [], cols = [];

        return this.every(function (x, r, c) {
            if (MathLib.isOne(x)) {
                if (rows[r] || cols[c]) {
                    return false;
                } else {
                    rows[r] = true;
                    cols[c] = true;
                    return true;
                }
            } else if (MathLib.isZero(x)) {
                return true;
            }
            return false;
        }) && rows.length === this.rows && cols.length === this.cols;
    };

    // ### Matrix.prototype.isPosDefinite()
    // Determines if the matrix is positive definite
    //
    // *@return {boolean}*
    Matrix.prototype.isPosDefinite = function () {
        if (!this.isSquare()) {
            return;
        }
        if (this.rows === 1) {
            return this[0][0] > 0;
        }

        // Sylvester's criterion
        return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
    };

    // ### Matrix.prototype.isReal()
    // Determines if the matrix has only real entries
    //
    // *@return {boolean}*
    Matrix.prototype.isReal = function () {
        return this.every(MathLib.isReal);
    };

    // ### Matrix.prototype.isScalar()
    // Determines if the matrix is a scalar matrix
    // (that is a multiple of the identity matrix)
    //
    // *@return {boolean}*
    Matrix.prototype.isScalar = function () {
        var i, ii, diag = this.diag;
        if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
            if (this.isIdentity() || this.isZero()) {
                return true;
            } else {
                return false;
            }
        }
        if (this.isDiag()) {
            for (i = 1, ii = this.rows; i < ii; i++) {
                if (!MathLib.isEqual(diag[0], diag[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };

    // ### Matrix.prototype.isSquare()
    // Determines if the matrix is a square matrix
    //
    // *@return {boolean}*
    Matrix.prototype.isSquare = function () {
        return this.cols === this.rows;
    };

    // ### Matrix.prototype.isSymmetric()
    // Determines if the matrix is symmetric
    //
    // *@return {boolean}*
    Matrix.prototype.isSymmetric = function () {
        var i, ii, j, jj, isSymmetric = true;

        if (!this.isSquare()) {
            isSymmetric = false;
        } else {
            lp:
            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = i + 1, jj = this.cols; j < jj; j++) {
                    if (!MathLib.isEqual(this[i][j], this[j][i])) {
                        isSymmetric = false;
                        break lp;
                    }
                }
            }
        }

        this.isSymmetric = function () {
            return isSymmetric;
        };
        return isSymmetric;
    };

    // ### Matrix.prototype.isUpper()
    // Determines if the matrix is a upper triangular matrix
    //
    // *@return {boolean}*
    Matrix.prototype.isUpper = function () {
        return this.slice(1).every(function (x, i) {
            return x.slice(0, i + 1).every(MathLib.isZero);
        });
    };

    // ### Matrix.prototype.isVector()
    // Determines if the matrix is a vector
    // (only one row or one column)
    //
    // *@return {boolean}*
    Matrix.prototype.isVector = function () {
        return (this.rows === 1) || (this.cols === 1);
    };

    // ### Matrix.prototype.isZero()
    // Determines if the matrix the zero matrix
    // The result is cached.
    //
    // *@return {boolean}*
    Matrix.prototype.isZero = function () {
        var isZero = this.every(MathLib.isZero);

        this.isZero = function () {
            return isZero;
        };
        return isZero;
    };

    // ### Matrix.prototype.map()
    // This function works like the Array.prototype.map function.
    // The matrix is processed row by row.
    // The function is called with the following arguments:
    // the entry at the current position, the number of the row,
    // the number of the column and the complete matrix
    //
    // *@param {function}* The function which is called on every argument
    // *@return {Matrix}*
    Matrix.prototype.map = function (f) {
        var m = this;
        return new MathLib.Matrix(Array.prototype.map.call(this, function (x, i) {
            return Array.prototype.map.call(x, function (y, j) {
                return f(y, i, j, m);
            });
        }));
    };

    // ### Matrix.prototype.minor()
    // Calculates a minor
    //
    // *@param {number}* The row to be removed.
    // *@param {number}* The column to be removed.
    // *@return {Matrix}*
    Matrix.prototype.minor = function (r, c) {
        return this.remove(r, c).determinant();
    };

    // ### Matrix.prototype.minus()
    // Calculates the difference of two matrices
    //
    // *@param {Matrix}* The matrix to be subtracted.
    // *@return {Matrix}*
    Matrix.prototype.minus = function (m) {
        if (this.rows === m.rows && this.cols === m.cols) {
            return this.plus(m.negative());
        } else {
            MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#minus' });
            return;
        }
    };

    // ### Matrix.prototype.negative()
    // Returns the negative matrix
    //
    // *@return {Matrix}*
    Matrix.prototype.negative = function () {
        var i, ii, negative = [];

        for (i = 0, ii = this.rows; i < ii; i++) {
            negative.push(this[i].map(MathLib.negative));
        }
        return new MathLib.Matrix(negative);
    };

    // ### Matrix.prototype.plus()
    // This function adds a matrix to the current matrix
    // and returns the result as a new matrix.
    //
    // *@param {Matrix}* The matrix to be added.
    // *@return {Matrix}*
    Matrix.prototype.plus = function (m) {
        var i, ii, j, jj, sum = [];

        if (this.rows === m.rows && this.cols === m.cols) {
            for (i = 0, ii = this.rows; i < ii; i++) {
                sum[i] = [];
                for (j = 0, jj = this.cols; j < jj; j++) {
                    sum[i][j] = MathLib.plus(this[i][j], m[i][j]);
                }
            }
            return new MathLib.Matrix(sum);
        } else {
            MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#plus' });
            return;
        }
    };

    // ### Matrix.prototype.rank()
    // Determines the rank of the matrix
    //
    // *@return {number}*
    Matrix.prototype.rank = function () {
        var i, j, rank = 0, mat = this.rref();

        rankloop:
        for (i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
            for (j = this.cols - 1; j >= i; j--) {
                if (!MathLib.isZero(mat[i][j])) {
                    rank = i + 1;
                    break rankloop;
                }
            }
        }

        this.rank = function () {
            return rank;
        };
        return rank;
    };

    // ### Matrix.prototype.reduce()
    // This function works like the Array.prototype.reduce function.
    //
    // *@return {any}*
    Matrix.prototype.reduce = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.reduce.apply(this, args);
    };

    // ### Matrix.prototype.remove()
    // This function removes the specified rows and/or columns for the matrix.
    //
    // *@param {number|array}* The row(s) to be removed.
    // *@param {number|array}* The column(s) to be removed.
    // *@return {Matrix}*
    Matrix.prototype.remove = function (row, col) {
        var rest = this.toArray();

        if (row || row === 0) {
            if (typeof row === 'number') {
                row = [row];
            }
            rest = rest.filter(function (x, i) {
                return row.indexOf(i) === -1;
            });
        }

        if (col || col === 0) {
            if (typeof col === 'number') {
                col = [col];
            }
            col = col.sort().reverse();
            col.forEach(function (n) {
                rest = rest.map(function (x) {
                    x.splice(n, 1);
                    return x;
                });
            });
        }

        return new MathLib.Matrix(rest);
    };

    // ### Matrix.prototype.rref()
    // Calculate the reduced row echelon form (rref) of a matrix.
    //
    // *@return {Matrix}*
    Matrix.prototype.rref = function () {
        var i, ii, j, jj, k, kk, pivot, factor, swap, lead = 0, rref = this.toArray();

        for (i = 0, ii = this.rows; i < ii; i++) {
            if (this.cols <= lead) {
                return new MathLib.Matrix(rref);
            }

            // Find the row with the biggest pivot element
            j = i;
            while (rref[j][lead] === 0) {
                j++;
                if (this.rows === j) {
                    j = i;
                    lead++;
                    if (this.cols === lead) {
                        return new MathLib.Matrix(rref);
                    }
                }
            }

            // Swap the pivot row to the top
            if (i !== j) {
                swap = rref[j];
                rref[j] = rref[i];
                rref[i] = swap;
            }

            pivot = rref[i][lead];

            for (j = lead, jj = this.cols; j < jj; j++) {
                rref[i][j] /= pivot;
            }

            for (j = 0, jj = this.rows; j < jj; j++) {
                if (j === i) {
                    continue;
                }
                factor = rref[j][lead];
                for (k = 0, kk = this.cols; k < kk; k++) {
                    rref[j][k] = MathLib.minus(rref[j][k], MathLib.times(factor, rref[i][k]));
                }
            }
            lead++;
        }
        return new MathLib.Matrix(rref);
    };

    // ### Matrix.prototype.slice()
    // This function works like the Array.prototype.slice function.
    //
    // *@return {array}*
    Matrix.prototype.slice = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        return Array.prototype.slice.apply(this, args);
    };

    // ### Matrix.prototype.solve()
    // Solves the system of linear equations Ax = b
    // given by the matrix A and a vector or point b.
    //
    // *@param {Vector|Point}* The b in Ax = b
    // *@return {Vector|Point}*
    Matrix.prototype.solve = function (b) {
        // Ax = b -> LUx = b. Then y is defined to be Ux
        var LU = this.LU(), i, j, n = b.length, x = [], y = [];

        // Permutate b according to the LU decomposition
        b = this.LUpermutation.applyTo(b);

        for (i = 0; i < n; i++) {
            y[i] = b[i];
            for (j = 0; j < i; j++) {
                y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
            }
        }

        for (i = n - 1; i >= 0; i--) {
            x[i] = y[i];
            for (j = i + 1; j < n; j++) {
                x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
            }

            if (LU[i][i] === 0) {
                if (x[i] !== 0) {
                    return undefined;
                } else {
                    x[i] = x[i];
                }
            } else {
                x[i] = MathLib.divide(x[i], LU[i][i]);
            }
        }

        if (MathLib.type(b) === 'array') {
            return x;
        } else {
            return new b.constructor(x);
        }
    };

    // ### Matrix.prototype.some()
    // This function works like the Array.prototype.some function.
    // The matrix is processed row by row.
    // The function is called with the following arguments:
    // the entry at the current position, the number of the row,
    // the number of the column and the complete matrix
    //
    // *@param {function}* The function which is called on every argument
    // *@return {boolean}*
    Matrix.prototype.some = function (f) {
        return Array.prototype.some.call(this, function (x, i) {
            return Array.prototype.some.call(x, function (y, j) {
                return f(y, i, j, this);
            });
        });
    };

    // ### Matrix.prototype.times()
    // Multiplies the current matrix with a number, a matrix, a point or a vector.
    //
    // *@param {number|Matrix|Point|Rational|Vector}*
    // *@return {Matrix|Point|Vector}*
    Matrix.prototype.times = function (a) {
        var i, ii, j, jj, k, kk, product = [], entry;

        if (a.type === 'rational') {
            a = a.toNumber();
        }
        if (typeof a === 'number' || a.type === 'complex') {
            return this.map(function (x) {
                return MathLib.times(x, a);
            });
        } else if (a.type === 'matrix') {
            if (this.cols === a.rows) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    product[i] = [];
                    for (j = 0, jj = a.cols; j < jj; j++) {
                        entry = 0;

                        for (k = 0, kk = this.cols; k < kk; k++) {
                            entry = MathLib.plus(entry, MathLib.times(this[i][k], a[k][j]));
                        }
                        product[i][j] = entry;
                    }
                }
                return new MathLib.Matrix(product);
            } else {
                MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#times' });
                return;
            }
        } else if (a.type === 'point' || a.type === 'vector') {
            if (this.cols === a.length) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    entry = 0;
                    for (j = 0, jj = this.cols; j < jj; j++) {
                        entry = MathLib.plus(entry, MathLib.times(this[i][j], a[j]));
                    }
                    product.push(entry);
                }
                return new a.constructor(product);
            }
        }
    };

    // ### Matrix.prototype.toArray()
    // Converts the matrix to a two-dimensional array
    //
    // *@return {array}*
    Matrix.prototype.toArray = function () {
        return Array.prototype.map.call(this, function (x) {
            return Array.prototype.map.call(x, function (y) {
                return MathLib.copy(y);
            });
        });
    };

    // ### Matrix.prototype.toColVectors()
    // Converts the columns of the matrix to vectors
    //
    // *@return {array}*
    Matrix.prototype.toColVectors = function () {
        return this.transpose().toRowVectors();
    };

    // ### Matrix.prototype.toContentMathML()
    // converting the matrix to content MathML
    //
    // *@return {string}*
    Matrix.prototype.toContentMathML = function () {
        return this.reduce(function (str, x) {
            return str + x.reduce(function (prev, cur) {
                return prev + MathLib.toContentMathML(cur);
            }, '<matrixrow>') + '</matrixrow>';
        }, '<matrix>') + '</matrix>';
    };

    // ### Matrix.prototype.toLaTeX()
    // Converting the matrix to LaTeX
    //
    // *@return {string}*
    Matrix.prototype.toLaTeX = function () {
        return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
            return str + x.reduce(function (prev, cur) {
                return prev + ' & ' + MathLib.toLaTeX(cur);
            }) + '\\\n';
        }, '').slice(0, -2) + '\n\\end{pmatrix}';
    };

    // ### Matrix.prototype.toMathML()
    // converting the matrix to (presentation) MathML
    //
    // *@return {string}*
    Matrix.prototype.toMathML = function () {
        return this.reduce(function (str, x) {
            return str + x.reduce(function (prev, cur) {
                return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
            }, '<mtr>') + '</mtr>';
        }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
    };

    // ### Matrix.prototype.toRowVectors()
    // Converts the rows of the matrix to vectors
    //
    // *@return {array}*
    Matrix.prototype.toRowVectors = function () {
        return this.toArray().map(function (v) {
            return new MathLib.Vector(v);
        });
    };

    // ### Matrix.prototype.toString()
    // Creating a custom .toString() function
    //
    // *@return {string}*
    Matrix.prototype.toString = function () {
        return this.reduce(function (str, x) {
            return str + x.reduce(function (prev, cur) {
                return prev + '\t' + MathLib.toString(cur);
            }) + '\n';
        }, '').slice(0, -1);
    };

    // ### Matrix.prototype.trace()
    // Calculating the trace of the matrix
    //
    // *@return {number|Complex}*
    Matrix.prototype.trace = function () {
        var trace = MathLib.plus.apply(null, this.diag());

        this.trace = function () {
            return trace;
        };
        return trace;
    };

    // ### Matrix.prototype.transpose()
    // Calculating the transpose of the matrix
    // The result is cached.
    //
    // *@return {Matrix}*
    Matrix.prototype.transpose = function () {
        var transposedMatrix, row, i, j, ii, jj, transpose = [];

        for (i = 0, ii = this.cols; i < ii; i++) {
            row = [];
            for (j = 0, jj = this.rows; j < jj; j++) {
                row.push(this[j][i]);
            }
            transpose.push(row);
        }

        transposedMatrix = new MathLib.Matrix(transpose);
        this.transpose = function () {
            return transposedMatrix;
        };
        return transposedMatrix;
    };
    Matrix.givensMatrix = function (n, i, k, phi) {
        var givens = MathLib.Matrix.identity(n);
        givens[k][k] = givens[i][i] = Math.cos(phi);
        givens[i][k] = Math.sin(phi);
        givens[k][i] = -givens[i][k];
        return givens;
    };

    Matrix.identity = function (n) {
        var row = [], matrix = [], i, ii;
        n = n || 1;

        for (i = 0, ii = n - 1; i < ii; i++) {
            row.push(0);
        }
        row.push(1);
        row = row.concat(row);
        row = row.slice(0, -1);

        for (i = 0, ii = n; i < ii; i++) {
            matrix.push(row.slice(n - i - 1, 2 * n - i - 1));
        }

        return new MathLib.Matrix(matrix);
    };

    Matrix.numbers = function (n, r, c) {
        var i, ii, row = [], matrix = [];

        for (i = 0, ii = c || r || 1; i < ii; i++) {
            row.push(n);
        }
        for (i = 0, ii = r || 1; i < ii; i++) {
            matrix.push(row.slice(0));
        }
        return new MathLib.Matrix(matrix);
    };

    Matrix.one = function (r, c) {
        r = r || 1;
        c = c || 1;
        return MathLib.Matrix.numbers(1, r, c);
    };

    Matrix.random = function (r, c) {
        var row, matrix = [], i, j, ii, jj;
        for (i = 0, ii = r || 1; i < ii; i++) {
            row = [];
            for (j = 0, jj = c || r || 1; j < jj; j++) {
                row.push(Math.random());
            }
            matrix.push(row);
        }
        return new MathLib.Matrix(matrix);
    };

    Matrix.zero = function (r, c) {
        r = r || 1;
        c = c || 1;
        return MathLib.Matrix.numbers(0, r, c);
    };
    return Matrix;
})();
export default = Matrix;

