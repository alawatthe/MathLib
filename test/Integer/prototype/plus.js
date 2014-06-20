test('.prototype.plus()', 13, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).plus(new MathLib.Integer('+10')).toString(), '10000010');
	equal((new MathLib.Integer('+10000000')).plus(new MathLib.Integer('-10')).toString(), '9999990');
	equal((new MathLib.Integer('-10000000')).plus(new MathLib.Integer('+10')).toString(), '-9999990');
	equal((new MathLib.Integer('-10000000')).plus(new MathLib.Integer('-10')).toString(), '-10000010');

	// number
	// ok(MathLib.isPosZero((new MathLib.Integer('+0')).plus()));
	// ok(MathLib.isNegZero((new MathLib.Integer('-0')).plus()));
	equal((new MathLib.Integer('+100')).plus(10), 110);
	equal((new MathLib.Integer('+100')).plus(-10), 90);
	equal((new MathLib.Integer('-100')).plus(10), -90);
	equal((new MathLib.Integer('-100')).plus(-10), -110);

	equal((new MathLib.Integer('+10000000')).plus(10), 10000010);
	equal((new MathLib.Integer('+10000000')).plus(-10), 9999990);
	equal((new MathLib.Integer('-10000000')).plus(10), -9999990);
	equal((new MathLib.Integer('-10000000')).plus(-10), -10000010);

	equal((new MathLib.Integer(5000000)).plus(new MathLib.Integer(5000000)).toString(), '10000000');
});