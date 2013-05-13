test('.compare()', 3, function () {
	var c1 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c2 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c3 = new MathLib.Circle(new MathLib.Point(1, 2), 2),
			c4 = new MathLib.Circle(new MathLib.Point(2, 2), 3);

	equal(c1.compare(c2), 0, '.compare()');
	equal(c1.compare(c3), 1, '.compare()');
	equal(c1.compare(c4), -1, '.compare()');
});