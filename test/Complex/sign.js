test('.sign()', 1, function () {
	var c = new MathLib.Complex(5, 6),
			d = MathLib.Complex.polar(1, Math.atan2(6, 5));
	equal(c.sign().isEqual(d), true, '.sign()');
});