test('.negative()', 11, function () {
	var pp = (new MathLib.Complex(+0, +0)).negative(),
			pn = (new MathLib.Complex(+0, -0)).negative(),
			np = (new MathLib.Complex(-0, +0)).negative(),
			nn = (new MathLib.Complex(-0, -0)).negative();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).negative().re));
	equal((new MathLib.Complex(Infinity)).negative().re, Infinity);

	ok(MathLib.isNegZero(pp.re));
	ok(MathLib.isNegZero(pp.im));

	ok(MathLib.isNegZero(pn.re));
	ok(MathLib.isPosZero(pn.im));

	ok(MathLib.isPosZero(np.re));
	ok(MathLib.isNegZero(np.im));

	ok(MathLib.isPosZero(nn.re));
	ok(MathLib.isPosZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).negative(), new MathLib.Complex(3, -4)));
});