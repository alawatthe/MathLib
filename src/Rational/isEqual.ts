/**
 * Checks if the rational number is equal to an other number
 *
 * @param {Rational} number The number to compare
 * @return {boolean}
 */
isEqual(number) : boolean {
	return MathLib.isEqual(MathLib.times(this.numerator, number.denominator), MathLib.times(this.denominator, number.numerator));
}