test('.prototype.compare()', 3, function () {
	var r1 = new MathLib.Rational(3, 2),
			r2 = new MathLib.Rational(6, 4),
			r3 = new MathLib.Rational(1, 1),
			r4 = new MathLib.Rational(7, 2);
	equal(r1.compare(r2), 0, '.compare()');
	equal(r1.compare(r3), 1, '.compare()');
	equal(r1.compare(r4), -1,  '.compare()');
});