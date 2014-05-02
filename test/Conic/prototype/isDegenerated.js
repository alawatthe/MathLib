test('.isDegenerated()', 5, function () {
	var c = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			e = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			p = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			h = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),

			deg = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 1], [0, 1, 1]]);

	equal(c.isDegenerated(), false, '.isDegenerated(hyperbola) = false');
	equal(e.isDegenerated(), false, '.isDegenerated(ellipse) = false');
	equal(p.isDegenerated(), false, '.isDegenerated(parabola) = false');
	equal(h.isDegenerated(), false, '.isDegenerated(hyperbola) = false');
	equal(deg.isDegenerated(), true, '.isDegenerated(degenerated conic) = true');
});