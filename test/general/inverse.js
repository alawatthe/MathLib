test('.inverse()', 2, function () {
	equal(MathLib.inverse(2), 0.5, 'MathLib.inverse(2) should be 0.5');
	equal(MathLib.isNaN(MathLib.inverse(NaN)), true, 'MathLib.inverse(NaN) should be NaN');
});