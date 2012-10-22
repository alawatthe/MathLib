// ### Matrix.prototype.negative()
// Returns the negative matrix
//
// *@returns {matrix}*
negative() {
  var res = [],
      i, ii;

  for (i = 0, ii = this.rows; i < ii; i++) {
    res.push(this[i].map(MathLib.negative));
  }
  return new MathLib.Matrix(res);
}