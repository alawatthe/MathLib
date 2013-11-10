module('Complex');
test('init (1 Number)', 2, function () {
	var c = new MathLib.Complex(3);
	equal(c.re, 3, 'Testing the real part');
	equal(c.im, 0, 'Testing the imaginary part');
});

test('init (2 Numbers)', 10, function () {
	var c1 = new MathLib.Complex(Infinity, 2),
			c2 = new MathLib.Complex(-Infinity, 2),
			c3 = new MathLib.Complex(NaN, 2),
			c4 = new MathLib.Complex(2, NaN),
			c5 = new MathLib.Complex(1, 2);

	equal(c1.re, Infinity, 'Testing the real part');
	equal(c1.im, Infinity, 'Testing the imaginary part');
	equal(c2.re, Infinity, 'Testing the real part');
	equal(c2.im, Infinity, 'Testing the imaginary part');
	ok(MathLib.isNaN(c3.re), 'Testing the real part');
	ok(MathLib.isNaN(c3.im), 'Testing the imaginary part');
	ok(MathLib.isNaN(c4.re), 'Testing the real part');
	ok(MathLib.isNaN(c4.im), 'Testing the imaginary part');
	equal(c5.re, 1, 'Testing the real part');
	equal(c5.im, 2, 'Testing the imaginary part');
});


// Properties
test('.constructor', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.constructor, MathLib.Complex, 'Testing .constructor');
});

test('.type', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.type, 'complex', 'Testing .type');
});