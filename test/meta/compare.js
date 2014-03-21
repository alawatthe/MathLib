test('.compare()', 3, function () {
	equal(MathLib.compare(12, 12), 0);
	equal(MathLib.compare(1, 2), -1);
	equal(MathLib.compare(23, new MathLib.Complex(3, 4)), 1);
});