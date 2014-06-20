test('.toString', 14, function () {
	equal(MathLib.Expression.parse('123.456E-7').toString(), '123.456E-7', '("123.456E-7").toString()');
	equal(MathLib.Expression.parse('1+2').toString(), '1+2', '("1+2").toString()');
	equal(MathLib.Expression.parse('(1+2)*3').toString(), '(1+2)*3', '("(1+2)*3").toString()');
	equal(MathLib.Expression.parse('2-3-4').toString(), '2-3-4', '("2-3-4").toString()');
	equal(MathLib.Expression.parse('2/3/4').toString(), '2/3/4', '("2/3/4").toString()');
	equal(MathLib.Expression.parse('2^3^4').toString(), '2^3^4', '("2^3^4").toString()');
	equal(MathLib.Expression.parse('sin(1)').toString(), 'sin(1)', '("sin(1)").toString()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toString(),
		'sin(1)+cos(exp(2)*3)', '("sin(1)+cos(exp(2)*3)").toString()');
	equal(MathLib.Expression.parse('a := 1').toString(), 'a := 1');
	equal(MathLib.Expression.parse('b := c := 2').toString(), 'b := c := 2');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn type="complex-cartesian">2<sep/>3</cn></math>').toString(), '2+3i', '.toString() complex');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn type="rational">3<sep/>4</cn></math>').toString(), '3/4', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toString(), '{1, 2, 3}', '.toString() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toString(), '(1, 2, 3)', 'toString() vector');
});