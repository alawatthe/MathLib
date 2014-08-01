/**
 * Coerces the complex number to some other data type
 *
 * @param {string} type The type to coerce the complex number into
 * @return {Rational|number|Complex}
 */
coerceTo(type : string) {

	if (type === 'complex') {
		return this.copy();
	}

	if (MathLib.isZero(this.im)) {
		return MathLib.coerceTo(this.re, type);
	}
	else {
		if (type === 'integer') {
			throw new MathLib.CoercionError('Cannot coerce the complex number to an integer, since the imaginary part is not zero.', {
				method: 'Complex.prototype.coerceTo'
			});
		}
		else if (type === 'rational') {
			throw new MathLib.CoercionError('Cannot coerce the complex number to a rational number, since the imaginary part is not zero.', {
				method: 'Complex.prototype.coerceTo'
			});
		}
		else if (type === 'number') {
			throw new MathLib.CoercionError('Cannot coerce the complex number to a number, since the imaginary part is not zero.', {
				method: 'Complex.prototype.coerceTo'
			});
		}
		else {
			throw new MathLib.CoercionError('Cannot coerce the complex number to "' + type + '".', {
				method: 'Complex.prototype.coerceTo'
			});
		}
	}
}
