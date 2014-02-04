/**
 * Converts the polynomial to a functn
 *
 * @return {Functn}
 */
toFunctn() {
	var str = '', i, ii;
	for (i = 0, ii = this.deg; i <= ii; i++) {
		if (!MathLib.isZero(this[i])) {
			if (i === 0) {
				str += MathLib.toString(this[i]);
			}
			else {
				str += MathLib.toString(this[i], {sign: true});
			}

			if (i > 1) {
				str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
			}
			else if (i === 1) {
				str += ' * x';
			}
		}
	}

	return MathLib.Functn(new Function('x', 'return ' + str), {
		expression: this.toExpression()
	});
}