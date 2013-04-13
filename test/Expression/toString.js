test('.toString', 5, function () {
	equal(MathLib.Expression.parse('123.456E-7').toString(), '123.456E-7', '("123.456E-7").toString()');
	equal(MathLib.Expression.parse('1+2').toString(), '1+2', '("1+2").toString()');
	equal(MathLib.Expression.parse('(1+2)*3').toString(), '(1+2)*3', '("(1+2)*3").toString()');
	equal(MathLib.Expression.parse('sin(1)').toString(), 'sin(1)', '("sin(1)").toString()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toString(), 'sin(1)+cos(exp(2)*3)', '("sin(1)+cos(exp(2)*3)").toString()');
});