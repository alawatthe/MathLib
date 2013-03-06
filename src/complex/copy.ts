// Copies the complex number
copy() {
	return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
}