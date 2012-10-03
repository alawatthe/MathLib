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