// Calculates the conjugate of a complex number
conjugate() {
	return new MathLib.Complex(this.re, MathLib.negative(this.im));
}