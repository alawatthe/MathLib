/**
 * Coerces the integer to some other data type
 *
 * @return {Integer|Rational|number|Complex}
 */
coerceTo(type) {
	var num;

	if (type === 'integer') {
		return this.copy();
	}
	
	if (type === 'rational') {
		return new MathLib.Rational(this, 1);
	}
	
	if (type === 'number') {
		//TODO Warn when the number is bigger that 2^53
		num = this.data.reduce(function (old, cur, i) {
			return old + cur * Math.pow(1e7, i);
		}, 0);
		
		if (this.sign === '-') {
			num = -num;
		}
		
		return num;
	}
	
	if (type === 'complex') {
		return new MathLib.Complex(this, 0);
	}
}