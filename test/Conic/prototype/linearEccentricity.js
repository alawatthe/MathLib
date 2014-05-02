test('.linearEccentricity()', 10, function () {
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

	equal(c1.linearEccentricity(), 0, 'circle.linearEccentricity()');
	equal(c2.linearEccentricity(), 0, 'circle.linearEccentricity()');
	equal(e1.linearEccentricity(), 0.28867513459481287, 'ellipse.linearEccentricity()');
	equal(e2.linearEccentricity(), 0.28867513459481287, 'ellipse.linearEccentricity()');
	equal(p1.linearEccentricity(), 1 / 4, 'parabola.linearEccentricity()');
	equal(p2.linearEccentricity(), 1 / 4, 'parabola.linearEccentricity()');
	equal(h1.linearEccentricity(), Math.sqrt(1 / 3 + 1 / 4), 'hyperbola.linearEccentricity()');
	equal(h2.linearEccentricity(), Math.sqrt(1 / 3 + 1 / 4), 'hyperbola.linearEccentricity()');
	equal(deg1.linearEccentricity(), undefined, 'degeneratedConic.linearEccentricity() = undefined');
	equal(deg2.linearEccentricity(), undefined, 'degeneratedConic.linearEccentricity() = undefined');
});