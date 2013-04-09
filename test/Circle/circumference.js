test('.circumference()', 5, function () {
	var p = new MathLib.Point(1, 2),
			c1 = new MathLib.Circle(p, NaN),
			c2 = new MathLib.Circle(p, +0),
			c3 = new MathLib.Circle(p, -0),
			c4 = new MathLib.Circle(p, Infinity),
			c5 = new MathLib.Circle(p, 2);

	// Spec. 1: c.circumference() = NaN if r = NaN
	equal(MathLib.isNaN(c1.circumference()), true, 'Spec. 1: c.circumference() = NaN if r = NaN');

	// Spec. 2: c.circumference() = +0 if r = +0
	equal(MathLib.isPosZero(c2.circumference()), true, 'Spec. 2: c.circumference() = +0 if r = +0');

	// Spec. 3: c.circumference() = -0 if r = -0
	equal(MathLib.isNegZero(c3.circumference()), true, 'Spec. 3: c.circumference() = -0 if r = -0');

	// Spec. 4: c.circumference() = ∞ if r = ∞
	equal(c4.circumference(), Infinity, 'Spec. 4: c.circumference() = ∞ if r = ∞');

	// Spec. 5: otherwise c.circumference() = 2 π r
	equal(c5.circumference(), 4 * MathLib.pi, 'Spec. 5: otherwise c.circumference() = 2 π r');
});