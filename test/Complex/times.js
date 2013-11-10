test('.times()', 19, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);

	deepEqual(nan.times(nan), nan, 'ComplexNaN * ComplexNaN = ComplexNaN');
	deepEqual(nan.times(inf), nan, 'ComplexNaN * ComplexInfinity = ComplexNaN');
	deepEqual(nan.times(zero), nan, 'ComplexNaN * 0 = ComplexNaN');
	deepEqual(nan.times(c), nan, 'ComplexNaN * (2+5i) = ComplexNaN');
	
	deepEqual(inf.times(nan), nan, 'ComplexInfinity * ComplexNaN = ComplexNaN');
	deepEqual(inf.times(inf), inf, 'ComplexInfinity * ComplexInfinity = ComplexInfinity');
	deepEqual(inf.times(zero), nan, 'ComplexInfinity * 0 = ComplexNaN');
	deepEqual(inf.times(c), inf, 'ComplexInfinity * (2+5i) = ComplexInfinity');
	
	deepEqual(zero.times(nan), nan, '0 * ComplexNaN = ComplexNaN');
	deepEqual(zero.times(inf), nan, '0 * ComplexInfinity = ComplexNaN');
	deepEqual(zero.times(zero), zero, '0 * 0 = 0');
	deepEqual(zero.times(c), zero, '0 * (2+5i) = 0');

	deepEqual(c.times(nan), nan, '(2+5i) * ComplexNaN = ComplexNaN');
	deepEqual(c.times(inf), inf, '(2+5i) * ComplexInfinity = ComplexInfinity');
	deepEqual(c.times(zero), zero, '(2+5i) * 0 = 0');
	deepEqual(c.times(c), new MathLib.Complex(-21, 20), '(2+5i) * (2+5i) = -21+20i');

	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4 / 3, 10 / 3)), true, 'Multiplying by a rational number.');
});