/**
 * Copies the Expression
 * @return {Expression} The copied expression
 */
copy () : Expression {
	return this.map(function (x) {
		return x;
	});
}