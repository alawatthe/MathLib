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

	// Chrome implemented sin, cos & tan in a new way:
	// https://codereview.chromium.org/70003004/
	// While the new implementation is faster, it is also not acurate.
	// I expect the bug to be fixed soon and it isn't causing major problems,
	// I will only modify the test now and not the code.
	// Affected tests:
	// Complex.polar, Complex#cosh, Complex#sinh
	//
	// More information:
	// https://code.google.com/p/v8/issues/detail?id=3006
	if (Math.cos(-5) === 0.2836621854632259) {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sinh(), new MathLib.Complex(6.5481200409109945, -7.619231720321402)));
	}
	else {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sinh(), new MathLib.Complex(6.5481200409110016478, -7.6192317203214102085)));
	}
});