test('.prototype.toLaTeX()', 9, function () {
	equal((new MathLib.Integer('1234')).toLaTeX(), '1234');
	equal((new MathLib.Integer('+1234')).toLaTeX(), '1234');
	equal((new MathLib.Integer('-1234')).toLaTeX(), '-1234');

	equal((new MathLib.Integer(7)).toLaTeX({base: 2}), '111');
	equal((new MathLib.Integer(7)).toLaTeX({baseSubscript: true}), '7_{10}');
	equal((new MathLib.Integer(7)).toLaTeX({base: 2, baseSubscript: true}), '111_{2}');

	equal((new MathLib.Integer(0)).toLaTeX({sign: true}), '+0');
	equal((new MathLib.Integer(-0)).toLaTeX({sign: true}), '+0');
	equal((new MathLib.Integer(1)).toLaTeX({sign: true}), '+1');
});