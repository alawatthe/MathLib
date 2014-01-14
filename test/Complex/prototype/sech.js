test('.sech()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sech().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sech().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sech(), new MathLib.Complex(-0.41314934426694000946, -0.68752743865547898158)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sech(), new MathLib.Complex(-0.065294027857947046445, -0.075224960302773226866)));
});