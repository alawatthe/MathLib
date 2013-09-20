// ### Expression.variable
// Constructs a variable expression.
//
// *@return {Expression}*
static variable(n) : Expression {
	return new MathLib.Expression({
		subtype: 'variable',
		value: n
	});
}