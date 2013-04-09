test('.sin()', 1, function () {
	ok(MathLib.isEqual(MathLib.sin(new MathLib.Complex(1, 2)), new MathLib.Complex(3.1657785132161674, 1.959601041421606)));
});