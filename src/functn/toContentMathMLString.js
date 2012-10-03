// ### Functn.prototype.toContentMathMLString()
// Returns a content MathML representation of the function
//
// *@returns {string}*
MathLib.extendPrototype('functn', 'toContentMathMLString', function () {
  return this.contentMathML.outerMathML;
});