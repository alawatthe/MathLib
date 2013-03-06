test('.toContentMathMLString()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toContentMathMLString(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', '.toContentMathML()String');
});