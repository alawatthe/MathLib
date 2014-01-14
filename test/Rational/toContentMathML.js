test('.toContentMathML()', 1, function () {
	equal(MathLib.Rational.toContentMathML(), '<csymbol cd="setname1">Q</csymbol>');
});