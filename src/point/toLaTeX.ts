// ### Point.prototype.toLaTeX()
// Returns LaTeX representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
toLaTeX(opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
    return old + '\\\\' + MathLib.toLaTeX(cur);
  }) + '\\end{pmatrix}';
}