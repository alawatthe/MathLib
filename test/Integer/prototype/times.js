test('.prototype.times()', 8, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).times(new MathLib.Integer('+10')).toString(),  '100000000');
	equal((new MathLib.Integer('+10000000')).times(new MathLib.Integer('-10')).toString(), '-100000000');
	equal((new MathLib.Integer('-10000000')).times(new MathLib.Integer('+10')).toString(), '-100000000');
	equal((new MathLib.Integer('-10000000')).times(new MathLib.Integer('-10')).toString(),  '100000000');

	// number
	//ok(MathLib.isPosZero((new MathLib.Integer('+0')).plus()));
	//ok(MathLib.isNegZero((new MathLib.Integer('-0')).plus()));
	equal((new MathLib.Integer('+100')).times(10), 1000);
	equal((new MathLib.Integer('+100')).times(-10), -1000);
	equal((new MathLib.Integer('-100')).times(10), -1000);
	equal((new MathLib.Integer('-100')).times(-10), 1000);
});