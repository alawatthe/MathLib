test('.conjugate()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).conjugate(),
			pn = (new MathLib.Complex(+0, -0)).conjugate(),
			np = (new MathLib.Complex(-0, +0)).conjugate(),
			nn = (new MathLib.Complex(-0, -0)).conjugate();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).conjugate().re));
	equal((new MathLib.Complex(Infinity)).conjugate().re, Infinity);

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isNegZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isPosZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isNegZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isPosZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).conjugate(), new MathLib.Complex(1, -2)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).conjugate(), new MathLib.Complex(-3, -4)));
});