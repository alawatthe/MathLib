test('.arsech()', 30, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arsech(),
			n2n0 = (new MathLib.Complex(-2, -0)).arsech(),
			n1p0 = (new MathLib.Complex(-1, +0)).arsech(),
			n1n0 = (new MathLib.Complex(-1, -0)).arsech(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arsech(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arsech(),
			p0p0 = (new MathLib.Complex(+0, +0)).arsech(),
			p0n0 = (new MathLib.Complex(+0, -0)).arsech(),
			n0p0 = (new MathLib.Complex(-0, +0)).arsech(),
			n0n0 = (new MathLib.Complex(-0, -0)).arsech(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arsech(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arsech(),
			p1p0 = (new MathLib.Complex(+1, +0)).arsech(),
			p1n0 = (new MathLib.Complex(+1, -0)).arsech(),
			p2p0 = (new MathLib.Complex(2, +0)).arsech(),
			p2n0 = (new MathLib.Complex(2, -0)).arsech();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arsech().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).arsech().re));

	ok(MathLib.isPosZero(n2p0.re), '(-2 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n2p0.im, -2.0943951023931954923), '(-2 +0i).arcosh().im = -2.094');
	ok(MathLib.isPosZero(n2n0.re), '(-2 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n2n0.im, 2.0943951023931954923), '(-2 -0i).arcosh().im = +2.094');

	ok(MathLib.isPosZero(n1p0.re), '(-1 +0i).arsech().re = +0');
	ok(MathLib.isEqual(n1p0.im, -Math.PI), '(-1 +0i).arsech().im = -3.1415');
	ok(MathLib.isPosZero(n1n0.re), '(-1 -0i).arsech().re = +0');
	ok(MathLib.isEqual(n1n0.im, Math.PI), '(-1 -0i).arsech().im = 3.1415');

	ok(MathLib.isEqual(n5p0, new MathLib.Complex(1.3169578969248167086, -3.1415926535897932385)), '(-0.5 +0i).arsech() = 1.31 - 3.14i');
	ok(MathLib.isEqual(n5n0, new MathLib.Complex(1.3169578969248167086, +3.1415926535897932385)), '(-0.5 -0i).arsech() = 1.31 + 3.14i');

	ok(MathLib.isEqual(p0p0, new MathLib.Complex(Infinity)), '(+0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(p0n0, new MathLib.Complex(Infinity)), '(+0 -0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0p0, new MathLib.Complex(Infinity)), '(-0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0n0, new MathLib.Complex(Infinity)), '(-0 -0i).arsech() = ∞ + ∞i');

	ok(MathLib.isEqual(p5p0.re, 1.3169578969248167086), '(+0.5 +0i).arsech().re = 1.316');
	ok(MathLib.isNegZero(p5p0.im), '(+0.5 +0i).arsech().im = -0');
	ok(MathLib.isEqual(p5n0.re, 1.3169578969248167086), '(+0.5 -0i).arsech().re = 1.316');
	ok(MathLib.isPosZero(p5n0.im), '(+0.5 -0i).arsech().im = +0');

	ok(MathLib.isPosZero(p1p0.re), '(+1 +0i).arsech().re = +0');
	ok(MathLib.isNegZero(p1p0.im), '(+1 +0i).arsech().im = -0');
	ok(MathLib.isPosZero(p1n0.re), '(+1 -0i).arsech().re = +0');
	ok(MathLib.isPosZero(p1n0.im), '(+1 -0i).arsech().im = +0');

	ok(MathLib.isPosZero(p2p0.re), '(-2 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p2p0.im, -1.0471975511965977462), '(-2 +0i).arcosh().im = -1.047');
	ok(MathLib.isPosZero(p2n0.re), '(-2 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p2n0.im, 1.0471975511965977462), '(-2 -0i).arcosh().im = +1.047');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arsech(), new MathLib.Complex(0.3965682301123289789, -1.3844782726870810934)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arsech(), new MathLib.Complex(0.1604455337745049324, -1.6895470581023083734)));
});