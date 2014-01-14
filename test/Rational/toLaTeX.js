test('.toLaTeX()', 1, function () {
	equal(MathLib.Rational.toLaTeX(), 'Rational Field $\\mathbb{Q}$');
});