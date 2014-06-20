test('.normalize()', 30, function () {
	var i, cp, np,
			C = [],
			N = [],
			c1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			n1 = c1.normalize(),
			c2 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			n2 = c2.normalize(),
			c3 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			n3 = c3.normalize(),
			c4 = new MathLib.Conic([[-4, 0, 0], [0, 0, 2], [0, 2, 8]]),
			n4 = c4.normalize(),

			c1Deg = new MathLib.Conic([[0, 0, 0], [0, 0, 0], [0, 0, 1]], [[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			n1Deg = c1Deg.normalize(),

			a = Math.random() - 0.5,
			b = Math.random() - 0.5,
			c = Math.random() - 0.5,
			d = Math.random() - 0.5,
			e = Math.random() - 0.5,
			f = Math.random() - 0.5,
			Conic = new MathLib.Conic([[a, b, d], [b, c, e], [d, e, f]]);

	C.push(c1);
	N.push(n1);
	C.push(c2);
	N.push(n2);
	C.push(c3);
	N.push(n3);
	C.push(c4);
	N.push(n4);
	C.push(c1Deg);
	N.push(n1Deg);
	C.push(Conic);
	N.push(Conic.normalize());


	for (i = 0; i < C.length; i++) {
		cp = C[i].primal;
		np = N[i].primal;

		equal(cp.rank(), np.rank(), true, 'rank is invariant');

		equal(np[0][1], 0, 'b is 0');
		equal(np[2][2] === 0 || np[2][2] === -1, true, 'f is 0 or -1');
		equal(np[0][0] * np[0][2], 0, 'a or d is 0');
		equal(np[1][1] * np[1][2], 0, 'c or e is 0');
	}
});