// ### Functn.prototype.toMathMLString()
// Returns a MathML representation of the function
//
// *@returns {string}*
MathLib.extendPrototype('functn', 'toMathMLString', function () {
  return this.contentMathML.toMathMLString();
});