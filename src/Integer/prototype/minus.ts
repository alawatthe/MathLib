/**
 * Subtracts a number from the current integer
 *
 * @param {Integer|Rational|number|Complex} n - The number to subtract
 * @return {Integer}
 */
minus(n) : Integer {
	var i, ii, temp, resPos, A, B,
			data = [],
			carry = 0,
			sign = '+',
			base = Math.pow(2, 26);

	if (n.type !== 'integer') {
		return MathLib.minus.apply(null, MathLib.coerce(this, n));
	}
	else {

		if (this.sign === '-') {
			if (n.sign === '-') {
				return n.negative().minus(this.negative());
			}
			else {
				temp = this.negative().plus(n);
				temp.sign = '-';
				return temp;
			}
		}
		else {
			if (n.sign === '-') {
				return this.plus(n.negative());
			}
		}


		if (this.data.length !== n.data.length) {
			resPos = this.data.length > n.data.length;

			while (this.data.length < n.data.length) {
				this.data.push(0);
			}
			while (this.data.length > n.data.length) {
				n.data.push(0);
			}
		}
		else {
			for (i = this.data.length - 1; i >= 0; i--) {
				if (this.data[i] !== n.data[i]) {
					resPos = this.data[i] > n.data[i];
					break;
				}
			}
			if (typeof resPos === 'undefined') {
				return new MathLib.Integer(0);
			}
		}

		if (resPos) {
			A = this;
			B = n;
			sign = '+';
		}
		else {
			A = n;
			B = this;
			sign = '-';
		}

		for (i = 0, ii = A.data.length; i < ii; i++) {
			temp = A.data[i] - B.data[i] + carry;
			carry = Math.floor(temp / base);
			data[i] = MathLib.mod(temp, base);
		}

		return new MathLib.Integer(data, {sign: sign});
	}
}