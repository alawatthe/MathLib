test('.isOutside()', 3, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([2, 0, 1]),
			p3 = new MathLib.Point([3, 0, 1]),
			c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
	equal(p1.isOutside(c), false, '.isOutside()');
	equal(p2.isOutside(c), false, '.isOutside()');
	equal(p3.isOutside(c), true, '.isOutside()');
});