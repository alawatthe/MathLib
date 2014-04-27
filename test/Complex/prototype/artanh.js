test('.artanh()', 28, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).artanh(),
			n2n0 = (new MathLib.Complex(-2, -0)).artanh(),
			n1p0 = (new MathLib.Complex(-1, +0)).artanh(),
			n1n0 = (new MathLib.Complex(-1, -0)).artanh(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).artanh(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).artanh(),
			p0p0 = (new MathLib.Complex(+0, +0)).artanh(),
			p0n0 = (new MathLib.Complex(+0, -0)).artanh(),
			n0p0 = (new MathLib.Complex(-0, +0)).artanh(),
			n0n0 = (new MathLib.Complex(-0, -0)).artanh(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).artanh(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).artanh(),
			p1p0 = (new MathLib.Complex(1, +0)).artanh(),
			p1n0 = (new MathLib.Complex(1, -0)).artanh(),
			p2p0 = (new MathLib.Complex(2, +0)).artanh(),
			p2n0 = (new MathLib.Complex(2, -0)).artanh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).artanh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).artanh().re));

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-0.5493061443340548457, 1.5707963267948966192)), '(-2 +0i).artanh() = -0.55 + 1.57i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-0.5493061443340548457, -1.5707963267948966192)), '(-2 -0i).artanh() = -0.55 - 1.57i');

	equal(n1p0.re, Infinity, '(-1 +0i).artanh().re = Infinity');
	equal(n1n0.re, Infinity, '(-1 -0i).artanh().re = Infinity');

	ok(MathLib.isEqual(n5p0.re, -0.5493061443340548457), '(-0.5 + 0i).artanh().re = -0.549');
	ok(MathLib.isPosZero(n5p0.im), '(-0.5 +0i).artanh().im = +0');
	ok(MathLib.isEqual(n5n0.re, -0.5493061443340548457), '(-0.5 -0i).artanh().re = -0.549');
	ok(MathLib.isNegZero(n5n0.im), '(-0.5 -0i).artanh().im = -0');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).artanh().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).artanh().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).artanh().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).artanh().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).artanh().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).artanh().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).artanh().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).artanh().im = -0');

	ok(MathLib.isEqual(p5p0.re, +0.54930614433405484570), '(+0.5i +0).artanh().re = +0.549');
	ok(MathLib.isPosZero(p5p0.im), '(+0.5i +0).artanh().im = +0');
	ok(MathLib.isEqual(p5n0.re, +0.54930614433405484570), '(+0.5i -0).artanh().re = +0.549');
	ok(MathLib.isNegZero(p5n0.im), '(+0.5i -0).artanh().im = -0');

	equal(p1p0.re, Infinity, '(1 +0i).artanh().re = Infinity');
	equal(p1n0.re, Infinity, '(1 -0i).artanh().re = Infinity');

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(0.5493061443340548457, 1.5707963267948966192)), '(2 + 0i).artanh() = 1.57 + 0.55i');
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(0.5493061443340548457, -1.5707963267948966192)), '(2 - 0i).artanh() = -1.57 + 0.55i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).artanh(), new MathLib.Complex(0.17328679513998632735, 1.17809724509617246442)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).artanh(), new MathLib.Complex(-0.1175009073114338884, 1.4099210495965755225)));
});