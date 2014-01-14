test('.toContentMathML()', 1, function () {
	equal(MathLib.Complex.toContentMathML(), '<csymbol cd="setname1">C</csymbol>');
});