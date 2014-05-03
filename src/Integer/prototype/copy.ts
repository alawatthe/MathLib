/**
 * Copy the integer
 *
 * @return {Integer}
 */
copy() : Integer {
	return new MathLib.Integer(this.data, {sign: this.sign});
}