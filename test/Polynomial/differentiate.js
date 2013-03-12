test('.differentiate()', 3, function () {
	var p = new MathLib.Polynomial(3);
	deepEqual(p.differentiate(), new MathLib.Polynomial([0, 0, 3]), '.differentiate()');
	deepEqual(p.differentiate(2), new MathLib.Polynomial([0, 6]), '.differentiate(2)');
	deepEqual(p.differentiate(4), new MathLib.Polynomial([0]), '.differentiate(4)');
});