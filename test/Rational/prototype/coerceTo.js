test('.prototype.coerceTo()', 2, function () {
	var r1 = new MathLib.Rational(3, 1);

	ok(MathLib.isEqual(r1.coerceTo('integer'), new MathLib.Integer(3)), 'integer');
	ok(MathLib.isEqual(r1.coerceTo('rational'), new MathLib.Rational(3, 1)), 'rational');
	// ok(MathLib.isEqual(r1.coerceTo('complex'), new MathLib.Complex(new MathLib.Rational(3, 1), 0)), 'complex');
});