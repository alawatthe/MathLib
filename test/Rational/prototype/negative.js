test('.prototype.negative()', 1, function () {
	var r = (new MathLib.Rational(1, 2)).negative();
	equal(r.isEqual(new MathLib.Rational(-1, 2)), true, '.isEqual()');
});