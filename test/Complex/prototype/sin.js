test('.sin()', 11, function () {
	var pp = (new MathLib.Complex(+0, +0)).sin(),
			pn = (new MathLib.Complex(+0, -0)).sin(),
			np = (new MathLib.Complex(-0, +0)).sin(),
			nn = (new MathLib.Complex(-0, -0)).sin();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sin().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sin().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sin(), new MathLib.Complex(3.1657785132161674, 1.959601041421606)));
});