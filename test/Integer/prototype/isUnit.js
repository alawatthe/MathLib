test('.prototype.isUnit()', 4, function () {
	equal((new MathLib.Integer('1')).isUnit(), true);
	equal((new MathLib.Integer('-1')).isUnit(), true);
	equal((new MathLib.Integer('+1234')).isUnit(), false);
	equal((new MathLib.Integer('-1234')).isUnit(), false);
});