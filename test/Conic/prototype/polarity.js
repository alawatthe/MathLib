test('.polarity()', 14, function () {
	var q = new MathLib.Point([2, 1, 1]),
			l = new MathLib.Line([1, 2, 1]),
			c = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			e = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			p = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			h = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]),
			deg3 = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]]);


	ok(MathLib.isEqual(c.polarity(q), new MathLib.Line([2, 1, -1])), 'circle.polarity()');
	ok(MathLib.isEqual(c.polarity(l), new MathLib.Point([1, 2, -1])), 'circle.polarity()');

	ok(MathLib.isEqual(e.polarity(q), new MathLib.Line([8, 3, -1])), 'ellipse.polarity()');
	ok(MathLib.isEqual(e.polarity(l), new MathLib.Point([1 / 4, 2 / 3, -1])), 'ellipse.polarity()');

	ok(MathLib.isEqual(p.polarity(q), new MathLib.Line([2, -0.5, -0.5])), 'parabola.polarity()');
	ok(MathLib.isEqual(p.polarity(l), new MathLib.Point([-0.25, 0.5, 1])), 'parabola.polarity()');

	ok(MathLib.isEqual(h.polarity(q), new MathLib.Line([8, -3, -1])), 'hyperbola.polarity()');
	ok(MathLib.isEqual(h.polarity(l), new MathLib.Point([0.25, -2 / 3, -1])), 'hyperbola.polarity()');

	ok(MathLib.isEqual(deg1.polarity(q), new MathLib.Line([3, 3, -1])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg1.polarity(l), new MathLib.Point([1, -1, 0])), 'degeneratedConic.polarity()');

	ok(MathLib.isEqual(deg2.polarity(q), new MathLib.Line([3, 4, 0])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg2.polarity(l), new MathLib.Point([0, 0, 1])), 'degeneratedConic.polarity()');

	ok(MathLib.isEqual(deg3.polarity(q), new MathLib.Line([2, 0, 0])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg3.polarity(l), new MathLib.Point([0, 2, 1])), 'degeneratedConic.polarity()');
});