test('.arcsin()', 24, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcsin(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcsin(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcsin(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcsin(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsin(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsin(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsin(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsin(),
			p1p0 = (new MathLib.Complex(1, +0)).arcsin(),
			p1n0 = (new MathLib.Complex(1, -0)).arcsin(),
			p2p0 = (new MathLib.Complex(2, +0)).arcsin(),
			p2n0 = (new MathLib.Complex(2, -0)).arcsin();


	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsin().re));
	equal((new MathLib.Complex(Infinity)).arcsin().re, Infinity);


	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-1.5707963267948966192, +1.3169578969248167086)));
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-1.5707963267948966192, -1.3169578969248167086)));

	ok(MathLib.isEqual(n1p0.re, -1.5707963267948966192));
	ok(MathLib.isPosZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, -1.5707963267948966192));
	ok(MathLib.isNegZero(n1n0.im));

	ok(MathLib.isPosZero(p0p0.re));
	ok(MathLib.isPosZero(p0p0.im));
	ok(MathLib.isPosZero(p0n0.re));
	ok(MathLib.isNegZero(p0n0.im));
	ok(MathLib.isNegZero(n0p0.re));
	ok(MathLib.isPosZero(n0p0.im));
	ok(MathLib.isNegZero(n0n0.re));
	ok(MathLib.isNegZero(n0n0.im));

	ok(MathLib.isEqual(p1p0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(p1p0.im));
	ok(MathLib.isEqual(p1n0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(p1n0.im));

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(1.5707963267948966192, +1.3169578969248167086)));
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(1.5707963267948966192, -1.3169578969248167086)));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsin(), new MathLib.Complex(0.4270785863924761255, 1.5285709194809981613)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsin(), new MathLib.Complex(-0.6339838656391767163, 2.3055090312434769420)));
});