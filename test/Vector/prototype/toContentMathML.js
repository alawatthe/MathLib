test('.toContentMathML()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toContentMathML(), '<vector><cn type="double">1</cn><cn type="double">2</cn>' +
		'<cn type="double">3</cn></vector>', '.toContentMathML()');
	equal(v.toContentMathML({strict: true}), '<apply><csymbol cd="linalg2">vector</csymbol>' +
		'<cn type="double">1</cn><cn type="double">2</cn><cn type="double">3</cn></apply>', '.toContentMathML()');
});