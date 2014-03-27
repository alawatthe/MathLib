test('.prototype.isUnit()', 5, function () {
	equal((new MathLib.Integer('1')).isUnit(), true);
	equal((new MathLib.Integer('-1')).isUnit(), true);
	equal((new MathLib.Integer('+1234')).isUnit(), false);
	equal((new MathLib.Integer('-1234')).isUnit(), false);
	equal((new MathLib.Integer(['1', '123'])).isUnit(), false);
});