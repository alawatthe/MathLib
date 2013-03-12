test('.toContentMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toContentMathMLString(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
	equal(d.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
	equal(e.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
	equal(f.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
	equal(g.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});