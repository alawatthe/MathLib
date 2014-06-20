test('.prototype.compare()', 15, function () {
	equal((new MathLib.Integer('0')).compare(new MathLib.Integer('-0')), 0);

	equal((new MathLib.Integer('10')).compare(new MathLib.Integer('100')), -1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('10')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('100')), 0);

	equal((new MathLib.Integer('10')).compare(new MathLib.Integer('-100')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('-10')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('-100')), 1);

	equal((new MathLib.Integer('-10')).compare(new MathLib.Integer('-100')), 1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('-10')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('-100')), 0);

	equal((new MathLib.Integer('-10')).compare(new MathLib.Integer('100')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('10')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('100')), -1);

	equal((new MathLib.Integer('1')).compare(new MathLib.Integer('123456789123456789')), -1);
	equal((new MathLib.Integer('-1')).compare(new MathLib.Integer('-123456789123456789')), 1);
});