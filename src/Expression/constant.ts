// ### Expression.constant
// Constructs a constant expression.
//
// *@return {Expression}*
static constant(n) : Expression {
	return new MathLib.Expression({
		subtype: 'constant',
		value: n
	});
}