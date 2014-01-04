/**
 * Compares two rational numbers
 *
 * @param {Rational} rational The number to compare  
 * @return {number}
 */
compare(rational : Rational) : number {
	return MathLib.sign(this.numerator * rational.denominator - this.denominator * rational.numerator);
}