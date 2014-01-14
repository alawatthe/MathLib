test('.prototype.isZero()', 2, function () {
	var r = new MathLib.Rational(0, 2),
			p = new MathLib.Rational(1, 3);

	equal(r.isZero(), true, '.isZero()');
	equal(p.isZero(), false, '.isZero()');
});