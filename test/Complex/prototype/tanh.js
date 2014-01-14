test('.tanh()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).tanh(),
			pn = (new MathLib.Complex(+0, -0)).tanh(),
			np = (new MathLib.Complex(-0, +0)).tanh(),
			nn = (new MathLib.Complex(-0, -0)).tanh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).tanh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).tanh().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).tanh(), new MathLib.Complex(1.16673625724091988181, -0.24345820118572525270)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).tanh(), new MathLib.Complex(-1.00070953606723293933, 0.00490825806749606026)));
});