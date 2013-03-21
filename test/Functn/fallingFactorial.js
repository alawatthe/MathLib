test('.fallingFactorial()', 4, function () {
	equal(MathLib.fallingFactorial(2, 0), 1);
	equal(MathLib.fallingFactorial(6, 3), 120);
	equal(MathLib.fallingFactorial(2, 4), 0);
	equal(MathLib.fallingFactorial(4, 3, 0.5), 4 * 3.5 * 3);
});