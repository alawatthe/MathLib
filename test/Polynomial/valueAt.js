test('.valueAt()', 6, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]),
			p2 = new MathLib.Polynomial([1, -4, new MathLib.Complex(4, -1)]),
			m = new MathLib.Matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
			charPoly = new MathLib.Polynomial([4, -1, -4, 1]);
	equal(p.valueAt(4), 64, '.valueAt()');
	equal(p1.valueAt(2), 17, '.valueAt()');

	deepEqual(p1.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-10, 42), '.valueAt()');
	deepEqual(p2.valueAt(2), new MathLib.Complex(9, -4), '.valueAt()');
	deepEqual(p2.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-15, 41), '.valueAt()');

	equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});