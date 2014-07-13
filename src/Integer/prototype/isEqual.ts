/**
 * Checks if the current integer is equal to some other number
 *
 * @param {any} n The number to check
 * @return {boolean}
 */
isEqual(n) : boolean {
	var i, ii;

	if (n.type !== 'integer') {
		return MathLib.isEqual(MathLib.coerce(this, n));
	}
	else {
		if (this.sign !== n.sign) {
			if (this.isZero() && n.isZero()) {
				return true;
			}
			return false;
		}

		if (this.data.length !== n.data.length) {
			return false;
		}

		for (i = 0, ii = this.data.length; i < ii; i++) {
			if (this.data[i] !== n.data[i]) {
				return false;
			}
		}

		return true;
	}
}
