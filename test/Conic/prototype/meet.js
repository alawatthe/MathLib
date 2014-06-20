test('.meet()', 28, function () {
	var i, ii, meetingPoints,
			line = new MathLib.Line([-1, 1, 0]),
			conics = [];

	conics.push(new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]));
	conics.push(new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]));
	conics.push(new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]]));

	for (i = 0, ii = conics.length; i < ii; i++) {
		meetingPoints = conics[i].meet(line);

		ok(MathLib.isEqual(meetingPoints[0].scalarProduct(line), 0), 'line goes through first meeting point');
		ok(MathLib.isEqual(meetingPoints[1].scalarProduct(line), 0), 'line goes through second meeting point');

		ok(MathLib.isEqual(meetingPoints[0].times(conics[i].primal).scalarProduct(meetingPoints[0]), 0),
			'conic goes through first meeting point');
		ok(MathLib.isEqual(meetingPoints[1].times(conics[i].primal).scalarProduct(meetingPoints[1]), 0),
			'conic goes through second meeting point');
	}
});