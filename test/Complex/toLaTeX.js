test('.toLaTeX()', 1, function () {
	equal(MathLib.Complex.toLaTeX(), 'Complex Field $\\mathbb{C}$');
});