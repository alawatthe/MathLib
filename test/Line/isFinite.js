test('.isFinite()', 2, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([0, 0, 1]);

	equal(line1.isFinite(), true, '.isFinite()');
	equal(line2.isFinite(), false, '.isFinite()');
});