test('.prototype.plus()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.plus(p).isEqual(new MathLib.Rational(7, 6)), true, '.plus()');
	equal(r.plus(2), 2.5, '.plus()');
});