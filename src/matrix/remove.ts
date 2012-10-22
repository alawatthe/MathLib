// ### Matrix.prototype.remove()
// This function removes the specified rows and/or columns for the matrix.
//
// *@param {number|array}* The row(s) to be removed.  
// *@param {number|array}* The column(s) to be removed.  
// *@returns {matrix}*
remove(row, col) {
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

  return new MathLib.Matrix(res);
}