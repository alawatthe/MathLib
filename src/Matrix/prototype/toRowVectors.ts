/**
 * Converts the rows of the matrix to vectors
 *
 * @return {array}
 */
toRowVectors() : string {
	return this.toArray().map(function (v) {
		return new MathLib.Vector(v);
	});
}