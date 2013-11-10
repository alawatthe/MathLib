// ### [Complex.prototype.arccot()](http://mathlib.de/en/docs/Complex/arccot)
// Returns the inverse cotangent of the number.
//
// *@return {Complex}*
arccot() : Complex {
	if (this.isZero()) {
		return new MathLib.Complex(MathLib.sign(1/this.re) * Math.PI / 2, -this.im);
	}
	return this.inverse().arctan();
	//var c = this.arctan();
	//console.log(c.toString());
	//return new MathLib.Complex(Math.PI / 2 - c.re, c.im);
	//return MathLib.minus(Math.PI / 2, this.arctan());
}