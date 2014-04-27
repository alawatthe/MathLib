test('.arsinh()', 32, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arsinh(),
			n0n2 = (new MathLib.Complex(-0, -2)).arsinh(),
			p0n1 = (new MathLib.Complex(+0, -1)).arsinh(),
			n0n1 = (new MathLib.Complex(-0, -1)).arsinh(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arsinh(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arsinh(),
			p0p0 = (new MathLib.Complex(+0, +0)).arsinh(),
			p0n0 = (new MathLib.Complex(+0, -0)).arsinh(),
			n0p0 = (new MathLib.Complex(-0, +0)).arsinh(),
			n0n0 = (new MathLib.Complex(-0, -0)).arsinh(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arsinh(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arsinh(),
			p0p1 = (new MathLib.Complex(+0, +1)).arsinh(),
			n0p1 = (new MathLib.Complex(-0, +1)).arsinh(),
			p0p2 = (new MathLib.Complex(+0, +2)).arsinh(),
			n0p2 = (new MathLib.Complex(-0, +2)).arsinh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arsinh().re));
	equal((new MathLib.Complex(Infinity)).arsinh().re, Infinity);

	ok(MathLib.isEqual(p0n2, new MathLib.Complex(+1.3169578969248167086, -1.5707963267948966192)), '(+0 -2i).arsinh() = +1.316 - 1.570i');
	ok(MathLib.isEqual(n0n2, new MathLib.Complex(-1.3169578969248167086, -1.5707963267948966192)), '(-0 -2i).arsinh() = -1.316 - 1.570i');

	ok(MathLib.isPosZero(p0n1.re), '(+0 -i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n1.im, -1.5707963267948966192), '(+0 -i).arsinh().im = -1.570');
	ok(MathLib.isNegZero(n0n1.re), '(-0 -i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n1.im, -1.5707963267948966192), '(-0 -i).arsinh().im = -1.570');

	ok(MathLib.isPosZero(p0n5.re), '(+0 -0.5i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n5.im, -0.52359877559829887308), '(+0 -0.5i).arsinh().im = -0.523');
	ok(MathLib.isNegZero(n0n5.re), '(-0 -0.5i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n5.im, -0.52359877559829887308), '(-0 -0.5i).arsinh().im = -0.523');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arsinh().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).arsinh().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arsinh().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).arsinh().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arsinh().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).arsinh().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arsinh().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).arsinh().im = -0');

	ok(MathLib.isEqual(p0p5.im, 0.52359877559829887308), '(+0 +0.5i).arsinh().im = +0.523');
	ok(MathLib.isPosZero(p0p5.re), '(+0 +0.5i).arsinh().re = +0');
	ok(MathLib.isEqual(n0p5.im, 0.52359877559829887308), '(-0 +0.5i).arsinh().im = +0.523');
	ok(MathLib.isNegZero(n0p5.re), '(-0 +0.5i).arsinh().re = -0');

	ok(MathLib.isPosZero(p0p1.re), '(+0 +i).arsinh().re = +0');
	ok(MathLib.isEqual(p0p1.im, 1.5707963267948966192), '(+0 +i).arsinh().im = 1.570');
	ok(MathLib.isNegZero(n0p1.re), '(-0 +i).arsinh().re = -0');
	ok(MathLib.isEqual(n0p1.im, 1.5707963267948966192), '(-0 +i).arsinh().im = 1.570');

	ok(MathLib.isEqual(p0p2, new MathLib.Complex(+1.3169578969248167086, 1.5707963267948966192)), '(+0 +2i).arsinh() = +1.316 + 1.570i');
	ok(MathLib.isEqual(n0p2, new MathLib.Complex(-1.3169578969248167086, 1.5707963267948966192)), '(-0 +2i).arsinh() = -1.316 + 1.570i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arsinh(), new MathLib.Complex(1.4693517443681852733, 1.0634400235777520562)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arsinh(), new MathLib.Complex(-2.2999140408792696500, 0.9176168533514786558)));
});