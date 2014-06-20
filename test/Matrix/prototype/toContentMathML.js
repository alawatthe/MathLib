test('.toContentMathML()', 2, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]);

	equal(m.toContentMathML(), '<matrix><matrixrow><cn type="double">1</cn>' +
		'<cn type="double">2</cn></matrixrow><matrixrow><cn type="double">3</cn>' +
		'<cn type="double">4</cn></matrixrow></matrix>', '.toContentMathML()');
	equal(m.toContentMathML({strict: true}), '<apply><csymbol cd="linalg2">' +
		'matrix</csymbol><apply><csymbol cd="linalg2">matrixrow</csymbol><cn ' +
		'type="double">1</cn><cn type="double">2</cn></apply><apply><csymbol ' +
		'cd="linalg2">matrixrow</csymbol><cn type="double">3</cn><cn ' +
		'type="double">4</cn></apply></apply>', '.toContentMathML()');
});