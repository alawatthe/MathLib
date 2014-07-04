/**
 * Compares two complex numbers
 *
 * @param {Complex} x The complex number to compare the current number to
 * @return {number}
 */
compare(x : Complex) : number {
	var a = MathLib.sign(this.abs() - x.abs());

	if (MathLib.isNaN(this.re)) {
		if (MathLib.isNaN(x.re)) {
			return 0;
		}
		return -1;
	}

	if (this.re === Infinity) {
		if (x.re === Infinity) {
			return 0;
		}
		return 1;
	}

	return a ? a : MathLib.sign(this.arg() - x.arg());
}