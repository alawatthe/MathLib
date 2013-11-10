test('.coth()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).coth().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).coth().re));

	equal((new MathLib.Complex(0)).coth().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).coth(), new MathLib.Complex(0.82132979749385168671, 0.17138361290918501441)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).coth(), new MathLib.Complex(-0.99926692780590154452, -0.00490118239430447336)));
});