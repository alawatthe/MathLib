test('.eccentricity()', 10, function () {
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

	equal(c1.eccentricity(), 0, 'circle.eccentricity() = 0');
	equal(c2.eccentricity(), 0, 'circle.eccentricity() = 0');
	equal(e1.eccentricity(), 0.5, 'ellipse.eccentricity()');
	equal(e2.eccentricity(), 0.5, 'ellipse.eccentricity()');
	equal(p1.eccentricity(), 1, 'parabola.eccentricity() = 1');
	equal(p2.eccentricity(), 1, 'parabola.eccentricity() = 1');
	equal(h1.eccentricity(), Math.sqrt(1 + 4 / 3), 'hyperbola.eccentricity()');
	equal(h2.eccentricity(), Math.sqrt(1 + 4 / 3), 'hyperbola.eccentricity()');
	equal(deg1.eccentricity(), undefined, 'degeneratedConic.eccentricity() = undefined');
	equal(deg2.eccentricity(), undefined, 'degeneratedConic.eccentricity() = undefined');
});