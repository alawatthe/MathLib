test('.parallelThrough()', 5, function () {
	var l = new MathLib.Line([1, 0, 1]),
			p = new MathLib.Point([1, 1, 1]),
			parallel = l.parallelThrough(p),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(parallel, new MathLib.Line([-1, 0, 1]), '.parallelThrough()');

	l[0] = 2;
	deepEqual(parallel, new MathLib.Line([-2, 0, 2]), 'The coordinates of the parallel should change if those of the line change.');
	p[0] = 2;
	deepEqual(parallel, new MathLib.Line([-2, 0, 4]), 'The coordinates of the parallel should change if those of the point change.');

	MathLib.on('warning', f);
	parallel[0] = 42;
	deepEqual(parallel, new MathLib.Line([-2, 0, 4]), 'You should not be able to change the coordinates of the parallel.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
});