test('.toContentMathML()', 1, function () {
	equal(MathLib.Integer.toContentMathML(), '<csymbol cd="setname1">Z</csymbol>');
});