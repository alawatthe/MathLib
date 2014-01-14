/**
 * Calculates the absolute value of the integer
 *
 * @return {Integer}
 */
abs() : Integer {
	return new MathLib.Integer(this.data, {sign: '+'});
}