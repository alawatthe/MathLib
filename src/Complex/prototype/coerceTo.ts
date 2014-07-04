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

	if (this.im === 0) {
		return MathLib.coerceTo(this.re, type);
	}
	/*
	else {
		// TODO: coercion error
	}
	*/
}