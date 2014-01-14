test('.prototype.divide()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.divide(p).isEqual(new MathLib.Rational(3, 4)), true, '.divide()');
	equal(r.divide(2).isEqual(new MathLib.Rational(1, 4)), true, '.divide()');
});