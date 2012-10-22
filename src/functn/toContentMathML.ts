// ### Functn.prototype.toContentMathML()
// Returns a content MathML representation of the function
//
// *@returns {MathML}*
MathLib.extendPrototype('functn', 'toContentMathML', function () {
  return this.contentMathML;
});