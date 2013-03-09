// ### Polynomial.prototype.isReal()
// Checks wether the coefficients are real numbers
//
// *@returns {boolean}*
isReal() : bool {
	return this.every(MathLib.isReal);
}