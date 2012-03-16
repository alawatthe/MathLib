// ## <a id="Matrix"></a>Matrix
// The matrix implementation of MathLib makes calculations with matrices of
// arbitrary size possible. The entries of a matrix can be numbers and complex
// numbers.
//
// It is as easy as
// ```
// MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
// ```
// to create the following matrix:  
//    ⎛ 1 2 3 ⎞  
//    ⎜ 4 5 6 ⎟  
//    ⎝ 7 8 9 ⎠

prototypes.matrix = [];
MathLib.matrix = function (matrix) {
  if (typeof matrix === 'string') {
    // If there is a < in the string we assume it's MathML
    if (matrix.indexOf('<') > -1) {
      return MathLib.MathML(matrix).parse();
    }
    // else we assume it's MatLab notation
    else {
      matrix = matrix.trim().replace(/;?\n/g, '],[');
      matrix = JSON.parse('[[' + matrix + ']]');
    }
  }

  matrix[proto] = prototypes.matrix;
  Object.defineProperties(matrix, {
    cols: {
      value: matrix[0].length
    },
    rows: {
      value: matrix.length
    }
  });

  return matrix;
};

// Setting the .constructor property to MathLib.matrix
MathLib.extendPrototype('matrix', 'constructor', MathLib.matrix);

// Setting the .type property to 'matrix'
MathLib.extendPrototype('matrix', 'type', 'matrix');


// ### Matrix.prototype.adjugate()
// Calculates the adjugate matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjugate', function (n) {
  return this.map(function (x, r, c, m) {
    return MathLib.times(m.remove(c, r).determinant(), 1 - ((r+c)%2) * 2);
  });
});


// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'adjoint', function (n) {
  return this.map(MathLib.conjugate).transpose();
});


// ### Matrix.prototype.cholesky()
// The cholesky decomposition of a matrix
// using the Cholesky–Banachiewicz algorithm.
// Does not change the current matrix, but returns a new one.
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'cholesky', function () {
  var r, rr, cholesky = [], k, kk, sum, c;

  for (r = 0, rr = this.rows; r < rr; r++) {
    cholesky.push([]);
  }

  for (r = 0, rr = this.rows; r < rr; r++) {
    for (c=0; c<r; c++) {
      sum = 0;
      for (k = 0, kk = c; k < kk; k++) {
        sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[c][k]));
      }
      cholesky[r][c] = (this[r][c] - sum)/cholesky[c][c];
    }

    sum = 0;
    for (k = 0, kk = c; k < kk; k++) {
      sum = MathLib.plus(sum, MathLib.times(cholesky[r][k], cholesky[r][k]));
    }
    cholesky[r][c] = Math.sqrt(this[c][c] - sum);

    for (c++; c < this.cols; c++) {
      cholesky[r][c] = 0;
    }

  }
  cholesky = MathLib.matrix(cholesky);

  this.cholesky = function () {
    return cholesky;
  };
  return cholesky;
});


// ### Matrix.prototype.determinant()
// Calculates the determinant of the matrix via the LU decomposition.
// The result is cached.
//
// *@returns {number|complex}*
MathLib.extendPrototype('matrix', 'determinant', function () {
  if (this.isSquare()) {
    var arr, determinant;
    if(this.rank() < this.rows) {
      determinant = 0;
    }
    else {
      arr = this.LU();
      determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times(arr.diag()));
    }

    this.determinant = function () {
      return determinant;
    };
    return determinant;
  }
});


// ### Matrix.prototype.diag()
// Returns the entries on the diagonal in an array
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'diag', function () {
  var arr = [], i, ii;
  for (i = 0, ii = Math.min(this.rows, this.cols); i<ii; i++) {
    arr.push(this[i][i]);
  }
  return arr;
});


// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'divide', function (n) {
 return this.multiply(MathLib.inverse(n));
});


