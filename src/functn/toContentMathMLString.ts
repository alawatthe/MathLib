// ### Functn.prototype.toContentMathMLString()
// Returns a content MathML representation of the function
//
// *@returns {string}*
functnPrototype.toContentMathMLString = function(bvar = '') {
  return this.contentMathML.outerMathML;
};