test('.toContentMathML()', 1, function () {
	equal(MathLib.sin.toContentMathML().type, 'MathML', 'type of MathLib.sin.toContentMathML() should be MathML');
});