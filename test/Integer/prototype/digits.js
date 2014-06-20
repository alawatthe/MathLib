test('.prototype.digits()', 6, function () {
	deepEqual((new MathLib.Integer('0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+0')).digits(), [0]);
	deepEqual((new MathLib.Integer('-0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('-1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('123456789')).digits(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});