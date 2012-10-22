// ### Matrix.prototype.some()
// This function works like the Array.prototype.some function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
some(f) {
  return Array.prototype.some.call(this, function (x, i) {
    return Array.prototype.some.call(x, function (y, j) {
      return f(y, i, j, this);
    });
  });
}