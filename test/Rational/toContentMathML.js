test('.toContentMathML()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toContentMathML(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathML()');
});