// ### Matrix.prototype.every()
// This function works like the Array.prototype.every function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'every', function (f) {
  return Array.prototype.every.call(this, function (x, i) {
    return Array.prototype.every.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.forEach()
// This function works like the Array.prototype.forEach function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument
MathLib.extendPrototype('matrix', 'forEach', function (f) {
  Array.prototype.forEach.call(this, function (x, i) {
    return Array.prototype.forEach.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.inverse()
// Calculates the inverse matrix.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'inverse', function () {
  if (!this.isSquare() && this.determinant()) {
    return;
  }
  return this.adjugate().divide(this.determinant());
});


// ### Matrix.prototype.isDiag()
// Determines if the matrix is a diagonal matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isDiag', function () {
  var i, j, ii, jj;
  if ((this.hasOwnProperty('isUpper') && this.isUpper()) + (+(this.hasOwnProperty('isLower') && this.isLower())) + (+(this.hasOwnProperty('isLower') && this.isLower())) > 1) {
    return true;
  }
  for (i = 0, ii = this.rows; i < ii; i++) {
    for (j = 0, jj = this.cols; j < jj; j++) {
      if (i !== j && this[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
});


// ### Matrix.prototype.isEqual()
// Determines if the matrix is equal to an other matrix.
//
// *@param {matrix}* the matrix to compare with  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isEqual', function (x) {
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
});


// ### Matrix.prototype.isIdentity()
// Determines if the matrix is a identity matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isIdentity', function () {
  if (!this.isSquare()) {
    return false;
  }

  var isIdentity = this.every(function (x, r, c) {
    return r===c ? MathLib.isOne(x) : MathLib.isZero(x);
  });

  this.isIdentity = function () {
    return isIdentity;
  };
  return isIdentity;
});


// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isInvertible', function () {
  return this.isSquare() && this.rank() === this.rows;
});


// ### Matrix.prototype.isLower()
// Determines if the matrix is a lower triangular matrix.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isLower', function () {
  return this.slice(0, -1).every(function (x, i) {
    return x.slice(i+1).every(MathLib.isZero);
  });
});


// ### Matrix.prototype.isNegDefinite()
// Determines if the matrix is negative definite
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isNegDefinite', function () {
  if (!this.isSquare()) {
    return;
  }
  if (this.rows === 1) {
    return this[0][0] < 0;
  }
  // Sylvester's criterion
  if (this.rows % 2 === 0) {
    return this.determinant() > 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
  else {
    return this.determinant() < 0 && this.remove(this.rows-1, this.cols-1).isNegDefinite();
  }
});


// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isOrthogonal', function () {
  return this.transpose().times(this).isIdentity();
});


// ### Matrix.prototype.isPermutation()
// Determines if the matrix is a permutation matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isPermutation', function () {
  var rows = [],
      cols = [];

  return this.every(function (x, r, c) {
    if (MathLib.isOne(x)) {
      if (rows[r] || cols[c]) {
        return false;
      }
      else {
        rows[r] = true;
        cols[c] = true;
        return true;
      }
    }
    else if(MathLib.isZero(x)) {
      return true;
    }
    return false;
  }) && rows.length === this.rows && cols.length === this.cols;
});


// ### Matrix.prototype.isPosDefinite()
// Determines if the matrix is positive definite
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isPosDefinite', function () {
  if (!this.isSquare()) {
    return;
  }
  if (this.rows === 1) {
    return this[0][0] > 0;
  }
  // Sylvester's criterion
  return this.determinant() > 0 && this.remove(this.rows-1, this.cols-1).isPosDefinite();
});


// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isReal', function () {
  return this.every(MathLib.isReal);
});

// ### Matrix.prototype.isScalar()
// Determines if the matrix is a scalar matrix
// (that is a multiple of the scalar matrix)
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isScalar', function () {
  var n = this.rows,
      diag = this.diag,
      i;
  if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
    if (this.isIdentity() || this.isZero()) {
      return true;
    }
    else {
      return false;
    }
  }
  if (this.isDiag()) {
    for (i = 1; i < n; i++) {
      if (!MathLib.isEqual(diag[0], diag[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
});


// ### Matrix.prototype.isSquare()
// Determines if the matrix is a square matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSquare', function () {
  return this.cols === this.rows;
});


// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is symmetric
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isSymmetric', function () {
  var i, j, bool = true;
  if (!this.isSquare()) {
    bool = false;
  }
  else {
lp: for (i = 0; i < this.rows; i++) {
      for (j = i + 1; j < this.cols; j++) {
        if (!MathLib.isEqual(this[i][j], this[j][i])) {
          bool = false;
          break lp;
        }
      }
    }
  }

  this.isSymmetric = function () {
    return bool;
  };
  return bool;
});


// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is a upper triangular matrix
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isUpper', function () {
  return this.slice(1).every(function (x, i) {
    return x.slice(0, i+1).every(MathLib.isZero);
  });
});


