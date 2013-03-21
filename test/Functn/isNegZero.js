test('.isNegZero()', 2, function () {
	equal(MathLib.isNegZero(-0), true);
	equal(MathLib.isNegZero(+0), false);
});