// Compares two complex numbers
compare(x) {
	var a = MathLib.sign(this.abs() - x.abs());
	return a ? a : MathLib.sign(this.arg() - x.arg());
}