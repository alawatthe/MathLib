test('.isEqual()', 3, function () {
	var point1 = new MathLib.Point([3, 2, 1]),
			point2 = new MathLib.Point([6, 4, 2]),
			point3 = new MathLib.Point([1, 1, 1]),
			point4 = new MathLib.Point([1, 1, 1, 1]);

	equal(point1.isEqual(point2), true, '.isEqual()');
	equal(point1.isEqual(point3), false, '.isEqual()');
	equal(point3.isEqual(point4), false, '.isEqual()');
});