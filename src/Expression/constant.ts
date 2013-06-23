// ### <a href="http://mathlib.de/en/docs/Expression/constant">Expression.constant</a>
// Constructs a constant expression.
//
// *@return {Expression}*
static constant(n) : Expression {
	return new MathLib.Expression({
		subtype: 'constant',
		value: n
	});
}