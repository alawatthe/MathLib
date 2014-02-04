test('.toContentMathML()', 2, function () {
	equal(MathLib.Complex.toContentMathML(), '<complexes/>');
	equal(MathLib.Complex.toContentMathML({strict: true}), '<csymbol cd="setname1">C</csymbol>');
});