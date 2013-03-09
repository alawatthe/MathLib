// ### Complex.prototype.minus()
// Calculates the difference of two complex numbers
//
// *@param {number|complex}* The subtrahend  
// *@returns {complex}*
minus(c) : Complex {
	return this.plus(MathLib.negative(c));
}