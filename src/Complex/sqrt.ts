// ### Complex.prototype.sqrt()
// Takes the square root of a complex number
//
// *@returns {complex}*
sqrt() : Complex {
	return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg()/2);
}