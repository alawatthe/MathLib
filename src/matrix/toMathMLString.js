// ### Matrix.prototype.toMathMLString()
// converting the matrix to (presentation) MathML
//
// *@returns {string}*
MathLib.extendPrototype('matrix', 'toMathMLString', function () {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '<mtd>' + MathLib.toMathMLString(cur) + '</mtd>';
    }, '<mtr>') + '</mtr>';
  }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
});