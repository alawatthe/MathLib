test('.normalize()', 3, function () {
	var l1 = new MathLib.Line([3, 4, 5]),
			l2 = new MathLib.Line([0, 0, 1]),
			l3 = new MathLib.Line([0, 0, 8]);

	deepEqual(l1.normalize(), new MathLib.Line([0.6, 0.8, 1]), '.normalize() of an finite line');
	deepEqual(l2.normalize(), new MathLib.Line([0, 0, 1]), '.normalize() of the infinite line');
	deepEqual(l3.normalize(), new MathLib.Line([0, 0, 1]), '.normalize() of the infinite line');
});