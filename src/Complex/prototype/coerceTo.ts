/**
 * Coerces the complex number to some other data type
 *
 * @return {Rational|number|Complex}
 */
coerceTo(type) {

	if (type === 'complex') {
		return this.copy();
	}

	if (this.im !== 0) {
		// TODO: coercion error
	}
	else {
		/*
		if (type === 'integer') {
			return new MathLib.Integer(this.re);
		}
		if (type === 'rational') {
			return new MathLib.Rational(this.re);
		}
		*/
	
		if (type === 'number') {
			return MathLib.coerceTo(this.re, 'number');
		}
	}
}