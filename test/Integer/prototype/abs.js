test('prototype.abs()', 5, function () {
	ok(MathLib.isPosZero((new MathLib.Integer('+0')).abs().coerceTo('number')));
	ok(MathLib.isPosZero((new MathLib.Integer('-0')).abs().coerceTo('number')));
	equal((new MathLib.Integer('1234')).abs().toString(), '1234');
	equal((new MathLib.Integer('+1234')).abs().toString(), '1234');
	equal((new MathLib.Integer('-1234')).abs().toString(), '1234');
});