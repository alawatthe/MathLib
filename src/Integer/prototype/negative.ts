/**
 * Calculates the negative integer
 *
 * @return {Integer}
 */
negative() : Integer {
	return new MathLib.Integer(this.data, {sign: this.sign === '-' ? '+' : '-'});
}