// ### Matrix.prototype.isVector()
// Determines if the matrix is a vector
// (only one row or one column)
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isVector',  function () {
  return (this.rows === 1) || (this.cols === 1);
});


// ### Matrix.prototype.isZero()
// Determines if the matrix the zero matrix
// The result is cached.
//
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'isZero', function () {
  var isZero = this.every(MathLib.isZero);

  this.isZero = function () {
    return isZero;
  };
  return isZero;
});


// ### Matrix.prototype.LU()
// Calculates the LU decomposition of a matrix
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'LU', function (dontSwapPivot) {
  var i, j, k, t, p,
      LU = this.toArray(),
      m = this.rows,
      n = this.cols,
      permutation = [];

  for (k = 0; k < n; k++) {
    // Find the pivot
    if (!dontSwapPivot) {
      p = k;
      for (i = k+1; i < m; i++) {
        if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
          p = i;
        }
      }
      // Exchange if necessary
      if (p !== k) {
        permutation.unshift([p, k]);
        t = LU[p]; LU[p] = LU[k]; LU[k] = t;
      }
    }

    // The elimination
    if (LU[k][k] !== 0) {
      for (i = k+1; i < m; i++) {
        LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
        for (j = k+1; j < n; j++) {
          LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
        }
      }
    }
  }
  LU = MathLib.matrix(LU);
  this.LU = function () {
    return LU;
  };
  this.LUpermutation = MathLib.permutation(permutation);
  return LU;
});


// ### Matrix.prototype.map()
// This function works like the Array.prototype.map function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'map', function (f) {
  var m = this;
  return MathLib.matrix(
    Array.prototype.map.call(this, function (x, i) {
      return Array.prototype.map.call(x, function (y, j) {
        return f(y, i, j, m);
      });
    })
  );
});


// ### Matrix.prototype.minor()
// Calculates a minor
//
// *@param {number}* The row to be removed.  
// *@param {number}* The column to be removed.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'minor', function (r, c) {
  return this.remove(r, c).determinant();
});


// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {matrix}* The matrix to be subtracted.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'minus', function (m) {
  return this.plus(m.negative());
});


// ### Matrix.prototype.negative()
// Returns the negative matrix
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'negative', function () {
  var res = [],
      i, ii;

  for (i = 0, ii = this.rows; i < ii; i++) {
    res.push(this[i].map(MathLib.negative));
  }
  return MathLib.matrix(res);
});


// ### Matrix.prototype.plus()
// This function adds a matrix to the current matrix
// and returns the result as a new matrix.
//
// *@param {matrix}* The matrix to be added.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'plus', function (m) {
  var res = [],
      r = this.rows,
      c = this.cols,
      i, j;

  for (i = 0; i < r; i++) {
    res[i] = [];
    for (j = 0; j < c; j++) {
      res[i][j] = MathLib.plus(this[i][j], m[i][j]);
    }
  }
  return MathLib.matrix(res);
});


// ### Matrix.prototype.rank()
// Determines the rank of the matrix
//
// *@returns {number}*
MathLib.extendPrototype('matrix', 'rank', function () {
  var rank = 0, mat, i, ii, j;
  mat = this.rref();

  label: for (i = Math.min(this.rows, this.cols)-1; i>=0; i--) {
    for (j=this.cols-1; j>=i; j--) {
      if (!MathLib.isZero(mat[i][j])) {
        rank = i + 1;
        break label;
      }
    }
  }

  this.rank = function () {
    return rank;
  };
  return rank;
});


// ### Matrix.prototype.remove()
// This function removes the specified rows and/or columns for the matrix.
//
// *@param {number|array}* The row(s) to be removed.  
// *@param {number|array}* The column(s) to be removed.  
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'remove', function (row, col) {
  var res = this.toArray();

  if (row || row === 0) {
    if (typeof row === 'number') {
      row = [row];
    }
    res = res.filter(function (x, i, arr) {
      return row.indexOf(i) === -1;
    });
  }

  if (col || col === 0) {
    if (typeof col === 'number') {
      col = [col];
    }
    col = col.sort().reverse();
    col.forEach(function (n) {
      res = res.map(function (x) {
        x.splice(n, 1);
        return x;
      });
    });
  }

  return MathLib.matrix(res);
});


