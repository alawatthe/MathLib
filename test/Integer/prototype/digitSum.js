test('.prototype.digitSum()', 6, function () {
	ok((new MathLib.Integer('0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('+0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('-0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('+1234')).digitSum().isEqual(new MathLib.Integer('10')));
	ok((new MathLib.Integer('-1234')).digitSum().isEqual(new MathLib.Integer('10')));
	ok((new MathLib.Integer('123456789')).digitSum().isEqual(new MathLib.Integer('45')));
});