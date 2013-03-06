test('.positionOf()', 3, function () {
	var center = new MathLib.Point(1, 2),
			circle = new MathLib.Circle(center, 2),
			on = new MathLib.Point(1, 4),
			out = new MathLib.Point(2, 4),
			inside = new MathLib.Point(2, 3);

	equal(circle.positionOf(on), 'on', 'Point on the circle');
	equal(circle.positionOf(out), 'out', 'Point outside the circle');
	equal(circle.positionOf(inside), 'in', 'Point inside the circle');
});