test('.arccos()', 26, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arccos(),
			n2n0 = (new MathLib.Complex(-2, -0)).arccos(),
			n1p0 = (new MathLib.Complex(-1, +0)).arccos(),
			n1n0 = (new MathLib.Complex(-1, -0)).arccos(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccos(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccos(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccos(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccos(),
			p1p0 = (new MathLib.Complex(1, +0)).arccos(),
			p1n0 = (new MathLib.Complex(1, -0)).arccos(),
			p2p0 = (new MathLib.Complex(2, +0)).arccos(),
			p2n0 = (new MathLib.Complex(2, -0)).arccos();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccos().re));
	equal((new MathLib.Complex(Infinity)).arccos().re, Infinity);


	ok(MathLib.isEqual(n2p0, new MathLib.Complex(Math.PI, -1.3169578969248167086)));
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(Math.PI, +1.3169578969248167086)));

	ok(MathLib.isEqual(n1p0.re, Math.PI));
	ok(MathLib.isNegZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, Math.PI));
	ok(MathLib.isPosZero(n1n0.im));


	ok(MathLib.isEqual(p0p0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(p0p0.im));
	ok(MathLib.isEqual(p0n0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(p0n0.im));
	ok(MathLib.isEqual(n0p0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(n0p0.im));
	ok(MathLib.isEqual(n0n0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(n0n0.im));


	ok(MathLib.isPosZero(p1p0.re));
	ok(MathLib.isNegZero(p1p0.im));
	ok(MathLib.isPosZero(p1n0.re));
	ok(MathLib.isPosZero(p1n0.im));

	ok(MathLib.isPosZero(p2p0.re));
	ok(MathLib.isEqual(p2p0.im, -1.3169578969248167086));
	ok(MathLib.isPosZero(p2n0.re));
	ok(MathLib.isEqual(p2n0.im, 1.3169578969248167086));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccos(), new MathLib.Complex(1.1437177404024204938, -1.5285709194809981613)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccos(), new MathLib.Complex(2.2047801924340733356, -2.3055090312434769420)));
});