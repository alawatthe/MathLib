module('Circle');
test('init', 2, function () {
	var p = new MathLib.Point(1, 2),
			circle = new MathLib.Circle(p, 2);
	equal(circle.radius, 2, 'Testing the radius');
	deepEqual(circle.center, p, 'Testing the center');
});



// Properties
test('.constructor', 1, function () {
	var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
	equal(c.constructor, MathLib.Circle, 'Testing .constructor');
});

test('.type', 1, function () {
	var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
	equal(c.type, 'circle', 'Testing .type');
});