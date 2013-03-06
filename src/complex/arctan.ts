// Returns the inverse cotangent of the number
arctan() {
	var iz = new MathLib.Complex(-this.im, this.re);
	return MathLib.times(new MathLib.Complex(0, 0.5), MathLib.ln(MathLib.divide( MathLib.plus(1, iz), MathLib.minus(1, iz))));
}