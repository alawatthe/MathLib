/**
 * Calculates the factorial of the integer
 *
 * @return {Integer}
 */
factorial() : RingElement {
	if (this.isZero()) {
		return new MathLib.Integer('1');
	}

	if (this.sign === '-') {
		return new MathLib.Complex(Infinity);
	}

	var factorial = this,
			n = this.minus(new MathLib.Integer('1'));

	while (!n.isZero()) {
		factorial = factorial.times(n);
		n = n.minus(new MathLib.Integer('1'));
	}

	return factorial ;
}
