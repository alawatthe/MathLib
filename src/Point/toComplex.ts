// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@returns {complex}*
toComplex() : Complex {
	if (this.dimension === 2) {
		if (MathLib.isZero(this[2])) {
			return MathLib.Complex.infinity;
		}
		return new MathLib.Complex(this[0]/this[2], this[1]/this[2]);
	}
}