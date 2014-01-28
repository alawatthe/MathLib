/**
 * Multiplies a number to the current integer
 *
 * @param {Integer|Rational|number|Complex} n - The number to multiply
 * @return {Integer}
 */
times(n) : Integer {
	var i, ii, j, jj, temp,
			data = [],
			carry = 0,
			base = Math.pow(2, 26);

	if (n.type !== 'integer') {
		return MathLib.times(MathLib.coerce(this, n));
	}
	else {
		for (i = 0, ii = this.data.length; i < ii; i++) {
			for (j = 0, jj = n.data.length; j < jj; j++) {
				if (data[i + j] === undefined) {
					data[i + j] = this.data[i] * n.data[j];
				}
				else {
					data[i + j] += this.data[i] * n.data[j];
				}
			}
		}

		for (i = 0, ii = this.data.length + n.data.length - 1; i < ii; i++) {
			temp = data[i] + carry;
			carry = Math.floor(temp / base);
			data[i] = temp % base;
		}
		data[i] = carry;

		return new MathLib.Integer(data, {sign: this.sign === n.sign ? '+' : '-'});
	}
}