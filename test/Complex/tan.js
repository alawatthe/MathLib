test('.tan()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).tan(),
			pn = (new MathLib.Complex(+0, -0)).tan(),
			np = (new MathLib.Complex(-0, +0)).tan(),
			nn = (new MathLib.Complex(-0, -0)).tan();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).tan().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).tan().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).tan(), new MathLib.Complex(0.033812826079896690284, 1.0147936161466335681)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).tan(), new MathLib.Complex(0.00018734620462947843, 0.99935598738147314139)));
});