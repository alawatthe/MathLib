test('.cos()', 3, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cos().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cos().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cos(), new MathLib.Complex(2.0327230070196655294, -3.0518977991518000575)));
});