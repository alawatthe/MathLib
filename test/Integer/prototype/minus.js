test('.prototype.minus()', 21, function () {
	// integer
	equal((new MathLib.Integer('+10')).minus(new MathLib.Integer('+100')).toString(), '-90');
	equal((new MathLib.Integer('+10')).minus(new MathLib.Integer('-100')).toString(), '110');
	equal((new MathLib.Integer('-10')).minus(new MathLib.Integer('+100')).toString(), '-110');
	equal((new MathLib.Integer('-10')).minus(new MathLib.Integer('-100')).toString(), '90');

	equal((new MathLib.Integer('+100')).minus(new MathLib.Integer('+10')).toString(), '90');
	equal((new MathLib.Integer('+100')).minus(new MathLib.Integer('-10')).toString(), '110');
	equal((new MathLib.Integer('-100')).minus(new MathLib.Integer('+10')).toString(), '-110');
	equal((new MathLib.Integer('-100')).minus(new MathLib.Integer('-10')).toString(), '-90');

	equal((new MathLib.Integer('+10000000')).minus(new MathLib.Integer('+10')).toString(), '9999990');
	equal((new MathLib.Integer('+10000000')).minus(new MathLib.Integer('-10')).toString(), '10000010');
	equal((new MathLib.Integer('-10000000')).minus(new MathLib.Integer('+10')).toString(), '-10000010');
	equal((new MathLib.Integer('-10000000')).minus(new MathLib.Integer('-10')).toString(), '-9999990');

	equal((new MathLib.Integer('1')).minus(new MathLib.Integer('100000000000000')).toString(), '-99999999999999');


	// number
	equal((new MathLib.Integer('+100')).minus(10), 90);
	equal((new MathLib.Integer('+100')).minus(-10), 110);
	equal((new MathLib.Integer('-100')).minus(10), -110);
	equal((new MathLib.Integer('-100')).minus(-10), -90);

	equal((new MathLib.Integer('+10000000')).minus(10), 9999990);
	equal((new MathLib.Integer('+10000000')).minus(-10), 10000010);
	equal((new MathLib.Integer('-10000000')).minus(10), -10000010);
	equal((new MathLib.Integer('-10000000')).minus(-10), -9999990);
});