test('.toContentMathML()', 2, function () {
	equal(MathLib.Rational.toContentMathML(), '<rationals/>');
	equal(MathLib.Rational.toContentMathML({strict: true}), '<csymbol cd="setname1">Q</csymbol>');
});