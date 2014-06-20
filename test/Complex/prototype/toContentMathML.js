test('.toContentMathML()', 7, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toContentMathML(), '<csymbol cd="nums1">NaN</csymbol>');
	equal((new MathLib.Complex(Infinity)).toContentMathML(), '<csymbol cd="nums1">infinity</csymbol>');

	equal(c.toContentMathML(), '<apply><plus /><cn type="double">3</cn><apply>' +
		'<times /><cn type="double">4</cn><imaginaryi /></apply></apply>', 'Normal complex number.');
	equal(d.toContentMathML(), '<apply><plus /><cn type="double">0</cn><apply>' +
		'<times /><cn type="double">7</cn><imaginaryi /></apply></apply>', 'Real part is zero.');
	equal(e.toContentMathML(), '<apply><plus /><cn type="double">4</cn><apply>' +
		'<times /><cn type="double">0</cn><imaginaryi /></apply></apply>', 'Complex part is zero.');
	equal(f.toContentMathML(), '<apply><plus /><cn type="double">4</cn><apply>' +
		'<times /><cn type="double">-5</cn><imaginaryi /></apply></apply>', 'Complex part is negative.');
	equal(g.toContentMathML(), '<apply><plus /><cn type="double">0</cn><apply>' +
		'<times /><cn type="double">0</cn><imaginaryi /></apply></apply>', 'Number is zero.');
});