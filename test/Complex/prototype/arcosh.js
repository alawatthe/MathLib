test('.arcosh()', 34, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcosh(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcosh(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcosh(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcosh(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arcosh(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arcosh(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcosh(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcosh(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcosh(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcosh(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arcosh(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arcosh(),
			p1p0 = (new MathLib.Complex(+1, +0)).arcosh(),
			p1n0 = (new MathLib.Complex(+1, -0)).arcosh(),
			p2p0 = (new MathLib.Complex(2, +0)).arcosh(),
			p2n0 = (new MathLib.Complex(2, -0)).arcosh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcosh().re));
	equal((new MathLib.Complex(Infinity)).arcosh().re, Infinity);

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(1.3169578969248167086, +3.1415926535897932385)), '(-2 +0i).arcosh() = 1.31 + 3.14i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(1.3169578969248167086, -3.1415926535897932385)), '(-2 -0i).arcosh() = 1.31 - 3.14i');

	ok(MathLib.isPosZero(n1p0.re), '(-1 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n1p0.im, Math.PI), '(-1 +0i).arcosh().im = 3.1415');
	ok(MathLib.isPosZero(n1n0.re), '(-1 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n1n0.im, -Math.PI), '(-1 -0i).arcosh().im = 3.1415');

	ok(MathLib.isPosZero(n5p0.re), '(-0.5 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n5p0.im, 2.0943951023931954923), '(-0.5 +0i).arcosh().im = +2.094');
	ok(MathLib.isPosZero(n5n0.re), '(-0.5 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n5n0.im, -2.0943951023931954923), '(-0.5 -0i).arcosh().im = -2.094');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p0p0.im, 1.5707963267948966192), '(+0 +0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p0n0.im, 1.5707963267948966192), '(+0 -0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(n0p0.re), '(-0 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n0p0.im, 1.5707963267948966192), '(-0 +0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(n0n0.re), '(-0 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n0n0.im, 1.5707963267948966192), '(-0 -0i).arcosh().im = 1.570');

	ok(MathLib.isPosZero(p5p0.re), '(+0.5 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p5p0.im, 1.0471975511965977462), '(+0.5 +0i).arcosh().im = +1.047');
	ok(MathLib.isPosZero(p5n0.re), '(+0.5 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p5n0.im, -1.0471975511965977462), '(+0.5 -0i).arcosh().im = -1.047');

	ok(MathLib.isPosZero(p1p0.re), '(+1 +0i).arcosh().re = +0');
	ok(MathLib.isPosZero(p1p0.im), '(+1 +0i).arcosh().im = +0');
	ok(MathLib.isPosZero(p1n0.re), '(+1 -0i).arcosh().re = +0');
	ok(MathLib.isNegZero(p1n0.im), '(+1 -0i).arcosh().im = -0');

	ok(MathLib.isEqual(p2p0.re, 1.3169578969248167086), '(+2 +0i).arcosh().re = 3.1415');
	ok(MathLib.isPosZero(p2p0.im), '(+2 +0i).arcosh().im = +0');
	ok(MathLib.isEqual(p2n0.re, 1.3169578969248167086), '(+2 -0i).arcosh().re = 3.1415');
	ok(MathLib.isNegZero(p2n0.im), '(+2 -0i).arcosh().im = -0');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcosh(), new MathLib.Complex(1.5285709194809981613, 1.1437177404024204938)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcosh(), new MathLib.Complex(2.3055090312434769420, 2.2047801924340733356)));
});