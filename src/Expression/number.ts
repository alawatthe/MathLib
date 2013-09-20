// ### Expression.number
// Constructs a number expression.
//
// *@return {Expression}*
static number(n) : Expression {
	return new MathLib.Expression({
		subtype: 'number',
		value: n
	});
}