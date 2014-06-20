test('.arccot()', 25, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arccot(),
			n0n2 = (new MathLib.Complex(-0, -2)).arccot(),
			p0n1 = (new MathLib.Complex(+0, -1)).arccot(),
			n0n1 = (new MathLib.Complex(-0, -1)).arccot(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccot(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccot(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccot(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccot(),
			p0p1 = (new MathLib.Complex(+0, 1)).arccot(),
			n0p1 = (new MathLib.Complex(-0, 1)).arccot(),
			p0p2 = (new MathLib.Complex(+0, 2)).arccot(),
			n0p2 = (new MathLib.Complex(-0, 2)).arccot();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccot().re));
	equal((new MathLib.Complex(Infinity)).arccot().re, 0);
	equal((new MathLib.Complex(Infinity)).arccot().im, 0);

	ok(MathLib.isPosZero(p0n2.re), '(+0 -2i).arccot().re = +0');
	equal(p0n2.im, 0.54930614433405484570, '(+0 -2i).arccot().im = 0.54930614433405484570');
	ok(MathLib.isNegZero(n0n2.re), '(-0 -2i).arccot().re = -0');
	equal(n0n2.im, 0.54930614433405484570, '(-0 -2i).arccot().im = 0.54930614433405484570');

	equal(p0n1.re, Infinity, '(+0 -1i).arccot().re = ComplexInfinity');
	equal(n0n1.re, Infinity, '(-0 -1i).arccot().re = ComplexInfinity');

	equal(p0p0.re, Math.PI / 2, '(+0 +0i).arccot().re = +&pi;/2');
	ok(MathLib.isNegZero(p0p0.im), '(+0 +0i).arccot().im = -0');
	equal(p0n0.re, Math.PI / 2, '(+0 -0i).arccot().re = +&pi;/2');
	ok(MathLib.isPosZero(p0n0.im), '(+0 -0i).arccot().im = +0');
	equal(n0p0.re, -Math.PI / 2, '(-0 +0i).arccot().re = -&pi;/2');
	ok(MathLib.isNegZero(n0p0.im), '(-0 +0i).arccot().im = -0');
	equal(n0n0.re, -Math.PI / 2, '(-0 -0i).arccot().re = -&pi;/2');
	ok(MathLib.isPosZero(n0n0.im), '(-0 -0i).arccot().im = +0');

	equal(p0p1.re, Infinity, '(+0 +1i).arccot().re = ComplexInfinity');
	equal(n0p1.re, Infinity, '(-0 +1i).arccot().re = ComplexInfinity');


	ok(MathLib.isPosZero(p0p2.re), '(+0 +2i).arccot().re = +0');
	equal(p0p2.im, -0.54930614433405484570, '(+0 +2i).arccot().im = -0.54930614433405484570');
	ok(MathLib.isNegZero(n0p2.re), '(-0 +2i).arccot().re = -0');
	equal(n0p2.im, -0.54930614433405484570, '(-0 +2i).arccot().im = -0.54930614433405484570');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccot(), new MathLib.Complex(0.23182380450040305811, -0.40235947810852509365)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccot(), new MathLib.Complex(-0.12248933156343207709, -0.15899719167999917436)));
});