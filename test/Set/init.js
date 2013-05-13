module('Set');
test('init', 2, function () {
	var s1 = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			s2 = new MathLib.Set([3, new MathLib.Complex(1, 1), 3, new MathLib.Complex(1, 1)]);
	equal(s1.card, 5, 'Testing the cardinality');
	equal(s2.card, 2, 'Testing the cardinality');
});



// Properties
test('.constructor', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);
	equal(s.constructor, MathLib.Set, 'Testing .constructor');
});


test('.type', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);
	equal(s.type, 'set', 'Testing .type');
});