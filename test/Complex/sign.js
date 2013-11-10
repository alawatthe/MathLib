test('.sign()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).sign(),
			pn = (new MathLib.Complex(+0, -0)).sign(),
			np = (new MathLib.Complex(-0, +0)).sign(),
			nn = (new MathLib.Complex(-0, -0)).sign();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sign().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sign().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok((new MathLib.Complex(2, -3)).sign().isEqual(MathLib.Complex.polar(1, Math.atan2(-3, 2))));
	ok((new MathLib.Complex(5, 6)).sign().isEqual(MathLib.Complex.polar(1, Math.atan2(6, 5))));
});