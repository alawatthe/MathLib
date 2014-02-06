test('prototype.mod()', 14, function () {
	deepEqual((new MathLib.Integer(-3)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));
	deepEqual((new MathLib.Integer(-2)).mod(new MathLib.Integer(+3)), new MathLib.Integer(1));
	deepEqual((new MathLib.Integer(-1)).mod(new MathLib.Integer(+3)), new MathLib.Integer(2));
	deepEqual((new MathLib.Integer(+0)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));
	deepEqual((new MathLib.Integer(+1)).mod(new MathLib.Integer(+3)), new MathLib.Integer(1));
	deepEqual((new MathLib.Integer(+2)).mod(new MathLib.Integer(+3)), new MathLib.Integer(2));
	deepEqual((new MathLib.Integer(+3)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));

	deepEqual((new MathLib.Integer(-3)).mod(+3), 0);
	deepEqual((new MathLib.Integer(-2)).mod(+3), 1);
	deepEqual((new MathLib.Integer(-1)).mod(+3), 2);
	deepEqual((new MathLib.Integer(+0)).mod(+3), 0);
	deepEqual((new MathLib.Integer(+1)).mod(+3), 1);
	deepEqual((new MathLib.Integer(+2)).mod(+3), 2);
	deepEqual((new MathLib.Integer(+3)).mod(+3), 0);
});