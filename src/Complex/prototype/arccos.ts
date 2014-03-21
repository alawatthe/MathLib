/**
 * Returns the inverse cosine of the number.
 *
 * @return {Complex}
 */
arccos() : Complex {
	return (new MathLib.Complex(Math.PI / 2, -0)).minus(this.arcsin());
}