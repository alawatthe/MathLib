/**
 * Compares two expressions
 *
 * @param {Expression} expr The expression to compare  
 * @return {number}
 */
compare(expr : Expression) : number {
	return MathLib.sign(this.toString().localeCompare(expr.toString()));
}