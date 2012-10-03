// ### Vector.prototype.toMathMLString()
// Returns the (presentation) MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toMathMLString', function () {
  return this.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathMLString(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
});