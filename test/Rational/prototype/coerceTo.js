test('.prototype.coerceTo()', 5, function () {
	var r1 = new MathLib.Rational(3, 1),
			r2 = new MathLib.Rational(3, 2);

	ok(MathLib.isEqual(r1.coerceTo('integer'), new MathLib.Integer(3)), 'integer');
	ok(MathLib.isEqual(r1.coerceTo('rational'), new MathLib.Rational(3, 1)), 'rational');
	// ok(MathLib.isEqual(r1.coerceTo('complex'), new MathLib.Complex(new MathLib.Rational(3, 1), 0)), 'complex');
	ok(MathLib.isEqual(r1.coerceTo('number'), 3), 'number');

	throws(function () {
		r2.coerceTo('integer');
	}, /Cannot coerce the rational number to an integer, since the denominator is not 1/, 'integer');
	throws(function () {
		r2.coerceTo('notImplemented');
	}, /Cannot coerce the rational number to "notImplemented"./, 'notImplemented');
});
