/**
 * Coerces the integer to some other data type
 *
 * @param {string} type The type to coerce the integer into
 * @return {Integer|Rational|number|Complex}
 */
coerceTo(type : string) {
	var num;

	if (type === 'integer') {
		return this.copy();
	}
	else if (type === 'rational') {
		return new MathLib.Rational(this, 1);
	}
	else if (type === 'complex') {
		return new MathLib.Complex(this, 0);
	}
	else if (type === 'number') {
		// TODO: Warn when the number is bigger that 2^53
		num = this.data.reduce(function (old, cur, i) {
			return old + cur * Math.pow(1e7, i);
		}, 0);

		if (this.sign === '-') {
			num = -num;
		}

		return num;
	}
	else {
		throw new MathLib.CoercionError('Cannot coerce the integer to "' + type + '".', {
			method: 'Integer.prototype.coerceTo'
		});
	}
}
