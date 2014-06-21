test('.prototype.digits()', 8, function () {
	deepEqual((new MathLib.Integer('0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+0')).digits(), [0]);
	deepEqual((new MathLib.Integer('-0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('-1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('123456789')).digits(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
	deepEqual((new MathLib.Integer('123456789')).digits(2), [
		1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1
	]);
	deepEqual((new MathLib.Integer('123456789')).digits(16), [7, 5, 11, 12, 13, 1, 5]);
});