// ### [Conic.prototype.isEqual()](http://mathlib.de/en/docs/Conic/isEqual)
// Determines if two conics are equal.
//
// *@param {Conic}*  
// *@return {boolean}*
isEqual(c : Conic) : boolean {
	if (this === c) {
		return true;
	}

	var compare = function (M, N) {
		var i, j, m, n;

		if (M === N) {
			return true;
		}

		nonZeroSearch: for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				if (M[i][j] !== 0) {
					break nonZeroSearch;
				}
			}
		}

		if (N[i][j] === 0) {
			return false;
		}

		m = M[i][j];
		n = N[i][j];

		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				if (n / m * M[i][j] !== N[i][j]) {
					return false;
				}
			}
		}

		return true;
	}

	return compare(this.primal, c.primal) && compare(this.dual, c.dual);
}