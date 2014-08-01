test('.prototype.coerceTo()', 8, function () {
	var c1 = new MathLib.Complex(3, 0),
			c2 = new MathLib.Complex(3, 2);

	ok(MathLib.isEqual(c1.coerceTo('integer'), new MathLib.Integer(3)), 'integer');
	ok(MathLib.isEqual(c1.coerceTo('rational'), new MathLib.Rational(3, 1)), 'rational');
	ok(MathLib.isEqual(c1.coerceTo('complex'), new MathLib.Complex(3, 0)), 'complex');
	ok(MathLib.isEqual(c1.coerceTo('number'), 3), 'number');

	throws(function () {
		c2.coerceTo('integer');
	}, /Cannot coerce the complex number to an integer, since the imaginary part is not zero./, 'integer');
	throws(function () {
		c2.coerceTo('rational');
	}, /Cannot coerce the complex number to a rational number, since the imaginary part is not zero./, 'rational');
	throws(function () {
		c2.coerceTo('number');
	}, /Cannot coerce the complex number to a number, since the imaginary part is not zero./, 'number');
	throws(function () {
		c2.coerceTo('notImplemented');
	}, /Cannot coerce the complex number to "notImplemented"./, 'notImplemented');
});
