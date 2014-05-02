/**
 * Calculating the trace of the matrix
 *
 * @return {number|Complex}
 */
trace() {
	var trace = MathLib.plus.apply(null, this.diag());

	this.trace = function () {
		return trace;
	};
	return trace;
}