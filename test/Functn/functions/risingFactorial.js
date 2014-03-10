test('.risingFactorial()', 3, function () {
	equal(MathLib.risingFactorial(2, 0), 1);
	equal(MathLib.risingFactorial(2, 3), 24);
	equal(MathLib.risingFactorial(3, 4, 0.5), 189);
});