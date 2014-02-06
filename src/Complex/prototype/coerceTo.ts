/**
 * Coerces the complex number to some other data type
 *
 * @return {Rational|number|Complex}
 */
coerceTo(type) {

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