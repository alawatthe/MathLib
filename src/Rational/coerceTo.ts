/**
 * Coerces the rational to some other data type
 *
 * @return {Integer|Rational|number|Complex}
 */
coerceTo(type) : any {
	if (type === 'rational') {
		if (this.denominator === 1) {
			return new MathLib.Integer(this.numerator);
		}
		// TODO: coercion error
	}	
	
	if (type === 'rational') {
		return this.copy();
	}
	
	if (type === 'number') {
		return this.numerator / this.denominator;
	}
	
	if (type === 'complex') {
//		return new MathLib.Complex(this, new MathLib.Rational(0));
		return new MathLib.Complex(this, 0);
	}
}