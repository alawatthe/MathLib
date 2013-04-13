test('.toLaTeX', 8, function () {
	equal(MathLib.Expression.parse('123.456E-7').toLaTeX(), '123.456E-7', '("123.456E-7").toLaTeX()');
	equal(MathLib.Expression.parse('1+2').toLaTeX(), '1+2', '("1+2").toLaTeX()');
	equal(MathLib.Expression.parse('(1+2)*3').toLaTeX(), '\\left(1+2\\right)\\cdot3', '("(1+2)*3").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)').toLaTeX(), '\\sin\\left(1\\right)', '("sin(1)").toLaTeX()');
	equal(MathLib.Expression.parse('exp(1)').toLaTeX(), 'e^{1}', '("exp(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sqrt(1)').toLaTeX(), '\\sqrt{1}', '("sqrt(1)").toLaTeX()');
	equal(MathLib.Expression.parse('arsinh(1)').toLaTeX(), '\\operatorname{arsinh}\\left(1\\right)', '("arsinh(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toLaTeX(), '\\sin\\left(1\\right)+\\cos\\left(e^{2}\\cdot3\\right)', '("sin(1)+cos(exp(2)*3)").toLaTeX()');
});