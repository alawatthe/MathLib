// ### Complex.prototype.compare()
// Compares two complex numbers
//
// *@returns {number}*
compare(x) : number {
	var a = MathLib.sign(this.abs() - x.abs());
	return a ? a : MathLib.sign(this.arg() - x.arg());
}