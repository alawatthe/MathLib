/**
 * Checks if the integer is a unit in the ring of integers or not
 *
 * @return {boolean}
 */
isUnit() : boolean {
	var i, ii;

	for (i = 1, ii = this.data.length; i < ii; i++) {
		if (this.data[i] !== 0) {
			return false;
		}
	}

	if (this.data[0] === 1) {
		return true;
	}

	return false;
}
