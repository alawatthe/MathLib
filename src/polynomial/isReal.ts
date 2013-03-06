// ### Polynomial.prototype.isReal()
// Checks wether the coefficients are real numbers
//
// *@returns {boolean}*
isReal() {
	return this.every(MathLib.isReal);
}