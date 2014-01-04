/**
 * Returns the negative matrix
 *
 * @return {Matrix}
 */
negative() {
	var i, ii,
			negative = [];
			
	for (i = 0, ii = this.rows; i < ii; i++) {
		negative.push(this[i].map(MathLib.negative));
	}
	return new MathLib.Matrix(negative);
}