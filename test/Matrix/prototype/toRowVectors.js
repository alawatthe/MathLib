test('.toRowVectors()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

	deepEqual(m.toRowVectors(), [new MathLib.Vector([1, 2, 3]),
		new MathLib.Vector([4, 5, 6]),
		new MathLib.Vector([7, 8, 9])
	], '.toRowVectors()');
});