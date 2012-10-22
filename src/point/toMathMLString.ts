// ### Point.prototype.toMathMLString()
// Returns (presentation) MathML representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
toMathMLString(opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return p.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}