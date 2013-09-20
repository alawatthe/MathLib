test('.latusRectum()', 10, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			c2 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, -2]]),

			e1 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			e2 = new MathLib.Conic([[8, 0, 0], [0, 6, 0], [0, 0, -2]]),

			p1 = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			p2 = new MathLib.Conic([[2, 0, 0], [0, 0, -1], [0, -1, 0]]),

			h1 = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			h2 = new MathLib.Conic([[8, 0, 0], [0, -6, 0], [0, 0, -2]]),

			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]);

	equal(c1.latusRectum(), 2, 'circle.latusRectum()');
	equal(c2.latusRectum(), 2, 'circle.latusRectum()');
	equal(e1.latusRectum(), 4 / 3, 'ellipse.latusRectum()');
	equal(e2.latusRectum(), 4 / 3, 'ellipse.latusRectum()');
	equal(p1.latusRectum(), 1, 'parabola.latusRectum()');
	equal(p2.latusRectum(), 1, 'parabola.latusRectum()');
	equal(h1.latusRectum(), 4 / 3, 'hyperbola.latusRectum()');
	equal(h2.latusRectum(), 4 / 3, 'hyperbola.latusRectum()');
	equal(deg1.latusRectum(), undefined, 'degeneratedConic.latusRectum() = undefined');
	equal(deg2.latusRectum(), undefined, 'degeneratedConic.latusRectum() = undefined');
});