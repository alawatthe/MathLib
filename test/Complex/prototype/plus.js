test('.plus()', 18, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 4);

	ok(MathLib.isNaN(nan.plus(nan).re), 'ComplexNaN + ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(inf).re), 'ComplexNaN + ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(zero).re), 'ComplexNaN + 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(c).re), 'ComplexNaN + (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.plus(nan).re), 'ComplexInfinity + ComplexNaN = ComplexNaN');
	deepEqual(inf.plus(inf), inf, 'ComplexInfinity + ComplexInfinity = ComplexInfinity');
	deepEqual(inf.plus(zero), inf, 'ComplexInfinity + 0 = ComplexInfinity');
	deepEqual(inf.plus(c), inf, 'ComplexInfinity + (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.plus(nan).re), '0 + ComplexNaN = ComplexNaN');
	deepEqual(zero.plus(inf), inf, '0 + ComplexInfinity = ComplexInfinity');
	deepEqual(zero.plus(zero), zero, '0 + 0 = 0');
	deepEqual(zero.plus(c), c, '0 + (2+5i) = c');

	ok(MathLib.isNaN(c.plus(nan).re), '(2+5i) + ComplexNaN = ComplexNaN');
	deepEqual(c.plus(inf), inf, '(2+5i) + ComplexInfinity = ComplexInfinity');
	deepEqual(c.plus(zero), c, '(2+5i) + 0 = 2+5i');
	deepEqual(c.plus(c), new MathLib.Complex(4, 10), '(2+5i) + (2+5i) = 4+10i');

	deepEqual(c.plus(d), new MathLib.Complex(5, 9), 'Adding two complex numbers.');
	deepEqual(d.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex number.');
});