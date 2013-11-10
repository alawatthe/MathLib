test('.minus()', 17, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(7, -8);

	deepEqual(nan.minus(nan), nan, 'ComplexNaN - ComplexNaN = ComplexNaN');
	deepEqual(nan.minus(inf), nan, 'ComplexNaN - ComplexInfinity = ComplexNaN');
	deepEqual(nan.minus(zero), nan, 'ComplexNaN - 0 = ComplexNaN');
	deepEqual(nan.minus(c), nan, 'ComplexNaN - (2+5i) = ComplexNaN');
	
	deepEqual(inf.minus(nan), nan, 'ComplexInfinity - ComplexNaN = ComplexNaN');
	deepEqual(inf.minus(inf), inf, 'ComplexInfinity - ComplexInfinity = ComplexInfinity');
	deepEqual(inf.minus(zero), inf, 'ComplexInfinity - 0 = ComplexInfinity');
	deepEqual(inf.minus(c), inf, 'ComplexInfinity - (2+5i) = ComplexInfinity');
	
	deepEqual(zero.minus(nan), nan, '0 - ComplexNaN = ComplexNaN');
	deepEqual(zero.minus(inf), inf, '0 - ComplexInfinity = ComplexInfinity');
	deepEqual(zero.minus(zero), zero, '0 - 0 = 0');
	deepEqual(zero.minus(c), c.negative(), '0 - (2+5i) = -2-5i');

	deepEqual(c.minus(nan), nan, '(2+5i) - ComplexNaN = ComplexNaN');
	deepEqual(c.minus(inf), inf, '(2+5i) - ComplexInfinity = ComplexInfinity');
	deepEqual(c.minus(zero), c, '(2+5i) - 0 = 2+5i');
	deepEqual(c.minus(c), zero, '(2+5i) - (2+5i) = 0');

	deepEqual(c.minus(d), new MathLib.Complex(-5, 13), '(2+5i)-(7-8i) = -5 + 13i)');
});