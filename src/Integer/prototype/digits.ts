/**
 * Returns the digits of the integer in a given base
 *
 * @param {number} [base=10] - The base
 * @return {number[]}
 */
digits(base = 10) : number[] {
	var div, rem, temp,
			factor = new MathLib.Integer(base),
			n = this.abs(),
			digits = [];

	if (n.isZero()) {
		return [0];
	}
	else {
		while (!n.isZero()) {
			temp = n.divrem(factor);
			div = temp[0];
			rem = temp[1];

			digits.unshift(rem.data[0]);
			n = div;
		}
	}

	return digits;
}
