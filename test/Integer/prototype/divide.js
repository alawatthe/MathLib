test('.prototype.divide()', 12, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).divide(new MathLib.Integer('+10')).toString(),  '1000000');
	equal((new MathLib.Integer('+10000000')).divide(new MathLib.Integer('-10')).toString(), '-1000000');
	equal((new MathLib.Integer('-10000000')).divide(new MathLib.Integer('+10')).toString(), '-1000000');
	equal((new MathLib.Integer('-10000000')).divide(new MathLib.Integer('-10')).toString(),  '1000000');

	equal((new MathLib.Integer('+10000001')).divide(new MathLib.Integer('+10')).toString(),  '10000001/10');
	equal((new MathLib.Integer('+10000001')).divide(new MathLib.Integer('-10')).toString(), '-10000001/10');
	equal((new MathLib.Integer('-10000001')).divide(new MathLib.Integer('+10')).toString(), '-10000001/10');
	equal((new MathLib.Integer('-10000001')).divide(new MathLib.Integer('-10')).toString(),  '10000001/10');

	// number
	equal((new MathLib.Integer('+100')).divide(10), 10);
	equal((new MathLib.Integer('+100')).divide(-10), -10);
	equal((new MathLib.Integer('-100')).divide(10), -10);
	equal((new MathLib.Integer('-100')).divide(-10), 10);
});