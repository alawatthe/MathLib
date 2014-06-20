test('.prototype.toContentMathML()', 2, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toContentMathML(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathML()');
	equal(r.toContentMathML({strict: true}), '<apply><csymbol cd="nums1">rational' +
		'</csymbol><cn type="double">2</cn><cn type="double">3</cn></apply>',
		'.toContentMathML()');
});