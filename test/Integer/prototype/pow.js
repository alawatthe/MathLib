test('.prototype.pow()', 14, function () {
	// integer
	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('+30')).toString(),   '1073741824');
	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('-30')).toString(), '1/1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('+30')).toString(),   '1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('-30')).toString(), '1/1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('+31')).toString(),   '-2147483648');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('-31')).toString(), '-1/2147483648');

	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('0')).toString(), '1');
	equal((new MathLib.Integer('0')).pow(new MathLib.Integer('0')).toString(), '1');

	// number
	equal((new MathLib.Integer('+2')).pow(3), 8);
	equal((new MathLib.Integer('+2')).pow(-3), 1 / 8);
	equal((new MathLib.Integer('-2')).pow(3), -8);
	equal((new MathLib.Integer('-2')).pow(-3), -1 / 8);
	equal((new MathLib.Integer('-2')).pow(4), 16);
	equal((new MathLib.Integer('-2')).pow(-4), 1 / 16);
});
