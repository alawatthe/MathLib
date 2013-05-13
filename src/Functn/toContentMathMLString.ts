// ### [Functn.prototype.toContentMathMLString()](http://mathlib.de/en/docs/Functn/toContentMathMLString)
// Returns a content MathML representation of the function
//
// *@return {string}*
functnPrototype.toContentMathMLString = function (bvar = '') {
	return this.contentMathML.outerMathML;
};