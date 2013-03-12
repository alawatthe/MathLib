module('Polynomial');
test('init', 3, function () {
	var p = new MathLib.Polynomial([1, 2, 3, 4]),
			q = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, -4, new MathLib.Complex(2, 3)]);
	equal(p[0], 1, 'coefficients');
	deepEqual(q[2], 0, 'coefficients');
	deepEqual(p1[2], new MathLib.Complex(2, 3), '.coef');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]);
	equal(p.constructor, MathLib.Polynomial, 'Testing .constructor');
});


test('.deg', 1, function () {
	var p = new MathLib.Polynomial(3);
	equal(p.deg, 3, 'testing if .degree is right');
});


test('.type', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]);
	equal(p.type, 'polynomial', 'Testing .type');
});