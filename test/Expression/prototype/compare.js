test('.compare()', 3, function () {
	var e1 = new MathLib.Expression('sin(42)'),
			e2 = new MathLib.Expression('sin(42)'),
			e3 = new MathLib.Expression('cos(42)'),
			e4 = new MathLib.Expression('tan(42)');
	equal(e1.compare(e2), 0, '.compare()');
	equal(e1.compare(e3), 1, '.compare()');
	equal(e1.compare(e4), -1,  '.compare()');
});