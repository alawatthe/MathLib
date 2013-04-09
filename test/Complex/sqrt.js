test('.sqrt()', 3, function () {
	ok(MathLib.isEqual((new MathLib.Complex(0, 2)).sqrt(), new MathLib.Complex(1, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, 0)).sqrt(), new MathLib.Complex(0, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, -0)).sqrt(), new MathLib.Complex(0, -1)));
});