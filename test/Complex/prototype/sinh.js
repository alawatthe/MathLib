test('.sinh()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).sinh(),
			pn = (new MathLib.Complex(+0, -0)).sinh(),
			np = (new MathLib.Complex(-0, +0)).sinh(),
			nn = (new MathLib.Complex(-0, -0)).sinh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sinh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sinh().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sinh(), new MathLib.Complex(-0.4890562590412936736, 1.4031192506220405880)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sinh(), new MathLib.Complex(6.5481200409110016478, -7.6192317203214102085)));
});