module('Complex');
test('init (1 Number)', 2, function () {
	var c = new MathLib.Complex(3);
	equal(c.re, 3, 'Testing the real part');
	equal(c.im, 0, 'Testing the imaginary part');
});

test('init (2 Numbers)', 2, function () {
	var c = new MathLib.Complex(1, 2);
	equal(c.re, 1, 'Testing the real part');
	equal(c.im, 2, 'Testing the imaginary part');
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