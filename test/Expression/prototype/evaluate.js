test('.evaluate()', 1, function () {
	MathLib.Expression.parse('a := 3').evaluate();
	equal((new MathLib.Expression('a+2')).evaluate(), 5);
});
