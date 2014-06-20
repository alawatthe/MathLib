test('.arctan()', 28, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arctan(),
			n0n2 = (new MathLib.Complex(-0, -2)).arctan(),
			p0n1 = (new MathLib.Complex(+0, -1)).arctan(),
			n0n1 = (new MathLib.Complex(-0, -1)).arctan(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arctan(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arctan(),
			p0p0 = (new MathLib.Complex(+0, +0)).arctan(),
			p0n0 = (new MathLib.Complex(+0, -0)).arctan(),
			n0p0 = (new MathLib.Complex(-0, +0)).arctan(),
			n0n0 = (new MathLib.Complex(-0, -0)).arctan(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arctan(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arctan(),
			p0p1 = (new MathLib.Complex(+0, 1)).arctan(),
			n0p1 = (new MathLib.Complex(-0, 1)).arctan(),
			p0p2 = (new MathLib.Complex(+0, 2)).arctan(),
			n0p2 = (new MathLib.Complex(-0, 2)).arctan();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arctan().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).arctan().re));

	ok(MathLib.isEqual(p0n2, new MathLib.Complex(1.5707963267948966192, -0.5493061443340548457)), '(+0 -2i).arctan() = 1.57 - 0.55i');
	ok(MathLib.isEqual(n0n2, new MathLib.Complex(-1.5707963267948966192, -0.5493061443340548457)), '(-0 -2i).arctan() = -1.57 - 0.55i');

	equal(p0n1.re, Infinity);
	equal(n0n1.re, Infinity);

	ok(MathLib.isPosZero(p0n5.re), '(+0 -0.5i).arctan().re = +0');
	equal(p0n5.im, -0.5493061443340548457, '(+0 -0.5i).arctan().im = +0.549');
	ok(MathLib.isNegZero(n0n5.re), '(-0 -0.5i).arctan().re = -0');
	equal(n0n5.im, -0.5493061443340548457, '(-0 -0.5i).arctan().im = -0.549');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arctan().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).arctan().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arctan().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).arctan().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arctan().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).arctan().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arctan().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).arctan().im = -0');

	ok(MathLib.isPosZero(p0p5.re), '(+0 +0.5i).arctan().re = +0');
	equal(p0p5.im, +0.5493061443340548457, '(+0 +0.5i).arctan().im = +0.549');
	ok(MathLib.isNegZero(n0p5.re), '(-0 +0.5i).arctan().re = -0');
	equal(n0p5.im, +0.5493061443340548457, '(-0 +0.5i).arctan().im = -0.549');

	equal(p0p1.re, Infinity);
	equal(n0p1.re, Infinity);

	ok(MathLib.isEqual(p0p2, new MathLib.Complex(1.5707963267948966192, 0.5493061443340548457)), '(+0 +2i).arctan() = 1.57 + 0.55i');
	ok(MathLib.isEqual(n0p2, new MathLib.Complex(-1.5707963267948966192, 0.5493061443340548457)), '(-0 +2i).arctan() = -1.57 + 0.55i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arctan(), new MathLib.Complex(1.33897252229449356112, 0.40235947810852509365)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arctan(), new MathLib.Complex(-1.4483069952314645421, 0.1589971916799991744)));
});