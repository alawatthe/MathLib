// ### Complex.prototype.mod()
// Reduces the real and imaginary part mod a number
//
// *@param {number}*  
// *@returns {complex}*
mod(m) : Complex {
	return new MathLib.Complex(MathLib.mod(this.re, m), MathLib.mod(this.im, m));
}