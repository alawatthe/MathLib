test('.prototype.isZero()', 5, function () {
	equal((new MathLib.Integer('0')).isZero(), true);
	equal((new MathLib.Integer('+0')).isZero(), true);
	equal((new MathLib.Integer('-0')).isZero(), true);
	equal((new MathLib.Integer('+1234')).isZero(), false);
	equal((new MathLib.Integer('-1234')).isZero(), false);
});