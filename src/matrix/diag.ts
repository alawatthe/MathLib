// ### Matrix.prototype.diag()
// Returns the entries on the diagonal in an array
//
// *@returns {array}*
diag() : any[] {
  var arr = [], i, ii;
  for (i = 0, ii = Math.min(this.rows, this.cols); i<ii; i++) {
    arr.push(this[i][i]);
  }
  return arr;
}