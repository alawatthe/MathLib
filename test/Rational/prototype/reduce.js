test('.prototype.reduce()', 4, function () {
	var r = (new MathLib.Rational(-4, -6)).reduce(),
			p = (new MathLib.Rational(3, -6)).reduce();
	equal(r.numerator, 2, '.reduce()');
	equal(r.denominator, 3, '.reduce()');
	equal(p.numerator, -1, '.reduce()');
	equal(p.denominator, 2, '.reduce()');
});