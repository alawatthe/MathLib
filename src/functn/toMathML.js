// ### Functn.prototype.toMathML()
// Returns a MathML representation of the function
//
// *@returns {string}*
MathLib.extendPrototype('functn', 'toMathML', function () {
  // Get the content MathML and convert it to presentation MathML
  return this.contentMathML.toMathML();
});