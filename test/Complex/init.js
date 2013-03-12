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