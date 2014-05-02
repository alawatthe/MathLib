/**
 * Determines if two vectors are equal
 *
 * @param {Vector} v The vector to compare  
 * @return {boolean}
 */
isEqual(v : Vector) : boolean {
	if (this.length !== v.length) {
		return false;
	}

	return this.every(function (x, i) {
		return MathLib.isEqual(x, v[i]);
	});
}