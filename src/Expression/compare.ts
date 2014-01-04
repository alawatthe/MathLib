/**
 * Compares two expressions
 *
 * @param {Expression} expr The expression to compare  
 * @return {number}
 */
compare(expr) {
	return MathLib.sign(this.toString().localeCompare(expr.toString()));
}