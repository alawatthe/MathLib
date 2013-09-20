// ### [Expression.prototype.compare()](http://mathlib.de/en/docs/Expression/compare)
// Compares two expressions
//
// *@param {Expression}* The expression to compare  
// *@return {number}*
compare(e) {
	return MathLib.sign(this.toString().localeCompare(e.toString()));
}