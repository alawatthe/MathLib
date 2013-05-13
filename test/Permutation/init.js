module('Permutation');
test('init', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(typeof p, 'object', 'Testing typeof');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(p.constructor, MathLib.Permutation, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(p.type, 'permutation', 'Testing .type');
});