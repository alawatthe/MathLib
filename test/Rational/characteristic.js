test('.characteristic()', 1, function () {
	ok(MathLib.Rational.characteristic().isEqual(new MathLib.Integer(0)));
});