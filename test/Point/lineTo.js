test('.lineTo()', 2, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([0, 1, 1]),
			p3 = new MathLib.Point([1, 1, 0]);

	deepEqual(p1.lineTo(p2), new MathLib.Line([-1, -1, 1]), '.lineTo()');
	deepEqual(p1.lineTo(p3), new MathLib.Line([-1, 1, 1]), '.lineTo()');
});