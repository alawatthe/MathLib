module('Functn');
test('execution', 4, function () {
	equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
	equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
	equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
	ok(MathLib.isEqual(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin),
		MathLib.times(MathLib.cos, MathLib.cos))(42), 1), 'sin(42)^2 + cos(42)^2 = 1');
});



// Properties
test('.constructor', 1, function () {
	equal(MathLib.sin.constructor, MathLib.Functn, 'Testing .constructor');
});


test('.type', 4, function () {
	equal(MathLib.sin.type, 'functn', 'MathLib.sin.type should be functn');
	equal(MathLib.exp(MathLib.sin).type, 'functn', 'MathLib.exp(MathLib.sin).type should be functn');
	equal(MathLib.plus(1, MathLib.cos).type, 'functn', 'MathLib.plus(1, MathLib.cos).type should be functn');
	equal(MathLib.plus(MathLib.cos, 1).type, 'functn', 'MathLib.plus(MathLib.cos, 1).type should be functn');
});


test('.call', 14, function () {
	var f;
	equal(MathLib.minus(4, 3), 1, 'MathLib.minus with two arguments evaluates the functn');

	f = MathLib.minus(4);

	equal(f.toString(), 'y ⟼ 4 - y', 'MathLib.minus with one undefined arguments does partial application');
	equal(f(3), 1);

	f = MathLib.minus(undefined, 3);
	equal(f.toString(), 'x ⟼ x - 3', 'MathLib.minus with one undefined arguments does partial application');
	equal(f(4), 1);

	f = MathLib.minus(MathLib.cos);
	equal(f.toString(), '(x, y) ⟼ cos(x) - y');
	equal(f(0, 2), -1);

	f = MathLib.minus(MathLib.cos, 3);
	equal(f.toString(), 'x ⟼ cos(x) - 3');
	equal(f(0), -2);

	f = MathLib.minus(4, MathLib.cos);
	equal(f.toString(), 'x ⟼ 4 - cos(x)');
	equal(f(0), 3);

	f = MathLib.sin(MathLib.Expression.variable('u'));
	equal(f.toString(), 'u ⟼ sin(u)');

	deepEqual(MathLib.sqrt([0, 1, 4, 9, 16]), [0, 1, 2, 3, 4]);
	deepEqual(MathLib.minus([1, 2, 3], [1, 2, 3]), [[0, -1, -2], [1, 0, -1], [2, 1, 0]]);
});