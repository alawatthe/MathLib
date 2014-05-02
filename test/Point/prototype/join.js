test('.join()', 5, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([0, 1, 1]),
			p3 = new MathLib.Point([1, 1, 0]),
			l1 = p1.join(p2),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(l1, new MathLib.Line([-1, -1, 1]), '.join()');
	deepEqual(p1.join(p3), new MathLib.Line([-1, 1, 1]), '.join()');

	p1[0] = 2;
	deepEqual(l1, new MathLib.Line([-1, -2, 2]), 'The coordinates of the line should change if those of the point change.');

	MathLib.on('warning', f);
	l1[0] = 42;
	deepEqual(l1, new MathLib.Line([-1, -2, 2]), 'You should not be able to change the coordinates of the line.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
});