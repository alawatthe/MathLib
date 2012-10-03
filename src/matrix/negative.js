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