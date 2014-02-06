module('Integer');
test('init', 18, function () {
	// string
	equal((new MathLib.Integer('0')).sign, '+');
	equal((new MathLib.Integer('+0')).sign, '+');
	equal((new MathLib.Integer('-0')).sign, '-');
	equal((new MathLib.Integer('1')).sign, '+');
	equal((new MathLib.Integer('+1')).sign, '+');
	equal((new MathLib.Integer('-1')).sign, '-');

	deepEqual((new MathLib.Integer('67108863')).data, [67108863]);
	deepEqual((new MathLib.Integer('67108864')).data, [0, 1]);
	deepEqual((new MathLib.Integer('67108865')).data, [1, 1]);

	deepEqual((new MathLib.Integer('111', {base: 2})).data, [7]);
	deepEqual((new MathLib.Integer('zzzzzzz', {base: 36})).data, [48119807, 1167]);



	// number
	equal((new MathLib.Integer(+0)).sign, '+');
	equal((new MathLib.Integer(-0)).sign, '-');
	equal((new MathLib.Integer(+1)).sign, '+');
	equal((new MathLib.Integer(-1)).sign, '-');

	deepEqual((new MathLib.Integer(67108863)).data, [67108863]);
	deepEqual((new MathLib.Integer(67108864)).data, [0, 1]);
	deepEqual((new MathLib.Integer(67108865)).data, [1, 1]);
});



// Properties
test('.constructor', 1, function () {
	var i = new MathLib.Integer('1234');
	equal(i.constructor, MathLib.Integer, 'Testing .constructor');
});

test('.type', 1, function () {
	var i = new MathLib.Integer('1234');
	equal(i.type, 'integer', 'Testing .type');
});