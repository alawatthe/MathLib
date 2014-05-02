test('.meet()', 5, function () {
	var l1 = new MathLib.Line([1, 0, 1]),
			l2 = new MathLib.Line([0, 1, 1]),
			l3 = new MathLib.Line([1, 1, 0]),
			p1 = l1.meet(l2),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(p1, new MathLib.Point([-1, -1, 1]), '.meet()');
	deepEqual(l1.meet(l3), new MathLib.Point([-1, 1, 1]), '.meet()');

	l1[0] = 2;
	deepEqual(p1, new MathLib.Point([-1, -2, 2]), 'The coordinates of the point should change if those of the line change.');

	MathLib.on('warning', f);
	p1[0] = 42;
	deepEqual(p1, new MathLib.Point([-1, -2, 2]), 'You should not be able to change the coordinates of the point.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
});