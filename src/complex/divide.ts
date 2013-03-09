// ### Complex.prototype.divide()
// Divides a complex number by an other
//
// *@param {number|complex}* The divisor  
// *@returns {complex}*
divide(c) : Complex {
	return this.times(MathLib.inverse(c));
}