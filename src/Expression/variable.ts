/**
 * Constructs a variable expression.
 *
 * @param {string} n - The variable to generate an expression from
 * @return {Expression}
 */
static variable(n : string) : Expression {
	return new MathLib.Expression({
		subtype: 'variable',
		value: n
	});
}