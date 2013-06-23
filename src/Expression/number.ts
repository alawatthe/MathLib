// ### <a href="http://mathlib.de/en/docs/Expression/number">Expression.number</a>
// Constructs a number expression.
//
// *@return {Expression}*
static number(n) : Expression {
	return new MathLib.Expression({
		subtype: 'number',
		value: n
	});
}