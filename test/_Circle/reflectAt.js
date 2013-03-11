test('.reflectAt()', 2, function () {
	var p = new MathLib.Point(1, 2),
			q = new MathLib.Point(3, 7),
			circle = new MathLib.Circle(p, 2),
			newcircle = circle.reflectAt(q);

	equal(newcircle.radius, 2, 'Checking the radius.');
	deepEqual(newcircle.center, new MathLib.Point(5, 12), 'Checking the center.');
});