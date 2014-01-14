test('.prototype.inverse()', 2, function () {
	var r = (new MathLib.Rational(1, 2)).inverse(),
			p = (new MathLib.Rational(0, 2)).inverse();
	equal(r.isEqual(new MathLib.Rational(2, 1)), true, '.inverse()');
	equal(p, undefined, '.inverse()');
});