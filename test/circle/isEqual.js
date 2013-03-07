test('.isEqual()', 3, function () {
	var c1 = new MathLib.Circle(new MathLib.Point(1, 2), 2),
			c2 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c3 = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2),
			c4 = new MathLib.Circle(new MathLib.Point(2, 3), 2);

	equal(c1.isEqual(c3), true, '.isEqual()');
	equal(c1.isEqual(c2), false, '.isEqual() different radius');
	equal(c1.isEqual(c4), false, '.isEqual() different center');
});