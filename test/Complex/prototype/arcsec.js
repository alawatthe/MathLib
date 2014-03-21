test('.arcsec()', 17, function () {
	var n1p0 = (new MathLib.Complex(-1, +0)).arcsec(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcsec(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsec(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsec(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsec(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsec(),
			p1p0 = (new MathLib.Complex(1, +0)).arcsec(),
			p1n0 = (new MathLib.Complex(1, -0)).arcsec();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsec().re));
	ok(MathLib.isEqual((new MathLib.Complex(Infinity)).arcsec().re, Math.PI / 2));
	ok(MathLib.isNegZero((new MathLib.Complex(Infinity)).arcsec().im));


	ok(MathLib.isEqual(n1p0.re, Math.PI));
	ok(MathLib.isPosZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, Math.PI));
	ok(MathLib.isNegZero(n1n0.im), 'arcsec(-1 -0i).im = -0');


	equal(p0p0.re, Infinity, 'arcsec(+0+0i) = ∞');
	equal(p0n0.re, Infinity, 'arcsec(+0-0i) = ∞');
	equal(n0p0.re, Infinity, 'arcsec(-0+0i) = ∞');
	equal(n0n0.re, Infinity, 'arcsec(-0-0i) = ∞');


	ok(MathLib.isPosZero(p1p0.re));
	ok(MathLib.isPosZero(p1p0.im));
	ok(MathLib.isPosZero(p1n0.re));
	ok(MathLib.isNegZero(p1n0.im));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsec(), new MathLib.Complex(1.3844782726870810934, 0.3965682301123289789)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsec(), new MathLib.Complex(1.6895470581023083734, 0.1604455337745049324)));
});