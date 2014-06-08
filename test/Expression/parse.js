test('.parse (Number)', 11, function () {
	equal(MathLib.Expression.parse('123').value, 123, '.parse("123")');
	equal(MathLib.Expression.parse('123.').value, 123, '.parse("123.")');
	equal(MathLib.Expression.parse('.456').value, 0.456, '.parse(".456")');
	equal(MathLib.Expression.parse('123.456e7').value, 123.456e7, '.parse("123.456e7")');
	equal(MathLib.Expression.parse('123.456E7').value, 123.456E7, '.parse("123.456eE7")');
	equal(MathLib.Expression.parse('123.456e+7').value, 123.456e+7, '.parse("123.456e+7")');
	equal(MathLib.Expression.parse('123.456E+7').value, 123.456E+7, '.parse("123.456E+7")');
	equal(MathLib.Expression.parse('123.456e-7').value, 123.456e-7, '.parse("123.456e-7")');
	equal(MathLib.Expression.parse('123.456E-7').value, 123.456E-7, '.parse("123.456E-7")');

	var num = MathLib.Expression.parse('123');
	equal(num.type, 'expression');
	equal(num.subtype, 'number');
});


test('.parse (unaryOperator)', 4, function () {
	var unary = MathLib.Expression.parse('-12');
	equal(unary.subtype, 'unaryOperator');
	equal(unary.value, '-');

	equal(MathLib.Expression.parse('+12').evaluate(), +12, '.parse("12+34")');
	equal(MathLib.Expression.parse('-12').evaluate(), -12, '.parse("12*34")');
});


test('.parse (assignment)', 9, function () {
	MathLib.Expression.variables = {};

	var one = MathLib.Expression.parse('a := 1');
	var two = MathLib.Expression.parse('b := c := 2');

	equal(one.subtype, 'assignment');
	equal(one.value.value, 1);
	deepEqual(one.content, [MathLib.Expression.variable('a')]);

	equal(two.subtype, 'assignment');
	equal(two.value.value, 2);
	deepEqual(two.content, [MathLib.Expression.variable('b'), MathLib.Expression.variable('c')]);


	equal(MathLib.Expression.variables.a, undefined);
	equal(one.evaluate().value, 1);
	equal(MathLib.Expression.variables.a.value, 1);
});



test('.parse (binaryOperator)', 10, function () {
	equal(MathLib.Expression.parse('12+34').evaluate(), 12 + 34, '.parse("12+34")');
	equal(MathLib.Expression.parse('12*34').evaluate(), 12 * 34, '.parse("12*34")');

	equal(MathLib.Expression.parse('65-43-21').evaluate(), 65 - 43 - 21, '.parse("65-43-21")');


	equal(MathLib.Expression.parse('12*34+56').evaluate(), 12 * 34 + 56, '.parse("12*34+56")');
	equal(MathLib.Expression.parse('12+34*56').evaluate(), 12 + 34 * 56, '.parse("12+34*56")');
	equal(MathLib.Expression.parse('12*34/6').evaluate(), 12 * 34 / 6, '.parse("12*34/6")');
	equal(MathLib.Expression.parse('12/3*4').evaluate(), 12 / 3 * 4, '.parse("12/3*4")');
	equal(MathLib.Expression.parse('12/3/4').evaluate(), 12 / 3 / 4, '.parse("12/3/4")');
	equal(MathLib.Expression.parse('36/2/3/6').evaluate(), 36 / 2 / 3 / 6, '.parse("36/2/3/6")');
	equal(MathLib.Expression.parse('36/2/3/2/3').evaluate(), 36 / 2 / 3 / 2 / 3, '.parse("36/2/3/2/3")');
});



test('.parse (brackets)', 3, function () {
	var br = MathLib.Expression.parse('(1)');
	equal(br.subtype, 'brackets');
	equal(br.value, 'brackets');
	deepEqual(br.content.value, '1');
});


test('.parse (functionCall)', 3, function () {
	var fn = MathLib.Expression.parse('cos(1)');
	equal(fn.subtype, 'functionCall');
	equal(fn.value, 'cos');
	deepEqual(fn.content[0].value, '1');
});
