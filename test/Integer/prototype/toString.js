test('.prototype.toString()', 3, function () {
	equal((new  MathLib.Integer('1234')).toString(), '1234');
	equal((new  MathLib.Integer('+1234')).toString(), '1234');
	equal((new  MathLib.Integer('-1234')).toString(), '-1234');
});