/**
 * Raises the integer to a certain power.
 *
 * @param {Integer|Rational|number|Complex} exponent - The exponent
 * @return {Integer|Rational}
 */
pow(exponent) : any {
	var powInt, result;

	if (exponent.type !== 'integer') {
		return MathLib.pow.apply(null, MathLib.coerce(this, exponent));
	}
	else {
		powInt = function (b, e) {

			var res, i,
					half = [],
					carry = 0;

			if (e.data.length === 1 && e.data[0] === 1) {
				return b;
			}

			for (i = e.data.length - 1; i >= 0; i--) {

				half[i] = Math.floor(e.data[i] / 2) + carry;

				if (e.data[i] % 2) {
					carry = 5e6;
				}
				else {
					carry = 0;
				}
			}

			res = powInt(b, new MathLib.Integer(half));
			res = res.times(res);

			if (e.data[0] % 2) {
				res = res.times(b);
			}

			return res;
		};

		if (exponent.isZero()) {
			return new MathLib.Integer(1);
		}

		result = powInt(this, exponent);

		if (exponent.sign === '-') {
			return new MathLib.Rational(new MathLib.Integer('1'), result);
		}

		return result;

	}
}