// ### Matrix.prototype.rref()
// Calculate the reduced row echelon form (rref) of a matrix.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'rref', function () {
  var lead = 0, rref = this.toArray(),
      i, j, r, temp, val;
  for (r = 0; r < this.rows; r++) {
    if (this.cols <= lead) {
      return MathLib.matrix(rref);
    }
    i = r;
    while (rref[i][lead] === 0) {
      i++;
      if (this.rows === i) {
        i = r;
        lead++;
        if (this.cols === lead) {
          return MathLib.matrix(rref);
        }
      }
    }

    // Switch the lines
    var tmp = rref[i];
    rref[i] = rref[r];
    rref[r] = tmp;

    val = rref[r][lead];
    for (j = 0; j < this.cols; j++) {
      rref[r][j] /= val;
    }

    for (i = 0; i < this.rows; i++) {
      if (i === r) {
        continue;
      }
      val = rref[i][lead];
      for (j = 0; j < this.cols; j++) {
        rref[i][j] = MathLib.minus(rref[i][j], MathLib.times(val, rref[r][j]));
      }
    }
    lead++;
  }
  return MathLib.matrix(rref);
});



// ### Matrix.prototype.solve()
// Solves the system of linear equations Ax = b
// given by the matrix A and a vector or point b.
//
// *@param {vector|point}* The b in Ax = b  
// *@returns {vector|point}*
MathLib.extendPrototype('matrix', 'solve', function (b) {
  // Ax = b -> LUx = b. Then y is defined to be Ux
  var LU = this.LU(),
      i, j,
      n = b.length,
      x = [],
      y = [];

  // Permutate b according to the LU decomposition
  b = this.LUpermutation.applyTo(b);


  // Forward solve Ly = b
  for (i = 0; i < n; i++) {
    y[i] = b[i];
    for (j = 0; j < i; j++) {
      y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
    }
  }

  // Backward solve Ux = y
  for (i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (j = i + 1; j < n; j++) {
      x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
    }
    x[i] = MathLib.divide(x[i], LU[i][i]);
  }

  return b.constructor(x);
});


// ### Matrix.prototype.some()
// This function works like the Array.prototype.some function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
MathLib.extendPrototype('matrix', 'some', function (f) {
  return Array.prototype.some.call(this, function (x, i) {
    return Array.prototype.some.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
});


// ### Matrix.prototype.times()
// Multiplies the current matrix with a number, a matrix, a point or a vector.
//
// *@param {number|matrix|point|vector}*  
// *@returns {matrix|point|vector}*
MathLib.extendPrototype('matrix', 'times', function (a) {
  var res = [], temp, i, j, k;
  if (typeof a === 'number' || a.type === 'complex') {
    return this.map(function(x) {
      return MathLib.times(x, a);
    });
  }

  else if (a.type === "matrix") {
    if (this.cols === a.rows) {
      for (i = 0; i < this.rows; i++) {
        res[i] = [];
        for (j = 0; j < a.cols; j++) {
          temp = 0;

          for (k = 0; k < this.cols; k++) {
            temp = MathLib.plus(temp, MathLib.times(this[i][k], a[k][j]));
          }
          res[i][j] = temp;
        }
      }
      return MathLib.matrix(res);
    }
  }

  else if (a.type === 'point' || a.type === 'vector') {
    if (this.cols === a.length) {
      for (j = 0; j < this.rows; j++) {
        temp = 0;
        for (k = 0; k < this.cols; k++) {
          temp = MathLib.plus(temp, MathLib.times(this[j][k], a[k]));
        }
        res.push(temp);
      }
      return a.constructor(res);
    }
  }
});


// ### Matrix.prototype.toArray()
// Converts the matrix to a two-dimensional array
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toArray', function () {
    return Array.prototype.map.call(this, function (x) {
      return Array.prototype.map.call(x, function (y) {
        return MathLib.copy(y);
      });
    });
});


// ### Matrix.prototype.toColVectors()
// Converts the columns of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toColVectors', function () {
  return this.transpose().toRowVectors();
});


// ### Matrix.prototype.toComplex()
// Transforms a 2x2 matrix into the corresponding complex number
// (if the entries allow the transformation)
//
// *@returns {complex}*
MathLib.extendPrototype('matrix', 'toComplex', function () {
  if (this.rows !== 2 || this.cols !== 2 || this[0][0] !== this[1][1] || this[0][1] !== MathLib.negative(this[1][0])) {
    return;
  }
  return MathLib.complex([this[0][0], this[1][0]]);
});


// ### Matrix.prototype.toContentMathML()
// converting the matrix to content MathML
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toContentMathML', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + MathLib.toContentMathML(cur);
    }, '<matrixrow>') + '</matrixrow>';
  }, '<matrix>') + '</matrix>';
});


