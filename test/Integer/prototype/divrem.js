test('prototype.divrem()', 15, function () {
	deepEqual((new MathLib.Integer(+0)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(+0)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(-0)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(-0)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);

	deepEqual((new MathLib.Integer(+10)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(+3), new MathLib.Integer(1)]);
	deepEqual((new MathLib.Integer(+10)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(-3), new MathLib.Integer(1)]);
	deepEqual((new MathLib.Integer(-10)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(-4), new MathLib.Integer(2)]);
	deepEqual((new MathLib.Integer(-10)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(+4), new MathLib.Integer(2)]);

	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('+3')),
		[new MathLib.Integer('3333333'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('-3')),
		[new MathLib.Integer('-3333333'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('-10000000')).divrem(new MathLib.Integer('+3')),
		[new MathLib.Integer('-3333334'), new MathLib.Integer('2')]);
	deepEqual((new MathLib.Integer('-10000000')).divrem(new MathLib.Integer('-3')),
		[new MathLib.Integer('3333334'), new MathLib.Integer('2')]);

	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('0')]);
	deepEqual((new MathLib.Integer('+10000001')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('+10000002')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('2')]);
});