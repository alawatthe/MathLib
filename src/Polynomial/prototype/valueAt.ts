/**
 * Evaluates the polynomial at a given point
 *
 * @param {number|Complex|Matrix} x The value to evaluate the polynomial at.
 * @return {number|Complex|Matrix}
 */
valueAt(x) {
	// TODO: warn if x is non square matrix
	var pot = MathLib.is(x, 'matrix') ? (<any>MathLib.Matrix.identity(x.rows)) : (<any>1),
			value = MathLib.is(x, 'matrix') ? (<any>MathLib.Matrix.zero(x.rows, x.cols)) : (<any>0),
			i, ii;

	for (i = 0, ii = this.deg; i <= ii; i++) {
		value = MathLib.plus(value, MathLib.times(this[i], pot));
		pot = MathLib.times(pot, x);
	}
	return value;
}
