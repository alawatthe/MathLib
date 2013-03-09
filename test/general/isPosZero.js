test('.isPosZero()', 2, function () {
	equal(MathLib.isPosZero(+0), true);
	equal(MathLib.isPosZero(-0), false);
});