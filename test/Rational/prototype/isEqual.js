test('.prototype.isEqual()', 4, function () {
	var r1 = new MathLib.Rational(1, 2),
			r2 = new MathLib.Rational(4, 8),
			r3 = new MathLib.Rational(3, 1),
			r4 = new MathLib.Rational(6, 2);

	equal(r1.isEqual(r2), true, '.isEqual()');
	equal(r3.isEqual(3), true, '.isEqual()');
	equal(r4.isEqual(3), true, '.isEqual()');
	equal(r1.isEqual(r3), false, '.isEqual()');
});