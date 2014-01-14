module('Integer');
test('init', 2, function () {
	var p = new MathLib.Point(1, 2),
			circle = new MathLib.Circle(p, 2);
	equal(circle.radius, 2, 'Testing the radius');
	deepEqual(circle.center, p, 'Testing the center');
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