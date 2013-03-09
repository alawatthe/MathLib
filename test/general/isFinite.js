test('.isFinite()', 4, function () {
	equal(MathLib.isFinite(2), true);
	equal(MathLib.isFinite(NaN), false);
	equal(MathLib.isFinite(+Infinity), false);
	equal(MathLib.isFinite(-Infinity), false);
});