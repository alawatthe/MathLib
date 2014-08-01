module('Rational');
test('init', 7, function () {
	var r = new MathLib.Rational(2, 3),
			p = new	MathLib.Rational(4);

	equal(r.numerator, 2, 'Testing the numerator');
	equal(r.denominator, 3, 'Testing the denominator');
	equal(p.numerator, 4, 'Testing the numerator');
	equal(p.denominator, 1, 'Testing the denominator');
	throws(function () {
		new MathLib.Rational(2, 0);
	}, /The denominator of a rational number cannot be zero./, 'Setting the denominator to zero should throw an error.');
	throws(function () {
		new MathLib.Rational(NaN, 2);
	}, /The numerator of a rational number cannot be NaN./, 'Setting the numerator to NaN should throw an error.');
	throws(function () {
		new MathLib.Rational(2, NaN);
	}, /The denominator of a rational number cannot be NaN./, 'Setting the denominator to NaN should throw an error.');
});



// Properties
test('.constructor', 1, function () {
	var r = new MathLib.Rational(2, 3);

	equal(r.constructor, MathLib.Rational, 'Testing .constructor');
});

test('.type', 1, function () {
	var r = new MathLib.Rational(2, 3);

	equal(r.type, 'rational', 'Testing .type');
});
