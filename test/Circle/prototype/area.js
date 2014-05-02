test('.area()', 5, function () {
	var p = new MathLib.Point(1, 2),
			c1 = new MathLib.Circle(p, NaN),
			c2 = new MathLib.Circle(p, +0),
			c3 = new MathLib.Circle(p, -0),
			c4 = new MathLib.Circle(p, Infinity),
			c5 = new MathLib.Circle(p, 2);

	// Spec. 1: c.area() = NaN if r = NaN
	equal(MathLib.isNaN(c1.area()), true, 'Spec. 1: c.area() = NaN if r = NaN');

	// Spec. 2: c.area() = +0 if r = +0
	equal(MathLib.isPosZero(c2.area()), true, 'Spec. 2: c.area() = +0 if r = +0');

	// Spec. 3: c.area() = -0 if r = +0
	equal(MathLib.isPosZero(c3.area()), true, 'Spec. 3: c.area() = -0 if r = +0');

	// Spec. 4: c.area() = ∞ if r = ∞
	equal(c4.area(), Infinity, 'Spec. 4: c.area() = ∞ if r = ∞');

	// Spec. 5: otherwise c.area() = π r * r
	equal(c5.area(), 4 * MathLib.pi, 'Spec. 5: otherwise c.area() = π * r * r');
});