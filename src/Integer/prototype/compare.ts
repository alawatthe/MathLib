/**
 * Compares the integer
 *
 * @return {Integer}
 */
compare(n : Integer) : number {
	var i;
	if (this.sign !== n.sign) {
		if (this.isZero() && n.isZero()) {
			return 0;
		}
		if (this.sign === '+') {
			return 1;
		}
		return -1;
	}

	if (this.data.length !== n.data.length) {
		if (this.sign === '+') {
			return MathLib.sign(this.data.length - n.data.length);
		}
		else {
			return MathLib.sign(n.data.length - this.data.length);
		}
	}
	else {
		for (i = this.data.length - 1; i >= 0; i--) {
			if (this.data[i] !== n.data[i]) {
				if (this.sign === '+') {
					return MathLib.sign(this.data[i] - n.data[i]);
				}
				else {
					return MathLib.sign(n.data[i] - this.data[i]);
				}
			}
		}
		return 0;
	}
}