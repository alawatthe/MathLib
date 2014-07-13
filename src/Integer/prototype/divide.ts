/**
 * Divides the integer by some other number.
 *
 * @param {Integer|Rational|number|Complex} divisor - The divisor
 * @return {Integer|Rational|number|Complex}
 */
divide(divisor) {
	var divrem;

	if (divisor.type !== 'integer') {
		return MathLib.divide.apply(null, MathLib.coerce(this, divisor));
	}
	else {
		divrem = this.divrem(divisor);

		if (divrem[1].isZero()) {
			return divrem[0];
		}

		return new MathLib.Rational(this, divisor);
	}
}
