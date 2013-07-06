test('.toContentMathML()', 1, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]);
	deepEqual(m.toContentMathML(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathML()');
});