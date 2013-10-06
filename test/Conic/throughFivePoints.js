test('.throughFivePoints()', 5, function () {
	var p1 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p2 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p3 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p4 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p5 = new MathLib.Point([Math.random(), Math.random(), 1]),
			conic = MathLib.Conic.throughFivePoints(p1, p2, p3, p4, p5);

	ok(MathLib.isEqual(p1.times(conic.primal).scalarProduct(p1), 0), 'conic goes through first point');
	ok(MathLib.isEqual(p2.times(conic.primal).scalarProduct(p2), 0), 'conic goes through second point');
	ok(MathLib.isEqual(p3.times(conic.primal).scalarProduct(p3), 0), 'conic goes through third point');
	ok(MathLib.isEqual(p4.times(conic.primal).scalarProduct(p4), 0), 'conic goes through fourth point');
	ok(MathLib.isEqual(p5.times(conic.primal).scalarProduct(p5), 0), 'conic goes through fifth point');
});