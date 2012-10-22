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

export class Matrix {
  type = 'matrix';

  constructor(matrix) {
    if (typeof matrix === 'string') {
      // If there is a < in the string we assume it's MathML
      if (matrix.indexOf('<') > -1) {
        return new MathLib.MathML(matrix).parse();
      }
      // else we assume it's MatLab notation
      else {
        matrix = matrix.trim().replace(/;?\n/g, '],[');
        matrix = JSON.parse('[[' + matrix + ']]');
      }
    }
    matrix.forEach((x,i)=>{this[i] = x;});
    this.length = matrix.length;
    this.cols = matrix[0].length;
    this.rows = matrix.length;


  }