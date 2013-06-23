// ### <a href="http://mathlib.de/en/docs/Expression/variable">Expression.variable</a>
// Constructs a variable expression.
//
// *@return {Expression}*
static variable(n) : Expression {
	return new MathLib.Expression({
		subtype: 'variable',
		value: n
	});
}