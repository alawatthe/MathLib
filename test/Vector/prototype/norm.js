test('.norm()', 5, function () {
	var v = new MathLib.Vector([1, 2, -2]);

	equal(v.norm(), 3, '.norm()');
	equal(v.norm(2), 3, '.norm(2)');
	equal(v.norm(1), 5, '.norm(1)');
	equal(v.norm(3), 2.571281590658235, '.norm(3)');
	equal(v.norm(Infinity), 2, '.norm(Infinity)');
});