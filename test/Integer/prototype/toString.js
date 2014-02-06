test('.prototype.toString()', 13, function () {
	equal((new MathLib.Integer('0')).toString(), '0');
	equal((new MathLib.Integer('-0')).toString(), '0');

	equal((new MathLib.Integer('1234')).toString(), '1234');
	equal((new MathLib.Integer('+1234')).toString(), '1234');
	equal((new MathLib.Integer('-1234')).toString(), '-1234');

	equal((new MathLib.Integer('123456789101112131415')).toString(), '123456789101112131415');

	equal((new MathLib.Integer(7)).toString({base: 2}), '111');
	equal((new MathLib.Integer(7)).toString({baseSubscript: true}), '7&#x2081;&#x2080;');
	equal((new MathLib.Integer(7)).toString({base: 2, baseSubscript: true}), '111&#x2082;');
	equal((new MathLib.Integer('10000000001', {base: 36})).toString({base: 36}), '10000000001');

	equal((new MathLib.Integer(0)).toString({sign: true}), '+0');
	equal((new MathLib.Integer(-0)).toString({sign: true}), '+0');
	equal((new MathLib.Integer(1)).toString({sign: true}), '+1');
});