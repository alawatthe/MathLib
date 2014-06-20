test('.givens()', 9, function () {
	var m = new MathLib.Matrix([[3, 5], [0, 2], [0, 0], [4, 5]]),
			n = new MathLib.Matrix([[6, 5, 0], [5, 1, 4], [0, 4, 3]]),
			o = new MathLib.Matrix([[0, 1, 6], [3, 5, 7], [4, 9, 2]]),
			QRm = m.givens(),
			Qm = QRm[0],
			Rm = QRm[1],
			Q1 = new MathLib.Matrix([
				[3 / 5, 4 / (5 * Math.sqrt(5)), 0, -8 / (5 * Math.sqrt(5))],
				[0, 2 / Math.sqrt(5), 0, 1 / Math.sqrt(5)],
				[0, 0, 1, 0],
				[4 / 5, -3 / (5 * Math.sqrt(5)), 0, 6 / (5 * Math.sqrt(5))]
			]),
			R1 = new MathLib.Matrix([[5, 7], [0, 2.23606797749979], [0, 0], [0, 0]]),

			QRn = n.givens(),
			Qn = QRn[0],
			Rn = QRn[1],
			Q2 = new MathLib.Matrix([
				[0.768221279597376, -0.332654179360071, -0.546970988744419],
				[0.640184399664480, 0.399185015232086, 0.656365186493303],
				[0, -0.854395997514289, 0.519622439307198]
			]),
			R2 = new MathLib.Matrix([
				[7.810249675906652, 4.481290797651358, 2.560737598657919],
				[0, -4.681669871625427, -0.966447931614524],
				[0, 0, 4.184328063894809]
			]),

			QRo = o.givens(),
			Qo = QRo[0],
			Ro = QRo[1],
			Q3 = new MathLib.Matrix([
				[0, -0.581238193719096, -0.813733471206735],
				[0.6, 0.650986776965388, -0.464990554975277],
				[0.8, -0.488240082724041, 0.348742916231458]
			]),
			R3 = new MathLib.Matrix([
				[5, 10.2, 5.8],
				[0, -1.720465053408526, 0.09299811099505462],
				[0, 0, -7.439848879604435]
			]);

	ok(Qm.isEqual(Q1), 'Q is original matrix');
	ok(Rm.isEqual(R1), 'R is original matrix');
	ok(Qm.times(Rm).isEqual(m), 'Q*R is original matrix');
	ok(Qn.isEqual(Q2), 'Q is original matrix');
	ok(Rn.isEqual(R2), 'R is original matrix');
	ok(Qn.times(Rn).isEqual(n), 'Q*R is original matrix');
	ok(Qo.isEqual(Q3), 'Q is original matrix');
	ok(Ro.isEqual(R3), 'R is original matrix');
	ok(Qo.times(Ro).isEqual(o), 'Q*R is original matrix');
});