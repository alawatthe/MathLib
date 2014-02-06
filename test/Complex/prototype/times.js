test('.times()', 19, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);

	ok(MathLib.isNaN(nan.times(nan).re), 'ComplexNaN * ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.times(inf).re), 'ComplexNaN * ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.times(zero).re), 'ComplexNaN * 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.times(c).re), 'ComplexNaN * (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.times(nan).re), 'ComplexInfinity * ComplexNaN = ComplexNaN');
	deepEqual(inf.times(inf), inf, 'ComplexInfinity * ComplexInfinity = ComplexInfinity');
	ok(MathLib.isNaN(inf.times(zero).re), 'ComplexInfinity * 0 = ComplexNaN');
	deepEqual(inf.times(c), inf, 'ComplexInfinity * (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.times(nan).re), '0 * ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(zero.times(inf).re), '0 * ComplexInfinity = ComplexNaN');
	deepEqual(zero.times(zero), zero, '0 * 0 = 0');
	deepEqual(zero.times(c), zero, '0 * (2+5i) = 0');

	ok(MathLib.isNaN(c.times(nan).re), '(2+5i) * ComplexNaN = ComplexNaN');
	deepEqual(c.times(inf), inf, '(2+5i) * ComplexInfinity = ComplexInfinity');
	deepEqual(c.times(zero), zero, '(2+5i) * 0 = 0');
	deepEqual(c.times(c), new MathLib.Complex(-21, 20), '(2+5i) * (2+5i) = -21+20i');

	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4 / 3, 10 / 3)), true, 'Multiplying by a rational number.');
});