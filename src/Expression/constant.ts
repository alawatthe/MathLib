/**
 * Constructs a constant expression.
 *
 * @param {String} n The constant to generate an expression from
 * @return {Expression}
 */
static constant(n) : Expression {
	return new MathLib.Expression({
		subtype: 'constant',
		value: n
	});
}