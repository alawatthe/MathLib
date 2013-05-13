// ### Complex.prototype.pow()
// Calculates the n-th pow of the complex number
//
// *@param {number}* The pow to which the complex number should be raised   
// *@return {Complex}*
pow(n) : Complex {
	return new MathLib.Complex(Math.pow(this.abs(), n), n * this.arg());
}