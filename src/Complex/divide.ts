// ### Complex.prototype.divide()
// Divides a complex number by an other
//
// *@param {number|Complex}* The divisor  
// *@return {Complex}*
divide(c) : Complex {
	return this.times(MathLib.inverse(c));
}