// ### Matrix.prototype.toLaTeX()
// Converting the matrix to LaTeX
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toLaTeX', function () {
  return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + ' & ' + MathLib.toLaTeX(cur);
    }) + '\\\n';
  }, '').slice(0, -2) + '\n\\end{pmatrix}';
});


// ### Matrix.prototype.toMathML()
// converting the matrix to (presentation) MathML
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toMathML', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
    }, '<mtr>') + '</mtr>';
  }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
});


// ### Matrix.prototype.toRowVectors()
// Converts the rows of the matrix to vectors
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toRowVectors', function () {
  return this.toArray().map(MathLib.vector);
});


// ### Matrix.prototype.toString()
// Creating a custom .toString() function
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toString', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '\t' + MathLib.toString(cur);
    }) + '\n';
  }, '').slice(0, -1);
});


// ### Matrix.prototype.trace()
// Calculating the trace of the matrix
//
// *@returns {number|complex}*
MathLib.extendPrototype('matrix', 'trace', function () {
  var trace = MathLib.plus(this.diag());

  this.trace = function () {
    return trace;
  };
  return trace;
});


// ### Matrix.prototype.transpose()
// Calculating the transpose of the matrix
// The result is cached.
//
// *@returns {matrix}*
MathLib.extendPrototype('matrix', 'transpose', function () {
  var transpose = [],
      help,
      i, j, ii, jj;

  for (i = 0, ii = this.cols; i<ii; i++) {
    help = [];
    for (j = 0, jj = this.rows; j<jj; j++) {
      help.push(this[j][i]);
    }
    transpose.push(help);
  }

  transpose = MathLib.matrix(transpose);
  this.transpose = function () {
    return transpose;
  };
  return transpose;
});




// ### Matrix.identity
// Returns the identity matrix.
//
// *@param {number}* The number of rows and columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'identity', function (n) {
  var temp = [], arr = [],
      i, ii;
  n = n || 1;

  for (i=0, ii=n-1; i<ii; i++) {
    temp.push(0);
  }
  temp.push(1);
  temp = temp.concat(temp);
  temp = temp.slice(0, -1);

  for (i=0, ii=n; i<ii; i++) {
    arr.push(temp.slice(n-i-1, 2*n-i- 1));
  }

  return MathLib.matrix(arr);
});


// ### Matrix.givensMatrix()
// This function returns a givens matrix
//
// *@param {number}* The size of the matrix.  
// *@param {number}* The first row/column.  
// *@param {number}* The second row/column.  
// *@param {number}* The angle (in radians).  
// *@returns {matrix}*
MathLib.extend('matrix', 'givensMatrix', function (n, i, k, phi) {
  var givens = MathLib.matrix.identity(n);
  givens[k][k] = givens[i][i]=Math.cos(phi);
  givens[i][k] = Math.sin(phi);
  givens[k][i] = -givens[i][k];
  return givens;
});


// ### Matrix.numbers()
// Returns a matrix consisting completely of a given number
//
// *@param {number}* The number.  
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'numbers', function (n, r, c) {
  var help = [], res = [],
      i, ii;
  for (i = 0, ii = c || r || 1; i < ii; i++) {
    help.push(n);
  }
  for (i = 0, ii = r || 1; i < ii ; i++) {
    res.push(help.slice());
  }
  return MathLib.matrix(res);
});


// ### Matrix.one()
// Returns a matrix consisting completely of ones.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'one', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(1, r, c);
});


// ### Matrix.random()
// Returns a matrix consisting completely of random numbers between 0 and 1
//
// *@param {number}* The number of rows.
// *@param {number}* The number of columns.
// *@returns {matrix}*
MathLib.extend('matrix', 'random', function (r, c) {
  var temp, arr = [],
      i, j, ii, jj;
  for (i = 0, ii = r || 1; i < ii; i++) {
    temp = [];
    for (j = 0, jj = c || r || 1; j < jj; j++) {
      temp.push(Math.random());
    }
    arr.push(temp);
  }
  return MathLib.matrix(arr);
});


// ### Matrix.zero()
// Returns a matrix consisting completely of zeros.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@returns {matrix}*
MathLib.extend('matrix', 'zero', function (r, c) {
  r = r || 1;
  c = c || 1;
  return MathLib.matrix.numbers(0, r, c);
});
