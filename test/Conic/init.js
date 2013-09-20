module('Conic');
test('init', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(typeof p, 'object', 'Testing typeof');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(p.constructor, MathLib.Conic, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(p.type, 'conic', 'Testing .type');
});