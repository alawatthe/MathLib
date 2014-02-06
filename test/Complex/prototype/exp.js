test('.exp()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).exp(),
			pn = (new MathLib.Complex(+0, -0)).exp(),
			np = (new MathLib.Complex(-0, +0)).exp(),
			nn = (new MathLib.Complex(-0, -0)).exp();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).exp().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).exp().re));

	equal(pp.re, 1, '(+0 +0i).exp().re = 1');
	ok(MathLib.isPosZero(pp.im), '(+0 +0i).exp().im = 0');

	equal(pn.re, 1, '(+0 -0i).exp().re = 1');
	ok(MathLib.isNegZero(pn.im), '(+0 -0i).exp().im = 0');

	equal(np.re, 1, '(-0 +0i).exp().re = 1');
	ok(MathLib.isPosZero(np.im), '(-0 +0i).exp().im = 0');

	equal(nn.re, 1, '(-0 -0i).exp().re = 1');
	ok(MathLib.isNegZero(nn.im), '(-0 -0i).exp().im = 0');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).exp(), new MathLib.Complex(-1.1312043837568136384, 2.4717266720048189276)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).exp(), new MathLib.Complex(-0.032542999640154784794, -0.037678977574865854771)));
});