test('.prototype.coerceTo()', 10, function () {
	// Rational
	ok(MathLib.isEqual((new MathLib.Integer('0')).coerceTo('rational'), new MathLib.Rational(0)));
	ok(MathLib.isEqual((new MathLib.Integer('+1234')).coerceTo('rational'), new MathLib.Rational(1234)));
	ok(MathLib.isEqual((new MathLib.Integer('-1234')).coerceTo('rational'), new MathLib.Rational(-1234)));

	// number
	ok(MathLib.isPosZero((new MathLib.Integer('+0')).coerceTo('number')));
	ok(MathLib.isNegZero((new MathLib.Integer('-0')).coerceTo('number')));
	equal((new MathLib.Integer('+1234')).coerceTo('number'), 1234);
	equal((new MathLib.Integer('-1234')).coerceTo('number'), -1234);

	// Complex
	ok(MathLib.isEqual((new MathLib.Integer('0')).coerceTo('complex'), new MathLib.Complex(0)));
	ok(MathLib.isEqual((new MathLib.Integer('+1234')).coerceTo('complex'), new MathLib.Complex(1234)));
	ok(MathLib.isEqual((new MathLib.Integer('-1234')).coerceTo('complex'), new MathLib.Complex(-1234)));
});