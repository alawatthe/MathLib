module('Point');
test('init', 1, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.dimension, 2, 'Testing the dimension');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Point([3, 2, 1]);
	equal(p.constructor, MathLib.Point, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Point([3, 2, 1]);
	equal(p.type, 'point', 'Testing .type');
});