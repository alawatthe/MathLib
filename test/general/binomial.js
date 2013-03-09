test('.binomial()', 4, function () {
	equal(MathLib.binomial(0, 0), 1);
	equal(MathLib.binomial(6, 3), 20);
	equal(MathLib.binomial(2, 4), 0);
	equal(MathLib.binomial(-4, 3), -20);
});