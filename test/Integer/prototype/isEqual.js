test('.prototype.isEqual()', 5, function () {
	equal((new MathLib.Integer('+0')).isEqual(new MathLib.Integer('-0')), true);
	equal((new MathLib.Integer('1234')).isEqual(new MathLib.Integer('1234')), true);
	equal((new MathLib.Integer('1234')).isEqual(1234), true);
	equal((new MathLib.Integer('1234')).isEqual(new MathLib.Integer('12')), false);
	equal((new MathLib.Integer('1234')).isEqual(12), false);
});