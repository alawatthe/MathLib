test('.cosh()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cosh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cosh().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cosh(), new MathLib.Complex(-0.64214812471551996484, 1.06860742138277833960)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cosh(), new MathLib.Complex(-6.5806630405511564326, 7.5815527427465443537)));
});