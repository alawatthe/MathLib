test('.copy()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).copy(),
			pn = (new MathLib.Complex(+0, -0)).copy(),
			np = (new MathLib.Complex(-0, +0)).copy(),
			nn = (new MathLib.Complex(-0, -0)).copy();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).copy().re));
	equal((new MathLib.Complex(Infinity)).copy().re, Infinity);

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).copy(), new MathLib.Complex(1, 2)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).copy(), new MathLib.Complex(-3, 4)));
});