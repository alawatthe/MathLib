test('.sqrt()', 6, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sqrt().re));
	equal((new MathLib.Complex(Infinity)).sqrt().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(0, 0)).sqrt(), new MathLib.Complex(0, 0)));
	ok(MathLib.isEqual((new MathLib.Complex(0, 2)).sqrt(), new MathLib.Complex(1, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, 0)).sqrt(), new MathLib.Complex(0, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, -0)).sqrt(), new MathLib.Complex(0, -1)));
});