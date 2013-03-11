// ### Matrix.prototype.trace()
// Calculating the trace of the matrix
//
// *@returns {number|complex}*
trace() {
	var trace = MathLib.plus.apply(null, this.diag());

	this.trace = function () {
		return trace;
	};
	return trace;
}