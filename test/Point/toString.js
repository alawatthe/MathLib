test('.toString()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);

	equal(point.toString(), '(3, 2)', '.toString()');
	equal(point.toString(true), '(3, 2, 1)', '.toString()');
});