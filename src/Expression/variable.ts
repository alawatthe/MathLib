/**
 * Constructs a variable expression.
 *
 * @param {String} n The variable to generate an expression from
 * @return {Expression}
 */
static variable(n) : Expression {
	return new MathLib.Expression({
		subtype: 'variable',
		value: n
	});
}