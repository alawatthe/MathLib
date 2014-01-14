/**
 * Checks if the rational number is equal to an other number
 *
 * @param {Integer|Rational|number|Complex} n The number to compare
 * @return {boolean}
 */
isEqual(n) : boolean {
	if (n.type !== 'rational') {
		return MathLib.isEqual.apply(null, MathLib.coerce(this, n));
	}
	else {
		return MathLib.isEqual(MathLib.times(this.numerator, n.denominator), MathLib.times(this.denominator, n.numerator));
	}
}