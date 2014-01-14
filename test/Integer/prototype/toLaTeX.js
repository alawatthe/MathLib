test('.prototype.toLaTeX()', 3, function () {
	equal((new  MathLib.Integer('1234')).toLaTeX(), '1234');
	equal((new  MathLib.Integer('+1234')).toLaTeX(), '1234');
	equal((new  MathLib.Integer('-1234')).toLaTeX(), '-1234');
});