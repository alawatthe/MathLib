test('.isInt()', 2, function () {
	equal(MathLib.isInt(2), true);
	equal(MathLib.isInt(2.5), false);
});