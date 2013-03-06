test('.toString()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toString(), '2/3', '.toString()');
});