test('.toContentMathML()', 2, function () {
	equal(MathLib.Integer.toContentMathML(), '<integers/>');
	equal(MathLib.Integer.toContentMathML({strict: true}), '<csymbol cd="setname1">Z</csymbol>');
});