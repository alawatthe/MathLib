test('.prototype.times()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.times(p).isEqual(new MathLib.Rational(2, 6)), true, '.times()');
	equal(r.times(2).isEqual(new MathLib.Rational(1, 1)), true, '.times()');
});