/**
 * Converts a two dimensional point to the corresponding complex number.
 *
 * @return {Complex}
 */
toComplex() : Complex {
	if (this.dimension === 2) {
		if (MathLib.isZero(this[2])) {
			return new MathLib.Complex(Infinity);
		}
		return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
	}
}