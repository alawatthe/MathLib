test('.applyTo()', 6, function () {
	var p = new MathLib.Permutation([[0, 1, 2], [0, 1, 2]]),
			r = new MathLib.Permutation([0, 2, 1]),
			q = new MathLib.Permutation([]),
			v = new MathLib.Vector([1, 2, 3]);

	equal(p.applyTo(0), 2, 'Testing .applyTo()');
	equal(p.applyTo(3), 3, 'Testing .applyTo()');
	deepEqual(r.applyTo(v), new MathLib.Vector([1, 3, 2]), 'Testing .applyTo()');
	equal(r.applyTo(v).type, 'vector', 'Testing .applyTo()');
	deepEqual(r.applyTo([1, 2, 3]), [1, 3, 2], 'Testing .applyTo()');
	equal(q.applyTo(1), 1, 'Testing .applyTo() with id');
});