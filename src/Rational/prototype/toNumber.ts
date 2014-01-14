/**
 * Returns the number represented by the rational number
 *
 * @deprecated Use .coerceTo('number') instead
 * @return {number}
 */
toNumber() : number {
	console.warn('Rational.prototype.toNumber() is deprecated. Use Rational.prototype.coerceTo("number") instead.');
	return this.numerator / this.denominator;
}