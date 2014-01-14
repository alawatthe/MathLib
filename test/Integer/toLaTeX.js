test('.toLaTeX()', 1, function () {
	equal(MathLib.Integer.toLaTeX(), 'Integer Ring $\\mathbb{Z}$');
});