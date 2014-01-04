/**
 * Custom toString function
 *
 * @return {string}
 */
toString() : string {
	return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
}