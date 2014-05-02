test('.isFinite()', 2, function () {
	var point1 = new MathLib.Point([3, 2, 1]),
			point2 = new MathLib.Point([6, 4, 0]);

	equal(point1.isFinite(), true, '.isFinite()');
	equal(point2.isFinite(), false, '.isFinite()');
});