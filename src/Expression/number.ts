/**
 * Constructs a number expression.
 *
 * @param {String} n The number to generate an expression from
 * @return {Expression}
 */
static number(n : String) : Expression {
	return new MathLib.Expression({
		subtype: 'number',
		value: n
	});
}