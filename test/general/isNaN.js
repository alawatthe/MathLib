test('.isNaN()', 2, function () {
	equal(MathLib.isNaN(NaN), true);
	equal(MathLib.isNaN(2), false);
});