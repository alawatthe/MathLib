module('Complex');
test('init (1 Array)', 2, function () {
	var c = new MathLib.Complex(1, 2);
	equal(c.re, 1, 'Testing the real part');
	equal(c.im, 2, 'Testing the imaginary part');
});

/*
test('init (1 Number)', 3, function () {
	var c = new MathLib.Complex(3);
	equal(c.re, 3, 'Testing the real part');
	equal(c.im, 0, 'Testing the imaginary part');
	deepEqual(c.z, [3, 0], 'Testing the complete complex number');
});

test('init (2 Numbers)', 3, function () {
	var c = new MathLib.Complex(3, 2);
	equal(c.re, 3 * Math.cos(2), 'Testing the real part');
	equal(c.im, 3 * Math.sin(2), 'Testing the imaginary part');
	deepEqual(c.z, [3 * Math.cos(2), 3 * Math.sin(2)], 'Testing the complete complex number');
});*/



// Properties
test('.constructor', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.constructor, MathLib.Complex, 'Testing .constructor');
});

test('.type', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.type, 'complex', 'Testing .type');
});



// Methods
test('.abs()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 0);

	equal(MathLib.isEqual(c1.abs(), 5), true, 'Absolut value of a complex number');
	equal(MathLib.isEqual(c2.abs(), 0), true, 'Absolut value of a complex number');
});


test('.arg()', 4, function () {
	var c1 = new MathLib.Complex(1, 1),
			c2 = new MathLib.Complex(1, -1),
			c3 = new MathLib.Complex(0, 0),
			c4 = new MathLib.Complex(-1, 0);

	equal(c1.arg(), 0.7853981633974483, '');
	equal(c2.arg(), -0.7853981633974483, '');
	equal(c3.arg(), 0,  '');
	equal(c4.arg(), 3.141592653589793,  '');
});


test('.compare()', 3, function () {
	var c = new MathLib.Complex(3, 2),
			d = new MathLib.Complex(1, 1),
			e = new MathLib.Complex(-1, 1);
	equal(c.compare(c), 0, 'equal complex numbers');
	equal(c.compare(d), 1, 'normal compare');
	equal(d.compare(e), -1,  '');
});


test('.conjugate()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	c = c.conjugate();
	equal(c.re, 3, 'Checking the conjugate of a complex number');
	equal(c.im, -4, 'Checking the conjugate of a complex number');
});


test('.divide()', 2, function () {
	var c = new MathLib.Complex(3, 6),
			d = new MathLib.Complex(2, 5),
			e = new MathLib.Complex(3, 7);
	deepEqual(c.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(d.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});


test('.inverse()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 2);
	deepEqual(c1.inverse(), new MathLib.Complex(3 / 25, -4 / 25), 'Checking the inverse of a complex number');
	deepEqual(c2.inverse(), new MathLib.Complex(0, -1 / 2), 'Checking the inverse of a complex number');
});


test('.isEqual()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 4),
			e = new MathLib.Complex(5, 3);
	equal(c.isEqual(d), true, 'equal number');
	equal(d.isEqual(e), false, 'different number');
});


test('.isFinite()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(Infinity, 0);
	equal(c.isFinite(), true, 'finite complex number');
	equal(d.isFinite(), false, 'infinte complex number');
});


test('.isOne()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(1, 0);
	equal(c.isOne(), false, '3+4i');
	equal(d.isOne(), true, 'complex one');
});


test('.isReal()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 0);
	equal(c.isReal(), false, '3+4i');
	equal(d.isReal(), true, '3+0i');
});


test('.isZero()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 0);
	equal(c.isZero(), false, 'non zero complex');
	equal(d.isZero(), true, 'complex zero');
});


test('.ln()', 1, function () {
	var c = new MathLib.Complex(3, 4),
			res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);
	equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});


test('.mod()', 1, function () {
	var c = new MathLib.Complex(5, 6),
			d = new MathLib.Complex(2, 0);
	equal(c.mod(3).isEqual(d), true, '.mod()');
});


test('.minus()', 1, function () {
	var c = new MathLib.Complex(3, -4),
			d = new MathLib.Complex(7, -8);
	deepEqual(c.minus(d), new MathLib.Complex(-4, 4), 'Checking the negative of a complex number');
});


test('.negative()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	c = c.negative(); 
	equal(c.re, -3, 'Checking the negative of a complex number');
	equal(c.im, 4, 'Checking the negative of a complex number');
});


test('.plus()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	var d = new MathLib.Complex(2, -5);
	deepEqual(c.plus(d), new MathLib.Complex(5, -1), 'Adding two complex numbers.');
	deepEqual(c.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex numbers.');
});


test('.sign()', 1, function () {
	var c = new MathLib.Complex(5, 6),
			d = MathLib.Complex.polar(1, Math.atan2(6, 5));
	equal(c.sign().isEqual(d), true, '.sign()');
});


test('.sin()', 1, function () {
	ok(MathLib.isEqual(MathLib.sin(new MathLib.Complex(3, 4)), new MathLib.Complex(3.853738037919377, -27.016813258003932)));
});


test('.times()', 3, function () {
	var c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);
	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4/3, 10/3)), true, 'Multiplying by a rational number.');
});


test('.toContentMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toContentMathMLString(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
	equal(d.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
	equal(e.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
	equal(f.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
	equal(g.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});


test('.toLaTeX()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toLaTeX(), '3+4i', 'Normal complex number.');
	equal(d.toLaTeX(), '7i', 'Real part is zero.');
	equal(e.toLaTeX(), '4', 'Complex part is zero.');
	equal(f.toLaTeX(), '4-5i', 'Complex part is negative.');
	equal(g.toLaTeX(), '0', 'Number is zero.');
});


test('.toMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toMathMLString(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
	equal(d.toMathMLString(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
	equal(e.toMathMLString(), '<mn>4</mn>', 'Complex part is zero.');
	equal(f.toMathMLString(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
	equal(g.toMathMLString(), '<mn>0</mn>', 'Number is zero.');
});


test('.toMatrix()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	equal(c.toMatrix().type, 'matrix', 'type check');
	deepEqual(c.toMatrix(), new MathLib.Matrix([[3, 4], [-4, 3]]), 'entries');
});


test('.toPoint()', 3, function () {
	var c = new MathLib.Complex(3, -4),
			p = c.toPoint();
	equal(p.type, 'point', 'Converting a complex number to a point: type check');
	equal(p.dim, 2, 'Converting a complex number to a point: dimension check.');
	deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});


test('.toString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toString(), '3+4i', 'Normal complex number.');
	equal(d.toString(), '7i', 'Real part is zero.');
	equal(e.toString(), '4', 'Complex part is zero.');
	equal(f.toString(), '4-5i', 'Complex part is negative.');
	equal(g.toString(), '0', 'Number is zero.');
});



// Static Properties
test('one', 1, function () {
	var c = MathLib.Complex.one;
	deepEqual(c, new MathLib.Complex(1, 0), '.one');
});


test('zero', 1, function () {
	var c = MathLib.Complex.zero;
	deepEqual(c, new MathLib.Complex(0, 0), '.zero');
});
