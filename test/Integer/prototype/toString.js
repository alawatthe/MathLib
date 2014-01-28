test('.prototype.toString()', 6, function () {
	equal((new  MathLib.Integer('0')).toString(), '0');
	equal((new  MathLib.Integer('-0')).toString(), '0');

	equal((new  MathLib.Integer('1234')).toString(), '1234');
	equal((new  MathLib.Integer('+1234')).toString(), '1234');
	equal((new  MathLib.Integer('-1234')).toString(), '-1234');
	
	equal((new  MathLib.Integer('123456789101112131415')).toString(), '123456789101112131415');
});