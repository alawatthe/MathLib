test('prototype.negative()', 3, function () {
	equal((new MathLib.Integer('1234')).negative().toString(), '-1234');
	equal((new MathLib.Integer('+1234')).negative().toString(), '-1234');
	equal((new MathLib.Integer('-1234')).negative().toString(), '1234');
});