test('.arcoth()', 29, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcoth(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcoth(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcoth(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcoth(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arcoth(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arcoth(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcoth(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcoth(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcoth(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcoth(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arcoth(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arcoth(),
			p1p0 = (new MathLib.Complex(1, +0)).arcoth(),
			p1n0 = (new MathLib.Complex(1, -0)).arcoth(),
			p2p0 = (new MathLib.Complex(2, +0)).arcoth(),
			p2n0 = (new MathLib.Complex(2, -0)).arcoth();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcoth().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcoth().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcoth().im));

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-0.5493061443340548457, 0)), '(-2 +0i).arcoth() = -0.55 + 0i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-0.5493061443340548457, 0)), '(-2 -0i).arcoth() = -0.55 + 0i');

	equal(n1p0.re, Infinity, '(-1 +0i).arcoth().re = Infinity');
	equal(n1n0.re, Infinity, '(-1 -0i).arcoth().re = Infinity');

	ok(MathLib.isEqual(n5p0.re, -0.5493061443340548457), '(-0.5 +0i).arcoth().re = -1.107');
	ok(MathLib.isEqual(n5p0.im, -1.5707963267948966192), '(-0.5 +0i).arcoth().im = -1.570');
	ok(MathLib.isEqual(n5n0.re, -0.5493061443340548457), '(-0.5 -0i).arcoth().re = -1.107');
	ok(MathLib.isEqual(n5n0.im, +1.5707963267948966192), '(-0.5 -0i).arcoth().im = +1.570');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arcoth().re = +0');
	ok(MathLib.isEqual(p0p0.im, -1.5707963267948966192), '(+0 +0i).arcoth().im = -1.5707963267948966192');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arcoth().re = +0');
	ok(MathLib.isEqual(p0n0.im, +1.5707963267948966192), '(+0 -0i).arcoth().im = +1.5707963267948966192');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arcoth().re = -0');
	ok(MathLib.isEqual(n0p0.im, -1.5707963267948966192), '(-0 +0i).arcoth().im = -1.5707963267948966192');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arcoth().re = -0');
	ok(MathLib.isEqual(n0n0.im, +1.5707963267948966192), '(-0 -0i).arcoth().im = +1.5707963267948966192');

	ok(MathLib.isEqual(p5p0.re, +0.5493061443340548457), '(+0.5i +0).arcoth().re = +0.549');
	ok(MathLib.isEqual(p5p0.im, -1.5707963267948966192), '(+0.5i +0).arcoth().im = -1.570');
	ok(MathLib.isEqual(p5n0.re, +0.5493061443340548457), '(+0.5i -0).arcoth().re = +0.549');
	ok(MathLib.isEqual(p5n0.im, +1.5707963267948966192), '(+0.5i -0).arcoth().im = +1.570');

	equal(p1p0.re, Infinity, '(1 +0i).arcoth().re = Infinity');
	equal(p1n0.re, Infinity, '(1 -0i).arcoth().re = Infinity');

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(0.5493061443340548457, 0)), '(2 + 0i).arcoth() = 1.57 + 0i');
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(0.5493061443340548457, 0)), '(2 - 0i).arcoth() = -1.57 + 0i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcoth(), new MathLib.Complex(0.17328679513998632735, -0.39269908169872415481)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcoth(), new MathLib.Complex(-0.11750090731143388841, -0.16087527719832109670)));
});