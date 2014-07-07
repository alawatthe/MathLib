test('.characteristic()', 1, function () {
	ok(MathLib.Complex.characteristic().isEqual(new MathLib.Integer(0)));
});