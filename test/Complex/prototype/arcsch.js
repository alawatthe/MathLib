test('.arcsch()', 29, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arcsch(),
			n0n2 = (new MathLib.Complex(-0, -2)).arcsch(),
			p0n1 = (new MathLib.Complex(+0, -1)).arcsch(),
			n0n1 = (new MathLib.Complex(-0, -1)).arcsch(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arcsch(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arcsch(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsch(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsch(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsch(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsch(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arcsch(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arcsch(),
			p0p1 = (new MathLib.Complex(+0, +1)).arcsch(),
			n0p1 = (new MathLib.Complex(-0, +1)).arcsch(),
			p0p2 = (new MathLib.Complex(+0, +2)).arcsch(),
			n0p2 = (new MathLib.Complex(-0, +2)).arcsch();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsch().re), '(NaN +NaN i).arcsch().re = +NaN +NaN i');
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcsch().re), '(+Infinity +Infinity i).arcsch().re = +0');
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcsch().im), '(+Infinity +Infinity i).arcsch().im = +0');

	ok(MathLib.isPosZero(p0n2.re), '(+0 -2i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n2.im, +0.52359877559829887308), '(+0 -2i).arsinh().im = 0.523');
	ok(MathLib.isNegZero(n0n2.re), '(-0 -2i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n2.im, +0.52359877559829887308), '(-0 -2i).arsinh().im = 0.523');

	ok(MathLib.isPosZero(p0n1.re), '(+0 -i).arcsch().re = +0');
	ok(MathLib.isEqual(p0n1.im, 1.5707963267948966192), '(+0 -i).arcsch().im = 1.570');
	ok(MathLib.isNegZero(n0n1.re), '(-0 -i).arcsch().re = -0');
	ok(MathLib.isEqual(n0n1.im, 1.5707963267948966192), '(-0 -i).arcsch().im = 1.570');

	ok(MathLib.isEqual(p0n5, new MathLib.Complex(1.3169578969248167086, 1.5707963267948966192)), '(+0 -0.5i).arcsch() = +1.316 + 1.570i');
	ok(MathLib.isEqual(n0n5, new MathLib.Complex(-1.3169578969248167086, 1.5707963267948966192)), '(-0 -0.5i).arcsch() = -1.316 + 1.570i');

	ok(MathLib.isEqual(p0p0, new MathLib.Complex(Infinity)), '(+0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(p0n0, new MathLib.Complex(Infinity)), '(+0 -0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0p0, new MathLib.Complex(Infinity)), '(-0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0n0, new MathLib.Complex(Infinity)), '(-0 -0i).arsech() = ∞ + ∞i');

	ok(MathLib.isEqual(p0p5, new MathLib.Complex(1.3169578969248167086, -1.5707963267948966192)), '(+0 +0.5i).arcsch() = +1.316 - 1.570i');
	ok(MathLib.isEqual(n0p5, new MathLib.Complex(-1.3169578969248167086, -1.5707963267948966192)), '(-0 +0.5i).arcsch() = -1.316 - 1.570i');

	ok(MathLib.isPosZero(p0p1.re), '(+0 +i).arcsch().re = +0');
	ok(MathLib.isEqual(p0p1.im, -1.5707963267948966192), '(+0 +i).arcsch().im = -1.570');
	ok(MathLib.isNegZero(n0p1.re), '(-0 +i).arcsch().re = -0');
	ok(MathLib.isEqual(n0p1.im, -1.5707963267948966192), '(-0 +i).arcsch().im = -1.570');

	ok(MathLib.isPosZero(p0p2.re), '(+0 +2i).arsinh().re = +0');
	ok(MathLib.isEqual(p0p2.im, -0.52359877559829887308), '(+0 +2i).arsinh().im = 0.523');
	ok(MathLib.isNegZero(n0p2.re), '(-0 +2i).arsinh().re = -0');
	ok(MathLib.isEqual(n0p2.im, -0.52359877559829887308), '(-0 +2i).arsinh().im = 0.523');


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsch(), new MathLib.Complex(0.21561241855582964497, -0.40158639166780606828)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsch(), new MathLib.Complex(-0.12124561370968745427, -0.15950663187736356950)));
});