test('.toColVectors()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toColVectors(), [
		new MathLib.Vector([1, 4, 7]), new MathLib.Vector([2, 5, 8]), new MathLib.Vector([3, 6, 9])
	], '.toColVectors()');
});