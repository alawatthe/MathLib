/**
 * Coerces the rational number to some other data type
 *
 * @param {string} type The type to coerce the rational number into
 * @return {Integer|Rational|number|Complex}
 */
coerceTo(type : string) : any {
	if (type === 'integer') {
		if (this.denominator === 1) {
			return new MathLib.Integer(this.numerator);
		}
		throw new MathLib.CoercionError('Cannot coerce the rational number to an integer, since the denominator is not 1.', {
			method: 'Rational.prototype.coerceTo'
		});
	}
	else if (type === 'rational') {
		return this.copy();
	}
	else if (type === 'complex') {
		// return new MathLib.Complex(this, new MathLib.Rational(0));
		return new MathLib.Complex(this, 0);
	}
	else if (type === 'number') {
		return this.numerator / this.denominator;
	}
	else {
		throw new MathLib.CoercionError('Cannot coerce the rational number to "' + type + '".', {
			method: 'Rational.prototype.coerceTo'
		});
	}
}
