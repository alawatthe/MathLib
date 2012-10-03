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