test('.minus()', 17, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(7, -8);

	ok(MathLib.isNaN(nan.minus(nan).re), 'ComplexNaN - ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(inf).re), 'ComplexNaN - ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(zero).re), 'ComplexNaN - 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(c).re), 'ComplexNaN - (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.minus(nan).re), 'ComplexInfinity - ComplexNaN = ComplexNaN');
	deepEqual(inf.minus(inf), inf, 'ComplexInfinity - ComplexInfinity = ComplexInfinity');
	deepEqual(inf.minus(zero), inf, 'ComplexInfinity - 0 = ComplexInfinity');
	deepEqual(inf.minus(c), inf, 'ComplexInfinity - (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.minus(nan).re), '0 - ComplexNaN = ComplexNaN');
	deepEqual(zero.minus(inf), inf, '0 - ComplexInfinity = ComplexInfinity');
	deepEqual(zero.minus(zero), zero, '0 - 0 = 0');
	deepEqual(zero.minus(c), c.negative(), '0 - (2+5i) = -2-5i');

	ok(MathLib.isNaN(c.minus(nan).re), '(2+5i) - ComplexNaN = ComplexNaN');
	deepEqual(c.minus(inf), inf, '(2+5i) - ComplexInfinity = ComplexInfinity');
	deepEqual(c.minus(zero), c, '(2+5i) - 0 = 2+5i');
	deepEqual(c.minus(c), zero, '(2+5i) - (2+5i) = 0');

	deepEqual(c.minus(d), new MathLib.Complex(-5, 13), '(2+5i)-(7-8i) = -5 + 13i');
});