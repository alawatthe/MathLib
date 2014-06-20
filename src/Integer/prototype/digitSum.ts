/**
 * Calculates the digit sum to a given base
 *
 * @param {number} [base=10] - The base
 * @return {Integer}
 */
digitSum(base = 10) : Integer {
	return new MathLib.Integer(this.digits(base).reduce((x, y) => x + y));
}
