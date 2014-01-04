/**
 * Determines if the matrix is a identity matrix.
 *
 * @return {boolean}
 */
isIdentity() : boolean {
	if (!this.isSquare()) {
		return false;
	}

	var isIdentity = this.every(function (x, r, c) {
		return r === c ? MathLib.isOne(x) : MathLib.isZero(x);
	});

	this.isIdentity = function () {
		return isIdentity;
	};
	return isIdentity;
}