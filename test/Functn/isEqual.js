test('.isEqual()', 10, function () {
	equal(MathLib.isEqual(), true);
	equal(MathLib.isEqual([]), true);
	equal(MathLib.isEqual(1), true);
	equal(MathLib.isEqual([1]), true);
	equal(MathLib.isEqual(1, 1), true);
	equal(MathLib.isEqual([1, 1]), true);
	equal(MathLib.isEqual(1, 2), false);
	equal(MathLib.isEqual([1, 2]), false);
	equal(MathLib.isEqual(new MathLib.Complex(1, 2), new MathLib.Complex(1, 2)), true);
	equal(MathLib.isEqual(new MathLib.Complex(1, 2), new MathLib.Complex(1, 3)), false);
});